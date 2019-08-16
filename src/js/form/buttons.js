import { createElement, createContentElement, at } from '../helper';

const createValidateBtn = (text, appendTo, ...validateElements) => {
    createCommitBtn(text, appendTo).addEventListener('click', () => validateElements.forEach(element => element._validate()));
};

const createCommitBtn = (text, appendTo) => {
    const btnParent = createElement('div', appendTo, at('class', 'btn-send'));
    createContentElement(
        'button',
        text,
        btnParent,
        at('class', 'button')
    );

    return btnParent;
};

export default createValidateBtn;
