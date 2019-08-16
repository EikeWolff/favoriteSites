class TappProject {
    constructor() {
        this._initDOMElements();
        this._initForm();
        fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=0&Take=50`)
                .then((response) => {return response.json()} )
                .then((data) => this._appendData(data.Data))
                .catch((error) => console.log(error));
    }

    _initDOMElements() {
        this.$accordionList = document.querySelector('.accordion-list');
        this.$siteList = this.$accordionList.querySelector('.cc__list');
        this.$form     = document.querySelector('.form');

        document.querySelector('.here').addEventListener('click', () => this._gotoForm());
    }

    _initForm() {
        const $formIntern = this.$form.querySelector('.form_intern');
        this.$formName   = $formIntern.querySelector('.form-name');
        this.$formEmail  = $formIntern.querySelector('.form-email');
        this.$formURL    = $formIntern.querySelector('.form-url');
        this.$formComnt  = $formIntern.querySelector('.form-comment');

        const $formBtn    = $formIntern.querySelector('.btn-send');
        $formBtn.addEventListener('click', () => this._sendForm());
        this.$formEmail.addEventListener('onchange', () => this._validateName());
    }

    _sendForm() {
        if (this.$formName.value === '')
            this.$formName.style.borderColor = 'red';
        if (this.$formName.value === '')
            this.$formName.style.borderColor = 'red';
        if (this.$formName.value === '')
            this.$formName.style.borderColor = 'red';
    }

    _validateName() {
        
    }

    _appendData(data) {
        this.$siteList.innerHTML = "";

        for(const site of data) {
            const listItem          = document.createElement('div');
            const listItemHeader    = document.createElement('div');
            const listItemImage     = document.createElement('div');
            const listItemTitles    = document.createElement('div');
            const listItemTitle     = document.createElement('div');
            const listItemSubtitle  = document.createElement('div');
            const listItemSpacer    = document.createElement('div');

            listItem.appendChild(listItemHeader);
            listItemHeader.appendChild(listItemImage);
            listItemHeader.appendChild(listItemTitles);
            listItemHeader.appendChild(listItemSpacer);
            listItemTitles.appendChild(listItemTitle);
            listItemTitles.appendChild(listItemSubtitle);

            listItem.className          = 'list-item list-item--clickable';
            listItemHeader.className    = 'list-item__header';
            listItemImage.className     = 'list-item__image';
            listItemTitles.className    = 'list-item__titles';
            listItemTitle.className     = 'list-item__title ellipsis';
            listItemSubtitle.className  = 'list-item__subtitle ellipsis';
            listItemSpacer.className    = 'list-item__spacer';

            listItemImage.style.backgroundImage = `url("https://chayns.tobit.com/storage/${site.siteId}/Images/icon-72.png")`;
            listItemTitle.innerHTML    = site.appstoreName;
            listItemSubtitle.innerHTML = '';

            listItem.addEventListener('click', () => chayns.openUrlInBrowser(`http://chayns.net/${site.siteId}/`));
            this.$siteList.appendChild(listItem);
        }
    }

    _gotoForm() {
        console.log('HERE!');
        this.$accordionList.classList.remove('accordion--open');
        this.$form.classList.add('accordion--open');
    }
}

export default TappProject;
