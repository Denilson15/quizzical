import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import StartScreen from './Components/StartScreen'
import Question from './Components/Question'
import blueBlob from './assets/blueBlob.png'

function App() {
  const [gameStart, setGameStarted] = useState(false)
  const [apiResArr, setaApiResArr] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [isGameOver, setGameOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isBufferActive, setIsBufferActive] = useState(false)

  function handleStartQuiz(){
    setGameStarted(prevGameSetting => !prevGameSetting)
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
    setIsLoading(true)
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const questionResArray = data.results.map((index) => {
        const responses = shuffle([index.correct_answer, ...index.incorrect_answers])
        const correctIndex = responses.indexOf(index.correct_answer)
        return {
          question: index.question,
          responses: responses,
          correctAnswer: index.correct_answer,
          correctIndex: correctIndex,
          selectedIndex: null
        }
      })
      setaApiResArr(questionResArray)
      setIsLoading(false)
    })
    .catch(err => console.error(err))
    .finally(() => setIsLoading(false))

  }, [isGameOver])

  function handleAnswerButton(questionIndex, index){
      setaApiResArr(prevArr => {
        return prevArr.map((res, i) => {
          if (questionIndex === i){
            return (
              {...res, selectedIndex: index}
            )
          }
          else return res
        })
      })
  }
  
  function checkCorrectAnswers(){
    let count = 0;
    for(let i = 0; i < apiResArr.length; i++){
      if(apiResArr[i].correctIndex === apiResArr[i].selectedIndex)
        count++;
    }
    
    return count;
  }

  const correctCount = checkCorrectAnswers()

  function revealAnswers(){
    setIsChecked(prevCheck => !prevCheck)
  }

    const questionsArray = apiResArr.map((data, index) =>{
      return (
        <Question
          question={data.question}
          questionIndex={index}
          responses={data.responses}
          correctAnswer={data.correctAnswer} 
          selectedIndex={data.selectedIndex}
          correctIndex={data.correctIndex}
          handleAnswerButton={handleAnswerButton}
          isChecked={isChecked}
        />
      )
    })

    function restartGame(){
      setIsBufferActive(true)
      setGameOver(prevSetting => !prevSetting)
      setIsChecked(false)
      setTimeout(()=>{
        setIsBufferActive(false)
      }, 5000)
    }


  return (
    <>
      <Header />
      <main>
        <StartScreen handleStartQuiz={handleStartQuiz} gameStart={gameStart}/>
        {(gameStart && !isLoading) && questionsArray}
        {(gameStart && isLoading) &&
        <div className="loader-container">
          <div className="spinner"></div>
        </div>}
      </main >
      <img src={blueBlob}  className="blueBlob"/>
      {(gameStart && !isLoading) && 
        <Footer 
          correctCount={correctCount}
          isChecked={isChecked}
          revealAnswers={revealAnswers}
          restartGame={restartGame}
          isBufferActive={isBufferActive}
        />}
    </>
  )
}

export default App
