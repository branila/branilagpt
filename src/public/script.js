const submitButton = document.querySelector('.submit')
const answerElement = document.querySelector('.answer')

answerElement.value = ''
smoothAnswerInsertion(`Ciao, io sono BranilaGPT, un chatbot basato su un modello di intelligenza artificiale creato dallo studente dell'ITIS Paleocapa Branila Claudiu Stefan. Chiedimi qualsiasi cosa, e io cercherò di risponderti nel modo migliore possibile!`)

async function handleRequest() {
  const question = document.querySelector('input').value

  if (question) {
    answerElement.value = ''
    document.querySelector('input').value = ''
    smoothAnswerInsertion('Sto generando la tua risposta...')

    try {
      let answer = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      })

      if (answer.error) {
        throw new Error(answer.error)
      }

      answer = (await answer.json()).message.content
      
      smoothAnswerInsertion(answer)
    } catch (error) {
      smoothAnswerInsertion(`Qualcosa è andato storto, riprova più tardi!\n\n${error}`)
    }
  }
}

function smoothAnswerInsertion(answer) {
  let insertedLetters = 0
  answerElement.value = ''

  const interval = setInterval(() => {
    answerElement.value += answer[insertedLetters++]

    if (insertedLetters === answer.length) {
      clearInterval(interval)
    }
  }, 20)
}

submitButton.addEventListener('click', handleRequest)
window.addEventListener('keydown', event => {
  if (event.key === 'Enter') handleRequest()
})
