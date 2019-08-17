import SearchList from './SearchList';
import FormAddSide from './FormAddSide';
import {
    createElement,
    createContentElement,
    c,
    createActionText
} from './helper';

class Tapp {
    constructor(appendTo) {
        this.appendTo = appendTo;
    }

    render() {
        const tapp = createElement('div', this.appendTo, c('tapp'));
        const intro = createElement('div', tapp, c('tapp__intro'));
        const content = createElement('div', tapp, c('tapp__content'));

        createContentElement('h1', 'Favorite Sites', intro, c('headline'));
        const introContent = createElement('div', intro, c('intro-content'));
        createContentElement(
            'p',
            'Hier siehst du die favorisierten Sites. Wenn du dir eine Site ansehen willst, klick einfach drauf.',
            introContent,
            c('intro_text')
        );
        const introText = createContentElement(
            'p',
            'Deine Site soll hinzugefügt werden? Das passende Formular findest du ',
            introContent,
            c('intro_text')
        );
        createActionText(
            'hier.',
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

        new SearchList(content, 'Top 50').render();

        new FormAddSide(
            content,
            'Hinzufügen',
            'react-chayns-icon ts-plus'
        ).render();
    }
}

export default Tapp;
