import React from 'react';
import Role from './Elements/Role';

class ChoiceRole extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            info_player: [
                {
                    id: 1,
                    customClassName: 'cayo-perico',
                    description: 'Прилетев на самолёте в Кайо-Перико, в опрятной одежде с первыми деньгами и телефоном, вам открыты все дороги для покорения этого мира!',
                    buttonLabel: 'начать в кайо-перико'
                },
                {
                    id: 0,
                    customClassName: 'los-santos',
                    description: 'Иммигрируя из своей страны на самолете, вы добираетесь до Лос-Сантоса, где с самыми нужными вещами, что вы успели забрать с собой, вас ждёт работа, и достижения новых высот.',
                    buttonLabel: 'начать в лос сантосе'
                },
                {
                    id: 2,
                    customClassName: 'sandy-shores',
                    description: 'Очнувшись в окрестностях округа Блейн, в старой грязной одежде и без цента в кармане вам предстоит вернуться к нормальной жизни. Хорошо, что вы уже полноценный гражданин США, что облегчит ваш дальнейший путь.',
                    buttonLabel: 'начать в сенди шорс'
                }
            ]
        }
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'ChoiceRole.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    render() {
        return (
            <React.Fragment>
                <div className="reg-main adaptive-reg ch-role">
                    <div className="create-content">
                        <div className="main-box-change">
                            {this.state.info_player.map((role, index) => {
                                return ( <Role customClassName={role.customClassName} description={role.description} buttonLabel={role.buttonLabel} index={role.id}/> )
                            })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ChoiceRole;
