// List of questions and options we ask the user to generate advice report
const questions = [
    { 
        question_id: 1,
        question: 'Which of the following situations apply to you?', 
        options: [
            'I want to buy a new house', 
            'I want to renovate my house', 
            'I want to refinance my mortgage', 
            'I want to evaluate my current situation', 
            'I want to buy a new house that needs renovating', 
            'My partner and I are seperating and I want to continue living in my current house'
        ] ,
        option_values: [
            "existingHousePurchase",
            "houseRenovation",
            "mortgageRefinance",
            "currentSituationEvaluation",
            "newConstructionHousePurchase",
            "postSeperationHouseContinuance"
        ]
    },
    { 
        question_id: 2,
        question: 'Who will be or is the owner of the house?', 
        options: [
            'Me', 
            'My partner', 
            'Me and my partner', 
        ] 
    },
    { 
        question_id: 3,
        question: 'Which income do you want to include in calculating the responsible mortgage amount?', 
        options: [
            'Only my income', 
            'Only the income of my partner', 
            'Both mine and my partner\'s income', 
        ] 
    },
    { 
        question_id: 4,
        question: 'Mortgage expenses may vary during the loan term. What would you prefer?', 
        options: [
            'Increasing net mortgage expenses: prefer to start with low initial costs', 
            'Decreasing net mortgage expenses: prefer starting with high initial costs',
            'Stable net mortgage throughout the loan term', 
        ] 
    },
    { 
        question_id: 5,
        question: 'Do you want the validity period of your quote to be longer than 3 months?', 
        options: [
            'Yes',
            'No'
        ] 
    },
    { 
        question_id: 6,
        question: 'If the mortgage intrest rate decreases after signing the quote do you still want to benefit from the lower rate?', 
        options: [
            'Yes', 
            'No', 
        ] 
    },
    { 
        question_id: 7,
        question: 'Do you want to be able to cancel the mortgege quote free of charge even after signing it?', 
        options: [
            'Yes', 
            'No', 
        ] 
    },
    { 
        question_id: 8,
        question: 'Do you want to be able to make penalty-free repayments of more than 10% per year?', 
        options: [
            'Yes',
            'No'
        ] 
    },
    { 
        question_id: 9,
        question: 'Do you want to have the option to transfer the mortgage interest to a future property?', 
        options: [
            'Yes',
            'No'
        ] 
    },
    { 
        question_id: 10,
        question: 'Do you want a mortgage that automatically lowers interest rate when making extra repayments?', 
        options: [
            'Yes',
            'No'
        ] 
    },
    { 
        question_id: 11,
        question: 'What is your objective in case your partner passes away during the mortgage term?', 
        options: [
            'I want to continue living in the property without mortgage expenses', 
            'I want to continue living in the property', 
            'I will sell the property', 
        ] 
    },
    { 
        question_id: 12,
        question: 'What is your objective in case you or your partner become disabled during the mortgage term?', 
        options: [
            'I want to continue living in the property', 
            'I will sell the property', 
            'Already have dissability'
        ] 
    },
    { 
        question_id: 13,
        question: 'What is your objective in case you or your partner become unenemployed during the mortgage term?', 
        options: [
            'I want to continue living in the property', 
            'I will sell the property', 
            'Already unemployed'
        ] 
    },
    { 
        question_id: 14,
        question: 'What is your objective when you or your partner retire?', 
        options: [
            'I want to continue living in the property', 
            'I will sell the property', 
            'Already retired',
            'Alleen mijn inkomen',
            'Alleen het inkomen van mijn partner',
            'Zowel het inkomen van mijn partner als van mij'
        ] 
    },
    { 
        question_id: 15,
        question: 'What is your experience with mortgages?', 
        options: [
            'I have a mortgage and know well what obligations I have entered into', 
            'I have a mortgage but don\'t really know the obligations I have entered into', 
            'I have had a mortgage in the past but not anymore', 
            'I have no experience with taking out a mortgage', 
            'I deal with mortgages in my work', 
        ] 
    },
    { 
        question_id: 16,
        question: 'How familiar are you with an Interest-Only type of loan?', 
        options: [
            'Not familiar', 
            'Limitedly familiar', 
            'Fully familiar', 
        ] 
    },
    { 
        question_id: 17,
        question: 'How familiar are you with an Annuity loan?', 
        options: [
            'Not familiar', 
            'Limitedly familiar', 
            'Fully familiar', 
        ] 
    },
    { 
        question_id: 18,
        question: 'How familiar are you with a Bank svaings type of loan?', 
        options: [
            'Not familiar', 
            'Limitedly familiar', 
            'Fully familiar', 
        ] 
    },
    { 
        question_id: 19,
        question: 'How familiar are you with an Invesments type of loan?', 
        options: [
            'Not familiar', 
            'Limitedly familiar', 
            'Fully familiar', 
        ] 
    },
    { 
        question_id: 20,
        question: 'How familiar are you with an Life type of loan?', 
        options: [
            'Not familiar', 
            'Limitedly familiar', 
            'Fully familiar', 
        ] 
    },
    { 
        question_id: 21,
        question: 'How familiar are you with a Linear loan?', 
        options: [
            'Not familiar', 
            'Limitedly familiar', 
            'Fully familiar', 
        ] 
    },
    { 
        question_id: 1,
        question: 'Which of the following situations apply to you?', 
        options: [
            'I want to buy a new house', 
            'I want to renovate my house', 
            'I want to refinance my mortgage', 
            'I want to evaluate my current situation', 
            'I want to buy a new house that needs renovating', 
            'My partner and I are seperating and I want to continue living in my current house'
        ] 
    },
    { 
        question_id: 1,
        question: 'Which of the following situations apply to you?', 
        options: [
            'I want to buy a new house', 
            'I want to renovate my house', 
            'I want to refinance my mortgage', 
            'I want to evaluate my current situation', 
            'I want to buy a new house that needs renovating', 
            'My partner and I are seperating and I want to continue living in my current house'
        ] 
    },
    { 
        question_id: 1,
        question: 'Which of the following situations apply to you?', 
        options: [
            'I want to buy a new house', 
            'I want to renovate my house', 
            'I want to refinance my mortgage', 
            'I want to evaluate my current situation', 
            'I want to buy a new house that needs renovating', 
            'My partner and I are seperating and I want to continue living in my current house'
        ] 
    },
];
  
  export default questions;