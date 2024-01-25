import React from 'react';
import SliderEditor from './PageEditor/Elements/SliderEditor';
// import { Link } from 'react-router-dom';

class NameCharacter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'NameCharacter.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    changeAge(val) {
        try {
            mp.trigger('client:events:custom:updateAge', // eslint-disable-line 
            val);
        } catch (e) {
            console.log(e);
        }
    }

    registerPlayer() {
        try {
            mp.trigger('client:events:custom:register', // eslint-disable-line
                this.props.first_name, this.props.last_name, this.props.old_input, this.props.promocode, this.props.referer, this.props.nationality[this.props.index_help]);
        } catch (e) {
            console.log();
        }
    }

    render() {

        return (
            <React.Fragment>
                
                <div className="menu-editor-default def-style">
                    <div className="steps-block">
                        <div className="steps-wrap">
                            <div className="step current"></div>
                            <div className="step"></div>
                            <div className="step"></div>
                            <div className="step"></div>
                            <div className="step"></div>
                        </div>
                        Шаг 1/5
                    </div>
                    <div className="create-info-input">
                        <div className="form-input-wrap">
                            <input type="text" placeholder="Имя (Англ)" name="firstname-create" pattern="[a-zA-Z]*"
                                className="form-input" value={this.props.first_name}
                                onChange={this.props.valueFirstName.bind(this)}/>
                        </div>
                        <div className="form-input-wrap">
                            <input type="text" placeholder="Фамилия (Англ)" name="lastname-create" pattern="[a-zA-Z]*"
                                className="form-input" value={this.props.last_name}
                                onChange={this.props.valueLastName.bind(this)}/>
                        </div>
                        <div className="form-input-wrap">
                            <input type="text" placeholder="Возраст (От 18 до 60)" min="18" max="60" pattern="[0-9]*"
                                onInput={this.props.onCheckNumber.bind(this)}
                                onChange={this.changeAge(this.props.old_input)} value={this.props.old_input}
                                name="old-create" className="form-input"/>
                        </div>
                        <div className="form-input-wrap">
                            <input type="text" placeholder="Промокод (Если есть)" name="lastname-create" pattern="[a-zA-Z]*"
                                className="form-input" value={this.props.promocode}
                                onChange={this.props.valuePromocode.bind(this)}/>
                        </div>
                        <div className="form-input-wrap">
                            <input type="text" placeholder="Ник пригласившего (Если есть)" name="lastname-create" pattern="[a-zA-Z]*"
                                className="form-input" value={this.props.referer}
                                onChange={this.props.valueReferer.bind(this)}/>
                        </div>
                    </div>
                    <div
                        className="select-slider-wrap"
                        style={{flexDirection: 'column'}}
                    >
                        <div className="select-slider">
                            <span className="prev"
                                onClick={() => this.props.clickLeftArrow(0)}></span>
                            <div className="select-slider-label">
                                Национальность:&nbsp;
                                <span>
                                    {this.props.nationality[this.props.index_help] !== undefined ? this.props.nationality[this.props.index_help] : this.props.nationality}
                                </span>
                            </div>
                            <span className="next" onClick={() => this.props.clickRightArrow(0)}></span>
                        </div>
                        <span className="select-slider-description">{this.props.desc}</span>
                    </div>
                    <div className="buttons-wrap">
                        <div className="button" onClick={this.props.reset.bind(this)}>Сброс</div>
                        <div className="button blue size-s" onClick={this.registerPlayer.bind(this)}>Далее</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default NameCharacter;
