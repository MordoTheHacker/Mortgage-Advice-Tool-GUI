import questions from './questions.js';

var question_index = 35;
const totalNrQuestions = questions.length;

// Structure Schema to store user input
const userResponses = {
    persons: [{ birthdate: null, income: null }, { birthdate: null, income: null }],
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
        full_familiarity_with_mortgage_types: [],
        limited_familiarity_with_mortgage_types: [],
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
};

// Function to control progress bar
function updateProgressBar(){
    if(question_index <= totalNrQuestions - 1){
        const progressBar = document.getElementsByClassName('progressive_bar')[0];
        var updateInterval = ((question_index + 1) / totalNrQuestions) * 100; 
        progressBar.style.setProperty('--width', updateInterval);
    }
}

//control question flow
function updateUI(question_index_passed, backward) {
    if(questions[question_index_passed].ask == "yes"){
        question_index = question_index_passed;

        //Update progress bar
        updateProgressBar();
        // Display Question Title
        displayQuestionTitle(questions[question_index].question);
        if(questions[question_index].question_type == "options" || questions[question_index].question_type == "binary"){
            // Display Question options
            displayQuestionOptions(questions[question_index].options, question_index);
        } else if(questions[question_index].question_type == "dateInput"){
            displayDateInput();
        } else if(questions[question_index].question_type == "numberInput"){
            displayNumberInput();
        }
    } else {
        if(backward == true){
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
        if(textLength > 100) {
            var newSize = textLength / 60;
            questionTitleElement.style.lineHeight = "2.3vw";
            questionTitle.style.fontSize = newSize + "vw";
        } else {
            var newSize = 140 / textLength;
            questionTitleElement.style.lineHeight = "2.3vw";
            questionTitle.style.fontSize = newSize + "vw";
        }
    } else {
        questionTitleElement.style.lineHeight = "normal";
        questionTitle.style.fontSize = "2.7vw";
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

        newOption.addEventListener('click', function(event){
            event.preventDefault();
            storeInformation(newOption.id.replace('option', ''));
        });
    }
}

function displayDateInput(){
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
    submitButton.addEventListener('click', function(event){
        event.preventDefault();
        storeInformation(input.value);
    });

    // Append input and submit button to the form
    dateInput.appendChild(input);
    dateInput.appendChild(submitButton);

    // Append the form to the option container
    optionContainer.appendChild(dateInput);
}

function displayNumberInput(){
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
    submitButton.addEventListener('click', function(event){
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
    document.getElementById('income').addEventListener('input', function() {
        document.querySelector('.submit_input_button').style.display = 'inline-block';
    });
}

// Handles user input on question basis
// CAN BE IMPROVED AND MADE MORE CONSISE
function storeInformation(value){
    const current_question = questions[question_index];
    const id = current_question.question_id;

    switch(id){
        case(1):
            userResponses.objective.situation = current_question.option_values[value];
            break;
        case(2):
            userResponses.persons[0].birthdate = new Date(value);
            break;
        case(3):
            userResponses.persons[0].income = parseFloat(value);
            break;
        case(4):
            if(value == 1){
                // no partner
                userResponses.persons[1].birthdate = null;
                userResponses.persons[1].income = null;
                userResponses.objective.owner = null;
                for(let i = 4; i <= 7; i++){
                    questions[i].ask = "no";
                    console.log("no");
                }
            } else {
                //yes partner
                for(let i = 4; i <= 7; i++){
                    questions[i].ask = "yes";
                }
            }
            break;
        case(5):
            userResponses.persons[1].birthdate = new Date(value);
            break;
        case(6):
            userResponses.persons[1].income = parseFloat(value);
            break;
        case(7):
            userResponses.objective.owner = current_question.option_values[value];
            break;
        case(8):
            userResponses.objective.incomeToInclude = current_question.option_values[value];
            break;
        case(9):
            userResponses.objective.change_mortgage_preference = current_question.option_values[value];
            break;
        case(10):
        case(11):
        case(12):
        case(13):
        case(14):
        case(15):
            if(value == 0){
                userResponses.objective.mortgage_important_features.push(current_question.yes_value);
            } else {
                const indexToRemove = userResponses.objective.mortgage_important_features.indexOf(current_question.yes_value);
                if (indexToRemove !== -1) {
                    userResponses.objective.mortgage_important_features.splice(indexToRemove, 1);
                  }
            }
            break;
        case(16):
            userResponses.objective.partner_pass_away = current_question.option_values[value];
            break;
        case(17):
            userResponses.objective.partner_disabled = current_question.option_values[value];
            break;
        case(18):
            userResponses.objective.objective_unemployed_partner= current_question.option_values[value];
            break;
        case(19):
            userResponses.objective.objective_retired = current_question.option_values[value];
            break;
        case(20):
            userResponses.knowledge_experience.general_mortgage_experience = current_question.option_values[value];
            break;
        case(21):
        case(22):
        case(23):
        case(24):
        case(25):
        case(26):
            if(value == 0){
                userResponses.knowledge_experience.full_familiarity_with_mortgage_types.push(current_question.yes_value);
            } else if(value == 1){
                userResponses.knowledge_experience.limited_familiarity_with_mortgage_types.push(current_question.yes_value);
            } else {
                var indexToRemove = userResponses.knowledge_experience.full_familiarity_with_mortgage_types.indexOf(current_question.yes_value);
                if (indexToRemove !== -1) {
                    userResponses.knowledge_experience.full_familiarity_with_mortgage_types.splice(indexToRemove, 1);
                }
                indexToRemove = userResponses.knowledge_experience.limited_familiarity_with_mortgage_types.indexOf(current_question.yes_value);
                if (indexToRemove !== -1) {
                    userResponses.knowledge_experience.limited_familiarity_with_mortgage_types.splice(indexToRemove, 1);
                }
            }
            break;
        case(27): 
            userResponses.financial_position.income_sufficient_for_lifestyle = current_question.option_values[value];
            break;
        case(28):
            userResponses.financial_position.expect_income_develop = current_question.option_values[value];
            break;
        case(29):
            userResponses.financial_position.max_amount_net_mortgage_costs = parseFloat(value);
            break;
        case(30):
        case(31):
        case(32):
        case(33):
        case(34):
            if(value == 0){
                userResponses.financial_position.saving_goals.push(current_question.yes_value);
            } else {
                const indexToRemove = userResponses.financial_position.saving_goals.indexOf(current_question.yes_value);
                if (indexToRemove !== -1) {
                    userResponses.financial_position.saving_goals.splice(indexToRemove, 1);
                }
            }
            break;
        case(35):
            userResponses.financial_position.saving_contribution = parseFloat(value);
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
                for(let i = 55; i <= 59; i++){
                    questions[i].ask = "no";
                }
                endSurvey();
            } else {
                const indexToRemove = userResponses.risk_appetite.retirement_plan.indexOf(current_question.yes_value);
                if (indexToRemove !== -1) {
                    userResponses.risk_appetite.retirement_plan.splice(indexToRemove, 1);
                }
                for(let i = 55; i <= 59; i++){
                    questions[i].ask = "yes";
                }
            }
            break;
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
}

//add previous button
const previousButton = document.getElementById('previous_button');
previousButton.addEventListener('click', function(event) {
    if(question_index > 0){
        event.preventDefault();
        updateUI(question_index - 1, true);
    } else {
        event.preventDefault();
    }
});

// Initial updateUI call
updateUI(question_index, false);





