/* eslint-disable */

export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
    hideAlert();

    const markup = `<div class="alert alert--${type}"><span>${msg}</span></div>`;
    document.querySelector('.header').insertAdjacentHTML('afterend', markup);
    window.setTimeout(hideAlert, 5000);
};
