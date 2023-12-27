
let inputField = document.getElementById('inputField')

let words;

inputField.addEventListener('input', async function () { //handles every change in the textfield 
    let inputValue = inputField.value;
    if (inputValue[inputValue.length - 1] == ' ') {
        let validWord = checkValid(inputValue)
        if (validWord) {
            await updateScreen()
        }
    }
})

async function updateScreen() {
    words.shift();
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
        await words.push(data.words[getRandomNumber(0, data.words.length)]);
    } catch (error) {
        // Handle errors
        console.error('Error loading JSON:', error);
    }

    //updates the inputField 
    let inputField = document.getElementById('inputField')
    inputField.value = ''

    let display = document.getElementById('wordDisplay')
    let string = ''
    words = Array.from(words)
    for (let i = 0; i < words.length; i++) {
        string = string.concat(' ', words[i]); // Use += to concatenate strings
    }
    display.textContent = string
}

function checkValid(input) {
    if (input.trim() == words[0]) {
        return true
    }
    return false
}

//this funcition is called when the html document is loaded
window.onload = async function () {
    words = await getRandomWords(8);  //gets random 20 words -> await because it is asynchronous code

    let display = document.getElementById('wordDisplay');
    let string = '';

    words = Array.from(words)

    for (let i = 0; i < words.length; i++) {
        string = string.concat(' ', words[i]); // Use += to concatenate strings
    }

    display.textContent = string
    console.log("Finished Loading")
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
            words.push(data.words[getRandomNumber(0, data.words.length)]);
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
