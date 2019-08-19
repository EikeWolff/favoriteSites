import Textfield from './form/Textfield';
import Textarea from './form/Textarea';
import { createAccordion, createAccordionItem } from './Accordion';
import createValidateBtn from './form/buttons';
import { form as txt, pattern } from './txt';

class FormAddSide {
    constructor(appendTo, icon, title) {
        this.appendTo = appendTo;
        this.title = (title == null) ? txt.title : title;
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
            pattern.name,
            true,
            'form-name',
            'formName',
            intern
        );
        const tfEmail = new Textfield(
            txt.email,
            pattern.email,
            true,
            'form-email',
            'formEmail',
            intern
        );
        const tfUrl = new Textfield(
            txt.url,
            pattern.url,
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
