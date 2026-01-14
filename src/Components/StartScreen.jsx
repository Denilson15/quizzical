export default function StartScreen(props){
    return(
        <section className={props.gameStart ? "hide-start-screen" : "start-screen"} >
            <h1>Quizzical</h1>
            <p>Trivia for fun!</p>
            <button className="start-btn" onClick={props.handleStartQuiz}>Start quiz</button>
        </section>
    )
}