

export default function Footer({isChecked, correctCount, revealAnswers, restartGame, isBufferActive}){
    function setButtonText(){
        if(isChecked && isBufferActive){
            return "Loading..."
        }
        else if(isChecked){
            return "Play again"
        }
        else return "Check answers"
    }
    return (
        <footer>
            {isChecked && <p>You scored {correctCount}/5 correct answers</p>}
            <button 
                className={isChecked && isBufferActive ? "buffer" : ""} 
                onClick={isChecked ? restartGame : revealAnswers}
                disabled={isChecked && isBufferActive}
            >
                {setButtonText()}
            </button>
        </footer>
    )
}