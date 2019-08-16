import Textfield from './form/Textfield';
import Textarea  from './form/Textarea';

class Form {
    constructor(parentElement, title, icon) {
        this.parentElement = parentElement;
        this.title = title;
        this.icon  = icon;
        this._render();
    }

    _render() {
        const form    = document.createElement('div');
        const head    = document.createElement('div');
        const headIcon  = document.createElement('div');
        const hiIcon    = document.createElement('i');
        const headTitle = document.createElement('div');
        const body    = document.createElement('div');
        const intern  = document.createElement('div');

        this.tfName  = new Textfield('Name', "^[\\w'\\-,.][^0-9_!¡?÷?¿/\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$", true, 'form-name', 'formName');
        this.tfEmail = new Textfield('Email', "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", true, 'form-email', 'formEmail');
        this.tfUrl   = new Textfield('URL', "https?://(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)", false, 'form-url', 'formUrl');
        this.taComnt = new Textarea('Kommentar', 'form-comnt', 'formComnt');
        this.commitBtn = this._createCommitBtn('Registrieren');

        this.commitBtn.addEventListener('click', () => {
            if (this.tfName._validate() && this.tfEmail._validate() && this.tfUrl._validate())
                this._sendForm();
            else
                chayns.dialog.alert('', 'Ungültige Eingabe.');
        });

        form.className   = 'accordion form';
        form.setAttribute('data-group', "1");
        head.className   = 'accordion__head form_head';
        headIcon.className  = 'accordion__head__icon accordion--trigger';
        headTitle.className = 'accordion__head__title  accordion--trigger';

        hiIcon.className    = this.icon;
        headTitle.innerText = this.title;

        body.className   = 'accordion__body';
        intern.className = 'accordion__item form_intern';

        this.parentElement.appendChild(form);
        form.appendChild(head);
        form.appendChild(body);
        head.appendChild(headIcon);
        head.appendChild(headTitle);
        headIcon.appendChild(hiIcon);
        body.appendChild(intern);

        intern.appendChild(this.tfName._render());
        intern.appendChild(this.tfEmail._render());
        intern.appendChild(this.tfUrl._render());
        intern.appendChild(this.taComnt._render());
        intern.appendChild(this.commitBtn);

        return form;
    }

    _createCommitBtn(text) {
        const btnParent = document.createElement('div');
        const commitBtn = document.createElement('button');

        btnParent.className = 'btn-send';
        commitBtn.className = 'button';
        commitBtn.innerText = text;

        btnParent.appendChild(commitBtn);

        return btnParent;
    }

    _sendForm() {
        if (chayns.env.user.isAuthenticated) {
            const message = `Name: ${this.tfName.inputField.value}\nEmail: ${this.tfEmail.inputField.value}\nUrl: ${this.tfUrl.inputField.value}\n Kommentar: ${this.taComnt.inputField.value}`;
            chayns.intercom.sendMessageToPage({
                text: message
            }).then(function (result) {
                if (result.ok) {
                    chayns.dialog.alert('', 'Dein Vorschlag wurde registriert.');
                } else {
                    chayns.dialog.alert('', 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.');
                }
            });
        } else {
            chayns.dialog.alert('Anmeldung notwendig', 'Um deine Seite zu registrieren, musst du angemeldet sein.');
        }
    }
}

export default Form;