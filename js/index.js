const showNavMenuSearchForm = () => {
    try {

        const form = document.querySelector('.nav-menu__search-block .search-form');

        document.addEventListener('click', (e) => {
            const target = e.target;
            const withinBoundaries = e.composedPath().includes(form);

            if (target.closest('.nav-menu__item.-search')) {
                form.classList.toggle('visible');
            } else if (!withinBoundaries) {
                form.classList.remove('visible');
            }
        });

    } catch (error) {

    }
};

const newsSlider = () => {

    try {

        const splide = new Splide('.news-splide', {
            pagination: false,
            rewind: true,
            gap: 50,
            speed: 1200,
            rewindByDrag: true,
            releaseWheel: true,
            type: 'loop',
        });

        splide.mount();

    } catch (error) {

    }

};

const offerSlider = () => {

    try {

        const splide = new Splide('.offer-splide', {
            arrows: false,

            height: 600,

            classes: {
                pagination: 'splide__pagination offer-splide__pagination',
                page: 'splide__pagination__page offer-splide__pagination-page',
            },

            drag: false,
            type: 'fade',

            breakpoints: {
                1024: {
                    height: 500,
                    pagination: false,
                    arrows: true,
                }
            }
        });

        splide.on('pagination:mounted', function (data) {
            // You can add your class to the UL element
            data.list.classList.add('splide__pagination--custom');

            const content = [
                `                <div class="offer-slider__page-container">
                <span class="offer-slider__page-text">
                    Закупки товара в Китае.
                </span>
                <i class="fa fa-angle-right offer-slider__page-icon" aria-hidden="true"></i>
            </div>`,
                `                <div class="offer-slider__page-container">
                <span class="offer-slider__page-text">
                    1688, TaoBao или AliBaba
                </span>
                <i class="fa fa-angle-right offer-slider__page-icon" aria-hidden="true"></i>
            </div>`
            ]

            // `items` contains all dot items
            data.items.forEach(function (item, index) {
                item.button.innerHTML = content[index];
            });
        });

        splide.mount();

        const arrows = document.querySelectorAll('.offer-splide .splide__arrow');
        const triggers = document.querySelectorAll('.splide__pagination__page');
        const titles = document.querySelectorAll('.offer-slide__title');
        const lines = document.querySelectorAll('.offer-slide__line');
        const texts = document.querySelectorAll('.offer-slide__text');
        const buttons = document.querySelectorAll('.offer-slide__button');
        const contentContainers = document.querySelectorAll('.offer-slide__inner');


        const changeClass = (collection, arrowIndex, className) => {

            collection.forEach((el, index) => {

                el.classList.remove(className);

                if (arrowIndex === index) {
                    el.classList.add(className);
                }
            });

        };


        triggers.forEach((el, index) => {

            const triggerIndex = index;

            el.addEventListener('click', () => {

                changeClass(lines, triggerIndex, '-anim-show-line');
                changeClass(titles, triggerIndex, '-anim-show-title');
                changeClass(texts, triggerIndex, '-anim-show-text');
                changeClass(buttons, triggerIndex, '-anim-show-button');
                changeClass(contentContainers, triggerIndex, '-anim-show-bg');
            });
        });

        if (arrows !== null) {
            arrows.forEach((el, index) => {

                let triggerIndex = index;

                el.addEventListener('click', () => {
                    changeClass(lines, triggerIndex, '-anim-show-line');
                    changeClass(titles, triggerIndex, '-anim-show-title');
                    changeClass(texts, triggerIndex, '-anim-show-text');
                    changeClass(buttons, triggerIndex, '-anim-show-button');
                    changeClass(contentContainers, triggerIndex, '-anim-show-bg');
                });
            });
        }

    } catch (error) {

    }


};

const attachNavigationMenu = () => {

    try {
        const menu = document.querySelector('.nav-menu');
        const menuHeight = menu.clientHeight;

        window.addEventListener('scroll', () => {
            let scroll = window.scrollY;

            if (scroll > menuHeight) {
                menu.classList.add('fixed');
            } else {
                menu.classList.remove('fixed');
            }
        })
    } catch (error) {

    }
};

