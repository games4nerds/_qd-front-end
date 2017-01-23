import { h, Component } from 'preact';
import CodeMirror from 'codemirror';
import Beautifier from 'js-beautify';

import 'codemirror/lib/codemirror.css';
import 'common/styles/code-theme.styl';
import './code.styl';

//imports specific language mode for editor
import 'codemirror/mode/javascript/javascript';

export default class Code extends Component {
    componentDidMount() {
        const config = {
            mode: 'javascript',
            handleMouseEvents: false,
            scrollbarStyle: null,
            lint: true,
            indentUnit: 4,
            readOnly: true,
            lineNumbers: false,
            theme: 'monokai',
        };
        Object.assign(config, this.props.config);

        this.codeBlock = CodeMirror.fromTextArea(this.textarea, config);
        this.setCode(this.props.value);
    }

    componentDidUpdate() {
        if (this.value !== this.props.value) {
            this.setCode(this.props.value);
        }
    }

    setCode(value = '') {
        this.value = Beautifier.js_beautify(value);
    }

    get value() {
        return this.codeBlock.getValue();
    }

    set value(value) {
        this.codeBlock.getDoc().setValue(value);
    }

    render() {
        return (
            <div className="code-box">
                { /* preact doesn't support refs */}
                <textarea readOnly ref={ component => this.textarea = component }/>
            </div>
        );
    }
}