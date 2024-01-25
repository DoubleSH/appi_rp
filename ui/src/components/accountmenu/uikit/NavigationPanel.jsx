import React from 'react'
import '../css/content.css'
import ButtonNav from './ButtonNav'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
const NavigationPanel = ({ activePage, onChangePage, panels }) => {

    const navigationPanel = useRef(null)


    useEffect(() => {
        navigationPanel.current.focus()
    }, [])

    return (
        <div className="accountmenu__content__nav" ref={navigationPanel} tabIndex="-1" >
            <div className="content__container">
                <div className="accountmenu__content__nav__items">
                    {panels.map((item, index) => (
                        <div key={`nav-panel-` + index} onClick={() => onChangePage(index)} className={activePage === index ? "accountmenu__content__nav__item_active" : "accountmenu__content__nav__item_unactive"}>
                            <span className={activePage === index ? "accountmenu__content__nav__item__text_active" : "accountmenu__content__nav__item__text_unactive"}>
                            {item.id == 'accmenu-main' ?
                            <div className={activePage === index ? 'img__home__div__icon_active' : 'img__home__div__icon'} style={{paddingRight: '10px'}}/> : 
                            item.id == 'accmenu-property' ?
                            <div className={activePage === index ? 'img__property__div__icon_active' : 'img__property__div__icon'} style={{paddingRight: '10px'}}/> :
                            item.id == 'accmenu-faq' ?
                            <div className={activePage === index ? 'img__faq__div__icon_active' : 'img__faq__div__icon'} style={{paddingRight: '10px'}}/> :
                            item.id == 'accmenu-reports' ?
                            <div className={activePage === index ? 'img__report__div__icon_active' : 'img__report__div__icon'} style={{paddingRight: '10px'}}/> :
                            item.id == 'accmenu-settings' ?
                            <div className={activePage === index ? 'img__settings__div__icon_active' : 'img__settings__div__icon'} style={{paddingRight: '10px'}}/> :
                            <div className={activePage === index ? 'img__quest__div__icon_active' : 'img__quest__div__icon'} style={{paddingRight: '10px'}}/>}
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NavigationPanel