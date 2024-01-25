import React from 'react'
import Icon from '../../hud/components/MainMenu/uikit/Icon'
import '../css/settings.css'
import Button from './Button'

const SettingsItem = ({ name, type, active, setCheckbox, listmenu, prevVal, nextVal, params, btntext }) => {
    return (
        <div className="accountmenu__content__cards__setting__item">
            <span className="accountmenu__content__cards__setting__name">{name}</span>
            {type === 0 && (
                <div className="accountmenu__content__cards__setting__checkbox">
                    <span
                        className={active === 0 ? "accountmenu__content__cards__setting__checkbox__btn_off" : "accountmenu__content__cards__setting__checkbox__btn"}
                        onClick={() => setCheckbox()}
                    >
                        Выкл.
                    </span>
                    <span
                        className={active === 1 ? "accountmenu__content__cards__setting__checkbox__btn_on" : "accountmenu__content__cards__setting__checkbox__btn"}
                        onClick={() => setCheckbox()}
                    >
                        Вкл.
                    </span>
                </div>
            )}
            {type === 1 && (
                <div className="accountmenu__content__cards__setting__listmenu">
                    <div className="accountmenu__content__cards__setting__listmenu_arrow_left" onClick={() => prevVal()}>
                    </div>
                    <span className="accountmenu__content__cards__setting__listmenu__name">{listmenu}</span>
                    <div className="accountmenu__content__cards__setting__listmenu_arrow_right" onClick={() => nextVal()}>
                    </div>
                </div>
            )}
            {type === 2 && (
                <div className="accountmenu__content__cards__button__setting__big_button" onClick={() => {
                    try {
                        mp.trigger('client:mainMenu:settings:btn', params); // eslint-disable-line
                    }
                    catch (e) {}
                }}>
                    <span className="accountmenu__content__cards__button__setting__big_bitton_text">{btntext}</span>
                </div>
            )}
        </div>
    )
}

export default SettingsItem