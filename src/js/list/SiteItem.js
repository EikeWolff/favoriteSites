import { createElement, c } from '../helper';

const createSiteItem = (site, appendTo) => {
    const listItem = createElement(
        'div',
        appendTo,
        c('list-item list-item--clickable')
    );
    const listItemHeader = createElement(
        'div',
        listItem,
        c('list-item__header')
    );
    const listItemBack = createElement(
        'div',
        listItemHeader,
        c('list-item__image')
    );
    const listItemImage = createElement(
        'div',
        listItemBack,
        c('list-item__image')
    );
    const listItemTitles = createElement(
        'div',
        listItemHeader,
        c('list-item__titles')
    );
    const listItemTitle = createElement(
        'div',
        listItemTitles,
        c('list-item__title ellipsis')
    );
    const listItemSubtitle = createElement(
        'div',
        listItemTitles,
        c('list-item__subtitle ellipsis')
    );
    createElement('div', listItemHeader, c('list-item__spacer'));

    listItemBack.style.backgroundImage = 'url("https://chayns.tobit.com/storage/75508-06235/Images/icon-72.png")';
    listItemImage.style.backgroundImage = `url("https://chayns.tobit.com/storage/${
        site.siteId
    }/Images/icon-72.png")`;
    listItemTitle.innerText = site.appstoreName === ''
            ? 'Kein Seitenname vorhanden 😕'
            : site.appstoreName;
    listItemSubtitle.innerText = '';

    listItem.addEventListener('click', () => chayns.openUrlInBrowser(`http://chayns.net/${site.siteId}/`));
};

export default createSiteItem;
