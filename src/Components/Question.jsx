import { decode } from 'html-entities'
import { useState } from 'react'


//create a state array that pushes the button selected to an array when clicked
// we can then use that array to match the correct responses and see if the contents inside the button are correctly matching the response

export default function Question(props){

    const buttonsArray = props.responses.map((res, index) => {
        return <button key={res} 
                className={props.selectedIndex === index ? "response-button selected" : "response-button"} 
                onClick={() => props.handleAnswerButton(props.questionIndex, index)}>
                    {decode(res)}
                </button>
    })

    return(
        <section className="question-response-section">
            <h2>{decode(props.question)}</h2>
            <div className="answers-container">
                {buttonsArray}
            </div>
        </section>
    )
}