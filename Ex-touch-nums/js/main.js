'use strict'
var gSize = 16
var gNumbersToTouch = makeNumbers(gSize)
var gBoard = makeBoard(gNumbersToTouch)
var gNextNumber = 1
var gStartTime
var gIntervalId
var timeToShow

function init() {
    renderBoard(gBoard)
    renderNextNumber(gNextNumber)
}
function changeDifficulty(elNumber) {
    elNumber.querySelector('span').innerText = 'V'
    gSize = +elNumber.innerText.substring(0, 2)
    gNumbersToTouch = makeNumbers(gSize)
    gBoard = makeBoard(gNumbersToTouch)
    renderBoard(gBoard)
    clearInterval(gIntervalId)
    gIntervalId = null
    document.querySelector('.timer').innerText = 0
    gNextNumber = 1
    renderNextNumber(gNextNumber)

}
function renderNextNumber(number) {
    var elNextNumber = document.querySelector('.next-num span')
    elNextNumber.innerText = number




}
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            strHTML += `<td><button class="cell" onclick="onCellClicked(this,${i},${j})">${board[i][j]}</button></td>`

            if (j === board.length - 1) {
                strHTML += '</tr>'
            }
        }
    }
    var elTable = document.querySelector('table tbody')
    elTable.innerHTML = strHTML


}
function updateTimer() {
    var elTimer = document.querySelector('.timer')
    var currentTime = new Date()
    timeToShow = millisToSeconds(currentTime - gStartTime)
    elTimer.innerText = timeToShow



}
function onCellClicked(elBtn, rIdx, cIdx) {
    if (+elBtn.innerText === gNextNumber && +elBtn.innerText === gNumbersToTouch.length) {
        clearInterval(gIntervalId)
        gIntervalId = null
    } //clearInterval() victory message sending the time
    if (+elBtn.innerText === 1) {

        gStartTime = new Date()
        gIntervalId = setInterval(updateTimer, 1)
    }
    if (+elBtn.innerText === gNextNumber) {
        gNextNumber++
        elBtn.style.backgroundColor = 'red'
        elBtn.style.opacity = 0.5
        renderNextNumber(gNextNumber)

    }

}

function makeBoard(numbers) {
    numbers = numbers.slice()
    shuffle(numbers)
    var numbersMat = []
    var counter = 0
    for (var i = 0; i < numbers.length ** 0.5; i++) {
        numbersMat.push([])
        for (var j = 0; j < numbers.length ** 0.5; j++) {
            numbersMat[i][j] = numbers[counter]
            counter++
        }
    }
    return numbersMat
}
function makeNumbers(size) {
    var numbers = []
    for (var i = 0; i < size; i++) {
        numbers.push(i + 1)
    }
    return numbers
}
function millisToSeconds(millis) {
    var seconds = Math.floor(millis / 1000)
    var milliseconds = (millis > 1000) ? millis % 1000 : millis
    return seconds + '.' + milliseconds
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}