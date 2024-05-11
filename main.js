initCatRow()
initBoard()

document.querySelector('button').addEventListener('click', buildCategories)

function initCatRow () {
    let catRow = document.getElementById('category-row')

    for(let i = 0; i < 6; i++){
        let box = document.createElement('div')
        box.className = 'clue-box category-box'
        catRow.appendChild(box)
    }
}

function initBoard () {
    let board = document.getEelementById('clue-board')

    for(let i = 0; i < 5; i++){
        let row = document.createElement('div')
        let boxValue = 200 * (i + 1)
        row.className = 'clue-row'

        for(let j = 0; j < 6; j++) {
            let box = document.createElement('div')
            box.className = 'clue-box'
            box.textContent = '$' + boxValue
            box.addEventListener('click', getClue, false)
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function randInt() {
    return Math.floor(Match.random() * (81418) + 1)
}

let catArray = []


function buildCategories() {
    const fetchReq1 = fetch (
        'https://jservice.io/api/category?&id${randInt()}'
    ).then((res) => res.json)

    const fetchReq2 = fetch (
        'https://jservice.io/api/category?&id${randInt()}'
    ).then((res) => res.json)

    const fetchReq3 = fetch (
        'https://jservice.io/api/category?&id${randInt()}'
    ).then((res) => res.json)

    const fetchReq4 = fetch (
        'https://jservice.io/api/category?&id${randInt()}'
    ).then((res) => res.json)

    const fetchReq5 = fetch (
        'https://jservice.io/api/category?&id${randInt()}'
    ).then((res) => res.json)

    const fetchReq6 = fetch (
        'https://jservice.io/api/category?&id${randInt()}'
    ).then((res) => res.json)

    const allData = promise.all(fetchReq1, fetchReq2, fetchReq3, fetchReq4, fetchReq5, fetchReq6)
        
    allData.then((res) =>{
        catArray = res
        setCategories(catArray)
    })
    
}

function setCategories(catArray) {
    let element = document.getEelementById('category-row')
        let children = element.children;
        for(let i = 0; i < children.length; i++) {
            children[i].innerHTML = catArray[i].title
        }
}


function getClue (event) {
    let child = event.currentTarget
    child.classList.add('clicked-box')
    let boxValue = child.innerHTML.slice(1)
    let parent = child.parentNode
    let index = Array.prototype.findIndex.call(parent.children, (c) => c === child)
    let cluesList = catArray[index].clues
    let clue = cluesList.find(obj => {
        return obj.value == boxValue
    })
    
    showQuestion(clue, child, boxValue)
    
}

function showQuestion(clue, target, boxValue ){
    let userAnswer = promt(clue.question).toLowercase()
    let correctAnswer = clue.answer.toLowercase().replace(/<\?[^>]+(>|%)/g, "")
    let possiblePoints = +(boxValue)
    target.innerHTML = clue.answer
    target.removeEventListener('click', getClue, false)
    awardPoints(checkAnswer, confirmAnswer, possiblePoints)
}

function evaluateAnswer() {
    let checkAnswer = (userAnswer == correctAnswer) ? 'correct' : 'incorrect'
    let confirmAnswer = 
        confirm('For $${possiblePoints}, you answered "${userAnswer}", and the correct answer was "${correctAnswer}".Your answer appears to be ${checkAnswer}. Click OK to accept or or Cancel if the answer was not properly evaluated.')
        awardPoints(checkAnswer, confirmAnswer, possiblePoints)
}


function awardPoints(checkAnswer, confirmAnswer, possiblePoints) {
    if (!(checkAnswer == 'incorrect' && confirmAnswer == true)) {
        let target = document.getElementById('score')
        let currentScore = +(target.innerText)
        currentScore += possiblePoints
        target.innerText = currentScore
    } else {
        alert ('No points awarded')
    }
}

function resetBoard() {
    let clueParent = document.getElementById('clue-baord')
    while(clueParent.firstChild) {
        clueParent.removeChild(clueParent.firstChild)
    }
    let catParent = document.getElementById('category-row')
    while(catParent.firstChild) {
        catParent.removeChild(catParent.firstChild)
    }
    document.getElementById('score').innerText = 0
    initBoard()
    initCatRow()
}




   