const benefitsSlider = () => {

    try {
        const contentWrappers = document.querySelectorAll('.benefits-slider__content-item-wrap');
        const content = document.querySelector('.benefits__wrapper');

        const intervalCallback = () => {

            let currentIndex = null;
            let randomIndex = Math.floor(Math.random() * contentWrappers.length);

            contentWrappers.forEach((el, index) => {
                if (el.classList.contains('active')) {
                    el.classList.remove('active');
                    currentIndex = index;
                };
            });

            while (randomIndex === currentIndex) {
                randomIndex = Math.floor(Math.random() * contentWrappers.length);
            };

            try {
                contentWrappers[randomIndex].classList.add('active');
            } catch (error) { }

        };

        let intervalId = setInterval(intervalCallback, 3000);

        content.addEventListener('mouseover', (e) => {
            const target = e.target;

            if (target.closest('.benefits-slider__trigger')) {
                clearInterval(intervalId);

                contentWrappers.forEach((el) => {
                    el.classList.remove('active');
                });

                document.onmousemove = (e) => {
                    const target = e.target;

                    if (!target.closest('.benefits-slider__trigger')) {
                        contentWrappers[Math.floor(Math.random() * contentWrappers.length)].classList.add('active');
                        intervalId = setInterval(intervalCallback, 3000);
                        document.onmousemove = null;
                    };
                };
            };
        });
    } catch (error) {

    }

};

const showFooterNavMenu = () => {

    try {
        const wrapper = document.querySelector('.footer__nav-wrapper');
        wrapper.addEventListener('click', (e) => {
            const target = e.target;

            if (target.closest('.footer__nav-link')) {

                try {
                    const nextElement = target.parentNode.nextElementSibling;

                    if (nextElement.classList.contains('-f-sub-menu')) {
                        if (!nextElement.classList.contains('visible')) {
                            nextElement.classList.add('visible');
                            nextElement.style.maxHeight = nextElement.scrollHeight + 'px';
                        } else {
                            nextElement.classList.remove('visible');
                            nextElement.style.maxHeight = 0 + 'px';
                        }
                    }

                } catch (error) {
                    console.log('error');
                }
            }
        })
    } catch (error) {

    }


};

const showBurgerMenu = () => {

    try {
        const burgerMenu = document.querySelector('.burger-menu__inner');
        const burgerMenuWrapper = document.querySelector('.burger-menu');

        document.addEventListener('click', (e) => {
            const target = e.target;
            const withinBoundaries = e.composedPath().includes(burgerMenu);

            const paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;

            if (target.closest('.burger-button')) {
                burgerMenuWrapper.classList.add('visible');

                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = paddingOffset;

            } else if (target.closest('.burger-menu__close-button')) {
                burgerMenuWrapper.classList.remove('visible');

                document.body.style.overflow = 'visible';
                document.body.style.paddingRight = 0;

            } else if (!withinBoundaries) {
                burgerMenuWrapper.classList.remove('visible');

                document.body.style.overflow = 'visible';
                document.body.style.paddingRight = 0;
            }
        });
    } catch (error) {

    }


};

