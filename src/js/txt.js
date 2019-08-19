export const intro = {
    title: 'Favorite Sites',

    start: 'Hier siehst du die favorisierten Sites. Wenn du dir eine Site ansehen willst, klick einfach drauf.',
    middle: 'Deine Site soll hinzugefügt werden? Das passende Formular findest du ',
    end: 'hier.'
};

export const list = {
    title: 'Top 50',

    fetchLinkStart: 'https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=',
    fetchLinkEnd: '&Skip=0&Take=50',
    standardSearch: 'love'
};

export const form = {
    title: 'Hinzufügen',

    name: 'Name',
    email: 'Email',
    url: 'Url',
    comnt: 'Kommentar',

    commitBtn: 'Registrieren',
    commitOk: 'Dein Vorschlag wurde registriert.',
    commitFail: 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.',

    loginFail: 'Anmeldung notwendig',
    loginFailSub: 'Um deine Seite zu registrieren, musst du angemeldet sein.'
};

export const pattern = {
    name: "^[\\w'\\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$",
    email: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
    url: 'https?://(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)'
};
