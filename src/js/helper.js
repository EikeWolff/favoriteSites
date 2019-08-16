export const createElement = (tag, appendTo, ...attributes) => createContentElement(tag, null, appendTo, ...attributes);

export const createContentElement = (tag, content, appendTo, ...attributes) => {
    const element = document.createElement(tag);
    if (content != null) element.innerText = content;
    attributes.forEach(attribute => element.setAttribute(attribute[0], attribute[1]));
    appendTo.appendChild(element);
    return element;
};

export const at = (name, value) => [name, value];
