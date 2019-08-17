export const createElement = (tag, appendTo, ...attributes) => createContentElement(tag, null, appendTo, ...attributes);

export const createContentElement = (tag, content, appendTo, ...attributes) => {
    const element = document.createElement(tag);
    if (content != null) element.innerText = content;
    attributes.forEach(attribute => element.setAttribute(attribute[0], attribute[1]));
    appendTo.appendChild(element);
    return element;
};

export const at = (name, value) => [name, value];
export const c = value => ['class', value];

export const setInputLabel = (inputElement, inputLabel) => {
    switch (inputElement.type) {
        default:
        case 'text':
            if (inputElement.value !== '') inputElement.parentElement.classList.add('labelRight');
            else inputElement.parentElement.classList.remove('labelRight');
            break;
        case 'textarea':
            if (inputElement.value !== '') inputLabel.style.display = 'none';
            else inputLabel.style.display = '';
            break;
    }
};
