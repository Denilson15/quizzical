import blueBlob from '../assets/blueBlob.png'

export default function Footer(props){
    return (
        <footer>
            <img src={blueBlob}  className="blueBlob"/>
            <div className='footer'>
                {props.isChecked && <p>You scored {props.correctCount}/5 correct answers</p>}
                <button className='footer-button' onClick={props.revealAnswers}>{props.isChecked ? "Play again" : "Check answers"}</button>
            </div>
        </footer>
    )
}