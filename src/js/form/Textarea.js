class Textarea {
    constructor(placeholder, className, inputId) {
        this.placeholder = placeholder;
        this.className = className;
        this.inputId = inputId;
    }

    _render() {
        this.inputGroup = document.createElement('div');
        this.inputField = document.createElement('textarea');
        this.inputLabel = document.createElement('label');

        this.inputGroup.className = `input-group textInp ${this.className}`;
        this.inputField.className = `input textInp`;
        this.inputLabel.className = ``;

        this.inputField.id = this.inputId;
        this.inputLabel.innerText = this.placeholder;
        this.inputLabel.setAttribute('for', this.inputId);

        this.inputGroup.appendChild(this.inputField);
        this.inputGroup.appendChild(this.inputLabel);

        this._initListeners();

        return this.inputGroup;
    }

    _initListeners() {
        this.inputField.addEventListener('change', () => this._setInputLabel());
        this.inputField.addEventListener('input', () => this._setInputLabel());
        this.inputField.addEventListener('paste', () => this._setInputLabel());
        this.inputField.addEventListener('keypress', () => this._setInputLabel());
    }

    _setInputLabel() {
        if (this.inputField.value !== '')
            this.inputLabel.style.display = 'none';
        else
            this.inputLabel.style.display = '';
    }
}

export default Textarea;