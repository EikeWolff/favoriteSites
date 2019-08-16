class TappProject {
    constructor() {
        this._initDOMElements();
        this._initForm();
        this._setSearchEventListeners();
        fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=0&Take=50`)
            .then((response) => {
                return response.json()
            })
            .then((data) => this._appendData(data.Data))
            .catch((error) => console.log(error));
    }

    _initDOMElements() {
        this.$accordionList = document.querySelector('.accordion-list');
        this.$siteList = this.$accordionList.querySelector('.cc__list');
        this.$searchInput = document.querySelector('.search-input')
        this.$form = document.querySelector('.form');

        document.querySelector('.here').addEventListener('click', () => this._gotoForm());
    }

    _initForm() {
        const $formIntern = this.$form.querySelector('.form_intern');
        this.$formName = $formIntern.querySelector('.form-name').children;
        this.$formEmail = $formIntern.querySelector('.form-email').children;
        this.$formURL = $formIntern.querySelector('.form-url').children;
        this.$formComnt = $formIntern.querySelector('.form-comment').children;

        const $formBtn = $formIntern.querySelector('.btn-send');
        $formBtn.addEventListener('click', () => this._sendForm());

        this.$formName[0].setAttribute('pattern', "^[\\w'\\-,.][^0-9_!¡?÷?¿/\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$");
        this.$formEmail[0].setAttribute('pattern', "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        this.$formURL[0].setAttribute('pattern', "https?://(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)");
        
        this._setValidationListeners(this.$formName);
        this._setValidationListeners(this.$formEmail);
        this._setValidationListeners(this.$formURL);
    }

    _setSearchEventListeners() {
        this.$searchInput.addEventListener('change', () => this._filterList());
        this.$searchInput.addEventListener('input', () => this._filterList());
        this.$searchInput.addEventListener('paste', () => this._filterList());
        this.$searchInput.addEventListener('keypress', () => this._filterList());
    }

    _sendForm() {
        if (this._validate(this.$formName) 
            && this._validate(this.$formEmail)
            && this._validate(this.$formURL))

            if (chayns.env.user.isAuthenticated) {
                const message = `Name: ${this.$formName[0].value}\nEmail: ${this.$formEmail[0].value}\nUrl: ${this.$formURL[0].value}\n Kommentar: ${this.$formComnt[0].value}`;
                chayns.intercom.sendMessageToPage({
                    text: message
                }).then(function (result) {
                    if (result.ok) {
                        chayns.dialog.alert('', 'Dein Vorschlag wurde registriert.');
                    } else {
                        chayns.dialog.alert('', 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.');
                    }
                });
            } else {
                chayns.dialog.alert('Anmeldung notwendig', 'Um deine Seite zu registrieren, musst du angemeldet sein.');
            }
        else
            chayns.dialog.alert('', 'Ungültige Eingabe.')
    }

    _setValidationListeners(formElement) {
        formElement[0].addEventListener('onchange', () => this._validate(formElement));
        formElement[0].addEventListener('input', () => this._validate(formElement));
        formElement[0].addEventListener('keypress', () => this._validate(formElement));
        formElement[0].addEventListener('paste', () => this._validate(formElement));
    }

    _validate(formElement) {
        const valid = (formElement[0].required && new RegExp(formElement[0].getAttribute('pattern')).test(formElement[0].value))
                        || (!formElement[0].required && formElement[0].value === '');

        if (valid) {
            formElement[0].classList.remove('input--invalid');
            formElement[1].classList.remove('input--invalid');
        } else {
            formElement[0].classList.add('input--invalid');
            formElement[1].classList.add('input--invalid');
        }

        return valid;
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