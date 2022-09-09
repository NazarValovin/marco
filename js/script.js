
"use strict";


document.addEventListener('DOMContentLoaded', () => {


    function swiperSlider() {
        const catalogBig = document.querySelectorAll('.poppup-catalog__slider-big');
        const catalogSmall = document.querySelectorAll('.poppup-catalog__slider-small');
        const rewiew = document.querySelector('.rewiews__slider');

        catalogBig.forEach((element, i) => {
            const swiper2 = new Swiper(catalogSmall[i], {
                spaceBetween: 10,
                slidesPerView: 4,
                breakpoints: {
                    320: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    450: {
                        slidesPerView: 4,
                    },
                }
            });
            const swiper = new Swiper(element, {
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                thumbs: {
                    swiper: swiper2,
                },
            });
        });

        const swiperRewiew = new Swiper(rewiew, {
            spaceBetween: 30,
            slidesPerView: 3,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },

                634: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3
                },
            }
        });
    }
    swiperSlider();

    //Burger

    function burgerClick() {
        const burger = document.querySelector('.header__burger');
        const menu = document.querySelector('.header__nav');
        const phone = document.querySelector('.header__phone');
        const body = document.body;

        const menuMobile = document.createElement('div');
        menuMobile.classList.add('menu-mobile');

        if (burger) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('_active');
                body.classList.toggle('_active');
                menuMobile.classList.toggle('_active');
            });

            if (document.documentElement.clientWidth <= 992) {
                burger.insertAdjacentElement('afterend', menuMobile);
                menuMobile.insertAdjacentElement('beforeend', menu);
            }

            if (document.documentElement.clientWidth <= 600) {
                menuMobile.insertAdjacentElement('beforeend', phone);
            }
        }
    }
    burgerClick();

    //==============================================================


    // Paste Element

    function pasteElement() {
        const textOffer = document.querySelector('.offer__text');
        const titleOffer = document.querySelector('.offer__title h1');

        const catalogPoppups = document.querySelectorAll('.poppup-catalog');

        if (textOffer) {
            if (document.documentElement.clientWidth <= 768) {
                titleOffer.insertAdjacentElement('afterend', textOffer);
            }
        }

        if (catalogPoppups.length > 0) {
            catalogPoppups.forEach(catalogPoppup => {
                const slider = catalogPoppup.querySelectorAll('.poppup-catalog__slider');
                const discont = catalogPoppup.querySelector('.poppup-catalog__discont');

                if (document.documentElement.clientWidth <= 841) {
                    for (let index = 0; index < slider.length; index++) {
                        const element = slider[index];
                        discont.insertAdjacentElement('afterend', element);
                    }
                }
            });
        }
    }
    pasteElement();

    //=========================================================================================


    // Catalog open modal

    function colorCatalogActive(colors, parent, sliders) {
        for (let index = 0; index < colors.length; index++) {
            const color = colors[index];
            if (color.dataset.color === parent.dataset.catalogItem) {
                color.classList.add('_active');
            }
        }
        for (let index = 0; index < sliders.length; index++) {
            const slider = sliders[index];
            if (slider.dataset.slider === parent.dataset.catalogItem) {
                slider.classList.add('_active');
            }
        }
    }

    function openModalCatalog(selectorBtn) {
        const catalogBtn = document.querySelectorAll(selectorBtn);
        const catalogModal = document.querySelector('.poppup-catalog');
        const colors = document.querySelectorAll('.poppup-catalog__color-item');
        const sliders = document.querySelectorAll('.poppup-catalog__slider');
        const modalTitle = document.querySelector('.poppup-catalog__title span');
        const catalogModalClose = document.querySelector('.poppup-catalog__close');
        const body = document.body;

        if (catalogBtn.length > 0) {
            for (let index = 0; index < catalogBtn.length; index++) {
                const element = catalogBtn[index];

                const parent = element.closest('.catalog__item');

                element.addEventListener('click', () => {
                    catalogModal.classList.add('_active');
                    body.classList.add('_active');

                    modalTitle.textContent = parent.dataset.catalogItem;
                    colorBtnRemove(colors, sliders);
                    colorCatalogActive(colors, parent, sliders);
                });
                catalogModalClose.addEventListener('click', () => {
                    catalogModal.classList.remove('_active');
                    body.classList.remove('_active');
                });
            }
        }
    }
    openModalCatalog('.catalog__btn');
    openModalCatalog('.catalog__img');

    //===========================================================================================



    // Size click

    function sizeBtnRemove(sizeBtns) {
        sizeBtns.forEach(sizeBtn => {
            sizeBtn.classList.remove('_active');
        });
    }

    function sizeClickCatalog() {
        const catalogPoppups = document.querySelectorAll('.poppup-catalog');

        if (catalogPoppups.length > 0) {
            for (let index = 0; index < catalogPoppups.length; index++) {
                const catalogPoppup = catalogPoppups[index];

                const sizeBtns = catalogPoppup.querySelectorAll('.poppup-catalog__size-item');
                const sizeBtnInfo = catalogPoppup.querySelector('.poppup-catalog__size-btn');
                const sizeInfo = catalogPoppup.querySelector('.poppup-catalog__size-info');

                sizeBtns[0].classList.add('_active');

                sizeBtnInfo.addEventListener('click', () => {
                    sizeBtnInfo.classList.toggle('_active');
                    sizeInfo.classList.toggle('_active');
                });

                sizeBtns.forEach(sizeBtn => {
                    sizeBtn.addEventListener('click', () => {
                        sizeBtnRemove(sizeBtns);
                        sizeBtn.classList.add('_active');
                    });
                });
            }
        }
    }
    sizeClickCatalog();

    //==============================================================================================


    // Color click

    function activeSliderColor(colorBtn, sliders, tittle) {
        for (let index = 0; index < sliders.length; index++) {
            const slider = sliders[index];
            if (slider.dataset.slider === colorBtn.dataset.color) {
                slider.classList.add('_active');
                tittle.textContent = colorBtn.dataset.color;
            }
        }
    }

    function colorBtnRemove(colorBtns, sliders) {
        colorBtns.forEach(sizeBtn => {
            sizeBtn.classList.remove('_active');
        });
        sliders.forEach(slider => {
            slider.classList.remove('_active');
        });
    }

    function colorClickCatalog() {
        const colorBtns = document.querySelectorAll('.poppup-catalog__color-item');
        const sliders = document.querySelectorAll('.poppup-catalog__slider');
        const tittle = document.querySelector('.poppup-catalog__title span');

        colorBtns[0].classList.add('_active');
        sliders[0].classList.add('_active');

        for (let index = 0; index < colorBtns.length; index++) {
            const colorBtn = colorBtns[index];
            colorBtn.addEventListener('click', () => {
                colorBtnRemove(colorBtns, sliders);
                activeSliderColor(colorBtn, sliders, tittle);
                colorBtn.classList.add('_active');
            });
        }
    }
    colorClickCatalog();

    //==============================================================================================



    // Count

    function countNumber() {
        const counts = document.querySelectorAll('.poppup-catalog__count');
        const plus = document.querySelectorAll('.poppup-catalog__count-plus');
        const minus = document.querySelectorAll('.poppup-catalog__count-minus');
        const numberInput = document.querySelectorAll('.poppup-catalog__count-number');
        const cost = document.querySelectorAll('.poppup-catalog__cost-new span');

        if (counts.length > 0) {
            for (let index = 0; index < counts.length; index++) {
                const count = counts[index];

                let number = 1;
                numberInput[index].textContent = number;

                let costNumber = Number(cost[index].textContent);
                let num = 0;

                plus[index].addEventListener('click', () => {
                    number++;
                    numberInput[index].textContent = number;

                    num = costNumber + Number(cost[index].textContent);
                    cost[index].textContent = num;
                });

                minus[index].addEventListener('click', () => {
                    if (number <= 1) {
                        number = 1;
                    } else {
                        number--;
                        numberInput[index].textContent = number;

                        num = Number(cost[index].textContent) - costNumber;
                        cost[index].textContent = num;
                    }
                });
            }
        }
    }
    countNumber();

    //=================================================================================================


    // Catalog tabs

    function catalogTabsRemove(tabBtns, tabItems) {
        tabBtns.forEach(tabBtn => {
            tabBtn.classList.remove('_active');
        });
        tabItems.forEach(tabItem => {
            tabItem.classList.remove('_active');
        });
    }

    function tabItemsDataset(tabBtn, tabItems) {
        tabItems.forEach(tabItem => {
            if (tabBtn.dataset.tab === tabItem.dataset.content) {
                tabItem.classList.add('_active');
            }
        });
    }

    function catalogTabsClick() {
        const tabBtns = document.querySelectorAll('.poppup-catalog__tabs-btn');
        const tabItems = document.querySelectorAll('.poppup-catalog__tabs-item');

        tabBtns[0].classList.add('_active');
        tabItems[0].classList.add('_active');

        tabBtns.forEach(tabBtn => {
            tabBtn.addEventListener('click', () => {
                catalogTabsRemove(tabBtns, tabItems);
                tabItemsDataset(tabBtn, tabItems);
                tabBtn.classList.add('_active');
            });
        });
    }
    catalogTabsClick();

    //=====================================================================================================


    // Open modal form

    function modalFormOpen() {
        const catalogBtn = document.querySelector('[data-modal-form]');
        const modalForm = document.querySelector('.modal-form');
        const modalFormClose = document.querySelector('.modal-form__close');

        const modalFormTitle = document.querySelector('.modal-form__item-title');
        const modalFormSize = document.querySelector('.modal-form__item-size');
        const modalFormColor = document.querySelector('.modal-form__item-color');
        const modalFormCount = document.querySelector('.modal-form__item-count');
        const modalFormCost = document.querySelector('.modal-form__item-cost');

        const modalFormInputTitle = document.querySelector('#name-product');
        const modalFormInputSize = document.querySelector('#size');
        const modalFormInputColor = document.querySelector('#color');
        const modalFormInputCount = document.querySelector('#count');

        if (catalogBtn) {
            catalogBtn.addEventListener('click', () => {
                modalForm.classList.add('_active');

                const btnParent = catalogBtn.closest('.poppup-catalog');

                if (btnParent.classList.contains('_active')) {
                    const title = btnParent.querySelector('.poppup-catalog__title');
                    const size = btnParent.querySelectorAll('.poppup-catalog__size-item');
                    const color = btnParent.querySelectorAll('.poppup-catalog__color-item');
                    const count = btnParent.querySelector('.poppup-catalog__count-number');
                    const cost = btnParent.querySelector('.poppup-catalog__cost-new span');

                    modalFormTitle.textContent = title.textContent;
                    modalFormInputTitle.value = title.textContent;

                    for (let index = 0; index < size.length; index++) {
                        const element = size[index];
                        if (element.classList.contains('_active')) {
                            modalFormSize.textContent = element.textContent;
                            modalFormInputSize.value = element.textContent;
                        }
                    }

                    for (let index = 0; index < color.length; index++) {
                        const element = color[index];
                        if (element.classList.contains('_active')) {
                            modalFormColor.textContent = element.textContent;
                            modalFormInputColor.value = element.textContent;
                        }
                    }

                    modalFormCount.textContent = count.textContent;
                    modalFormInputCount.value = count.textContent;

                    modalFormCost.textContent = cost.textContent;
                }
            });

            modalFormClose.addEventListener('click', () => {
                modalForm.classList.remove('_active');
            });
        }
    }
    modalFormOpen();

    //======================================================================================================


    // FAQ 

    function faqOpen() {
        const faqBtns = document.querySelectorAll('.faq__item-header');
        const faqText = document.querySelectorAll('.faq__item-body');

        faqBtns.forEach((faqBtn, i) => {
            const textHeight = faqText[i].clientHeight;
            faqText[i].style.height = '0px';

            faqBtn.addEventListener('click', () => {
                if (faqBtn.classList.contains('_active')) {
                    faqBtn.classList.remove('_active');
                    faqText[i].classList.remove('_active');
                    faqText[i].style.height = '0px';
                } else {
                    faqBtn.classList.add('_active');
                    faqText[i].classList.add('_active');
                    faqText[i].style.height = `${textHeight}px`;
                }
            });
        });
    }
    faqOpen();

    //========================================================================================================



    // Click menu-link


    function goToLink(selectorElement) {
        const scrollTarget = document.querySelector(selectorElement);
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        window.scrollBy({
            top: elementPosition,
            behavior: "smooth",
        });
    }

    function clickHaderLink() {
        const menus = document.querySelectorAll("[data-menu]");
        const sections = document.querySelectorAll("[data-section]");
        const burger = document.querySelector('.header__burger');
        const menuMobile = document.querySelector('.menu-mobile');
        const body = document.body;

        if (menus.length > 0) {
            for (let index = 0; index < menus.length; index++) {
                const menu = menus[index];

                menu.addEventListener('click', (e) => {
                    e.preventDefault();
                    sections.forEach(section => {
                        if (menu.dataset.menu === section.dataset.section) {
                            goToLink(`[data-section='${section.dataset.section}']`);
                        }
                    });
                    if (document.documentElement.clientWidth <= 992) {
                        if (burger.classList.contains('_active')) {
                            burger.classList.remove('_active');
                            menuMobile.classList.remove('_active');
                            body.classList.remove('_active');
                        }
                    }
                });
            }
        }
    }
    clickHaderLink();

    //------------------------------------------------------------------


    //Click btn catalog

    function clickBtnCatalog() {
        const btns = document.querySelectorAll('[data-catalog]');

        if (btns.length > 0) {
            for (let index = 0; index < btns.length; index++) {
                const btn = btns[index];
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    goToLink('[data-section="Каталог"]');
                });
            }
        }
    }
    clickBtnCatalog();

    //======================================================================


    // Click radio

    function radioChecked(item, adress, delivery) {
        if (item.checked && item.classList.contains('pickup')) {
            adress.classList.add('_active');
            delivery.classList.remove('_active');
        }
        if (item.checked && item.classList.contains('courier')) {
            adress.classList.remove('_active');
            delivery.classList.add('_active');
        }
    }

    function clickRadioForm() {
        const radioBtns = document.querySelectorAll('input[type="radio"]');
        const delivery = document.querySelector('.modal-form__form-delivery');
        const adress = document.querySelector('.modal-form__form-adress');

        if (radioBtns.length > 0) {
            radioBtns.forEach(item => {
                radioChecked(item, adress, delivery);

                item.addEventListener('click', () => {
                    radioChecked(item, adress, delivery);
                });
            });
        }
    }
    clickRadioForm();

    //========================================================================


    // Send Mail Catalog

    function catalogModalClose(catalogModal, modalForm) {
        catalogModal.forEach(el => {
            if (el.classList.contains('_active')) {
                el.classList.remove('_active');
            }
        });

        if (modalForm.classList.contains('_active')) {
            modalForm.classList.remove('_active');
        }
    }

    function modalSuccessClose(succesClose, succes, body) {
        succesClose.addEventListener('click', () => {
            succes.classList.remove('_active');
            if (body.classList.contains('_active')) {
                body.classList.remove('_active');
            }
        });
    }
    async function kassaAPI() {
        await fetch('https://api.yookassa.ru/v3/payments', {
            method: 'POST',
            headers: {
                '': '',
                'Idempotence-Key': 'live_j6dHxf_ILUDDboEvdFNxA91fnGdiWbwYZVRMXMc12U',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'amount': {
                    'value': '2.00',
                    'currency': 'RUB'
                },
                'confirmation': {
                    'type': 'embedded'
                },
                'capture': true,
                'description': 'Заказт №1'
            })

        }).then(data => data.json())
            .then(data => {
                console.log(data);
            });
    }

    function sendMailCatalog() {
        const succes = document.querySelector('.modal-success');
        const succesClose = document.querySelector('.modal-success__close');
        const modalForm = document.querySelector('.modal-form');
        const catalogModal = document.querySelectorAll('.poppup-catalog');
        const body = document.body;
        const form = document.getElementById('form');

        modalSuccessClose(succesClose, succes, body);

        // form.addEventListener('submit', formSend);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            kassaAPI();
        });

        // async function formSend(e) {
        //     e.preventDefault();

        //     let formData = new FormData(form);

        //     let response = await fetch('./mail.php', {
        //         method: 'POST',
        //         body: formData
        //     });
        //     if (response.ok) {
        //         let result = await response.json();
        //         succes.classList.add('_active');
        //         console.log(result.message);
        //         form.reset();

        //         catalogModalClose(catalogModal, modalForm);
        //     } else {
        //         alert("Ошибка");
        //     }
        // }
    }
    sendMailCatalog();

    //======================================================================





});