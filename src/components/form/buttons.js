import { createDiv, createContentElement, at } from '../utils/helper';

class buttons {
    static createValidateBtn(text, $appendTo, commitFctn, ...validateElements) {
        this.createCommitBtn(text, $appendTo).addEventListener('click', () => {
            let valid = true;
            validateElements.forEach((element) => {
                if (!element.validate()) valid = false;
            });

            if (valid) commitFctn();
        });
    }

    static createCommitBtn(text, $appendTo) {
        const btnParent = createDiv($appendTo, at('class', 'btn-send'));
        createContentElement('button', text, btnParent, at('class', 'button'));

        return btnParent;
    }
}

export default buttons;
