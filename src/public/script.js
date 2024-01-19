const socket = io()

const submitButton = document.querySelector('.submit')
const questionInput = document.querySelector('input')
const answerElement = document.querySelector('.answer')

let charsQueue = ''
let waitingResponse = false
let hasServerFinished = true
let insertedLetters = 0

inputAnswer(`Ciao, io sono BranilaGPT, un chatbot basato su un modello di intelligenza artificiale creato da Branila Claudiu Stefan, uno studente dell'ITIS Paleocapa.\n\nChiedimi qualsiasi cosa ed io ti risponderò nel modo migliore possibile, a seconda della personalità scelta.`)

setInterval(() => {
  if (insertedLetters !== charsQueue.length) {
    answerElement.value += charsQueue[insertedLetters++]
  }
}, 20)

async function handleRequest() {
  const question = questionInput.value
  const personality = document.querySelector('select').value

  if (question.trim().length > 3 && hasServerFinished && !waitingResponse) {
    questionInput.value = ''
    waitingResponse = true

    socket.emit('question', { question, personality })
    inputAnswer('Sto generando la tua risposta...')
  }
}

function inputAnswer(answer) {
  insertedLetters = 0
  answerElement.value = ''
  charsQueue = answer
}

socket.on('chunk', chunk => {
  if (waitingResponse) {
    waitingResponse = false
    hasServerFinished = false
    inputAnswer('')
  }
  
  charsQueue += chunk
})

socket.on('end', () => hasServerFinished = true )
socket.on('error', error => inputAnswer(error))

submitButton.addEventListener('click', handleRequest)

window.addEventListener('keydown', event => {
  if (event.key === 'Enter') handleRequest()
})