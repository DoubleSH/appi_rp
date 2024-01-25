import React from 'react';
import EventManager from "../../../EventManager";
import Button from '../uikit/Button';
import Title from '../uikit/Title'
import authImageBg from '../img/auth.png'
import regImageBg from '../img/reg.png'
import IconVolumeOn from '../img/volume_on.svg'
import IconVolumeOff from '../img/volume_off.svg'
import music1 from '../img/music/1.mp3';
import music2 from '../img/music/2.mp3';
import music3 from '../img/music/3.mp3';
import music4 from '../img/music/4.mp3';
import music5 from '../img/music/5.mp3';
import music6 from '../img/music/6.mp3';
import music7 from '../img/music/7.mp3';
import music8 from '../img/music/8.mp3';
import music9 from '../img/music/9.mp3';
import music10 from '../img/music/10.mp3';

const getRandomFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

const songsCollections = [music1, music2, music3, music4, music5, music6, music7, music8, music9, music10]
const randomSongIndex = getRandomFromRange(0,9);
const randomSong = songsCollections[randomSongIndex];



class Authorization extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAuto: true,
            acceptRules: false,
            isMusicPlay: true,
            login: '',
            password: '',
            mailReg: '',
            loginReg: '',
            passwordReg: '',
            passwordRegCheck: '',
            pagePlayer: '',
            audioUrl: '',
            defaultLogin: '',
            modalrules: false,
        }
    };

    

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Authorization.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (this.state.showAuto) this.clickLogin();
            else this.clickReg();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);

        EventManager.addHandler('authMain:2', value => {
            if (value.type === 'login') {
                this.setState({defaultLogin: value.login})

            } else return;
        })
    
        this.audio = new Audio()
        this.audio.src = randomSong
        this.audio.autoplay = true
        this.audio.volume = 0.1
        this.audio.load()

    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
        EventManager.removeHandler('authMain:2');
    }

    handleChange(value) {
        this.setState({ showAuto: value });
    };

    valueLogin(event) {
        this.setState({ login: event.target.value.replace(/[^a-zA-Z0-9]+/g, '') })
    };

    valuePassword(event) {
        this.setState({ password: event.target.value.replace(/[^a-zA-Z0-9]+/g, '') })
    };

    valueMailReg(event) {
        this.setState({ mailReg: event.target.value })
    };

    valueLoginReg(event) {
        this.setState({ loginReg: event.target.value.replace(/[^a-zA-Z0-9]+/g, '') })
    };

    valuePasswordReg(event) {
        this.setState({ passwordReg: event.target.value.replace(/[^a-zA-Z0-9]+/g, '') })
    };

    valuePasswordRegCheck(event) {
        this.setState({ passwordRegCheck: event.target.value.replace(/[^a-zA-Z0-9]+/g, '') })
    };




    clickLogin() {
        try {
            if (!this.state.login)
            {
                mp.trigger('client:user:auth:login', // eslint-disable-line
                    this.state.defaultLogin, this.state.password);
            }
            else {
                mp.trigger('client:user:auth:login', // eslint-disable-line
                    this.state.login, this.state.password);
            }
        } catch (e) {
            console.log(e);
        }
    };

    clickReg() {
        try {
            mp.trigger('client:user:auth:register', // eslint-disable-line
                this.state.mailReg, this.state.loginReg,
                this.state.passwordReg, this.state.passwordRegCheck,
                this.state.acceptRules);
        } catch (e) {
            console.log(e);
        }
    };

    // musicPlay = () => {
    //     setTimeout(function() {
    //         this.audio = new Audio() 
    //         this.audio.src = Math.random(music1, music2, music3, music4, music5)
    //         this.audio.muted = false
    //         this.audio.play()
    //     }, 1000)

    // }

    
    // musicChangeState = () => {
    //     this.setState((value) => (
    //         {isMusicPlay: !value.isMusicPlay}
    //     ))
    //     if (this.state.isMusicPlay) {
    //         this.audio.play()
    //     } else {
    //         this.audio.pause()
    //     }
    // } 

    acceptRules = () => {
        this.setState({
            acceptRules: !this.state.acceptRules
        });
    };
    clickCheckRules() {
        this.setState({
            modalrules: true,
        });
    }
    closeRules() {
        this.setState({
            modalrules: false,
        });
    }
    render() {
        return (
            <React.Fragment>

                <div className="auth-main" style={{
                    /*backgroundImage: `url(${this.state.showAuto ? authImageBg : regImageBg})`,
                    backgroundPositionX: 'left',
                    backgroundPositionY: 'bottom',
                    backgroundSize: '50%'*/
                }}>
                    <div className="auth__background" />
                    <div className="content-main">
                        <div className="content-auth">
                            <div className="auth-input__text__container">
                                <Title text="Добро пожаловать на <span class='bold'>Appi RolePlay</span>" size="xxl" />
                            </div>
                            <div className="button-main">
                                <input type="radio" id="btn-radio-auth1" name="btn-radio-auth" defaultChecked="true"
                                    onChange={() => this.handleChange(true)} />
                                <label htmlFor="btn-radio-auth1" className="button-auth login">Войти</label>
                                <input type="radio" id="btn-radio-auth2" name="btn-radio-auth"
                                    onChange={() => this.handleChange(false)} />
                                <label htmlFor="btn-radio-auth2" className="button-auth register">Регистрация</label>
                            </div>
                            {this.state.showAuto ?
                                <React.Fragment>
                                    <div className="auth-input">
                                        <div className="form-input-wrap input-icon icon-user">
                                            <input type="text" pattern="[a-zA-Z0-9]*" placeholder="Введите логин"
                                                name="login-auth" className="form-input"
                                                onChange={this.valueLogin.bind(this)}
                                                //value={this.state.login}
                                                defaultValue={this.state.defaultLogin}
                                            />
                                        </div>
                                        <div className="form-input-wrap input-icon icon-key">
                                            <input type="password" pattern="[a-zA-Z0-9]*" placeholder="Введите пароль"
                                                name="password-auth" className="form-input"
                                                value={this.state.password} onChange={this.valuePassword.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <Button text="Войти" onClick={this.clickLogin.bind(this)} />
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <div className="auth-input">
                                        <div className="form-input-wrap input-icon icon-email">
                                            <input type="text" placeholder="Введите свой E-mail" name="create-email"
                                                className="form-input" onChange={this.valueMailReg.bind(this)}
                                            />
                                        </div>
                                        <div className="form-input-wrap input-icon icon-user">
                                            <input type="text" pattern="[a-zA-Z0-9]*" placeholder="Придумайте логин"
                                                name="create-login" className="form-input"
                                                value={this.state.loginReg}
                                                onChange={this.valueLoginReg.bind(this)}
                                            />
                                        </div>
                                        <div className="form-input-wrap input-icon icon-key">
                                            <input type="password" pattern="[a-zA-Z0-9]*"
                                                placeholder="Придумайте пароль" value={this.state.passwordReg}
                                                name="create-password" className="form-input"
                                                onChange={this.valuePasswordReg.bind(this)}
                                            />
                                        </div>
                                        <div className="form-input-wrap input-icon icon-repeat-key">
                                            <input type="password" pattern="[a-zA-Z0-9]*" placeholder="Повторите пароль"
                                                value={this.state.passwordRegCheck} name="create-password-repeat"
                                                className="form-input"
                                                onChange={this.valuePasswordRegCheck.bind(this)}
                                            />
                                        </div>
                                        <input type="checkbox" name="chek1" id="chk1" className="chk-reg-inpt"
                                            defaultChecked={this.state.acceptRules} onChange={this.acceptRules}
                                        />
                                        <label className="chk_reg" htmlFor="chk1">
                                            <div className="chk-circle"></div>
                                            <p id="button_rules" onClick={this.clickCheckRules.bind(this)}>Я согласен с правилами и условиями проекта</p>
                                        </label>
                                    </div>
                                    <Button text="Готово" onClick={this.clickReg.bind(this)} />
                                </React.Fragment>
                            }
                        </div>
                    </div>
                    {this.state.modalrules ?
                        <div className="iframe_rules">
                            <div id="rules">
                                <div className="close-rules"><div className="close-img-rules" onClick={this.closeRules.bind(this)}></div></div>
                                <iframe src="https://appi-rp.ru/rules#container" sandbox></iframe>

                            </div>
                        </div> : ''}
                </div>
            </React.Fragment>
        )
    }
}

export default Authorization;
