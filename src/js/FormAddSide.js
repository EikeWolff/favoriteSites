import Textfield from './form/Textfield';
import Textarea from './form/Textarea';
import { createAccordion, createAccordionItem } from './Accordion';
import createValidateBtn from './form/buttons';
import { form as txt } from './txt';

class FormAddSide {
    constructor(appendTo, title, icon) {
        this.appendTo = appendTo;
        this.title = title;
        this.icon = icon;
    }

    render() {
        const form = createAccordion(
            this.title,
            this.icon,
            false,
            '',
            'form',
            this.appendTo
        );
        const intern = createAccordionItem(
            'div',
            form.querySelector('.acc-body-form'),
            'intern'
        );

        const tfName = new Textfield(
            txt.name,
            "^[\\w'\\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$",
            true,
            'form-name',
            'formName',
            intern
        );
        const tfEmail = new Textfield(
            txt.email,
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
            true,
            'form-email',
            'formEmail',
            intern
        );
        const tfUrl = new Textfield(
            txt.url,
            'https?://(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
            false,
            'form-url',
            'formUrl',
            intern
        );
        const taComnt = new Textarea(
            txt.comnt,
            'form-comnt',
            'formComnt',
            intern
        );
        const sendForm = () => {
            if (chayns.env.user.isAuthenticated) {
                const message = `${txt.name}: ${tfName.inputField.value}\n ${
                    txt.email
                }: ${tfEmail.inputField.value}\n ${txt.url}: ${
                    tfUrl.inputField.value
                }\n ${txt.comnt}: ${taComnt.inputField.value}`;
                chayns.intercom
                    .sendMessageToPage({
                        text: message
                    })
                    .then((result) => {
                        if (result.ok) {
                            chayns.dialog.alert('', txt.commitOk);
                        } else {
                            chayns.dialog.alert('', txt.commitFail);
                        }
                    });
            } else {
                chayns.dialog.alert(txt.loginFail, txt.loginFailSub);
            }
        };

        tfName.render();
        tfEmail.render();
        tfUrl.render();
        taComnt.render();

        createValidateBtn(
            txt.commitBtn,
            intern,
            sendForm,
            tfName,
            tfEmail,
            tfUrl
        );

        return form;
    }
}

export default FormAddSide;
