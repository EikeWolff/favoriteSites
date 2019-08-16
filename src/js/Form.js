import Textfield from './form/Textfield';
import Textarea from './form/Textarea';
import { createElement, createContentElement, at } from './helper';
import createValidateBtn from './form/buttons';

class Form {
    constructor(parentElement, title, icon) {
        this.parentElement = parentElement;
        this.title = title;
        this.icon = icon;
        this._render();
    }

    _render() {
        const form = createElement(
            'div',
            this.parentElement,
            at('class', 'accordion form'),
            at('data-group', '1')
        );
        const head = createElement(
            'div',
            form,
            at('class', 'accordion__head form_head')
        );
        const headIcon = createElement(
            'div',
            head,
            at('class', 'accordion__head__icon accordion--trigger')
        );
        createElement('i', headIcon, at('class', this.icon));
        createContentElement(
            'div',
            this.title,
            head,
            at('class', 'accordion__head__title  accordion--trigger')
        );
        const body = createElement('div', form, at('class', 'accordion__body'));
        const intern = createElement(
            'div',
            body,
            at('class', 'accordion__item form_intern')
        );

        this.tfName = new Textfield(
            'Name',
            "^[\\w'\\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$",
            true,
            'form-name',
            'formName',
            intern
        );
        this.tfEmail = new Textfield(
            'Email',
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
            true,
            'form-email',
            'formEmail',
            intern
        );
        this.tfUrl = new Textfield(
            'URL',
            'https?://(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
            false,
            'form-url',
            'formUrl',
            intern
        );
        this.taComnt = new Textarea(
            'Kommentar',
            'form-comnt',
            'formComnt',
            intern
        );
        const sendForm = () => {
            if (chayns.env.user.isAuthenticated) {
                const message = `Name: ${
                    this.tfName.inputField.value
                }\nEmail: ${this.tfEmail.inputField.value}\nUrl: ${
                    this.tfUrl.inputField.value
                }\n Kommentar: ${this.taComnt.inputField.value}`;
                chayns.intercom
                    .sendMessageToPage({
                        text: message
                    })
                    .then((result) => {
                        if (result.ok) {
                            chayns.dialog.alert(
                                '',
                                'Dein Vorschlag wurde registriert.'
                            );
                        } else {
                            chayns.dialog.alert(
                                '',
                                'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.'
                            );
                        }
                    });
            } else {
                chayns.dialog.alert(
                    'Anmeldung notwendig',
                    'Um deine Seite zu registrieren, musst du angemeldet sein.'
                );
            }
        };

        this.tfName._render();
        this.tfEmail._render();
        this.tfUrl._render();
        this.taComnt._render();

        createValidateBtn(
            'Registrieren',
            intern,
            sendForm,
            this.tfName,
            this.tfEmail,
            this.tfUrl
        );

        return form;
    }
}

export default Form;
