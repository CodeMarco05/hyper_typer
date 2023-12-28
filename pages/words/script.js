
let inputField = document.getElementById('inputField')

let words;
let testStarted = false

let writtenWords = 0;


function startTime() {
    if (testStarted == false) {
        seconds = 60
        timerFn()
        testStarted = true
    }
}
//(Interruptt) sobald User was eingibt
document.addEventListener('keydown', startTime)

let seconds = 60
function timerFn() {
    updateUI(seconds)
    seconds--;


    if (seconds >= 0) {
        //Methode wird aufgerufen (ist vorgefertigte Methode), timerFn wird mit einer Sek Verzoegerung aufgerufen
        setTimeout(timerFn, 1000)
    } else {
        //verhindert den naechsten Input (kann nichts mehr eingeben)
        document.getElementById('inputField').disabled = true
        //Make so all the stats are loaded
    }
}

function updateUI(seconds) {
    let time = document.getElementById('timer')
    time.textContent = `Zeit: ${seconds}`
}

function resetFn() {
    location.reload()
}

inputField.addEventListener('input', async function () { //handles every change in the textfield 
    let inputValue = inputField.value;
    if (inputValue[inputValue.length - 1] == ' ') { //prueft am Ende des Inputs auf Leerzeichen
        let validWord = checkValid(inputValue)  //ist boolean, prueft ob man richtiges Wort eingegeben hat
        if (validWord) {
            await updateScreen()
            updateWordsCounter()
        }
    }
})

function updateWordsCounter(){
    writtenWords++
    console.log(writtenWords)
}

async function updateScreen() {
    //Array wird geshiftet, erstes Element faellt raus
    words.shift()
    //in Variable wird Pfad reingespeichert
    let jsonFilePath = "../../data.json"

    try {
        //in Variable response wird die json Datei geladen
        let response = await fetch(jsonFilePath)

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        // Parse the JSON response
        let data = await response.json()

        let randomIndex = getRandomNumber(0, data.words.length - 1)
        await words.push(data.words[randomIndex])

        // Implement logic for loading random words
        //await words.push(data.words[getRandomNumber(0, data.words.length - 1)])
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
        string = string.concat(words[i], ' '); // Use = to concatenate strings
    }
    display.textContent = string
}

function checkValid(input) {
    //trim macht fuehrende/nachvolgende Leerzeichen weg
    if (input.trim() == words[0]) {
        return true
    }
    return false
}

//this funcition is called when the html document is loaded
//Methode wird aufgerufen sobald html Dok geladen wird
window.onload = async function () {
    //holt aus json liste woerter raus und speichert in 'words' array
    words = await getRandomWords(8);  //gets random 20 words -> await because it is asynchronous code

    let display = document.getElementById('wordDisplay');
    let string = '';

    words = Array.from(words)

    for (let i = 0; i < words.length; i++) {
        string = string.concat(words[i], ' '); // Use = to concatenate strings
    }
    //Setzen Text -> durchgegangene Woerter
    display.textContent = string

    loadTimer()
}

//setzt Text -> timer
function loadTimer() {
    let timer = document.getElementById('timer')
    timer.textContent = 'Zeit: 60s'
}

async function getRandomWords(amount) {
    let words = [];
    //Verzeichnis zurueck, zurueck, dann json file
    let jsonFilePath = "../../data.json";

    try {
        //oeffnet data.json datei
        let response = await fetch(jsonFilePath);

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        //wandelt Variable so um, damit man mithilfe dieser Variable 
        let data = await response.json()

        // Implement logic for loading random words
        for (let i = 0; i < amount; i++) {
            words.push(data.words[getRandomNumber(0, data.words.length - 1)]);
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
