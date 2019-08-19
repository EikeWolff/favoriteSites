import {
    createDiv,
    createElement,
    createContentElement,
    at,
    setInputLabel
} from '../utils/helper';

class Textarea {
    constructor(placeholder, className, inputId, $appendTo) {
        this.placeholder = placeholder;
        this.className = className;
        this.inputId = inputId;
        this.appendTo = $appendTo;
    }

    render() {
        const $inputGroup = createDiv(
            this.appendTo,
            at('class', `input-group textInp ${this.className}`)
        );
        this.$inputField = createElement(
            'textarea',
            $inputGroup,
            at('class', 'input textInp'),
            at('id', this.inputId)
        );
        this.$inputLabel = createContentElement(
            'label',
            this.placeholder,
            $inputGroup,
            at('for', this.inputId)
        );

        this._initListeners();

        return $inputGroup;
    }

    _initListeners() {
        this.$inputField.addEventListener('change', () => setInputLabel(this.$inputField, this.$inputLabel));
        this.$inputField.addEventListener('input', () => setInputLabel(this.$inputField, this.$inputLabel));
        this.$inputField.addEventListener('paste', () => setInputLabel(this.$inputField, this.$inputLabel));
        this.$inputField.addEventListener('keypress', () => setInputLabel(this.$inputField, this.$inputLabel));
    }

    get value() {
        return this.$inputField.value;
    }
}

export default Textarea;
