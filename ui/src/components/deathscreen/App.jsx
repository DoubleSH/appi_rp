import React from "react"
import "./App.scss"
import ButtonCall from "./Buttons/ButtonCall";
import ButtonCancel from "./Buttons/ButtonCancel";
import MessageCalled from "./Messages/MessageCalled";
import MessageCancelled from "./Messages/MessageCancelled";
import EventManager from "../../EventManager";

class DeathScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            timer: "2:59",
            killer: "Незнакомец(114YT)",
            variant: 0
        }
    }
    componentDidMount() {

        EventManager.addHandler('deathscreen', value => {
            if (value.type === 'show') {
                this.setState({show: true})
                this.setState({variant: 0})
            } else if (value.type === 'hide') {
                this.setState({variant: 0})
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({timer: value.timer})
                this.setState({killer: value.killer})
            } else return;
        })
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Certificate.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    componentWillUnmount() {

        EventManager.removeHandler('deathscreen');

    }
    selectVariant = (i) => {
        this.setState({ variant: i })
        if(i == 1) {
            mp.trigger('client:deathscreen:accept'); // eslint-disable-line
        } else if(i == 2) {
            mp.trigger('client:deathscreen:cancel'); // eslint-disable-line
        }
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        const timer = this.state.timer
        const killer = this.state.killer
        const variant = this.state.variant
        return (
            <div className="App">
                <div className="darken" />
                <svg width="615" height="897" viewBox="0 0 615 897" fill="none" xmlns="http://www.w3.org/2000/svg" className="skull">
                    <path fillRule="evenodd" clipRule="evenodd" d="M101.968 0.464267C98.8742 0.975495 88.7493 2.46864 79.4682 3.78387C58.3724 6.77241 24.7376 15.425 4.09412 23.1722C-112.133 66.7933 -198.529 171.228 -226.602 302.035C-230.29 319.212 -231.719 335.517 -232.626 370.746C-234.048 425.946 -232.788 432.657 -213.166 474.321C-195.546 511.737 -194.027 517.032 -194.124 540.758C-194.232 566.907 -198.829 578.825 -222.433 614.145C-232.299 628.912 -242.321 646.537 -244.701 653.316C-256.007 685.516 -244.577 724.836 -215.526 753.681C-193.82 775.231 -189.415 776.833 -147.595 778.398C-115.595 779.594 -111.46 780.236 -100.221 785.74C-93.4467 789.057 -85.7563 794.072 -83.1261 796.885C-68.58 812.456 -52.9337 849.699 -46.438 884.204C-42.9483 902.759 -32.3824 923.102 -21.9741 931.314C-12.1529 939.063 12.0973 951.294 33.3438 959.219C77.9652 975.862 113.852 981.063 183.644 981C257.61 980.936 299.192 974.011 345.428 954.058C392.815 933.608 405.237 920.632 412.293 884.204C419.07 849.208 434.572 812.396 449.06 796.885C451.69 794.072 459.381 789.057 466.155 785.74C477.394 780.236 481.529 779.594 513.529 778.398C555.349 776.833 559.754 775.231 581.46 753.681C597.522 737.732 606.32 722.791 611.605 702.475C619.365 672.655 614.417 652.672 590.577 617.557C563.694 577.958 556.816 558.842 559.617 531.482C561.471 513.377 563.316 507.967 579.129 474.321C598.724 432.619 599.981 425.923 598.559 370.746C597.653 335.517 596.224 319.212 592.536 302.035C567.584 185.768 494.813 87.5509 397.752 39.1397C374.039 27.3116 352.691 19.1027 328.857 12.6436C288.464 1.69841 280.249 0.952967 191.967 0.227789C145.561 -0.152817 105.062 -0.0447084 101.968 0.464267ZM28.8438 449.464C69.8338 456.173 93.9085 465.745 113.654 483.174C142.526 508.663 145.01 550.651 120.58 600.236C105.962 629.905 76.9415 653.399 45.7186 660.84C14.21 668.351 -28.8477 668.437 -56.2749 661.045C-101.549 648.843 -127.401 610.42 -127.496 555.194C-127.572 511.307 -110.493 473.226 -83.6008 457.322C-61.7266 444.386 -19.9919 441.469 28.8438 449.464ZM437.668 451.538C472.005 464.943 493.517 504.931 493.429 555.194C493.294 634.391 442.51 674.61 353.965 665.646C323.849 662.597 313.533 660.083 295.466 651.393C264.947 636.713 242.738 606.123 232.14 564.175C219.138 512.706 241.939 476.327 298.841 457.766C339.32 444.559 411.497 441.323 437.668 451.538ZM176.69 686.271C180.184 688.145 183.556 688.055 190.032 685.915C197.702 683.382 199.214 683.519 203.183 687.115C209.897 693.196 230.927 729.473 246.578 761.971C259.25 788.282 260.51 792.25 261.322 808.405C262.366 829.131 257.909 842.027 247.917 847.2C234.525 854.132 214.073 849.292 194.689 834.601L182.787 825.582L174.44 832.194C146.142 854.609 118.602 856.3 108.383 836.252C104.589 828.809 103.932 824.034 104.63 808.986C105.415 792.028 106.461 788.694 119.473 761.703C134.417 730.698 153.612 697.14 161.151 688.834C166.292 683.172 169.816 682.591 176.69 686.271Z" fill="white" fillOpacity="0.06"/>
                </svg>
                <div className="wrap">
                    <div className="title">
                        <span>Без сознания...</span>
                        <span>Вам осталось жить, примерно <b>{timer} секунд</b></span>
                    </div>
                    <div className="killer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 12C17.88 12 18.99 10.88 18.99 9.5C18.99 8.12 17.88 7 16.5 7C15.12 7 14 8.12 14 9.5C14 10.88 15.12 12 16.5 12ZM9 11C10.66 11 11.99 9.66 11.99 8C11.99 6.34 10.66 5 9 5C7.34 5 6 6.34 6 8C6 9.66 7.34 11 9 11ZM16.5 14C14.67 14 11 14.92 11 16.75V18C11 18.55 11.45 19 12 19H21C21.55 19 22 18.55 22 18V16.75C22 14.92 18.33 14 16.5 14ZM9 13C6.67 13 2 14.17 2 16.5V18C2 18.55 2.45 19 3 19H9V16.75C9 15.9 9.33 14.41 11.37 13.28C10.5 13.1 9.66 13 9 13Z" fill="white"/>
                        </svg>
                        <span>Вас убил <b>{killer}</b></span>
                    </div>
                    {variant === 0 &&
                        <div className="buttons">
                            <ButtonCall onClick={() => this.selectVariant(1)} />
                            <ButtonCancel onClick={() => this.selectVariant(2)} />
                        </div>
                    }
                    {variant === 1 && <MessageCalled />}
                    {variant === 2 && <MessageCancelled />}
                </div>
            </div>
        )
    }
}

export default DeathScreen
