import React from 'react'
import '../css/tuning_card.css'
import RepairIcon from '../icons/tuning/repair_mag_icon.png'
import TuningIcon from '../icons/tuning/tuning_mag_icon.png'

const TuningCard = ({ tuning }) => {

    const allElementsLength = tuning.length

    return (
        <React.Fragment>
            {allElementsLength != 0 ?
                <React.Fragment>
                    <div className='tuning_card_conteiner'>
                            <div className='tuning_card_conteiner_header'>
                                Установленные элементы тюнинга
                            </div>
                            <div className='tuning_card_items_conteiner scrollable_menu'>
                                {tuning.map((item, index) => (
                                    <div className='tuning_info_container' key={index.toString()}>
                                        <span className='tuning_info_title'>
                                            {item.title}
                                        </span>
                                        <span className='tuning_info_text'>
                                            {item.subtitle}
                                        </span>
                                    </div>
                                ))}
                            </div>
                    </div>
                </React.Fragment>
            :
                <React.Fragment>
                    <div className='tuning_conteiner__all_items_complete'>
                            <span className='tuning_conteiner__all_items_complete_header'>
                                Тюнинг отсуствует
                            </span>
                            <span className='tuning_conteiner__all_items_complete_info'>
                            Это значит, что на вашем транспорте не установлены никакие элементы тюнинга.<br/>
                            Внутренний тюнинг можно сделать в автомастерской – на карте отмечены так <span><img src="https://appi-rp.ru/client/images/interface/carinfo/tuning/repair_mag_icon.png"/></span><br/>      
                            Внешний тюнинг можно приобрести и поставить в тюнинг-ателье,<br/>
                            они отмечены на карте так <span><img src="https://appi-rp.ru/client/images/interface/carinfo/tuning/tuning_mag_icon.png"/></span>         
                            </span>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default TuningCard