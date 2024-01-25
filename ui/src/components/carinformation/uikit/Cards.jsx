import React from 'react'
import SpecificationCard from '../components/SpecificationCard'
import EnternalCard2axis from '../components/EnternalCard2axis'
import BodyConditionCard from '../components/BodyConditionCard'
import TuningCard from '../components/TuningCard'
import EnternalCard3axis from '../components/EnternalCard3axis'
import EnternalCardMoto from '../components/EnternalCardMoto'

const Cards = ({ 
    setActivePage, 
    page, 
    factoryInfo, 
    Penalties, 
    techIndicators, 
    lawInfo, 
    tuning, 
    body_cond, 
    enternal_cond, 
    showElements, 
    show_left_1_wheel_funct,  
    show_left_1_wheel,
    show_left_2_wheel_funct,  
    show_left_2_wheel,
    show_left_3_wheel_funct,
    show_left_3_wheel,
    show_right_1_wheel_funct,  
    show_right_1_wheel,
    show_right_2_wheel_funct,  
    show_right_2_wheel,
    show_right_3_wheel_funct,
    show_right_3_wheel,
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
    type, 
    show_top_wheel_moto,
    show_bottom_wheel_moto,
    show_top_wheel_moto_funct,
    show_bottom_wheel_moto_funct



}) => {
    let pageContent = ''
    switch (page.id) {
        case 'carinfo-spec':
            pageContent = <SpecificationCard  factoryInfo={factoryInfo} Penalties={Penalties} techIndicators={techIndicators} lawInfo={lawInfo} />
            break;
        case 'carinfo-enternal-el':
            { type === 0 ?
            pageContent = <EnternalCard2axis
                            enternal_cond={enternal_cond} 
                            showElements={showElements} 
                            show_left_1_wheel_funct={show_left_1_wheel_funct}
                            show_left_1_wheel={show_left_1_wheel}
                            show_left_2_wheel_funct={show_left_2_wheel_funct}
                            show_left_2_wheel={show_left_2_wheel}
                            show_right_1_wheel_funct={show_right_1_wheel_funct}
                            show_right_1_wheel={show_right_1_wheel}
                            show_right_2_wheel_funct={show_right_2_wheel_funct}
                            show_right_2_wheel={show_right_2_wheel}
                            show_electronic_funct={show_electronic_funct}
                            show_fuel_generator_funct={show_fuel_generator_funct}
                            show_transmition_funct={show_transmition_funct}
                            show_electronic={show_electronic}
                            show_fuel_generator={show_fuel_generator}
                            show_transmition={show_transmition}
                            show_engine_funct={show_engine_funct}
                            show_engine={show_engine}
                            show_brake_funct={show_brake_funct}
                            show_brake={show_brake}
                        />
            :
            type === 1 ?
            pageContent = <EnternalCard3axis
                            enternal_cond={enternal_cond} 
                            showElements={showElements} 
                            show_left_1_wheel_funct={show_left_1_wheel_funct}
                            show_left_1_wheel={show_left_1_wheel}
                            show_left_2_wheel_funct={show_left_2_wheel_funct}
                            show_left_2_wheel={show_left_2_wheel}
                            show_left_3_wheel_funct={show_left_3_wheel_funct}
                            show_left_3_wheel={show_left_3_wheel}
                            show_right_1_wheel_funct={show_right_1_wheel_funct}
                            show_right_1_wheel={show_right_1_wheel}
                            show_right_2_wheel_funct={show_right_2_wheel_funct}
                            show_right_2_wheel={show_right_2_wheel}
                            show_right_3_wheel_funct={show_right_3_wheel_funct}
                            show_right_3_wheel={show_right_3_wheel}
                            show_electronic_funct={show_electronic_funct}
                            show_fuel_generator_funct={show_fuel_generator_funct}
                            show_transmition_funct={show_transmition_funct}
                            show_electronic={show_electronic}
                            show_fuel_generator={show_fuel_generator}
                            show_transmition={show_transmition}
                            show_engine_funct={show_engine_funct}
                            show_engine={show_engine}
                            show_brake_funct={show_brake_funct}
                            show_brake={show_brake}
                        />
            :
            pageContent = <EnternalCardMoto
                enternal_cond={enternal_cond} 
                showElements={showElements}
                show_electronic_funct={show_electronic_funct}
                show_fuel_generator_funct={show_fuel_generator_funct}
                show_transmition_funct={show_transmition_funct}
                show_electronic={show_electronic}
                show_fuel_generator={show_fuel_generator}
                show_transmition={show_transmition}
                show_engine_funct={show_engine_funct}
                show_engine={show_engine}
                show_brake_funct={show_brake_funct}
                show_brake={show_brake}
                show_bottom_wheel_moto={show_bottom_wheel_moto}
                show_top_wheel_moto={show_top_wheel_moto}
                show_top_wheel_moto_funct={show_top_wheel_moto_funct}
                show_bottom_wheel_moto_funct={show_bottom_wheel_moto_funct}
                />
            }
            break;
        case 'carinfo-body-condition':
            pageContent = <BodyConditionCard body_cond={body_cond}/>
            break;
        case 'carinfo-tuning':
            pageContent = <TuningCard tuning={tuning}/>
            break;
        default:
            break;
    }
    return (
        <div className="carinfo__content__cards">
            {pageContent}
        </div>
    )
}

export default Cards