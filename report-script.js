const textContainer = document.getElementsByClassName("info")[0];

// Retrieve the value from localStorage
const storedUserResponses = localStorage.getItem('userResponses');

// Parse the JSON string back to an object
const userResponses = JSON.parse(storedUserResponses);

// Use the value as needed
console.log('User Responses:', userResponses);