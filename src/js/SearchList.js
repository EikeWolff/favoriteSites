import { createElement, c } from './helper';
import { createAccordionList } from './Accordion';
import SearchBar from './SearchBar';
import createSiteItem from './list/SiteItem';

class SearchList {
    constructor(appendTo, title) {
        this.appendTo = appendTo;
        this.title = title;
        this.searchValue = 'love';
    }

    render() {
        const accordion = createAccordionList(
            this.title,
            'ts-angle-right',
            true,
            'list',
            this.appendTo
        );
        this.$siteList = createElement(
            'div',
            accordion.querySelector('.acc-body-list'),
            c('cc__list list--expandable')
        );
        const searchbar = new SearchBar(
            accordion.querySelector('.acc-badge-list'),
            'list',
            (input, changeObjects) => {
                for (const object of changeObjects)
                {
                    if (
                        object
                            .querySelector('.list-item__title')
                            .innerText.toUpperCase()
                            .indexOf(input.value.toUpperCase()) > -1
                    ) object.style.display = '';
                    else object.style.display = 'none';
                }
            },
            async (searchValue, appendTo) => {
                await fetch(
                    `https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchValue}&Skip=0&Take=50`
                )
                    .then(response => response.json())
                    .then((data) => {
                        while (appendTo.hasChildNodes()) {
                            appendTo.removeChild(appendTo.lastChild);
                        }

                        data.Data.forEach((site) => {
                            createSiteItem(site, appendTo);
                        });
                    })
                    .catch(error => console.log(error));
            },
            this.$siteList
        );

        searchbar.render();
        searchbar.trigger('love');
    }
}

export default SearchList;
