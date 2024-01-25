import React from 'react'
import '../css/reports.css'
import LineData from '../uikit/LineData'
import StatContainer from '../uikit/StatContainer'
import InfoBlock from '../uikit/InfoBlock'
import ProgressBar from '../uikit/ProgressBar'
import ProgressBarCircle from '../uikit/ProgressBarCircle'
import Card from '../uikit/Card'
import ButtonGps from '../uikit/ButtonGps'
import Button from '../uikit/Button'
import BusinessCard from '../uikit/BusinessCard'
import CarCard from '../uikit/CarCard'
import ReportItemListQuestion from '../uikit/ReportItemListQuestion'
import ReportItemListReport from '../uikit/ReportItemListReport'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const Reports = ({ data, initValue }) => {
    const reportMessage = useRef(null)

    const messagesEndRef = useRef(null)

    const [activeQ, setActiveQ] = useState(0)
    const [activeR, setActiveR] = useState(0)


    const [reportData, setReportData] = useState(initValue ? initValue : {})

    const scrollToBottom = () => {
        try {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
        catch (e) {}
    };
      useEffect(() => scrollToBottom, [reportData])

      useEffect(() => initValue ? initValue.dialog.length > 0 ? messagesEndRef.current.scrollIntoView({ behavior: "smooth" }) : undefined : undefined, [initValue])

    return (
        <React.Fragment>
            <div className="accountmenu__content__cards__item">
                    <div className="accountmenu__content__cards__item__list__reports">
                        <span className="accountmenu__content__cards__item__list__reports__name">Вопросы</span>
                        <div className="accountmenu__content__reports__list accountmenu__scrollable">
                            {data[0].map((item, index) => (
                                <ReportItemListQuestion
                                    status={item.status}
                                    text={item.text}
                                    time={item.time}
                                    number={item.number}
                                    type={0}
                                    key={'reports-ask-'+ index.toString()}
                                    setReportData={() => setReportData(data[0][index])}
                                    setActive={() => setActiveQ(index)}
                                    active={activeQ}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="accountmenu__content__cards__item__list__reports">
                        <span className="accountmenu__content__cards__item__list__reports__name_red">Жалобы</span>
                        <div className="accountmenu__content__reports__list accountmenu__scrollable">
                            {data[1].map((item, index) => (
                                <ReportItemListReport
                                    status={item.status}
                                    text={item.text}
                                    time={item.time}
                                    number={item.number}
                                    type={1}
                                    key={'reports-report-'+ index.toString()}
                                    setReportData={() => setReportData(data[1][index])}
                                    setActive={() => setActiveR(index)}
                                    active={activeR}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
            </div>
            <div className="accountmenu__content__cards__dialog__blitem">
            {reportData.number && (
                <span className="accountmenu__content__dialog__header">{reportData.type === 1 ? `Жалоба № ${reportData.number}` : `Вопрос № ${reportData.number}`}</span>
            )}
            {reportData.number && ( 
               <div className="accountmenu__content__reports__dialog__container">
                    <div className="accountmenu__content__reports__dialog__header">
                        <div className="accountmenu__content__reports__dialog__header__data">
                            <span className="accountmenu__content__reports__dialog__header__time">{`Создан: ${reportData.time}`}</span>
                        </div>
                        {/*<div className="accountmenu__content__reports__dialog__header__buttons">
                            <div className="accountmenu__content__reports__dialog__header__btn">
                                <img src={'https://appi-rp.ru/client/images/mmenu/all/icons/lock.svg'} className="accountmenu__content__reports__dialog__header__icon" />
                                <span className="accountmenu__content__reports__dialog__header__btn__text">закрыть тему</span>
                            </div>
                            <div className="accountmenu__content__reports__dialog__header__btn">
                                <img src={'https://appi-rp.ru/client/images/mmenu/all/icons/delete.svg'} className="accountmenu__content__reports__dialog__header__icon" />
                                <span className="accountmenu__content__reports__dialog__header__btn__text">удалить</span>
                            </div>
                        </div>*/}
                    </div>
                    {/*<span className="accountmenu__content__reports__dialog__header__name">
                        {reportData.name}
                    </span>*/}
                    <div className="accountmenu__content__reports__dialog__content">
                        {reportData.dialog ? reportData.dialog.map((item, index) => (
                            <div key={`report-msg-` + index} ref={messagesEndRef} className={item.type === 0 ? "accountmenu__content__reports__dialog__content__item__lcontainer" : "accountmenu__content__reports__dialog__content__item__rcontainer"}>
                                <div className="accountmenu__content__reports__dialog__content__item__header">
                                    {item.name && (
                                        <span className="accountmenu__content__reports__dialog__content__item__name">
                                            {` ${item.name}`}
                                        </span>
                                    )}
                                    {!item.name && (
                                        <span className="accountmenu__content__reports__dialog__content__item__name" style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                                            {`Вы`}
                                        </span>
                                    )}
                                </div>
                                <span className={item.type === 0 ? "accountmenu__content__reports__dialog__content__item__msg_to" : "accountmenu__content__reports__dialog__content__item__msg_frm"}>
                                    {item.text}
                                </span>
                                <div className='accountmenu__dialog__header_bottom'>
                                    {item.name && (
                                    <span className="accountmenu__content__reports__dialog__content__item__time">
                                        {item.time}
                                    </span>
                                    )}
                                    {!item.name && (
                                    <span className="accountmenu__content__reports__dialog__content__item__time" style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                                        {item.time}
                                    </span>
                                    )}
                                </div>
                            </div>
                        )) : null} 
                    </div>
                    <div className="accountmenu__content__reports__dialog__input">
                        <label style={{width: '82%', fontFamily: 'Gotham Pro Regular', height: '90%', background: 'rgba(217, 217, 217, 0.1)', borderRadius: '5px', marginTop: '30px', height: '60px'}}>
                            <input style={{width: '100%', height: '100%'}} maxlength="200" onBlur={(e) => {
                                try {
                                    mp.trigger('client:mainMenu:sendReportOrAsk:focus', false); // eslint-disable-line
                                }
                                catch (e) {}
                            }} onFocus={(e) => {
                                try {
                                    mp.trigger('client:mainMenu:sendReportOrAsk:focus', true); // eslint-disable-line
                                }
                                catch (e) {}
                            }} onChange={(e) => this.inputChange(e)} ref={reportMessage} type="text" name="name" placeholder="Введите сообщение..." className="accountmenu__report__input" />
                        </label>
                        <div onClick={() => {
                            reportData.dialog.push({type: 0, text: reportMessage.current.value, time: 'Только что'});
                            try {
                                mp.trigger('client:mainMenu:sendReportOrAsk', reportMessage.current.value, reportData.type); // eslint-disable-line
                            }
                            catch (e) {}
                            reportMessage.current.value = '';
                        }}
                        className="accountmenu__content__dialog__push__text_input">
                            Отправить
                        </div>
                    </div>
               </div>
               )}
            </div>
        </React.Fragment>
    )
}

export default Reports