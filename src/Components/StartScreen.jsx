export default function StartScreen({handleStartQuiz}){
    return(
        <section className={"start-screen"} >
            <h1>Quizzical</h1>
            <p>Trivia for fun!</p>
            <button className="start-btn" onClick={handleStartQuiz}>Start quiz</button>
        </section>
    )
}