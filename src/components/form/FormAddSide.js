import Textfield from './Textfield';
import Textarea from './Textarea';
import Accordion from '../accordion/Accordion';
import buttons from './buttons';
import txt from './txtForm';
import pattern from '../utils/txt';
import { login } from '../utils/helper';
import './formAddSide.scss';

class FormAddSide {
    constructor($appendTo, icon, title) {
        this.$appendTo = $appendTo;
        this.title = title == null ? txt.txt_title : title;
        this.icon = icon;
    }

    render() {
        const $form = Accordion.createAccordion(
            this.title,
            this.icon,
            false,
            '',
            'form',
            this.$appendTo
        );
        const $intern = Accordion.createAccordionItem(
            'div',
            $form.querySelector('.acc-body-form'),
            'intern'
        );

        const tfName = new Textfield(
            txt.txt_name,
            txt.txt_nameStandard,
            pattern.name,
            true,
            'form-name',
            'formName',
            $intern
        );
        const tfEmail = new Textfield(
            txt.txt_email,
            txt.txt_emailStandard,
            pattern.email,
            true,
            'form-email',
            'formEmail',
            $intern
        );
        const tfUrl = new Textfield(
            txt.txt_url,
            txt.txt_urlStandard,
            pattern.url,
            false,
            'form-url',
            'formUrl',
            $intern
        );
        const taComnt = new Textarea(
            txt.txt_comnt,
            'form-comnt',
            'formComnt',
            $intern
        );
        const sendForm = () => {
            const send = () => {
                const message = `${txt.txt_name}: ${tfName.value}\n ${
                    txt.txt_email
                }: ${tfEmail.value}\n ${txt.txt_url}: ${
                    tfUrl.value
                }\n ${txt.txt_comnt}: ${taComnt.value}`;
                chayns.intercom
                    .sendMessageToPage({
                        text: message
                    })
                    .then((result) => {
                        if (result.ok) {
                            tfName.reset();
                            tfEmail.reset();
                            tfUrl.reset();
                            taComnt.reset();

                            chayns.dialog.alert('', txt.txt_commitOk);
                        } else {
                            chayns.dialog.alert('', txt.txt_commitFail);
                        }
                    });
            };

            if (chayns.env.user.isAuthenticated) {
                send();
            } else {
                login(send);
            }
        };

        tfName.render();
        tfEmail.render();
        tfUrl.render();
        taComnt.render();

        buttons.createValidateBtn(
            txt.txt_commitBtn,
            $intern,
            sendForm,
            tfName,
            tfEmail,
            tfUrl
        );

        return $form;
    }
}

export default FormAddSide;
