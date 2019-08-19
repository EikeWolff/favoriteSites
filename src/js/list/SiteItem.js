import { createDiv, c } from '../helper';

const createSiteItem = (site, $appendTo) => {
    const $listItem = createDiv(
        $appendTo,
        c('list-item list-item--clickable')
    );
    const $listItemHeader = createDiv(
        $listItem,
        c('list-item__header')
    );
    const $listItemBack = createDiv(
        $listItemHeader,
        c('list-item__image')
    );
    const $listItemImage = createDiv(
        $listItemBack,
        c('list-item__image')
    );
    const $listItemTitles = createDiv(
        $listItemHeader,
        c('list-item__titles')
    );
    const $listItemTitle = createDiv(
        $listItemTitles,
        c('list-item__title ellipsis')
    );
    const $listItemSubtitle = createDiv(
        $listItemTitles,
        c('list-item__subtitle ellipsis')
    );
    createDiv($listItemHeader, c('list-item__spacer'));

    $listItemBack.style.backgroundImage = 'url("https://chayns.tobit.com/storage/75508-06235/Images/icon-72.png")';
    $listItemImage.style.backgroundImage = `url("https://chayns.tobit.com/storage/${
        site.siteId
    }/Images/icon-72.png")`;
    $listItemTitle.innerText = site.appstoreName === ''
            ? 'Kein Seitenname vorhanden 😕'
            : site.appstoreName;
    $listItemSubtitle.innerText = '';

    $listItem.addEventListener('click', () => chayns.openUrlInBrowser(`http://chayns.net/${site.siteId}/`));
};

export default createSiteItem;
