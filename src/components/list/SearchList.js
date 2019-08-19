import { createDiv, c } from '../utils/helper';
import Accordion from '../accordion/Accordion';
import SearchBar from './SearchBar';
import createSiteItem from './SiteItem';
import { list } from '../utils/txt';

class SearchList {
    constructor($appendTo, title) {
        this.$appendTo = $appendTo;
        this.title = title == null ? list.title : title;
        this.searchValue = list.standardSearch;
    }

    render() {
        const $accordion = Accordion.createAccordionList(
            this.title,
            'ts-angle-right',
            true,
            'list',
            this.$appendTo
        );
        this.$siteList = createDiv(
            $accordion.querySelector('.acc-body-list'),
            c('cc__list list--expandable')
        );
        const searchbar = new SearchBar(
            $accordion.querySelector('.acc-badge-list'),
            'list',
            // While the user is typing the list elements are filtered
            ($input, changeObjects) => {
                changeObjects.forEach((object) => {
                    if (
                        object
                            .querySelector('.list-item__title')
                            .innerText.toUpperCase()
                            .indexOf($input.value.toUpperCase()) > -1
                    ) object.style.display = '';
                    else object.style.display = 'none';
                });
            },
            // When the user finished typing the new data is loaded
            async (searchValue, $appendTo) => {
                chayns.showWaitCursor();
                await fetch(
                    `${list.fetchLinkStart}${searchValue}${list.fetchLinkEnd}`
                )
                    .then(response => response.json())
                    .then((data) => {
                        while ($appendTo.hasChildNodes()) {
                            $appendTo.removeChild($appendTo.lastChild);
                        }

                        data.Data.forEach((site) => {
                            createSiteItem(site, $appendTo);
                        });
                    })
                    .catch(error => console.log(error));
                chayns.hideWaitCursor();
            },
            this.$siteList
        );

        searchbar.render();
        searchbar.trigger(this.searchValue);
    }
}

export default SearchList;
