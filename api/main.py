import os
import json
import tempfile
import pandoc
from pprint import pprint

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.background import BackgroundTasks

from inference_engine import InferenceEngine


app = FastAPI()

# Enable CORS for all origins, allows requests from different domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://mortgage-advice-netherlands.com",
        "https://www.mortgage-advice-netherlands.com",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_report(report_texts: dict):
    report = []
    texts = json.load(open("knowledge_base/texts.en.json"))

    for key, value in report_texts.items():
        report.append(f"{texts[key][value]}")

    return pandoc.read(source="\n\n".join(report), format="markdown")


@app.post("/infer")
def infer(body: dict):
    rules = json.load(open("knowledge_base/rules.json"))["rules"]
    inferred_facts = InferenceEngine(rules, body).run()

    pprint(inferred_facts)

    return inferred_facts


# @app.options("/infer")
# def options_infer():
#     return {"Allow": "*"}
#
#
# @app.options("/report")
# def options_report():
#     return {"Allow": "*"}


@app.post("/report")
def report(body: dict, background_tasks: BackgroundTasks):
    def remove_file(path: str) -> None:
        os.unlink(path)

    rules = json.load(open("knowledge_base/rules.json"))["rules"]
    inferred_facts = InferenceEngine(rules, body).run()

    pprint(inferred_facts)

    report = get_report(inferred_facts["advice_report_texts"])

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        print("Writing to", tmp.name)

        pandoc.write(report, format="pdf", file=tmp.name)
        background_tasks.add_task(remove_file, tmp.name)

        return FileResponse(tmp.name, media_type="application/pdf")