const attachPhoneMask = () => {
    document.addEventListener("DOMContentLoaded", function () {
        var phoneInputs = document.querySelectorAll('input[type="tel"]');

        var getInputNumbersValue = function (input) {
            return input.value.replace(/\D/g, '').replace(/^[0-9]/, "7");;
        }

        var onPhonePaste = function (e) {
            var input = e.target,
                inputNumbersValue = getInputNumbersValue(input);
            var pasted = e.clipboardData || window.clipboardData;
            if (pasted) {
                var pastedText = pasted.getData('Text');
                if (/\D/g.test(pastedText)) {
                    input.value = inputNumbersValue;
                    return;
                }
            }
        }

        var onPhoneInput = function (e) {
            var input = e.target,
                inputNumbersValue = getInputNumbersValue(input),
                selectionStart = input.selectionStart,
                formattedInputValue = "";

            if (!inputNumbersValue) {
                return input.value = "";
            }

            if (input.value.length != selectionStart) {
                if (e.data && /\D/g.test(e.data)) {
                    input.value = inputNumbersValue;
                }
                return;
            }

            if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
                if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
                var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
                formattedInputValue = input.value = firstSymbols + " ";
                if (inputNumbersValue.length > 1) {
                    formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
                }
                if (inputNumbersValue.length >= 5) {
                    formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
                }
                if (inputNumbersValue.length >= 8) {
                    formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
                }
                if (inputNumbersValue.length >= 10) {
                    formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
                }
            } else {
                formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
            }
            input.value = formattedInputValue;
        }
        var onPhoneKeyDown = function (e) {
            var inputValue = e.target.value.replace(/\D/g, '');
            if (e.keyCode == 8 && inputValue.length == 1) {
                e.target.value = "";
            }
        }
        for (var phoneInput of phoneInputs) {
            phoneInput.addEventListener('keydown', onPhoneKeyDown);
            phoneInput.addEventListener('input', onPhoneInput, false);
            phoneInput.addEventListener('paste', onPhonePaste, false);
        }
    })

}

const initContactsMap = () => {

    try {
        let center1 = [52.02710857207237, 113.48362199999994];
        let center2 = [52.01744857204756, 113.50749899999997];

        const tabsButtonsContainer = document.querySelector('.contacts__tabs-buttons');
        const tabsContent = document.querySelectorAll('.contacts__tabs-contentItem');
        const tabsButtons = document.querySelectorAll('.contacts__tabs-button');

        const init = () => {
            let map = new ymaps.Map('contacts-map', {
                center: center1,
                zoom: 17,
            });

            let placemark1 = new ymaps.Placemark(center1, { }, {
                iconLayout: 'default#image',
                iconImageHref: './images/contacts/pointer.svg',
                iconImageSize: [60, 60],
                iconImageOffset: [-40, -100],
            });

            let placemark2 = new ymaps.Placemark(center2, { }, {
                iconLayout: 'default#image',
                iconImageHref: './images/contacts/pointer.svg',
                iconImageSize: [60, 60],
                iconImageOffset: [-40, -100],
            });

            tabsButtonsContainer.addEventListener('click', (e) => {
                const target = e.target;

                if (target.classList.contains('contacts__tabs-button')) {

                    const buttonDataAttr = target.getAttribute('data-tab-button');

                    if (buttonDataAttr === 'tab1') {
                        map.setCenter(center1);
                    } else if (buttonDataAttr === 'tab2') {
                        map.setCenter(center2);
                    }

                    
                    tabsButtons.forEach(button => {button.classList.remove('active')});
                    target.classList.add('active');

                    tabsContent.forEach(contentItem => {
                        const contentDataAttr = contentItem.getAttribute('data-tab-content');

                        contentItem.classList.remove('active');

                        if (buttonDataAttr === contentDataAttr) {
                            contentItem.classList.add('active');
                        };
                    });
                };
            });


            map.controls.remove('geolocationControl'); // удаляем геолокацию
            map.controls.remove('searchControl'); // удаляем поиск
            map.controls.remove('trafficControl'); // удаляем контроль трафика
            map.controls.remove('typeSelector'); // удаляем тип
            map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
            map.controls.remove('rulerControl'); // удаляем контрол правил
            map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
            map.controls.remove('zoomControl'); // удаляем контрол зуммирования

            map.geoObjects.add(placemark1);
            map.geoObjects.add(placemark2);
        }

        ymaps.ready(init);
    } catch (error) { }

}

initContactsMap();
attachPhoneMask();
showBurgerMenu();
showNavMenuSearchForm();
newsSlider();
attachNavigationMenu();
offerSlider();
benefitsSlider();
showFooterNavMenu();