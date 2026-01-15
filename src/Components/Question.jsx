import { decode } from 'html-entities'
import { useState } from 'react'


//create a state array that pushes the button selected to an array when clicked
// we can then use that array to match the correct responses and see if the contents inside the button are correctly matching the response

export default function Question(props){

    function assignClassName(index){
        if(props.isChecked && props.selectedIndex === index){
            return "response-button correct"
        }
        else if(props.isChecked && props.index !== index){
            return "response-button incorrect"
        }
        else if(props.isChecked){
            return "response-button transparent"
        }
        else if(props.selectedIndex === index){
            return "response-button selected"
        }
        else return "response-button"
    }

    const buttonsArray = props.responses.map((res, index) => {
        return <button key={res} 
                    className={assignClassName(index)} 
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