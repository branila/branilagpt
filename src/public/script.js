const submitButton = document.querySelector('.submit')
const questionInput = document.querySelector('input')
const answerElement = document.querySelector('.answer')

const socket = io()
let charsQueue = ''
let waitingResponse = false
let insertedLetters = 0

inputAnswer(`Ciao, io sono BranilaGPT, un chatbot basato su un modello di intelligenza artificiale creato da Branila Claudiu Stefan, uno studente dell'ITIS Paleocapa. Chiedimi qualsiasi cosa, e io cercherò di risponderti nel modo migliore possibile!`)

async function handleRequest() {
  const question = questionInput.value
  const personality = document.querySelector('select').value

  if (question) {
    questionInput.value = ''
    waitingResponse = true

    socket.emit('question', { question, personality })
    inputAnswer('Sto generando la tua risposta...')
  }
}

socket.on('chunk', chunk => {
  if (waitingResponse) {
    waitingResponse = false
    inputAnswer('')
  }
  
  charsQueue += chunk
})

function inputAnswer(answer) {
  insertedLetters = 0
  answerElement.value = ''
  charsQueue = answer
}

const interval = setInterval(() => {
  if (insertedLetters !== charsQueue.length) {
    answerElement.value += charsQueue[insertedLetters++]
  }
}, 20)

socket.on('error', error => inputAnswer(error))

submitButton.addEventListener('click', handleRequest)

window.addEventListener('keydown', event => {
  if (event.key === 'Enter') handleRequest()
})