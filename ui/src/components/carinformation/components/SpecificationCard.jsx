import React from 'react'
import '../css/specification_card.css'
import SpecCardInfo from '../uikit/SpecCardInfo'

const SpecificationCard = ({ factoryInfo, Penalties, techIndicators, lawInfo }) => {

    return (
        <React.Fragment>
           <div className='spec_card_conteiner scrollable_menu'>
                <div className='spec_card_factory_info_penalties_block'>
                    <div className='spec_card__factory_info_block'>
                        <div className='spec_card__factory_info_header'>
                            <span className='spec_card__header_title'>
                                Заводская информация
                            </span>
                        </div>
                        <div className="spec_card__tech_info_items_container">
                            {factoryInfo.map((item, index) => (
                                <div className='spec_card_info_container' key={index.toString()}>
                                    <span className='spec_card_info_title'>
                                        {item.title}
                                    </span>
                                    <span className='spec_card_info_text'>
                                        {item.subtitle}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='spec_card__penalties_block'>
                        <div className='spec_card__penalties_header'>
                            <span className='spec_card__header_title'>
                                Штрафы
                            </span>                         
                        </div>
                        <div className="spec_card__penalties_items_container">
                        {Penalties.map((item, index) => (
                                <div className={item.paid ? 'spec_card_penalties_container paid' : 'spec_card_penalties_container notpaid'} key={index.toString()}>
                                    <div className='spec_card_penalties_info'>
                                        <span className='spec_card_penalties_info_title'>{item.title}</span>
                                        <span className='spec_card_penalties_info_date'>{item.date}</span>
                                        <span className='spec_card_penalties_info_author'>{item.author}</span>
                                    </div>
                                    <div className='spec_card_penalties_text_amount'>
                                        <span className='spec_card_penalties_text_amount_sum'>{`$ ${item.sum}`}</span>
                                        <span className='spec_card_penalties_text_amount_paid' style={item.paid ? {color: '#6FCF97'} : {color: '#EB5757'}}>{item.paid ? `Погашен` : `Не оплачен`}</span>
                                    </div>
                                </div>
                            ))} 
                        </div>
                    </div>
                </div>
                <div className='spec_card_tech_law_info_block'>
                    <div className='spec_card__tech_block'>
                        <div className='spec_card__tech_header'>
                            <span className='spec_card__header_title'>
                                Технические показатели
                            </span>                         
                        </div>
                        <div className="spec_card__tech_info_items_container">
                            {techIndicators.map((item, index) => (
                                <div className='spec_card_info_container' key={index.toString()}>
                                    <span className='spec_card_info_title'>
                                        {item.title}
                                    </span>
                                    <span className='spec_card_info_text'>
                                        {item.subtitle}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='spec_card__law_info_block'>
                        <div className='spec_card__law_info_header'>
                            <span className='spec_card__header_title'>
                                Юридическая информация
                            </span>                           
                        </div>
                        <div className="spec_card__law_info_items_container">
                            {lawInfo.map((item, index) => (
                                <div className='spec_card_info_container' key={index.toString()}>
                                    <span className='spec_card_info_title'>
                                        {item.title}
                                    </span>
                                    <span className='spec_card_info_text'>
                                        {item.subtitle}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
           </div>
        </React.Fragment>
    )
}

export default SpecificationCard