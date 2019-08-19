import {
    createDiv,
    createElement,
    createContentElement,
    at,
    c
} from '../utils/helper';

class Accordion {
    static createAccordion(
        title,
        icon,
        open,
        className,
        classSuffix,
        $appendTo
    ) {
        const $accordion = createDiv(
            $appendTo,
            c(
                `accordion ${
                    open ? 'accordion--open' : ''
                } ${className} acc-root-${classSuffix}`
            ),
            at('data-group', '1')
        );
        const $head = createDiv(
            $accordion,
            c(`accordion__head acc-head-${classSuffix}`)
        );
        const $headIcon = createDiv(
            $head,
            c('accordion__head__icon accordion--trigger')
        );
        createElement('i', $headIcon, c(icon));
        createContentElement(
            'div',
            title,
            $head,
            c(
                `accordion__head__title  accordion--trigger acc-title-${classSuffix}`
            )
        );
        createDiv($head, c(`accordion__head__right acc-badge-${classSuffix}`));
        createDiv($accordion, c(`accordion__body acc-body-${classSuffix}`));

        return $accordion;
    }

    static createAccordionList(title, icon, open, classSuffix, appendTo) {
        return this.createAccordion(
            title,
            icon,
            open,
            'accordion-list',
            classSuffix,
            appendTo
        );
    }

    static createAccordionItem(tag, $appendTo, classSuffix) {
        return createElement(
            tag,
            $appendTo,
            c(`accordion__item acc-item-${classSuffix}`)
        );
    }
}

export default Accordion;
