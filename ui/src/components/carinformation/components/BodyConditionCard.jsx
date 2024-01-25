import React from 'react'
import '../css/body_cond_card.css'
import ItemInstalledIcon from '../icons/body_cond/item_installed.png'
import ItemUinstalledIcon from '../icons/body_cond/item_uninstalled.png'
import RepairIcon from '../icons/body_cond/repair_mag_icon.png'

const BodyConditionCard = ({ body_cond }) => {

    const notBrokeElementsLength = body_cond.filter(el => el.condition === 1).length
    const allElementsLength = body_cond.length

    return (
        <React.Fragment>
            {notBrokeElementsLength != allElementsLength ?
                <React.Fragment>
                <div className='body_cond_conteiner'>
                    <div className='body_cond_conteiner_header'>
                        <div className='body_cond_header_items_not_broke_length'>
                            <span className='body_cond_header_items_not_broke_length_header'>
                                Деталей собрано
                            </span>
                            <span className='body_cond_items_not_broke_length_text'>
                                <p style={{color: 'rgba(255, 255, 255, 0.85)'}}>{notBrokeElementsLength}</p>/{allElementsLength}
                            </span>
                        </div>
                        <div className='body_cond_header_item_not_broke'>
                            <img src="https://appi-rp.ru/client/images/interface/carinfo/body_cond/item_installed.png"/>
                            <span className='body_cond_header_item_info_text'>Деталь<br/>установлена</span>
                        </div>
                        <div className='body_cond_header_item_broke'>
                            <img src="https://appi-rp.ru/client/images/interface/carinfo/body_cond/item_uninstalled.png"/>
                            <span className='body_cond_header_item_info_text'>Этой детали<br/>не хватает</span>
                        </div>
                    </div>
                    <div className='body_cond_items_conteiner scrollable_menu'>
                        {body_cond.map((item, index) => (
                            <div className={item.condition === 1 ? 'body_cond_info_container notbroke' : 'body_cond_info_container broke'} key={index.toString()}>
                                <span className='body_cond_info_title'>
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <div className='body_cond_conteiner__all_items_complete'>
                            <span className='body_cond_conteiner__all_items_complete_header'>
                                Машина полностью собрана
                            </span>
                            <span className='body_cond_conteiner__all_items_complete_info'>
                                Теперь постарайтесь ездить аккуратно, чтобы ничего<br/>
                                снова не потерять. Но если потеряли, найти детали<br/>
                                можно в автомастерской – на карте отмечен как <span><img src="https://appi-rp.ru/client/images/interface/carinfo/tuning/repair_mag_icon.png"/></span><br/>
                            </span>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default BodyConditionCard