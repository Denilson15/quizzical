import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import StartScreen from './Components/StartScreen'
import Question from './Components/Question'

function App() {
  const [gameStart, setGameStarted] = useState(false)
  const [apiResArr, setaApiResArr] = useState([])
  const [isChecked, setIsChecked] = useState(false)

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
    for(let i = 0; i < apiResArr.length; i++){
      if(apiResArr[i].correctIndex === apiResArr[i].selectedIndex)
        count++;
    }
    
    return count;
  }

  const correctCount = checkCorrectAnswers()

  function revealAnswers(){
    setIsChecked(prevCheck => !prevCheck)
    for(let i = 0; i < apiResArr.length; i++){
      if(apiResArr[i].correctIndex === apiResArr[i].selectedIndex){
        console.log("this selection is correct")
      }
      else{
        console.log("this seletion is wrong")
      }
    }
  }

    const questionsArray = apiResArr.map((data, index) =>{
      return (
        <Question
          question={data.question}
          questionIndex={index}
          responses={data.responses}
          correctAnswer={data.correctAnswer} 
          selectedIndex={data.selectedIndex}
          handleAnswerButton={handleAnswerButton}
          isChecked={isChecked}
        />
      )
    })


  return (
    <>
      <Header />
      <main>
        <StartScreen handleStartQuiz={handleStartQuiz} gameStart={gameStart}/>
        {gameStart && questionsArray}
      </main >
      {gameStart && 
        <Footer 
          correctCount={correctCount}
          isChecked={isChecked}
          revealAnswers={revealAnswers}
        />}
    </>
  )
}

export default App
