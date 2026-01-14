import { useState, useEffect } from 'react'
import './App.css'
import yellowBlob from './assets/yellowBlob.png'
import blueBlob from './assets/blueBlobs.png'
import StartScreen from './Components/StartScreen'
import Question from './Components/Question'

function App() {
  const [gameStart, setGameStarted] = useState(false)
  const [apiResArr, setaApiResArr] = useState([])

  function handleStartQuiz(){
    setGameStarted(prevGameSetting => !prevGameSetting)
    console.log("button clicked")
  }

  function shuffle(array) {
    let currentIndex = array.length;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
    .then(res => res.json())
    .then(data => {
      const questionResArray = data.results.map((index) => {
        return {
        question: index.question,
        responses: shuffle([index.correct_answer, ...index.incorrect_answers]),
        correctAnswer: index.correct_answer
        }
      })
      setaApiResArr(questionResArray)
    })
  }, [])

  console.log(apiResArr)
    const questionsArray = apiResArr.map(data =>{
      return (
        <Question
          question={data.question}
          responses={data.responses}
          correctAnswer={data.correctAnswer} 
        />
      )
    })
  
    console.table(apiResArr[0])

  return (
    <>
      <header>
        <img src={yellowBlob}  className="yellowBlob"/>
      </header>
      <main>
        <StartScreen handleStartQuiz={handleStartQuiz} gameStart={gameStart}/>
        {gameStart && questionsArray}
      </main >
      <footer>
        <img src={blueBlob} className='blueBlob'/>
      </footer>
    </>
  )
}

export default App
