import React from 'react'
import '../css/property.css'
import ButtonGps from './ButtonGps'

const HomeCard = ({ type, name, gprice, address, carplace, doors, x, y }) => {
    return (
        <div className="accountmenu__content__cards__home">
            <div className="accountmenu__content__cards__home__img__container" style={{backgroundImage: `url(https://appi-rp.ru/client/images/icons/components/accountmenu/img/house_img_bg.svg)`}}>
                    <div className="home__type__gps">
                        <div className="home__type">
                            <span className="home__type_text">
                                {type}
                            </span>
                            <span className="accountmenu__content__cards__home__name">
                                {name}
                            </span>
                        </div>
                        <div className='home__gps'>
                          <ButtonGps filled={false} x={x} y={y} />
                        </div>
                    </div>
            </div>
            <div className="conteiner_info_home">
                <div className="accountmenu__content__cards__home__info__container">
                    <span className="accountmenu__content__cards__home__address">
                        Адрес
                    </span>
                    <span className="accountmenu__content__cards__home__address__text">
                        {address}
                    </span>
                </div>
                <div className="accountmenu__content__cards__home__info__container">
                    <span className="accountmenu__content__cards__home__doors">
                        Налог
                    </span>
                    <span className="accountmenu__content__cards__home__doors__text" style={doors === 'Задолженности нет' ? {color: `#6FCF97`} : doors === 'Налог не взимается' ? {color: `rgba(255, 255, 255, 0.85)`} : {color: `#F2C94C`}}>
                        {doors}
                    </span>
                </div>
                <div className="accountmenu__content__cards__home__info__container">
                    <span className="accountmenu__content__cards__home__carplace">
                        Гараж
                    </span>
                    <span className="accountmenu__content__cards__home__carplace__text">
                        {carplace}
                    </span>
                </div>
                <div className="accountmenu__content__cards__home__info__container">
                    <span className="accountmenu__content__cards__home__gprice">
                        Гос. цена:
                    </span>
                    <span className="accountmenu__content__cards__home__gprice__text">
                        {`$ ${gprice.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HomeCard