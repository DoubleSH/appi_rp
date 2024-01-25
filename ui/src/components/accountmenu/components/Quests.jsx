import React from 'react'
import '../css/quests.css'
import Button from '../uikit/Button'
import { useState } from 'react'
import Quest from '../uikit/Quest'
import ButtonOver from '../uikit/ButtonOver'
import ButtonDone from '../uikit/ButtonDone'
import QuestMenu from '../uikit/QuestMenu'
import ButtonGpsQuests from '../uikit/ButtonGpsQuests'
import ButtonWaiting from '../uikit/ButtonWaitinig'

const Quests = ({ quests }) => {

    const [active, setActive] = useState(0)
    const notDoneTasks =  quests[active].tasks.filter(task => task.complete !== 0).length

    return (
        <React.Fragment>
            <div className="accountmenu__content__cards__item">
                <div className="accountmenu__content__cards__container" style={{marginTop: '0%', height: '100%', marginBottom: '0%'}}>
                    <div className="accountmenu__content__cards__container__info">
                        <span className="accountmenu__content__cards__header__name">
                            Квесты
                        </span>
                        <span className="accountmenu__content__cards__header__name_second">
                            начни выполнять задания и получай награды
                        </span>
                    </div>
                    <div className="accountmenu__cards__questlist__container accountmenu__scrollable" style={{height: '93%'}}>
                        {quests.map((item, index) => (
                            <QuestMenu
                                title={item.title}
                                subtitle={item.subtitle}
                                key={index.toString()}
                                index={index}
                                active={active}
                                setActive={() => setActive(index)}
                                done={item.done}
                                doneTasks={quests[index].tasks.filter(task => task.complete == 0).length}
                                notDoneTasks={quests[index].tasks.filter(task => task.complete !== 0).length}
                                amountOfTasks={quests[index].tasks.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="accountmenu__content__cards__blitem__quests_tasks">
                <div className="accountmenu__content__cards__questinfo__container" style={{height: '100%'}}>
                    <div className="accountmenu__content__cards__questinfo__header">
                        <span className="accountmenu__content__cards__questinfo__header__name">
                            {quests[active].title}
                        </span>
                        <span className="accountmenu__content__cards__questinfo__header__count">
                            {notDoneTasks == 1 ? `Осталось ${notDoneTasks} задание` : (notDoneTasks > 1) && (notDoneTasks < 5) ? `Осталось ${notDoneTasks} задания` : `Осталось ${notDoneTasks} заданий`}
                        </span>
                    </div>
                    <div className="accountmenu__content__cards__questinfo__list accountmenu__scrollable">
                        {quests[active].tasks.map((item, index) => (
                            <div className="accountmenu__content__cards__questinfo__list__item" key={index.toString() + quests[active].title}>
                                <div className="accountmenu__content__cards__questinfo__list__item__info">
                                    <span className="accountmenu__content__cards__questinfo__item__name">{`${item.title}`}</span>
                                    <span className="accountmenu__content__cards__questinfo__item__info">{item.text}</span>
                                    <span className="accountmenu__content__cards__questinfo__item__reward" style={item.reward === 'Отсутствует' ? {color: 'rgba(255, 255, 255, 0.75)'} : {color: '#6FCF97'}}>{`Награда: ${item.reward}`}</span>                                        
                                </div>
                                <div className='accountmenu__content__cards__questinfo__list__item__icons'>
                                    {item.complete !== 2 ? <ButtonGpsQuests x={item.x} y={item.y} />
                                    :
                                    ''} 
                                    {item.complete === 2 ? <ButtonOver text="Не доступно" /> : item.complete === 0 ? <ButtonDone /> : <ButtonWaiting />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Quests