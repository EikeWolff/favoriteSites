import { createDiv, c } from './helper';
import { createAccordionList } from './Accordion';
import SearchBar from './SearchBar';
import createSiteItem from './list/SiteItem';
import { list } from './txt';

class SearchList {
    constructor($appendTo, title) {
        this.$appendTo = $appendTo;
        this.title = (title == null) ? list.title : title;
        this.searchValue = list.standardSearch;
    }

    render() {
        const $accordion = createAccordionList(
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
            ($input, changeObjects) => {
                for (const object of changeObjects)
                {
                    if (
                        object
                            .querySelector('.list-item__title')
                            .innerText.toUpperCase()
                            .indexOf($input.value.toUpperCase()) > -1
                    ) object.style.display = '';
                    else object.style.display = 'none';
                }
            },
            async (searchValue, $appendTo) => {
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
            },
            this.$siteList
        );

        searchbar.render();
        searchbar.trigger(this.searchValue);
    }
}

export default SearchList;
