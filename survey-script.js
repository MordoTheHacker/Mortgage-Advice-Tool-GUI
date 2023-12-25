import questions from './questions.js';

var current_question_id = 0;
const totalNrQuestions = 21;

// Function to control progress bar
function updateProgressBar(){
    if(current_question_id <= totalNrQuestions - 1){
        const progressBar = document.getElementsByClassName('progressive_bar')[0];
        var updateInterval = ((current_question_id + 1) / totalNrQuestions) * 100; 
        progressBar.style.setProperty('--width', updateInterval);
    }
}

//control question flow
function updateUI(current_question_id_pass) {
    current_question_id = current_question_id_pass;
    const questionTitle = document.querySelector('#Question_Title span');
    const optionContainer = document.getElementById('Option_Container');
    //Update progress bar
    updateProgressBar();
    // Display Question Title
    displayQuestionTitle(questions[current_question_id].question);

    // Display Question options
    displayQuestionOptions(questions[current_question_id].options, current_question_id);
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
function displayQuestionOptions(options, current_question_id) {
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

        newOption.addEventListener('click', function () {
            event.preventDefault();
            updateUI(current_question_id + 1);
        });
    }
}

// Initial updateUI call
const previousButton = document.getElementById('previous_button');
previousButton.addEventListener('click', function() {
    if(current_question_id > 0){
        event.preventDefault();
        updateUI(current_question_id - 1);
    } else {
        event.preventDefault();
    }
});

updateUI(current_question_id);





