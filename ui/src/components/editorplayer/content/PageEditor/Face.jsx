import React from 'react';
import InputRange from 'react-input-range';
import {Link} from "react-router-dom";

class Face extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Face.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    render() {
        return (
            <React.Fragment>
                <div className="steps-block">
                    <div className="steps-wrap">
                        <div className="step complete"></div>
                        <div className="step complete"></div>
                        <div className="step current"></div>
                        <div className="step"></div>
                        <div className="step"></div>
                    </div>
                    Шаг 3/5
                </div>
                <div className="block-editor-range scroll-wrap custom-scroll">
                    <div className="header-title-editor">Лицо</div>
                    <div className="range-editor-block-big">
                        {this.props.input_editor_face.map((e, index) => {
                            let i = "input_editor_face" + index;
                            return (
                                <div className="block-editor-range__element" key={i}>
                                    <div className="range-description"><span>{e.minLabel}</span><span className="bold">{e.name}</span><span>{e.maxLabel}</span></div>
                                    <div className="range-slider-editor-big">
                                        <InputRange
                                            maxValue={100}
                                            minValue={-100}
                                            value={e.value}
                                            onChange={value => {
                                                this.setState({...this.props.input_editor_face[index].value = value});
                                                this.props.setCustomization(value);
                                            }}
                                            onChangeComplete={value => console.log(value)}
                                        />
                                        {e.value !== 0 ? <div className="range-label">{e.value}</div> : null}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="buttons-wrap">
                    <Link to="/editor/family-character" className="button">Назад</Link>
                    <div className="button" onClick={() => this.props.reset(1)}>Сброс</div>
                    <Link className="button blue" to="/editor/editor-character/face-second">
                        Далее
                    </Link>
                </div>
                <div className="button purple" onClick={this.props.randomize}>
                    Рандомные параметры
                    <svg width="21" height="18" viewBox="0 0 21 18" fill="#BB6BD9" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.72831 12.7359C6.99978 12.9088 7.32447 13.0012 7.65711 13.0002V12.9962C7.97075 12.9968 8.27763 12.9145 8.53985 12.7596C8.80195 12.6045 9.00773 12.3836 9.1315 12.1243L9.8126 10.2604C9.96993 9.83809 10.2343 9.45461 10.5846 9.14012C10.935 8.82564 11.3619 8.58885 11.8314 8.44846L13.807 7.87048C14.1252 7.76989 14.4001 7.5815 14.5924 7.33211C14.7848 7.08282 14.8849 6.78523 14.8785 6.48174C14.8722 6.17825 14.7595 5.8843 14.5568 5.64172C14.3541 5.39914 14.0714 5.22029 13.7492 5.1306L11.7992 4.56063C11.3276 4.41938 10.8989 4.18106 10.5476 3.8646C10.1961 3.54816 9.93148 3.16231 9.77482 2.73772L9.13261 0.960801C9.02061 0.677785 8.81351 0.433206 8.53996 0.261024C8.2663 0.0888526 7.93999 -0.00237296 7.60619 4.69265e-05C7.27238 0.00246681 6.9477 0.0984021 6.67726 0.274524C6.40682 0.450645 6.20406 0.698204 6.09714 0.9828L5.44938 2.77471C5.29317 3.18696 5.035 3.56191 4.69433 3.87127C4.35365 4.18064 3.93939 4.41635 3.48275 4.56063L1.50835 5.1316C1.27349 5.20553 1.06095 5.32759 0.887526 5.48817C0.714108 5.64873 0.584566 5.8434 0.509123 6.05678C0.43368 6.27016 0.414414 6.4964 0.452858 6.71764C0.49129 6.93887 0.586366 7.14902 0.730585 7.33151C0.927126 7.5805 1.20589 7.76729 1.52724 7.86548L3.47608 8.43446C3.949 8.57685 4.3785 8.81654 4.7305 9.13442C4.82501 9.21882 4.91334 9.30871 4.99494 9.40341C5.21624 9.6612 5.38719 9.95098 5.50049 10.2604L6.1427 12.0353C6.2521 12.318 6.45682 12.5629 6.72831 12.7359ZM15.2466 17.783C15.0349 17.6472 14.8756 17.4552 14.7911 17.234L14.4266 16.2271C14.3557 16.0356 14.2367 15.8614 14.0788 15.7181C13.9205 15.5752 13.7272 15.4676 13.5144 15.4041L12.4133 15.0811C12.1573 15.0038 11.9352 14.8553 11.7789 14.6572C11.6263 14.4649 11.5448 14.2344 11.5456 13.9982C11.5459 13.7604 11.6287 13.5287 11.7822 13.3352C11.9348 13.1407 12.1518 12.9947 12.4022 12.9182L13.52 12.5923C13.7277 12.5259 13.9158 12.4176 14.07 12.2756C14.2241 12.1336 14.3399 11.9618 14.4088 11.7733L14.7688 10.7813C14.8535 10.5572 15.0135 10.3621 15.2267 10.2233C15.4399 10.0844 15.6957 10.0086 15.9589 10.0063C16.222 10.004 16.4795 10.0753 16.6956 10.2104C16.9118 10.3455 17.0759 10.5377 17.1654 10.7603L17.531 11.7743C17.6025 11.9644 17.7221 12.137 17.8801 12.2785C18.0382 12.4201 18.2305 12.5268 18.4421 12.5903L19.5443 12.9132C19.7984 12.9847 20.0209 13.1264 20.1806 13.3182C20.3402 13.5099 20.4286 13.7421 20.4334 13.9816C20.4383 14.2212 20.3592 14.456 20.2073 14.6529C20.0555 14.8497 19.8387 14.9984 19.5876 15.0781L18.461 15.4071C18.2498 15.4719 18.0579 15.5793 17.8999 15.7211C17.7418 15.8639 17.6227 16.0378 17.5521 16.2291L17.1943 17.218C17.1082 17.4483 16.9428 17.648 16.7221 17.788C16.5088 17.926 16.2527 18.0002 15.9899 18C15.7229 18 15.4628 17.924 15.2466 17.783Z" />
                    </svg>
                </div>
            </React.Fragment>
        )
    }
}

export default Face;
