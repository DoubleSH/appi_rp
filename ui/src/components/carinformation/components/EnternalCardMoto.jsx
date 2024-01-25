import React from 'react'
import '../css/enternal_card_moto.css'
//wheels
import Top_wheel from '../icons/enternal_card/top_moto_wheel/wheel_static.svg'
import Top_wheel_great from '../icons/enternal_card/top_moto_wheel/wheel_greate.svg'
import Top_wheel_normal from '../icons/enternal_card/top_moto_wheel/wheel_normal.svg'
import Top_wheel_bad from '../icons/enternal_card/top_moto_wheel/wheel_bad.svg'
import Top_wheel_destroyed from '../icons/enternal_card/top_moto_wheel/wheel_destroyed.svg'
import Bottom_wheel from '../icons/enternal_card/bottom_moto_wheel/wheel_static.svg'
import Bottom_wheel_great from '../icons/enternal_card/bottom_moto_wheel/wheel_greate.svg'
import Bottom_wheel_normal from '../icons/enternal_card/bottom_moto_wheel/wheel_normal.svg'
import Bottom_wheel_bad from '../icons/enternal_card/bottom_moto_wheel/wheel_bad.svg'
import Bottom_wheel_destroyed from '../icons/enternal_card/bottom_moto_wheel/wheel_destroyed.svg'
//brake 
import Brake from '../icons/enternal_card/brake_transmition_moto/bt_static.svg'
import Brake_greate from '../icons/enternal_card/brake_transmition_moto/bt_greate.svg'
import Brake_normal from '../icons/enternal_card/brake_transmition_moto/bt_normal.svg'
import Brake_bad from '../icons/enternal_card/brake_transmition_moto/bt_bad.svg'
import Brake_destroyed from '../icons/enternal_card/brake_transmition_moto/bt_destroyed.svg'
//electronic
import Electronic from '../icons/enternal_card/electronics_moto/electricity_static.svg'
import Electronic_greate from '../icons/enternal_card/electronics_moto/electricity_greate.svg'
import Electronic_normal from '../icons/enternal_card/electronics_moto/electricity_normal.svg'
import Electronic_bad from '../icons/enternal_card/electronics_moto/electricity_bad.svg'
import Electronic_destroyed from '../icons/enternal_card/electronics_moto/electricity_destroyed.svg'
//fuel generator
import Fuel_generator from '../icons/enternal_card/fuel_generator_moto/fuel_static.svg'
import Fuel_generator_greate from '../icons/enternal_card/fuel_generator_moto/fuel_greate.svg'
import Fuel_generator_normal from '../icons/enternal_card/fuel_generator_moto/fuel_normal.svg'
import Fuel_generator_bad from '../icons/enternal_card/fuel_generator_moto/fuel_bad.svg'
import Fuel_generator_destroyed from '../icons/enternal_card/fuel_generator_moto/fuel_destroyed.svg'
//transmition
import Transmition from '../icons/enternal_card/brake_transmition_moto/bt_static.svg'
import Transmition_greate from '../icons/enternal_card/brake_transmition_moto/bt_greate.svg'
import Transmition_normal from '../icons/enternal_card/brake_transmition_moto/bt_normal.svg'
import Transmition_bad from '../icons/enternal_card/brake_transmition_moto/bt_bad.svg'
import Transmition_destroyed from '../icons/enternal_card/brake_transmition_moto/bt_destroyed.svg'
//engine
import Engine from '../icons/enternal_card/engine_moto/engine_static.svg'
import Engine_greate from '../icons/enternal_card/engine_moto/engine_greate.svg'
import Engine_normal from '../icons/enternal_card/engine_moto/engine_normal.svg'
import Engine_bad from '../icons/enternal_card/engine_moto/engine_bad.svg'
import Engine_destroyed from '../icons/enternal_card/engine_moto/engine_destroyed.svg'
//icons
import EngineIcon from '../icons/enternal_card/containers_icons_enternal_items/engine/engine_static.svg'
import EngineIcon_greate from '../icons/enternal_card/containers_icons_enternal_items/engine/engine_greate.svg'
import EngineIcon_normal from '../icons/enternal_card/containers_icons_enternal_items/engine/engine_normal.svg'
import EngineIcon_bad from '../icons/enternal_card/containers_icons_enternal_items/engine/engine_bad.svg'
import TransmitionIcon from '../icons/enternal_card/containers_icons_enternal_items/transmition/transmition_static.svg'
import TransmitionIcon_greate from '../icons/enternal_card/containers_icons_enternal_items/transmition/transmition_greate.svg'
import TransmitionIcon_normal from '../icons/enternal_card/containers_icons_enternal_items/transmition/transmition_normal.svg'
import TransmitionIcon_bad from '../icons/enternal_card/containers_icons_enternal_items/transmition/transmition_bad.svg'
import FuelIcon from '../icons/enternal_card/containers_icons_enternal_items/fuel/fuel_static.svg'
import FuelIcon_greate from '../icons/enternal_card/containers_icons_enternal_items/fuel/fuel_greate.svg'
import FuelIcon_normal from '../icons/enternal_card/containers_icons_enternal_items/fuel/fuel_normal.svg'
import FuelIcon_bad from '../icons/enternal_card/containers_icons_enternal_items/fuel/fuel_bad.svg'
import BrakeIcon from '../icons/enternal_card/containers_icons_enternal_items/brake/brake_static.svg'
import BrakeIcon_greate from '../icons/enternal_card/containers_icons_enternal_items/brake/brake_greate.svg'
import BrakeIcon_normal from '../icons/enternal_card/containers_icons_enternal_items/brake/brake_normal.svg'
import BrakeIcon_bad from '../icons/enternal_card/containers_icons_enternal_items/brake/brake_bad.svg'
import ElectricityIcon from '../icons/enternal_card/containers_icons_enternal_items/electricity/electricity_static.svg'
import ElectricityIcon_greate from '../icons/enternal_card/containers_icons_enternal_items/electricity/electricity_greate.svg'
import ElectricityIcon_normal from '../icons/enternal_card/containers_icons_enternal_items/electricity/electricity_normal.svg'
import ElectricityIcon_bad from '../icons/enternal_card/containers_icons_enternal_items/electricity/electricity_bad.svg'
import WheelIcon from '../icons/enternal_card/containers_icons_enternal_items/wheel_icon.svg'
import Top_wheel_scheme_greate from '../icons/enternal_card/containers_icons_enternal_items/wheels_moto_schemes/top_wheel_greate.svg'
import Top_wheel_scheme_normal from '../icons/enternal_card/containers_icons_enternal_items/wheels_moto_schemes/top_wheel_normal.svg'
import Top_wheel_scheme_bad from '../icons/enternal_card/containers_icons_enternal_items/wheels_moto_schemes/top_wheel_bad.svg'
import Top_wheel_scheme_destroyed from '../icons/enternal_card/containers_icons_enternal_items/wheels_moto_schemes/top_wheel_destroyed.svg'
import Bottom_wheel_scheme_greate from '../icons/enternal_card/containers_icons_enternal_items/wheels_moto_schemes/bottom_wheel_greate.svg'
import Bottom_wheel_scheme_normal from '../icons/enternal_card/containers_icons_enternal_items/wheels_moto_schemes/bottom_wheel_normal.svg'
import Bottom_wheel_scheme_bad from '../icons/enternal_card/containers_icons_enternal_items/wheels_moto_schemes/bottom_wheel_bad.svg'
import Bottom_wheel_scheme_destroyed from '../icons/enternal_card/containers_icons_enternal_items/wheels_moto_schemes/bottom_wheel_destroyed.svg'

