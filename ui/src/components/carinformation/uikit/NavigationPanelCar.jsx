import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import '../css/navcarinfo.css'
import ProgressBar from "@ramonak/react-progress-bar";

const NavigationPanel = ({ activePage, onChangePage, panels, oil, battery_info, mileage }) => {

    const navigationPanelCar = useRef(null)



    useEffect(() => {
        navigationPanelCar.current.focus()
    }, [])

    return (
        <div className="carinfo__content__nav" ref={navigationPanelCar} tabIndex="-1" >
            <div className="carinfo__container">
                <div className="carinfo__content__nav__items">
                    {panels.map((item, index) => (
                        <div key={`car-info-nav-panel-` + index} onClick={() => onChangePage(index)} className={activePage === index ? "carinfo__content__nav__item activenav" : "carinfo__content__nav__item unactivenav"}>
                            <span className={activePage === index ? "carinfo__content__nav__item__text_active" : "carinfo__content__nav__item__text_unactive"}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
                {activePage === 1 ?
                    <React.Fragment>
                        <div className='carinfo_nav_item_oil_battery_mileage_container'>
                            <div className='nav_item_battery_block' style={battery_info <= 25 ? {background: 'rgba(235, 87, 87, 0.15)'} : battery_info <= 50 ? {background: 'rgba(242, 201, 76, 0.15)'} : {background: 'rgba(255, 255, 255, 0.1)'}}>
                                <div className='nav_item_battery_block_header'>
                                    <img src="https://appi-rp.ru/client/images/interface/carinfo/battery_icon.svg"/>
                                    <span className='nav_item_block_title'>Аккумулятор</span>
                                    <span className='nav_item_block_value'
                                    style={battery_info <= 25 ? {color: '#EB5757'} : battery_info <= 50 ? {color: '#F2C94C'} : {color: 'rgba(255, 255, 255, 0.5)'}}>
                                        {`${battery_info}%`}
                                    </span>
                                </div>
                                <ProgressBar
                                    completed={battery_info}
                                    maxCompleted={100}
                                    className={"wrapper_bar_car_info"}
                                    customLabel=" "
                                    width="100%"
                                    height="5px"
                                    baseBgColor="rgba(255, 255, 255, 0.15)"
                                    bgColor={battery_info <= 50 ? "#F2C94C" : battery_info <= 25 ? "#EB5757" : "#FFFFFF"}
                                />
                            </div>
                            <div className='nav_item_oil_block' style={oil <= 25 ? {background: 'rgba(235, 87, 87, 0.15)'} : oil <= 50 ? {background: 'rgba(242, 201, 76, 0.15)'} : {background: 'rgba(255, 255, 255, 0.1)'}}>
                                <div className='nav_item_battery_block_header'>
                                    <img src="https://appi-rp.ru/client/images/interface/carinfo/oil_icon.svg"/>
                                    <span className='nav_item_block_title'>Масло</span>
                                    <span 
                                    className='nav_item_block_value'
                                    style={oil <= 25 ? {color: '#EB5757'} : oil <= 50 ? {color: '#F2C94C'} : {color: 'rgba(255, 255, 255, 0.5)'}}
                                    >
                                        {oil === 0 ? 'Закончилось' : `${oil}%`}
                                    </span>
                                </div>
                                <ProgressBar
                                    completed={oil}
                                    maxCompleted={100}
                                    className={"wrapper_bar_car_info"}
                                    customLabel=" "
                                    width="100%"
                                    height="5px"
                                    baseBgColor="rgba(255, 255, 255, 0.15)"
                                    bgColor={oil <= 25 ? "#EB5757" : oil <= 50 ? "#F2C94C" : "#FFFFFF"}
                                />
                            </div>
                            <div className='nav_item_mileage_block'>
                                <div className='nav_item_battery_block_header'>
                                    <img src="https://appi-rp.ru/client/images/interface/carinfo/mileage_icon.svg"/>
                                    <span className='nav_item_block_title'>Пробег</span>
                                    <span className='nav_item_block_value' style={{color: 'rgba(255, 255, 255, 0.5)'}}>{`${mileage.toLocaleString()} км`}</span>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                :
                    <React.Fragment></React.Fragment>}
            </div>
        </div>
    )
}

export default NavigationPanel