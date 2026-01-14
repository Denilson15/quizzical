export default function Question(props){
    const buttonsArray = props.responses.map(res => {
        return <button className="response-button">{res}</button>
    })

    return(
        <section className="question-response-section">
            <h2>{props.question}</h2>
            <div className="response-button-container">
                {buttonsArray}
            </div>
        </section>
    )
}