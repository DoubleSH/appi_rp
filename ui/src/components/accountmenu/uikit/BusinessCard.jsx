import React from 'react'
import '../css/property.css'
import ButtonGps from './ButtonGps'

const BusinessCard = ({ type, name, price, address, doors, title, x, y, img }) => {
    return (
        <div className="accountmenu__content__cards__business">
            <div className="accountmenu__content__cards__business__img__container" style={{backgroundImage: `url(${img})`}}>
                    <div className="business__type__gps">
                        <div className="business__type">
                            <span className="business__type_text">
                                {title}
                            </span>
                            <span className="accountmenu__content__cards__business__name">
                                {name}
                            </span>
                        </div>
                        <div className='business__gps'>
                          <ButtonGps filled={false} x={x} y={y} />
                        </div>
                    </div>
            </div>
            <div className="conteiner_info_business">
                <div className="accountmenu__content__cards__business__info__container">
                    <span className="accountmenu__content__cards__business__gprice">
                        Гос. цена:
                    </span>
                    <span className="accountmenu__content__cards__business__gprice__text">
                        {`$ ${price.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`}
                    </span>
                </div>
                <div className="accountmenu__content__cards__business__info__container">
                    <span className="accountmenu__content__cards__business__address">
                        Адрес
                    </span>
                    <span className="accountmenu__content__cards__business__address__text">
                        {address}
                    </span>
                </div>
                <div className="accountmenu__content__cards__business__info__container">
                    <span className="accountmenu__content__cards__business__doors">
                        Налог
                    </span>
                    <span className="accountmenu__content__cards__business__doors__text" style={doors === 'Задолженности нет' ? {color: `#6FCF97`} : doors === 'Налог не взимается' ? {color: `rgba(255, 255, 255, 0.85)`} : {color: `#F2C94C`}}>
                        {doors}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default BusinessCard