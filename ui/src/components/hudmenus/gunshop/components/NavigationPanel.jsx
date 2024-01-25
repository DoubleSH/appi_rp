import React from 'react'
import '../css/navpanel.css'

const NavigationPanel = ({ bgcolor, catalog, selected, setActive, banner, activecolor, activeItem }) => {

    

    return (
        <div className="hmenu__gunshop__navpanel">
            <div className="tatoo__content__img__container">
                <img src={`https://appi-rp.ru/client/images/banners/${banner}.png`} className="tatoo__content__header__img" />
            </div>
            <div className="hmenu__gunshop__navpanel__list scrollable_gunshop">
                {catalog.map((item, index) => (
                    <div tabindex="-1" style={{outline: 'none'}} className="hmenu__gunshop__navpanel__item_index_panel">
                        <div
                            key={`hmenu__gunshop__navpanel-${index}`}
                            className={activeItem === index ? "hmenu__gunshop__navpanel__item_active" : "hmenu__gunshop__navpanel__item" }
                            onClick={() => setActive(index)}
                        >
                            <span className="hmenu__gunshop__navpanel__item__name">
                                {item.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NavigationPanel