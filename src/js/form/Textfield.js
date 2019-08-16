import { createElement, createContentElement, at } from '../helper';

class Textfield {
    constructor(placeholder, pattern, required, className, inputId, appendTo) {
        this.placeholder = placeholder;
        this.pattern = pattern;
        this.required = required;
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
            'input',
            inputGroup,
            at('class', 'input textInp'),
            at('id', this.inputId),
            at('required', this.required ? this.required : ''),
            at('pattern', this.pattern)
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
        this.inputField.addEventListener('change', () => {
            this._setInputLabel();
            this._validate();
        });
        this.inputField.addEventListener('input', () => {
            this._setInputLabel();
            this._validate();
        });
        this.inputField.addEventListener('paste', () => {
            this._setInputLabel();
            this._validate();
        });
        this.inputField.addEventListener('keypress', () => {
            this._setInputLabel();
            this._validate();
        });
    }

    _setInputLabel() {
        if (this.inputField.value !== '') this.inputField.parentElement.classList.add('labelRight');
        else this.inputField.parentElement.classList.remove('labelRight');
    }

    _validate() {
        const valid = (this.inputField.required
                && new RegExp(this.inputField.getAttribute('pattern')).test(
                    this.inputField.value
                ))
            || (!this.inputField.required && this.inputField.value === '');

        if (valid) {
            this.inputField.classList.remove('input--invalid');
            this.inputLabel.classList.remove('input--invalid');
        } else {
            this.inputField.classList.add('input--invalid');
            this.inputLabel.classList.add('input--invalid');
        }

        return valid;
    }
}

export default Textfield;
