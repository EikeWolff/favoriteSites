import { createElement, createContentElement, at } from '../helper';

class Textarea {
    constructor(placeholder, className, inputId, appendTo) {
        this.placeholder = placeholder;
        this.className = className;
        this.inputId = inputId;
        this.appendTo = appendTo;
    }

    _render() {
        const inputGroup = createElement(
            'div',
            this.appendTo,
            at('class', `input-group textInp ${this.className}`)
        );
        this.inputField = createElement(
            'textarea',
            inputGroup,
            at('class', 'input textInp'),
            at('id', this.inputId)
        );
        this.inputLabel = createContentElement(
            'label',
            this.placeholder,
            inputGroup,
            at('for', this.inputId)
        );

        this._initListeners();

        return inputGroup;
    }

    _initListeners() {
        this.inputField.addEventListener('change', () => this._setInputLabel());
        this.inputField.addEventListener('input', () => this._setInputLabel());
        this.inputField.addEventListener('paste', () => this._setInputLabel());
        this.inputField.addEventListener('keypress', () => this._setInputLabel());
    }

    _setInputLabel() {
        if (this.inputField.value !== '') this.inputLabel.style.display = 'none';
        else this.inputLabel.style.display = '';
    }
}

export default Textarea;
