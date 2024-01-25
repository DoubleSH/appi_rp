import React from 'react'
import '../css/stats.css'
import FlatButton from '../uikit/FlatButton.jsx'

const StatsPanel = ({ catalog, selected, selectedCatalog, btncolor, img, SetHide }) => {

    return (
        <React.Fragment>
            <div className='hmenu__gunshop__stats_conteiner_main'>
                <div 
                className='hmenu__gunshop_header_close'
                onClick={SetHide}>
                </div>
                <div className={selectedCatalog !== -1 ? "hmenu__gunshop__stats" : "hmenu__gunshop__stats_not_active"}>
                    {selectedCatalog !== -1 ?
                        <React.Fragment>
                            <div className='hmenu__gunshop__stats_container_info'>
                                <div className='hmenu__gunshop__stats_header_container'>
                                    <span className="hmenu__gunshop__stats__name">{catalog[selected].items[selectedCatalog].title}</span>
                                    {catalog[selected].items[selectedCatalog].sale > 0 && (
                                        <span className="hmenu__gunshop__catalog__item__sale" style={{left: '0rem'}}>
                                            {`${catalog[selected].items[selectedCatalog].sale}%`}
                                        </span>
                                    )}
                                </div>
                                <div className="hmenu__gunshop__catalog__item__img__container" style={{marginTop: '15px', marginBottom: '15px'}}>
                                        <img src={`https://appi-rp.ru/client/images/items-cl/${catalog[selected].items[selectedCatalog].img}`} className="hmenu__gunshop__catalog__item__img" />
                                </div>
                                <div className="hmenu__gunshop__stats__params">
                                    <span className="hmenu__gunshop__stats__about">
                                        {`${catalog[selected].items[selectedCatalog].desc.toString().replace(new RegExp('~br~', 'g'), '\n')}`}
                                    </span>
                                </div>
                                <div className={(catalog[selected].items[selectedCatalog].price !== '' ? 'hmenu__gunshop__stats__price__text' : 'hmenu__gunshop__hide')}>
                                    {catalog[selected].items[selectedCatalog].sale > 0 ?
                                        <React.Fragment>
                                            <span className="hmenu__gunshop__stats__price__gprice_without_discount">
                                                {`${catalog[selected].items[selectedCatalog].price2}`}
                                            </span>
                                            <span className="hmenu__gunshop__stats__price__gprice">
                                                {`${catalog[selected].items[selectedCatalog].price}`}
                                            </span>
                                        </React.Fragment>
                                    :
                                        <span className="hmenu__gunshop__stats__price__gprice">
                                            {`${catalog[selected].items[selectedCatalog].price}`}
                                        </span>
                                    }
                                </div>
                            </div>
                            <div className="hmenu__gunshop__stats__price">
                                <FlatButton isHide={catalog[selected].items[selectedCatalog].price === ''} onPress={() => {
                                    try {
                                        mp.trigger('client:shopMenu:buyCard', JSON.stringify(catalog[selected].items[selectedCatalog].params)); // eslint-disable-line
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }} btncolor={btncolor} text="Оплатить картой" />
                                <FlatButton isHide={catalog[selected].items[selectedCatalog].price === ''} onPress={() => {
                                    try {
                                        mp.trigger('client:shopMenu:buyCash', JSON.stringify(catalog[selected].items[selectedCatalog].params)); // eslint-disable-line
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }} btncolor={btncolor} text="Оплатить наличными" />
                                <FlatButton isHide={catalog[selected].items[selectedCatalog].price !== ''} onPress={() => {
                                    try {
                                        mp.trigger('client:shopMenu:doName', JSON.stringify(catalog[selected].items[selectedCatalog].params)); // eslint-disable-line
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }} btncolor={btncolor} text="Открыть" />
                            </div>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <div className='hmenu__gunshop__stats_not_active_img_container_header'></div>
                            <p className='hmenu__gunshop__stats_not_active_header'>Товар не выбран</p>
                            <p className='hmenu__gunshop__stats_not_active_header_text'>
                                Выберите товар,
                                чтобы посмотреть цену
                                и информацию о нём
                            </p>
                        </React.Fragment>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default StatsPanel