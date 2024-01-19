import questions from './questions.js';

var question_index = 0;
const totalNrQuestions = questions.length;

// Structure Schema to store user input
// TODO: Retrieve this from the JSON-schema
var userResponses = {
    persons: [
        { birthdate: null, income: null },
        { birthdate: null, income: null },
    ],
    objective: {
        situation: null,
        owner: null,
        incomeToInclude: null,
        change_mortgage_preference: null,
        mortgage_important_features: [],
        partner_pass_away: null,
        partner_disabled: null,
        objective_unemployed_partner: null,
        objective_retired: null,
    },
    knowledge_experience: {
        general_mortgage_experience: null,
        familiarity_with_mortgage_types: {},
    },
    financial_position: {
        income_sufficient_for_lifestyle: null,
        expect_income_develop: null,
        max_amount_net_mortgage_costs: null,
        saving_goals: [],
        saving_contribution: null,
    },
    risk_appetite: {
        certainty_expenses_not_increase: null,
        partner_pass_away_during_mortgage: [],
        become_disabled_during_mortgage: [],
        become_unemployed_during_mortgage: [],
        retirement_plan: [],
    },
    // this part stores information on which questions to display, imo inefficient and can be improved by moving to a different structure
    ui_questions_shown: {
        hasPartner: true,
        income: true,
        birthdate: true,
        partnerIncome: true,
        partnerBirthdate: true,
        situation: true,
        owner: true,
        income_to_include: true,
        change_mortgage_preference: true,
        mortgage_important_features: true,
        partner_pass_away: true,
        partner_disabled: true,
        objective_unemployed_partner: true,
        objective_retired: true,
        general_mortgage_experience: true,
        deductibility: true,
        experience_with_mortgage: true,
        decreasing_monthly_costs_graph: true,
        familiarity_with_mortgage_types: true,
        annuity_mortgage: true,
        familiarity_with_financial_terms: true,
        provision_employer: true,
        income_sufficient_for_lifestyle: true,
        expect_income_develop: true,
        max_amount_net_mortgage_costs: true,
        changes_in_personal_situation: true,
        saving_goals: true,
        saving_contribution: true,
        certainty_expenses_not_increase: true,
        partner_pass_away_during_mortgage: true,
        become_disabled_during_mortgage: true,
        become_unemployed_during_mortgage: true,
        retirement_plan: true,
    },
};

// Function to control progress bar
function updateProgressBar() {
    if (question_index <= totalNrQuestions - 1) {
        const progressBar =
            document.getElementsByClassName('progressive_bar')[0];
        var updateInterval = ((question_index + 1) / totalNrQuestions) * 100;
        progressBar.style.setProperty('--width', updateInterval);
    }
}

async function pingInferenceEngine(){
    // inference engine API ping
    const apiUrl = 'http://127.0.0.1:8000/infer'; // put link to hosted api server

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userResponses),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //update ui_questions_shown from userResponces struct
        userResponses = await response.json();
        console.log('Inferred Facts:', userResponses);
    } catch (error) {
        console.error('Error:', error);
    }
}

//control question flow
function updateUI(question_index_passed, backward) {
    // retreive inferred information
    pingInferenceEngine();

    // updateUI based on current information
    if (userResponses.ui_questions_shown[questions[question_index_passed].subcategory] == true) {
        question_index = question_index_passed;

        updateProgressBar();
        displayQuestionTitle(questions[question_index].question);

        if (
            questions[question_index].question_type == 'options' ||
            questions[question_index].question_type == 'binary'
        ) {
            displayQuestionOptions(
                questions[question_index].options,
                question_index,
            );
        } else if (questions[question_index].question_type == 'dateInput') {
            displayDateInput();
        } else if (questions[question_index].question_type == 'numberInput') {
            displayNumberInput();
        }
    } else {
        if (backward == true) {
            updateUI(question_index_passed - 1, true);
        } else {
            updateUI(question_index_passed + 1, false);
        }
    }
}

// Function to display the question title and handle styling
function displayQuestionTitle(title) {
    const questionTitleElement = document.getElementById('Question_Title');
    const questionTitle = questionTitleElement.querySelector('span');
    const textLength = title.length;

    updateTitleStyling(textLength);

    questionTitle.textContent = title;
}

// Function to update title styling based on text length
function updateTitleStyling(textLength) {
    const questionTitleElement = document.getElementById('Question_Title');
    const questionTitle = questionTitleElement.querySelector('span');
    if (textLength > 50) {
        if (textLength > 100) {
            var newSize = textLength / 60;
            questionTitleElement.style.lineHeight = '2.3vw';
            questionTitle.style.fontSize = newSize + 'vw';
        } else {
            var newSize = 140 / textLength;
            questionTitleElement.style.lineHeight = '2.3vw';
            questionTitle.style.fontSize = newSize + 'vw';
        }
    } else {
        questionTitleElement.style.lineHeight = 'normal';
        questionTitle.style.fontSize = '2.7vw';
    }
}

