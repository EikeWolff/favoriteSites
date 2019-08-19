import SearchList from './SearchList';
import FormAddSide from './FormAddSide';
import {
    createDiv,
    createContentElement,
    c,
    createActionText
} from './helper';
import { intro as txt } from './txt';

class Tapp {
    constructor(appendTo) {
        this.appendTo = appendTo;
    }

    render() {
        const tapp = createDiv(this.appendTo, c('tapp'));
        const intro = createDiv(tapp, c('tapp__intro'));
        const content = createDiv(tapp, c('tapp__content'));

        createContentElement('h1', txt.title, intro, c('headline'));
        const introContent = createDiv(intro, c('intro-content'));
        createContentElement(
            'p',
            txt.start,
            introContent,
            c('intro_text')
        );
        const introText = createContentElement(
            'p',
            txt.middle,
            introContent,
            c('intro_text')
        );
        createActionText(
            txt.end,
            () => {
                content
                    .querySelector('.acc-root-list')
                    .classList.remove('accordion--open');
                content
                    .querySelector('.acc-root-form')
                    .classList.add('accordion--open');
            },
            introText
        );

        new SearchList(content).render();

        new FormAddSide(
            content,
            'react-chayns-icon ts-plus'
        ).render();
    }
}

export default Tapp;
