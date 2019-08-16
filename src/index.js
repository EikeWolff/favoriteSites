import './app.scss';
import TappProject from './js/TappProject';

const init = async () => {
    'use strict';

    try {
        await chayns.ready;
        chayns.ui.initAll();

        try {
            new TappProject();
        } catch(err) {
            console.log(err);
        }
    } catch (err) {
        console.error('No chayns environment found', err);
    }
};

init();
