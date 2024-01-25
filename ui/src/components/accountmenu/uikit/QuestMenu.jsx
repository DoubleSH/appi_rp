import React from 'react'
import '../css/quests.css'
import ProgressBar from '../uikit/ProgressBar'

const QuestMenu = ({ active, index, title, setActive, subtitle, done, children, empty, hidden, doneTasks, amountOfTasks, notDoneTasks }) => {

    return (!hidden ? (
        <div
            onClick={setActive}
            className={active === index ? "accountmenu__cards__quest__active" : "accountmenu__cards__quest"}
        >
            <div className="accounmenu__cards__quest__data__container">
                <span className="accountmenu__cards__quest__text">
                    {title}
                </span>
                <span className="accountmenu__cards__quest__subtitle" style={amountOfTasks == doneTasks ? {color: '#6FCF97'} : {color: 'rgba(255, 255, 255, 0.5)'}}>
                    {amountOfTasks == doneTasks ? `Завершено! Вы молодец!` : doneTasks == 0 ? `Ещё не начато, а пора бы!` : notDoneTasks == 1 ? `Осталось ${notDoneTasks} задание` : (notDoneTasks > 1) && (notDoneTasks < 5) ? `Осталось ${notDoneTasks} задания` : `Осталось ${notDoneTasks} заданий` }
                </span>
            </div>
            <ProgressBar
            value={doneTasks}
            maxvalue={amountOfTasks}
            />
        </div>
    ) : (<div></div>))
}

export default QuestMenu