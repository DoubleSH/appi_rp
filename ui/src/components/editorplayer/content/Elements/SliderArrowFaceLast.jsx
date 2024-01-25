import React from 'react';

class SliderArrowFaceLast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPercent: false
        }

        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'SliderArrow.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    componentDidMount() {
        if (this.props.showPercent !== undefined) this.setState({...this.state, showPercent: this.props.showPercent})
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className="select-slider-wrap"
                    style={{flexDirection: 'column'}}
                >
                    <div className="select-slider">
                        <span className="prev"
                            onClick={() => this.props.clickLeftArrow(this.props.index)}></span>
                        <div className="select-slider-label">
                            {this.props.title}
                        </div>
                        <span className="next" onClick={() => this.props.clickRightArrow(this.props.index)}></span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SliderArrowFaceLast;
