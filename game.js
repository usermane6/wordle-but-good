let targetWord = pickWord(),
    guess = "",
    guesses = [],
    tries = 0,
    hasWon = false

const alpha = "abcdefghijklmnopqrstuvwxyz",
    allowedTries = 6;

const gameDiv = document.getElementById("game");

document.addEventListener("keydown", pressKey);

function setUp() {
    for (let rows = 0; rows < allowedTries; rows++) {
        for (let letter = 0; letter < 5; letter++) {
            newTile = document.createElement("div");
            newTile.setAttribute("class", "letterGuess gray");
            newTile.setAttribute("id",`r${rows}l${letter}`);
            gameDiv.appendChild(newTile);
        }
        linebreak = document.createElement("br");
        gameDiv.appendChild(linebreak);
    }
}

function pressKey(event) {
    if (!hasWon && tries < allowedTries) {
        key = event.key;
        if (alpha.includes(key) && guess.length < 5) {
            guess += key;
            showWord(guess, tries)

        } else if (key == "Backspace") {
            guess = guess.slice(0, -1);
            showWord(guess, tries)
            
        } else if (key == "Enter" && guess.length == 5) {
            if (words.includes(guess)) {
                guesses.push(guess);
                showGuesses();
                checkGuesses();
                if (!hasWon && tries < allowedTries) {showWord(guess, tries)}
                tries++
                guess = ""
                if (!hasWon && tries < allowedTries) {targetWord = pickWord()}
                showGuesses();
                checkGuesses();
            } else if (guess.length == 5) {
                for (var i = 0; i < 5; i++) {
                    curTile = document.getElementById(`r${tries}l${i}`)

                    curTile.classList.add("red")
                }
                
                setTimeout(function() {
                    for (var i = 0; i < 5; i++) {
                        curTile = document.getElementById(`r${tries}l${i}`)
                        curTile.classList.remove("red")
                    }
                }, 1000)
            }
        }
    }
}

function showWord(word, row) {
    chars = word.slice("");
    for(let char = 0; char < 5; char++) {
        curTile = document.getElementById(`r${row}l${char}`);
        curTile.innerHTML = chars[char] ? chars[char] : " "
    }
}

function showGuesses() {
    for(let i = 0; i < guesses.length; i++) {
        showWord(guesses[i], i)
    }
}

function checkGuesses() {
    for (let i = 0; i < guesses.length; i++) {
        chars = guesses[i].split("")
        tarChars = targetWord.split("")
        hasWon = guesses[i] == targetWord
        for(let j = 0; j < guesses[i].length; j++) {
            curTile = document.getElementById(`r${i}l${j}`)
            
            curTile.className = ""
            curTile.classList.add("letterGuess")

            if (chars[j] == tarChars[j]) {
                curTile.classList.add("green")
            } else if (tarChars.includes(chars[j])) {
                curTile.classList.add("yellow")
            } else {
                curTile.classList.add("gray")
            }
        }
    }
}

function pickWord() {
    return words[Math.floor(Math.random() * words.length)];
}
