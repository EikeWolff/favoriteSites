import {
    createDiv,
    createElement,
    createContentElement,
    at,
    c,
    setInputLabel
} from '../utils/helper';
import './searchBar.scss';

class SearchBar {
    constructor($appendTo, classSuffix, onChange, onChangeFinish, $changeItem) {
        this.$appendTo = $appendTo;
        this.classSuffix = classSuffix;
        this.onChange = onChange;
        this.onChangeFinish = onChangeFinish;
        this.$changeItem = $changeItem;
        this.timeout = null;
    }

    render() {
        const $root = createDiv(this.$appendTo);
        const $inputGroup = createDiv(
            $root,
            c(`input-group search-group-${this.classSuffix}`)
        );
        this.$searchInput = createElement(
            'input',
            $inputGroup,
            c(`input search-${this.classSuffix}`),
            at('id', `search-${this.classSuffix}`)
        );
        createContentElement(
            'label',
            'Suchen',
            $inputGroup,
            c('labelIcon'),
            at('for', `search-${this.classSuffix}`)
        );

        this.$searchInput.addEventListener('keyup', () => {
            clearTimeout(this.timeout);

            // This is done while the user is typing
            this.onChange(this.$searchInput, this.$changeItem.children);

            this.timeout = setTimeout(() => {
                // This is done after the user stopped typing
                setInputLabel(this.$searchInput);
                this.onChangeFinish(this.$searchInput.value, this.$changeItem);
            }, 800);
        });

        return $inputGroup;
    }

    trigger(input) {
        this.onChangeFinish(input, this.$changeItem);
    }
}

export default SearchBar;