const EnternalCardMoto = ({ 
    enternal_cond,
    showElements, 
    show_electronic_funct,
    show_fuel_generator_funct,
    show_transmition_funct,
    show_electronic,
    show_fuel_generator,
    show_transmition,
    show_engine_funct,
    show_engine,
    show_brake_funct,
    show_brake, 
    show_bottom_wheel_moto,
    show_top_wheel_moto,
    show_bottom_wheel_moto_funct,
    show_top_wheel_moto_funct
 }) => {



    return (
        <div className='enternal_card_conteiner_moto'>
            <div className='car_scheme_container_moto'>
                <div className='electronic_moto' onMouseEnter={() => show_electronic_funct()} onMouseLeave={() => show_electronic_funct()}>
                    {show_electronic ?
                        <img src={enternal_cond.electronic === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/electronics_moto/electricity_greate.svg"
                            : enternal_cond.electronic === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/electronics_moto/electricity_normal.svg"
                            : enternal_cond.electronic === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/electronics_moto/electricity_bad.svg"
                            : "https://appi-rp.ru/client/images/interface/carinfo/electronics_moto/electricity_destroyed.svg"} />
                    :
                        <img src={"https://appi-rp.ru/client/images/interface/carinfo/electronics_moto/electricity_static.svg"}/>} 
                </div>
                <div className='brake_moto' onMouseEnter={() => show_brake_funct()} onMouseLeave={() => show_brake_funct()}>
                    {show_brake ?
                        <img src={enternal_cond.brake === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/brake_transmition_moto/bt_greate.svg"
                            : enternal_cond.brake === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/brake_transmition_moto/bt_normal.svg"
                            : enternal_cond.brake === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/brake_transmition_moto/bt_bad.svg"
                            : "https://appi-rp.ru/client/images/interface/carinfo/brake_transmition_moto/bt_destroyed.svg"} />
                    :
                        <img src={"https://appi-rp.ru/client/images/interface/carinfo/brake_transmition_moto/bt_static.svg"}/>} 
                </div>
                <div className='top_wheel_moto' onMouseEnter={() => show_top_wheel_moto_funct()} onMouseLeave={() => show_top_wheel_moto_funct()}>
                    {show_top_wheel_moto ?
                        <img src={enternal_cond.top_wheel_moto === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/top_moto_wheel/wheel_greate.svg"
                            : enternal_cond.top_wheel_moto === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/top_moto_wheel/wheel_normal.svg"
                            : enternal_cond.top_wheel_moto === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/top_moto_wheel/wheel_bad.svg"
                            : "https://appi-rp.ru/client/images/interface/carinfo/top_moto_wheel/wheel_destroyed.svg"} />
                    :
                        <img src={"https://appi-rp.ru/client/images/interface/carinfo/top_moto_wheel/wheel_static.svg"}/>} 
                </div>
                <div className='bottom_wheel_moto' onMouseEnter={() => show_bottom_wheel_moto_funct()} onMouseLeave={() => show_bottom_wheel_moto_funct()}>
                    {show_bottom_wheel_moto ?
                        <img src={enternal_cond.bottom_wheel_moto === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/bottom_moto_wheel/wheel_greate.svg"
                            : enternal_cond.bottom_wheel_moto === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/bottom_moto_wheel/wheel_normal.svg"
                            : enternal_cond.bottom_wheel_moto === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/bottom_moto_wheel/wheel_bad.svg"
                            : "https://appi-rp.ru/client/images/interface/carinfo/bottom_moto_wheel/wheel_destroyed.svg"} />
                    :
                        <img src={"https://appi-rp.ru/client/images/interface/carinfo/bottom_moto_wheel/wheel_static.svg"}/>} 
                </div>
                <div className='fuel_generator_moto' onMouseEnter={() => show_fuel_generator_funct()} onMouseLeave={() => show_fuel_generator_funct()}>
                    {show_fuel_generator ?
                        <img src={enternal_cond.fuel_generator === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/fuel_generator_moto/fuel_greate.svg"
                            : enternal_cond.fuel_generator === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/fuel_generator_moto/fuel_normal.svg"
                            : enternal_cond.fuel_generator === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/fuel_generator_moto/fuel_bad.svg"
                            : "https://appi-rp.ru/client/images/interface/carinfo/fuel_generator_moto/fuel_destroyed.svg"} />
                    :
                        <img src="https://appi-rp.ru/client/images/interface/carinfo/fuel_generator_moto/fuel_static.svg"/>} 
                </div>
                <div className='transmition_moto' onMouseEnter={() => show_transmition_funct()} onMouseLeave={() => show_transmition_funct()}>
                    {show_transmition ?
                        <img src={enternal_cond.transmition === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/brake_transmition_moto/bt_greate.svg" 
                            : enternal_cond.transmition === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/brake_transmition_moto/bt_normal.svg"
                            : enternal_cond.transmition === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/brake_transmition_moto/bt_bad.svg"
                            : "https://appi-rp.ru/client/images/interface/carinfo/brake_transmition_moto/bt_destroyed.svg"} />
                    :
                        <img src="https://appi-rp.ru/client/images/interface/carinfo/brake_transmition_moto/bt_static.svg"/>} 
                </div>
                <div className='engine_moto' onMouseEnter={() => show_engine_funct()} onMouseLeave={() => show_engine_funct()}>
                    {show_engine ?
                        <img src={enternal_cond.engine === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/engine_moto/engine_greate.svg"
                            : enternal_cond.engine === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/engine_moto/engine_normal.svg"
                            : enternal_cond.engine === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/engine_moto/engine_bad.svg"
                            : "https://appi-rp.ru/client/images/interface/carinfo/engine_moto/engine_destroyed.svg"} />
                    :
                        <img src="https://appi-rp.ru/client/images/interface/carinfo/engine_moto/engine_static.svg"/>} 
                </div>
            </div>
            <div className='car_info_blocks_conteiner'>
                <div className='car_info_blocks_conteiner_first_column'>
                    <div className={show_engine ?
                                        enternal_cond.engine === 1 ? 'enternal_items_info_container greate' :
                                        enternal_cond.engine === 2 ? 'enternal_items_info_container normal' :
                                        enternal_cond.engine === 3 ? 'enternal_items_info_container bad' :
                                        'enternal_items_info_container destroyed'
                                    : 'enternal_items_info_container'}>
                        
                        <div className='enternal_items_info_container_header'>
                            <img src={show_engine ?
                                        enternal_cond.engine === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/engine/engine_greate.svg" :
                                        enternal_cond.engine === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/engine/engine_normal.svg" :
                                        enternal_cond.engine === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/engine/engine_bad.svg" :
                                        "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/engine/engine_bad.svg"
                                    : "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/engine/engine_static.svg"}/>
                            <span style={{marginLeft: '15px'}}>Двигатель</span>
                        </div>
                        {show_engine ?
                            <React.Fragment>
                                <div 
                                className='enternal_items_info_state_of_item'
                                style={enternal_cond.engine === 1 ? {color: '#6FCF97'} :
                                       enternal_cond.engine === 2 ? {color: '#F2C94C'} :
                                       enternal_cond.engine === 3 ? {color: '#EB5757'} :
                                       {color: '#EB5757'}}>
                                    <span>
                                        {enternal_cond.engine === 1 ? 'В отличном состоянии' :
                                         enternal_cond.engine === 2 ? 'В нормальном состоянии' :
                                         enternal_cond.engine === 3 ? 'В плохом состоянии' :
                                         'Уничтожен'}
                                    </span>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                            </React.Fragment>
                        }
                        <div className='enternal_items_info_container_text'>
                            <p>Состояние двигателя напрямую влияет на количество попыток, 
                               которое потребуется, чтобы завести машину. При плохом состоянии двигателя, 
                               машина может попросту заглохнуть.
                            </p>
                        </div>
                    </div>
                    <div style={{marginTop: '20px'}} className={show_brake ?
                                        enternal_cond.brake === 1 ? 'enternal_items_info_container greate' :
                                        enternal_cond.brake === 2 ? 'enternal_items_info_container normal' :
                                        enternal_cond.brake === 3 ? 'enternal_items_info_container bad' :
                                        'enternal_items_info_container destroyed'
                                    : 'enternal_items_info_container'}>
                        
                        <div className='enternal_items_info_container_header'>
                            <img src={show_brake ?
                                        enternal_cond.brake === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/brake/brake_greate.svg" :
                                        enternal_cond.brake === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/brake/brake_normal.svg" :
                                        enternal_cond.brake === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/brake/brake_bad.svg" :
                                        "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/brake/brake_bad.svg"
                                    : "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/brake/brake_static.svg"}/>
                            <span style={{marginLeft: '15px'}}>Тормозная система</span>
                        </div>
                        {show_brake ?
                            <React.Fragment>
                                <div 
                                className='enternal_items_info_state_of_item'
                                style={enternal_cond.brake === 1 ? {color: '#6FCF97'} :
                                       enternal_cond.brake === 2 ? {color: '#F2C94C'} :
                                       enternal_cond.brake === 3 ? {color: '#EB5757'} :
                                       {color: '#EB5757'}}>
                                    <span>
                                        {enternal_cond.brake === 1 ? 'В отличном состоянии' :
                                         enternal_cond.brake === 2 ? 'В нормальном состоянии' :
                                         enternal_cond.brake === 3 ? 'В плохом состоянии' :
                                         'Уничтожен'}
                                    </span>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                            </React.Fragment>
                        }
                        <div className='enternal_items_info_container_text'>
                            <p>От состояния тормозной системы в вашем авто зависит как хорошо будут работать тормоза.
                               Если тормозная система будет на износе, то тормоза могут и не сработать.
                            </p>
                        </div>
                    </div>
                    <div style={{marginTop: '20px'}} className={show_electronic ?
                                        enternal_cond.electronic === 1 ? 'enternal_items_info_container greate' :
                                        enternal_cond.electronic === 2 ? 'enternal_items_info_container normal' :
                                        enternal_cond.electronic === 3 ? 'enternal_items_info_container bad' :
                                        'enternal_items_info_container destroyed'
                                    : 'enternal_items_info_container'}>
                        
                        <div className='enternal_items_info_container_header'>
                            <img src={show_electronic ?
                                        enternal_cond.electronic === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/electricity/electricity_greate.svg" :
                                        enternal_cond.electronic === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/electricity/electricity_normal.svg" :
                                        enternal_cond.electronic === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/electricity/electricity_bad.svg" :
                                        "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/electricity/electricity_bad.svg"
                                    : "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/electricity/electricity_static.svg"}/>
                            <span style={{marginLeft: '14px'}}>Электроника</span>
                        </div>
                        {show_electronic ?
                            <React.Fragment>
                                <div 
                                className='enternal_items_info_state_of_item'
                                style={enternal_cond.electronic === 1 ? {color: '#6FCF97'} :
                                       enternal_cond.electronic === 2 ? {color: '#F2C94C'} :
                                       enternal_cond.electronic === 3 ? {color: '#EB5757'} :
                                       {color: '#EB5757'}}>
                                    <span>
                                        {enternal_cond.electronic === 1 ? 'В отличном состоянии' :
                                         enternal_cond.electronic === 2 ? 'В нормальном состоянии' :
                                         enternal_cond.electronic === 3 ? 'В плохом состоянии' :
                                         'Уничтожен'}
                                    </span>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                            </React.Fragment>
                        }
                        <div className='enternal_items_info_container_text'>
                            <p>Электрические сети или просто проводка – соединяет разные электроприборы в машине. 
                                Плохая проводка создает проблемы с фарами, освещением салона, зажиганием и другими системами.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='car_info_blocks_conteiner_second_column'>
                    <div className={show_transmition ?
                                        enternal_cond.transmition === 1 ? 'enternal_items_info_container greate' :
                                        enternal_cond.transmition === 2 ? 'enternal_items_info_container normal' :
                                        enternal_cond.transmition === 3 ? 'enternal_items_info_container bad' :
                                        'enternal_items_info_container destroyed'
                                    : 'enternal_items_info_container'}>
                        
                        <div className='enternal_items_info_container_header'>
                            <img src={show_transmition ?
                                        enternal_cond.transmition === 1 ?"https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/transmition/transmition_greate.svg" :
                                        enternal_cond.transmition === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/transmition/transmition_normal.svg" :
                                        enternal_cond.transmition === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/transmition/transmition_bad.svg" :
                                        "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/transmition/transmition_bad.svg"
                                    : "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/transmition/transmition_static.svg"}/>
                            <span style={{marginLeft: '14px'}}>Трансмиссия</span>
                        </div>
                        {show_transmition ?
                            <React.Fragment>
                                <div 
                                className='enternal_items_info_state_of_item'
                                style={enternal_cond.transmition === 1 ? {color: '#6FCF97'} :
                                       enternal_cond.transmition === 2 ? {color: '#F2C94C'} :
                                       enternal_cond.transmition === 3 ? {color: '#EB5757'} :
                                       {color: '#EB5757'}}>
                                    <span>
                                        {enternal_cond.transmition === 1 ? 'В отличном состоянии' :
                                         enternal_cond.transmition === 2 ? 'В нормальном состоянии' :
                                         enternal_cond.transmition === 3 ? 'В плохом состоянии' :
                                         'Уничтожен'}
                                    </span>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                            </React.Fragment>
                        }
                        <div className='enternal_items_info_container_text'>
                            <p>Это набор элементов и механизмов, которые передают вращение от двигателя к колесам. 
                                В числе элементов – коробка передач. Если её состояние плачевное – замедления скорости не избежать.
                            </p>
                        </div>
                    </div>
                    <div style={{marginTop: '20px'}} className={show_fuel_generator ?
                                        enternal_cond.fuel_generator === 1 ? 'enternal_items_info_container greate' :
                                        enternal_cond.fuel_generator === 2 ? 'enternal_items_info_container normal' :
                                        enternal_cond.fuel_generator === 3 ? 'enternal_items_info_container bad' :
                                        'enternal_items_info_container destroyed'
                                    : 'enternal_items_info_container'}>
                        
                        <div className='enternal_items_info_container_header'>
                            <img src={show_fuel_generator ?
                                        enternal_cond.fuel_generator === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/fuel/fuel_greate.svg" :
                                        enternal_cond.fuel_generator === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/fuel/fuel_normal.svg" :
                                        enternal_cond.fuel_generator === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/fuel/fuel_bad.svg" :
                                        "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/fuel/fuel_bad.svg"
                                    : "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/fuel/fuel_static.svg"}/>
                            <span style={{marginLeft: '14px'}}>Топливная система</span>
                        </div>
                        {show_fuel_generator ?
                            <React.Fragment>
                                <div 
                                className='enternal_items_info_state_of_item'
                                style={enternal_cond.fuel_generator === 1 ? {color: '#6FCF97'} :
                                       enternal_cond.fuel_generator === 2 ? {color: '#F2C94C'} :
                                       enternal_cond.fuel_generator === 3 ? {color: '#EB5757'} :
                                       {color: '#EB5757'}}>
                                    <span>
                                        {enternal_cond.fuel_generator === 1 ? 'В отличном состоянии' :
                                         enternal_cond.fuel_generator === 2 ? 'В нормальном состоянии' :
                                         enternal_cond.fuel_generator === 3 ? 'В плохом состоянии' :
                                         'Уничтожен'}
                                    </span>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                            </React.Fragment>
                        }
                        <div className='enternal_items_info_container_text'>
                            <p>Для работы двигателя необходимо топливо, которое должно в определенные моменты подаваться в цилиндры
                                — эту задачу решает топливная система. Если она не исправна – расход топлива будет больше.
                            </p>
                        </div>
                    </div>
                    <div style={{marginTop: '20px'}} className={
                                    show_top_wheel_moto ?
                                        enternal_cond.top_wheel_moto === 1 ? 'enternal_items_info_container greate' :
                                        enternal_cond.top_wheel_moto === 2 ? 'enternal_items_info_container normal' :
                                        enternal_cond.top_wheel_moto === 3 ? 'enternal_items_info_container bad' :
                                        'enternal_items_info_container destroyed'
                                    : 
                                    show_bottom_wheel_moto ?
                                        enternal_cond.bottom_wheel_moto === 1 ? 'enternal_items_info_container greate' :
                                        enternal_cond.bottom_wheel_moto === 2 ? 'enternal_items_info_container normal' :
                                        enternal_cond.bottom_wheel_moto === 3 ? 'enternal_items_info_container bad' :
                                        'enternal_items_info_container destroyed'
                                    : 
                                        'enternal_items_info_container'}>
                        
                        <div className='enternal_items_info_container_header'>
                            {show_top_wheel_moto ?
                                <React.Fragment>
                                    <span>Переднее колесо</span>
                                </React.Fragment>
                            :
                            show_bottom_wheel_moto ?
                                <React.Fragment>
                                    <span>Заднее колесо</span>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <img src="https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/wheel_icon.svg"/>
                                    <span style={{marginLeft: '14px'}}>Колеса</span>
                                </React.Fragment>}
                        </div>
                        {show_top_wheel_moto ?
                            <React.Fragment>
                                <div 
                                className='enternal_items_info_state_of_item'
                                style={enternal_cond.top_wheel_moto === 1 ? {color: '#6FCF97'} :
                                       enternal_cond.top_wheel_moto === 2 ? {color: '#F2C94C'} :
                                       enternal_cond.top_wheel_moto === 3 ? {color: '#EB5757'} :
                                       {color: '#EB5757'}}>
                                    <span>
                                        {enternal_cond.top_wheel_moto === 1 ? 'В отличном состоянии' :
                                         enternal_cond.top_wheel_moto === 2 ? 'В нормальном состоянии' :
                                         enternal_cond.top_wheel_moto === 3 ? 'В плохом состоянии' :
                                         'Уничтожен'}
                                    </span>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                            </React.Fragment>
                        }
                        {show_bottom_wheel_moto ?
                            <React.Fragment>
                                <div 
                                className='enternal_items_info_state_of_item'
                                style={enternal_cond.bottom_wheel_moto === 1 ? {color: '#6FCF97'} :
                                       enternal_cond.bottom_wheel_moto === 2 ? {color: '#F2C94C'} :
                                       enternal_cond.bottom_wheel_moto === 3 ? {color: '#EB5757'} :
                                       {color: '#EB5757'}}>
                                    <span>
                                        {enternal_cond.bottom_wheel_moto === 1 ? 'В отличном состоянии' :
                                         enternal_cond.bottom_wheel_moto === 2 ? 'В нормальном состоянии' :
                                         enternal_cond.bottom_wheel_moto === 3 ? 'В плохом состоянии' :
                                         'Уничтожен'}
                                    </span>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                            </React.Fragment>
                        }
                        
                        <div className='enternal_items_info_container_text_wheels'>
                            <p>Колесо, являясь элементом ходовой части, связывает автомобиль с дорогой. 
                               От его состояния зависит как часто у вас будут лопаться шины.
                            </p>
                            {show_top_wheel_moto ?
                                <React.Fragment>
                                    <img src=
                                    {
                                    enternal_cond.top_wheel_moto === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/wheels_moto_schemes/top_wheel_greate.svg" :
                                    enternal_cond.top_wheel_moto === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/wheels_moto_schemes/top_wheel_normal.svg" :
                                    enternal_cond.top_wheel_moto === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/wheels_moto_schemes/top_wheel_bad.svg" :
                                    "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/wheels_moto_schemes/top_wheel_destroyed.svg"
                                    }/>
                                </React.Fragment>
                            :
                            show_bottom_wheel_moto ?
                                <React.Fragment>
                                    <img src=
                                    {
                                    enternal_cond.bottom_wheel_moto === 1 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/wheels_moto_schemes/bottom_wheel_greate.svg" :
                                    enternal_cond.bottom_wheel_moto === 2 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/wheels_moto_schemes/bottom_wheel_normal.svg" :
                                    enternal_cond.bottom_wheel_moto === 3 ? "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/wheels_moto_schemes/bottom_wheel_bad.svg" :
                                    "https://appi-rp.ru/client/images/interface/carinfo/containers_icons_enternal_items/wheels_moto_schemes/bottom_wheel_destroyed.svg"
                                    }/>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                </React.Fragment>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnternalCardMoto