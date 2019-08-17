import './app.scss';
import Tapp from './js/Tapp';

const init = async () => {
    'use strict';

    try {
        await chayns.ready;
        chayns.ui.initAll();

        try {
            new Tapp(document.querySelector('#app')).render();
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.error('No chayns environment found', err);
    }
};

init();