// Function to display question options
function displayQuestionOptions(options, question_index) {
    const optionContainer = document.getElementById('Option_Container');

    // Clear existing options
    optionContainer.innerHTML = '';

    // Display new options
    for (let i = 0; i < options.length; i++) {
        const addOption = document.createElement('a');
        addOption.href = '';
        addOption.className = 'option';
        addOption.id = 'option' + i;
        addOption.textContent = options[i];
        optionContainer.appendChild(addOption);

        const newOption = document.getElementById(addOption.id);

        if (newOption.textContent.length > 60) {
            newOption.style.height = '5vw';
        }

        let currentId = question_index;

        newOption.addEventListener('click', function (event) {
            event.preventDefault();
            storeInformation(newOption.id.replace('option', ''));
        });
    }
}

function displayDateInput() {
    const optionContainer = document.getElementById('Option_Container');

    // Clear existing options
    optionContainer.innerHTML = '';

    const dateInput = document.createElement('form');
    dateInput.classList.add('date_form');

    // Create an input element with type 'date'
    const input = document.createElement('input');
    input.type = 'date';
    input.id = 'dob';
    input.name = 'dob';
    input.required = true;
    input.classList.add('date_form_text');

    // Create a submit button
    const submitButton = document.createElement('input');
    submitButton.classList.add('submit_input_button');
    submitButton.type = 'submit';
    submitButton.value = 'Submit';
    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        storeInformation(input.value);
    });

    // Append input and submit button to the form
    dateInput.appendChild(input);
    dateInput.appendChild(submitButton);

    // Append the form to the option container
    optionContainer.appendChild(dateInput);
}

function displayNumberInput() {
    const optionContainer = document.getElementById('Option_Container');

    // Clear existing options
    optionContainer.innerHTML = '';

    // Create a form element
    const numberInput = document.createElement('form');
    numberInput.classList.add('number_form');

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('number-wrapper');

    // Create a span for the Euro sign
    const euroSign = document.createElement('span');
    euroSign.classList.add('euro-sign');
    euroSign.innerText = '€';

    // Create an input element with type 'date'
    const input = document.createElement('input');
    input.type = 'number';
    input.id = 'income';
    input.name = 'income';
    input.required = true;
    input.classList.add('number_form_text');

    // Create a submit button
    const submitButton = document.createElement('input');
    submitButton.classList.add('submit_input_button');
    submitButton.type = 'submit';
    submitButton.value = 'Submit';
    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        storeInformation(input.value);
    });

    wrapper.appendChild(input);
    wrapper.appendChild(euroSign);
    // Append input and submit button to the form
    numberInput.appendChild(wrapper);
    numberInput.appendChild(submitButton);

    // Append the form to the option container
    optionContainer.appendChild(numberInput);

    //display button when user enters number
    document.getElementById('income').addEventListener('input', function () {
        document.querySelector('.submit_input_button').style.display =
            'inline-block';
    });
}

