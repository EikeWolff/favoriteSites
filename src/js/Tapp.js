import SearchList from './SearchList';
import FormAddSide from './FormAddSide';

class Tapp {
    render() {
        const content = document.querySelector('.tapp__content');

        new SearchList(content, 'Top 50').render();

        new FormAddSide(
            content,
            'Hinzufügen',
            'react-chayns-icon ts-plus'
        ).render();
    }

    _gotoForm() {
        this.$accordionList.classList.remove('accordion--open');
        this.$form.classList.add('accordion--open');
    }
}

export default Tapp;
