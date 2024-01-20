import json
from pprint import pprint


class InferenceEngine:
    def __init__(self, rules, facts):
        self.rules = rules
        self.facts = facts

    def run(self):
        for rule in self.rules:
            self.apply_rule(rule)

        return self.facts

    def check_condition(self, condition, input_data):
        if isinstance(condition, list):
            return False not in [self.check_condition(c, input_data) for c in condition]

        path = condition.get("path")
        value = condition.get("value")
        operator = condition.get("operator")

        current_value = input_data
        for key in path.split("."):
            if isinstance(current_value, list):
                current_value = current_value[int(key)]
            elif isinstance(current_value, dict):
                current_value = current_value.get(key, None)
            else:
                return operator == "not exists"

            if current_value is None:
                return operator == "not exists"

        if operator == "exists":
            return True

        if operator == "==":
            return current_value == value
        elif operator == "!=":
            return current_value != value
        elif operator == ">":
            return current_value > value
        elif operator == "<":
            return current_value < value
        elif operator == ">=":
            return current_value >= value
        elif operator == "<=":
            return current_value <= value

    def perform_action(self, action, input_data):
        if isinstance(action, list):
            for a in action:
                self.perform_action(a, input_data)

            return

        path = action.get("path")
        value = action.get("value")
        operator = action.get("operator")

        current_value = input_data
        keys = path.split(".")
        for key in keys[:-1]:
            current_value = current_value.setdefault(key, {})

        last_key = keys[-1]
        if operator == "=" or operator is None:
            current_value[last_key] = value
        elif operator == "+":
            current_value[last_key] += value
        elif operator == "-":
            current_value[last_key] -= value
        elif operator == "*":
            current_value[last_key] *= value
        elif operator == "/":
            current_value[last_key] /= value

    def apply_rule(self, rule):
        input_data = self.facts

        conditions = rule.get("if")
        action_then = rule.get("then")
        action_else = rule.get("else")

        if self.check_condition(conditions, input_data):
            self.perform_action(action_then, input_data)
        elif action_else is not None:
            self.perform_action(action_else, input_data)


if __name__ == "__main__":
    rules = json.load(open("knowledge_base/rules.json"))["rules"]
    facts = json.load(open("samples/facts_sample.json"))

    inferred_facts = InferenceEngine(rules, facts).run()

    pprint(inferred_facts)
