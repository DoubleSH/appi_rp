import React from 'react'
import '../css/reports.css'
import QuestionActiveIcon from '../icons/reports-dialog-icons/question-active.png'
import QuestionIcon from '../icons/reports-dialog-icons/question.png'
import ReportActiveIcon from '../icons/reports-dialog-icons/report-active.png'
import ReportIcon from '../icons/reports-dialog-icons/report.png'



const ReportItemListQuestion = ({ type, number, time, active, index, text, setReportData, status, setActive }) => {
    return (
        <div onClick={setActive}>
            <div 
            className="accountmenu__content__reports__item__list" 
            onClick={setReportData}
            style={active === index ? {background: 'rgba(255, 255, 255, 0.85)'} : {background: 'rgba(217, 217, 217, 0.1)'}}>
                <div className="accountmenu__content__reports__item__list__header">
                    <img
                        src={active === index ? type === 0 ? QuestionActiveIcon : ReportActiveIcon : type === 1 ? ReportIcon : QuestionIcon}
                        alt=""
                        className={type === 0 ? "accountmenu__content__reports__list__header__icon_ask" : "accountmenu__content__reports__list__header__icon_report"}    
                    />
                    <span 
                    className="accountmenu__content__reports__list__header__num"
                    style={active === index ? {color: 'rgba(30, 30, 30, 0.85)'} : {color: 'rgba(255, 255, 255, 0.85)'}}
                    >
                        {`Запрос №${number}`}
                    </span>
                    <span className={status === 0 ? "accountmenu__content__reports__list__header__status_new" : status === 1 ? "accountmenu__content__reports__list__header__status_clsd" : "accountmenu__content__reports__list__header__status_wait"}>{status === 0 ? "Открыт" : status === 1 ? "Закрыт" : "Ожидание администратора"}</span>
                </div>
                <div className="accountmenu__content__reports__item__list__content">
                    <span 
                    className="accountmenu__content__reports__item__list__content__text"
                    style={active === index ? {color: 'rgba(30, 30, 30, 0.85)'} : {color: 'rgba(255, 255, 255, 0.85)'}}
                    >
                        {text}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ReportItemListQuestion