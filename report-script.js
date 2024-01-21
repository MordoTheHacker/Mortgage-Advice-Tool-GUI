async function pingAdviceReportGenerator(){
    // inference engine API ping
    const apiUrl = 'https://ktp-group7-production.up.railway.app/report'; // put link to hosted api server

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

        // Get the PDF content as a blob
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Display PDF in an iframe
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.width = '100%';
        iframe.height = '600px';

        // Append the iframe to the desired container in your HTML
        const container = document.getElementById('report'); 
        container.appendChild(iframe);

        // Clean up URL object after use
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Error:', error);
    }
}

//ENTRY POINT

// Retrieve the value from localStorage
const storedUserResponses = localStorage.getItem('userResponses');

// Parse the JSON string back to an object
const userResponses = JSON.parse(storedUserResponses);

// Use the value as needed
console.log('User Responses:', userResponses);

pingAdviceReportGenerator();
