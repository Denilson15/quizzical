import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import StartScreen from './Components/StartScreen'
import Question from './Components/Question'

function App() {
  const [gameStart, setGameStarted] = useState(false)
  const [apiResArr, setaApiResArr] = useState([])
  const [correctCount, setCorrectCount] = useState(() => checkCorrectAnswers())


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
          correctAnswer: index.correct_answer,
          correctIndex: index.responses.indexOf(correctAnswer),
          selectedIndex: null
        }
      })
      setaApiResArr(questionResArray)
    })
  }, [])

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
    for(let i; i < apiResArr.length; i++){
      if(apiResArr.correctIndex === selectedIndex)
        count++;
    }
    console.log(count)
    return count;
  }

  console.log(apiResArr)
    const questionsArray = apiResArr.map((data, index) =>{
      return (
        <Question
          question={data.question}
          questionIndex={index}
          responses={data.responses}
          correctAnswer={data.correctAnswer} 
          selectedIndex={data.selectedIndex}
          handleAnswerButton={handleAnswerButton}
        />
      )
    })


  
    console.table(apiResArr[0])

  return (
    <>
      <Header />
      <main>
        <StartScreen handleStartQuiz={handleStartQuiz} gameStart={gameStart}/>
        {gameStart && questionsArray}
      </main >
      <Footer />
    </>
  )
}

export default App
