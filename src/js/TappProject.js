import Form from './Form';

class TappProject {
    constructor() {
        this._initDOMElements();
        this._setSearchEventListeners();

        this.$form = new Form(this.$content, 'Hinzufügen', 'react-chayns-icon ts-plus');

        fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=0&Take=50`)
            .then((response) => {
                return response.json();
            })
            .then((data) => this._appendData(data.Data))
            .catch((error) => console.log(error));
    }

    _initDOMElements() {
        this.$accordionList = document.querySelector('.accordion-list');
        this.$content = document.querySelector('.tapp__content');
        this.$siteList = this.$accordionList.querySelector('.cc__list');
        this.$searchInput = document.querySelector('.search-input')
        this.$form = document.querySelector('.form');

        document.querySelector('.here').addEventListener('click', () => this._gotoForm());
    }

    _setSearchEventListeners() {
        this.$searchInput.addEventListener('change', () => {
            this._setInputLabel(this.$searchInput);
            this._filterList();
        });
        this.$searchInput.addEventListener('input', () => {
            this._setInputLabel(this.$searchInput);
            this._filterList();
        });
        this.$searchInput.addEventListener('paste', () => {
            this._setInputLabel(this.$searchInput);
            this._filterList();
        });
        this.$searchInput.addEventListener('keypress', () => {
            this._setInputLabel(this.$searchInput);
            this._filterList();
        });
    }

    _setInputLabel(inputElement) {
        if (inputElement.value !== '')
            inputElement.parentElement.classList.add('labelRight');
        else
            inputElement.parentElement.classList.remove('labelRight');
    }

    _appendData(data) {
        this.$siteList.innerHTML = "";

        for (const site of data) {
            const listItem = document.createElement('div');
            const listItemHeader = document.createElement('div');
            const listItemImage = document.createElement('div');
            const listItemTitles = document.createElement('div');
            const listItemTitle = document.createElement('div');
            const listItemSubtitle = document.createElement('div');
            const listItemSpacer = document.createElement('div');

            listItem.appendChild(listItemHeader);
            listItemHeader.appendChild(listItemImage);
            listItemHeader.appendChild(listItemTitles);
            listItemHeader.appendChild(listItemSpacer);
            listItemTitles.appendChild(listItemTitle);
            listItemTitles.appendChild(listItemSubtitle);

            listItem.className = 'list-item list-item--clickable';
            listItemHeader.className = 'list-item__header';
            listItemImage.className = 'list-item__image';
            listItemTitles.className = 'list-item__titles';
            listItemTitle.className = 'list-item__title ellipsis';
            listItemSubtitle.className = 'list-item__subtitle ellipsis';
            listItemSpacer.className = 'list-item__spacer';

            listItemImage.style.backgroundImage = `url("https://chayns.tobit.com/storage/${site.siteId}/Images/icon-72.png")`;
            listItemTitle.innerHTML = site.appstoreName;
            listItemSubtitle.innerHTML = '';

            listItem.addEventListener('click', () => chayns.openUrlInBrowser(`http://chayns.net/${site.siteId}/`));
            this.$siteList.appendChild(listItem);
        }

        this.$listItems = this.$siteList.querySelectorAll('.list-item');
    }

    _gotoForm() {
        this.$accordionList.classList.remove('accordion--open');
        this.$form.classList.add('accordion--open');
    }

    _filterList() {
        for (const listItem of this.$listItems) {
            if ((listItem.querySelector('.list-item__title').innerHTML.toUpperCase())
                .indexOf(this.$searchInput.value.toUpperCase()) > -1)
                listItem.style.display = "";
            else
                listItem.style.display = "none";
        }
    }
}

export default TappProject;