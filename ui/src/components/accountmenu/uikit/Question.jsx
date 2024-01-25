import React from 'react'
import '../css/faq.css'
import QuestionIcon from '../icons/faq/question.png'
import QuestionIconActive from '../icons/faq/question-active.png'

const Question = ({ active, index, text, setActive }) => {
    return (
        <div
            onClick={setActive}
            className={active === index ? "accountmenu__cards__question__active" : "accountmenu__cards__question"}
        >
            <div className="accountmenu__cards__question__icon__container">
                <img src={active === index ? QuestionIconActive : QuestionIcon} className="accountmenu__cards__question__icon" />
            </div>
            <span className="accountmenu__cards__question__text">
                {text}
            </span>
        </div>
    )
}

export default Question