import React from 'react';
import './css/editorplayer.css'
import './css/editor-adaptive.css'
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import EditorPlayer from './EditorPlayer';
import ChoiceRole from './content/ChoiceRole';
import EventManager from "../../EventManager";
import Logo from './content/Logo';

class EditorMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            path: '/editor/name-character'
        }
    }

    componentDidCatch(error, errorInfo) {
      mp.trigger('client:ui:debug', 'EditorMain.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    componentDidMount() {
        EventManager.addHandler('customization', value => { // Скрыть/Показать кастомку, переходы по страницам
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'switch') {
                this.setState({show: !this.state.show})
            } else if (value.type === 'choicerole') {
                this.setState({path: "/choicerole"})
            } else if (value.type === 'showFamilyPage') {
                this.setState({path: "/editor/family-character"})
            } else return;
        })
    }

    componentWillUnmount() {
        EventManager.removeHandler('customization');
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <React.Fragment>
                <div id="disableZoom" className={`adaptive_editor${this.state.path === '/choicerole' ? ' choice-role' : ''}`}>
                    <Logo/>
                    <div className="editor__hint">
                        {this.state.path !== '/choicerole' ?? <span className="editor__hint__title">Кастомизация персонажа</span>}
                        {this.state.path !== '/choicerole' ?? <span className="editor__hint__subtitle">Используйте ЛКМ чтобы вращать камеру, а колёсико мыши для масштаба</span>}
                    </div>
                    <Router>
                        <Route path="/editor">
                            <EditorPlayer/>
                        </Route>
                        <Route path="/choicerole">
                            <ChoiceRole/>
                        </Route>
                        <Redirect to={this.state.path} push/>
                    </Router>
                </div>
            </React.Fragment>
        )
    }
}

export default EditorMain;
