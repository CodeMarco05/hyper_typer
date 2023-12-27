window.onload = async function () {
    let words = await getRandomWords(50); 

    let display = document.getElementById('wordDisplay');
    let string = '';

    words = Array.from(words)
    
    for (let i = 0; i < words.length; i++) {
        string = string.concat(' ', words[i]); // Use += to concatenate strings
    }
    
    display.textContent = string

    console.log("finished");
}

async function getRandomWords(amount) {
    let words = [];

    let jsonFilePath = "../../data.json";

    try {
        let response = await fetch(jsonFilePath);

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        let data = await response.json();

        // Implement logic for loading random words
        for (let i = 0; i < amount; i++) {
            words.push(data.words[getRandomNumber(0, 2)]); //adapt the number to the elements for the words
        }
    } catch (error) {
        // Handle errors
        console.error('Error loading JSON:', error);
    }

    return words;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
