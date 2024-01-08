// List of questions and options we ask the user to generate advice report
const questions = [
    { 
        question_id: 1, 
		ask: "yes", 
		question_type: "options",
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
		ask: "yes", 
		question_type: "dateInput",
        question: 'Enter your date of birth:',
    },
    { 
        question_id: 3, 
		ask: "yes", 
		question_type: "numberInput",
        question: 'Enter your annual income:',
    },
    { 
        question_id: 4, 
		ask: "yes", 
		question_type: "binary",
        question: 'Do you want to take out a mortgage with your partner?', 
        options: [
            'Yes', 
            'No', 
        ],
    },
    { 
        question_id: 5, 
		ask: "yes", 
		question_type: "dateInput",
        question: 'Enter your partners date of birth:',
    },
    { 
        question_id: 6, 
		ask: "yes", 
		question_type: "numberInput",
        question: 'Enter your partners annual income:',
    },
    { 
        question_id: 7, 
		ask: "yes", 
		question_type: "options",
        question: 'Who will be or is the owner of the house?', 
        options: [
            'Me', 
            'My partner', 
            'Me and my partner', 
        ],
        option_values: [
            "partner1",
            "partner2",
            "both"
        ]
    },
    { 
        question_id: 8, 
		ask: "yes", 
		question_type: "options",
        question: 'Which income do you want to include in calculating the responsible mortgage amount?', 
        options: [
            'Only my income', 
            'Only the income of my partner', 
            'Both mine and my partner\'s income', 
        ],
        option_values: [
            "partner1",
            "partner2",
            "both"
        ]
    },
    { 
        question_id: 9, 
		ask: "yes", 
		question_type: "options",
        question: 'Mortgage expenses may vary during the loan term. What would you prefer?', 
        options: [
            'Increasing net mortgage expenses: prefer to start with low initial costs', 
            'Decreasing net mortgage expenses: prefer starting with high initial costs',
            'Stable net mortgage throughout the loan term', 
        ] ,
        option_values: [
            "lowInitialCostIncreasingExpenses",
            "highInitialCostDecreasingExpenses",
            "stableNetMortgageExpenses"
        ]
    },
    { 
        question_id: 10, 
		ask: "yes", 
		question_type: "binary",
        question: 'Do you want the validity period of your quote to be longer than 3 months?', 
        options: [
            'Yes',
            'No'
        ],
        yes_value: "extendedQuoteValidity",
    },
    { 
        question_id: 11, 
		ask: "yes", 
		question_type: "options",
        question: 'If the mortgage intrest rate decreases after signing the quote do you still want to benefit from the lower rate?', 
        options: [
            'Yes', 
            'No', 
        ],
        yes_value: "postSigningRateDecreaseBenefit",
    },
    { 
        question_id: 12, 
		ask: "yes", 
		question_type: "options",
        question: 'Do you want to be able to cancel the mortgege quote free of charge even after signing it?', 
        options: [
            'Yes', 
            'No', 
        ],
        yes_value: "noChargeQuoteCancellation",
    },
    { 
        question_id: 13, 
		ask: "yes", 
		question_type: "options",
        question: 'Do you want to be able to make penalty-free repayments of more than 10% per year?', 
        options: [
            'Yes',
            'No'
        ],
        yes_value: "penaltyFreeRepaymentOver10Percent",
    },
    { 
        question_id: 14, 
		ask: "yes", 
		question_type: "options",
        question: 'Do you want to have the option to transfer the mortgage interest to a future property?', 
        options: [
            'Yes',
            'No'
        ],
        yes_value: "mortgageInterestTransferability",
    },
    { 
        question_id: 15, 
		ask: "yes",
        question_type: "options",
        question: 'Do you want a mortgage that automatically lowers interest rate when making extra repayments?', 
        options: [
            'Yes',
            'No'
        ],
        yes_value: "automaticRateReductionOnRepayment", 
    },
    { 
        question_id: 16, 
		ask: "yes",
        question_type: "options",
        question: 'What is your objective in case your partner passes away during the mortgage term?', 
        options: [
            'I want to continue living in the property without mortgage expenses', 
            'I want to continue living in the property', 
            'I will sell the property', 
        ],
        option_values: [
            "liveWithoutMortgageExpenses",
            "continueLivingInProperty",
            "propertySale"
        ]
    },
    { 
        question_id: 17, 
		ask: "yes",
        question_type: "options",
        question: 'What is your objective in case you or your partner become disabled during the mortgage term?', 
        options: [
            'I want to continue living in the property', 
            'I will sell the property'
        ],
        option_values: [
            "continueLivingInProperty",
            "propertySale"
        ]
    },
    { 
        question_id: 18, 
		ask: "yes",
        question_type: "options",
        question: 'What is your objective in case you or your partner become unenemployed during the mortgage term?', 
        options: [
            'I want to continue living in the property', 
            'I will sell the property', 
        ],
        option_values: [
            "continueLivingInProperty", 
            "propertySale"
        ] 
    },
    { 
        question_id: 19, 
		ask: "yes",
        question_type: "options",
        question: 'What is your objective when you or your partner retire?', 
        options: [
            'I want to continue living in the property', 
            'I will sell the property', 
        ],
        option_values: [
            "continueLivingInProperty", 
            "propertySale"
        ] 
    },
    { 
        question_id: 20, 
		ask: "yes",
        question_type: "options",
        question: 'What is your experience with mortgages?', 
        options: [
            'I have a mortgage and know well what obligations I have entered into', 
            'I have a mortgage but don\'t really know the obligations I have entered into', 
            'I have had a mortgage in the past but not anymore', 
            'I have no experience with taking out a mortgage', 
            'I deal with mortgages in my work', 
        ],
        option_values: [
            "fullCurrentExperiance",
            "noCurrentExperiance",
            "pastExperiance",
            "noExperiance",
            "workRelatedExpereiance"
        ]
    },
    { 
        question_id: 21, 
		ask: "yes",
        question_type: "options",
        question: 'How familiar are you with an Interest-Only type of loan?', 
        options: [
            'Fully familiar', 
            'Limitedly familiar', 
            'Not familiar', 
        ],
        yes_value: "intrestOnlyLoan", 
    },
    { 
        question_id: 22, 
		ask: "yes",
        question_type: "options",
        question: 'How familiar are you with an Annuity loan?', 
        options: [
            'Fully familiar',  
            'Limitedly familiar', 
            'Not familiar',  
        ],
        yes_value: "annuityLoan", 
    },
    { 
        question_id: 23, 
		ask: "yes",
        question_type: "options",
        question: 'How familiar are you with a Bank Savings type of loan?', 
        options: [
            'Fully familiar',   
            'Limitedly familiar', 
            'Not familiar', 
        ],
        yes_value: "bankSavingsLoan",  
    },
    { 
        question_id: 24, 
		ask: "yes",
        question_type: "options",
        question: 'How familiar are you with an Invesments type of loan?', 
        options: [
            'Fully familiar', 
            'Limitedly familiar', 
            'Not familiar', 
        ],
        yes_value: "investmentsLoan", 
    },
    { 
        question_id: 25, 
		ask: "yes",
        question_type: "options",
        question: 'How familiar are you with an Life type of loan?', 
        options: [
            'Fully familiar',
            'Limitedly familiar', 
            'Not familiar', 
        ],
        yes_value: "lifeLoan", 
    },
    { 
        question_id: 26, 
		ask: "yes",
        question_type: "options",
        question: 'How familiar are you with a Linear loan?', 
        options: [
            'Fully familiar',
            'Limitedly familiar', 
            'Not familiar', 
        ],
        yes_value: "linearLoan", 
    },
    { 
        question_id: 27, 
		ask: "yes",
        question_type: "options",
        question: 'To what extent is your current income sufficient for your lifestyle?', 
        options: [
            'My income is more than enough - I can save a large amount',
            'My income is sufficient - I can have limited savings', 
            'My income is just enough - I cannot save any money',
            'My income is inadequate - I am losing money' 
        ],
        option_values: [
            "largeIncome",
            "goodIncome",
            "zeroSavings",
            "insufficientIncome"
        ] 
    },
    { 
        question_id: 28, 
		ask: "yes",
        question_type: "options",
        question: 'How do you expect your income to develop in the following years?', 
        options: [
            'My income will slightly increase',
            'My income will significantly increase', 
            'My income will decrease',
            'My income will remain the same' 
        ],
        option_values: [
            "slightIncrease",
            "significantIncrease",
            "decrease",
            "noChange",
        ] 
    },
    { 
        question_id: 29, 
		ask: "yes", 
		question_type: "numberInput",
        question: 'What is the maximum monthly net mortgage cost you are willing to pay?',
    },
    { 
        question_id: 30, 
		ask: "yes",
        question_type: "options",
        question: 'Do you have a savings goal for a significant rainy-day fund? (at least 6 times the size of the mortgage)', 
        options: [
            'Yes',
            'No'
        ],
        yes_value: "buffer", 
    },
    { 
        question_id: 31, 
		ask: "yes",
        question_type: "options",
        question: 'Do you have a savings goal for vacations and travel?', 
        options: [
            'Yes',
            'No'
        ],
        yes_value: "vacationsTravel", 
    },
    { 
        question_id: 32, 
		ask: "yes",
        question_type: "options",
        question: 'Do you have a savings goal for home maintenance and significant renovations?', 
        options: [
            'Yes',
            'No'
        ],
        yes_value: "renovation", 
    },
    { 
        question_id: 33, 
		ask: "yes",
        question_type: "options",
        question: 'Do you have a savings goal for retirement supplementation?', 
        options: [
            'Yes',
            'No'
        ],
        yes_value: "retirement", 
    },
    { 
        question_id: 34, 
		ask: "yes",
        question_type: "options",
        question: 'Do you have a savings goal for other consumer purchases such as a car?', 
        options: [
            'Yes',
            'No'
        ],
        yes_value: "largePurchases", 
    },
    { 
        question_id: 35, 
		ask: "yes", 
		question_type: "numberInput",
        question: 'What is the amount you are willing to contribute from your current savings as a downpayment to your mortgage?',
    },
];
  
  export default questions;