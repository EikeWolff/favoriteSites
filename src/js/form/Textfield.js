class Textfield {
    constructor(placeholder, pattern, required, className, inputId) {
        this.placeholder = placeholder;
        this.pattern = pattern;
        this.required = required;
        this.className = className;
        this.inputId = inputId;
    }

    _render() {
        this.inputGroup = document.createElement('div');
        this.inputField = document.createElement('input');
        this.inputLabel = document.createElement('label');

        this.inputGroup.className = `input-group textInp ${this.className}`;
        this.inputField.className = `input textInp`;
        this.inputLabel.className = ``;

        this.inputField.id = this.inputId;
        if (this.required)
            this.inputField.setAttribute('required', this.required);
        this.inputLabel.innerText = this.placeholder;
        this.inputLabel.setAttribute('for', this.inputId);

        this.inputField.setAttribute('pattern', this.pattern);

        this.inputGroup.appendChild(this.inputField);
        this.inputGroup.appendChild(this.inputLabel);

        this._initListeners();

        return this.inputGroup;
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
        if (this.inputField.value !== '')
            this.inputField.parentElement.classList.add('labelRight');
        else
            this.inputField.parentElement.classList.remove('labelRight');
    }

    _validate() {
        const valid = (this.inputField.required && new RegExp(this.inputField.getAttribute('pattern')).test(this.inputField.value))
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