// Handles user input on question basis
// CAN BE IMPROVED AND MADE MORE CONSISE
//
// Max: this currently does multiple things: parsing and mapping input, updating the UI, and determining whether to show a certain field.
// To improve when can possibly cut it up into multiple functions?
function storeInformation(value) {
    const current_question = questions[question_index];
    const id = current_question.question_id;

    // This maps the user input to the userResponses object, right?
    switch (id) {
        case 1:
            userResponses.objective.situation =
                current_question.option_values[value];
            break;
        case 2:
            userResponses.persons[0].birthdate = new Date(value);
            break;
        case 3:
            userResponses.persons[0].income = parseFloat(value);
            break;
        case(4):
            if (value == 1){
                userResponses.ui_questions_shown.partnerBirthdate = false;
                userResponses.ui_questions_shown.partnerIncome = false;
            } else{
                userResponses.ui_questions_shown.partnerBirthdate = true;
                userResponses.ui_questions_shown.partnerIncome = true;
            }
            break;
        case 5:
            userResponses.persons[1].birthdate = new Date(value);
            break;
        case 6:
            userResponses.persons[1].income = parseFloat(value);
            break;
        case 7:
            userResponses.objective.owner =
                current_question.option_values[value];
            break;
        case 8:
            userResponses.objective.incomeToInclude =
                current_question.option_values[value];
            break;
        case 9:
            userResponses.objective.change_mortgage_preference =
                current_question.option_values[value];
            break;
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            if (value == 0) {
                userResponses.objective.mortgage_important_features.push(
                    current_question.yes_value,
                );
            } else {
                const indexToRemove =
                    userResponses.objective.mortgage_important_features.indexOf(
                        current_question.yes_value,
                    );
                if (indexToRemove !== -1) {
                    userResponses.objective.mortgage_important_features.splice(
                        indexToRemove,
                        1,
                    );
                }
            }
            break;
        case 16:
            userResponses.objective.partner_pass_away =
                current_question.option_values[value];
            break;
        case 17:
            userResponses.objective.partner_disabled =
                current_question.option_values[value];
            break;
        case 18:
            userResponses.objective.objective_unemployed_partner =
                current_question.option_values[value];
            break;
        case 19:
            userResponses.objective.objective_retired =
                current_question.option_values[value];
            break;
        case 20:
            userResponses.knowledge_experience.general_mortgage_experience =
                current_question.option_values[value];
            break;
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
            userResponses.knowledge_experience.familiarity_with_mortgage_types[current_question.answerPoint] = current_question.option_values[value];
        case 27:
            userResponses.financial_position.income_sufficient_for_lifestyle =
                current_question.option_values[value];
            break;
        case 28:
            userResponses.financial_position.expect_income_develop =
                current_question.option_values[value];
            break;
        case 29:
            userResponses.financial_position.max_amount_net_mortgage_costs =
                parseFloat(value);
            break;
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
            if (value == 0) {
                userResponses.financial_position.saving_goals.push(
                    current_question.yes_value,
                );
            } else {
                const indexToRemove =
                    userResponses.financial_position.saving_goals.indexOf(
                        current_question.yes_value,
                    );
                if (indexToRemove !== -1) {
                    userResponses.financial_position.saving_goals.splice(
                        indexToRemove,
                        1,
                    );
                }
            }
            break;
        case 35:
            userResponses.financial_position.saving_contribution =
                parseFloat(value);
            break;
        case(36):
            userResponses.risk_appetite.certainty_expenses_not_increase = current_question.option_values[value];
            break;
        case(37):
        case(38):
        case(39):
        case(40):
        case(41):
        case(42):
            if(value == 0){
                userResponses.risk_appetite.partner_pass_away_during_mortgage.push(current_question.yes_value);
            } else {
                const indexToRemove = userResponses.risk_appetite.partner_pass_away_during_mortgage.indexOf(current_question.yes_value);
                if (indexToRemove !== -1) {
                    userResponses.risk_appetite.partner_pass_away_during_mortgage.splice(indexToRemove, 1);
                }
            }
            break;
        case(43):
        case(44):
        case(45):
        case(46):
        case(47):
        case(48):
            if(value == 0){
                userResponses.risk_appetite.become_disabled_during_mortgage.push(current_question.yes_value);
            } else {
                const indexToRemove = userResponses.risk_appetite.become_disabled_during_mortgage.indexOf(current_question.yes_value);
                if (indexToRemove !== -1) {
                    userResponses.risk_appetite.become_disabled_during_mortgage.splice(indexToRemove, 1);
                }
            }
            break;
        case(49):
        case(50):
        case(51):
        case(52):
        case(53):
        case(54):
            if(value == 0){
                userResponses.risk_appetite.become_unemployed_during_mortgage.push(current_question.yes_value);
            } else {
                const indexToRemove = userResponses.risk_appetite.become_unemployed_during_mortgage.indexOf(current_question.yes_value);
                if (indexToRemove !== -1) {
                    userResponses.risk_appetite.become_unemployed_during_mortgage.splice(indexToRemove, 1);
                }
            }
            break;
        case(55):
            if(value == 0){
                userResponses.risk_appetite.retirement_plan.push(current_question.yes_value);
                endSurvey();
            } else {
                const indexToRemove = userResponses.risk_appetite.retirement_plan.indexOf(current_question.yes_value);
                if (indexToRemove !== -1) {
                    userResponses.risk_appetite.retirement_plan.splice(indexToRemove, 1);
                }
            }
        case(56):
        case(57):
        case(58):
        case(59):
        case(60):
            if(value == 0){
                userResponses.risk_appetite.retirement_plan.push(current_question.yes_value);
            } else {
                const indexToRemove = userResponses.risk_appetite.retirement_plan.indexOf(current_question.yes_value);
                if (indexToRemove !== -1) {
                    userResponses.risk_appetite.retirement_plan.splice(indexToRemove, 1);
                }
            }
            break;
    }
    if(id == 60){
        endSurvey();
    }
    updateUI(question_index + 1, false);
}

function endSurvey(){
    // Store user inputs in localStorage
    localStorage.setItem('userResponses', JSON.stringify(userResponses));
    // Navigate to the results page
    window.location.href = "Mortgage-Advice-Tool-GUI/report_page.html";
    // Fill Progress Bar
    const progressBar =
            document.getElementsByClassName('progressive_bar')[0];
    progressBar.style.setProperty('--width', 100);
}

//add previous button
const previousButton = document.getElementById('previous_button');
previousButton.addEventListener('click', function (event) {
    if (question_index > 0) {
        event.preventDefault();
        updateUI(question_index - 1, true);
    } else {
        event.preventDefault();
    }
});

// Initial updateUI call
updateUI(question_index, false);
