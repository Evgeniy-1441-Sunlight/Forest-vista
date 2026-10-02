$(document).ready(function () {
    $('.photo-items').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: true,
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        initialSlide: 0,
    })


    $('.reviews-slider').slick({
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        initialSlide: 1,
        infinite: true,
        speed: 600,
        variableWidth: true,
        edgeFriction: true,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    variableWidth: false,
                },
            },
            {
                breakpoint: 751,
                settings: {
                    variableWidth: true,
                    centerMode: false,
                    initialSlide: 0,
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            }
        ]

    });


    // ANIMATIONS
    new WOW().init();
    $('.design-options').css('--animate-duration', '2s');
    $('.location').css('--animate-duration', '2s');
    $('.reviews').css('--animate-duration', '2s');
    $('.booking').css('--animate-duration', '2s');
    $('.faq').css('--animate-duration', '2s');
    $('.contacts').css('--animate-duration', '2s');
    $('.footer').css('--animate-duration', '2.5s');
    $('.benefits-title').css('--animate-duration', '1.5s');
    $('#icon-1').css('--animate-duration', '1.5s');
    $('#icon-2').css('--animate-duration', '2.1s');
    $('#icon-3').css('--animate-duration', '2.6s');
    $('#info-text-1').css('--animate-duration', '3s');
    $('#info-text-2').css('--animate-duration', '3.4s');
    $('#info-text-3').css('--animate-duration', '3.8s');
//

    //SCROLL HEADER
    const header = $('.main-header')
    $(window).scroll(function () {
        if (window.scrollY > 50) {
            header.addClass('header-scroll');
        } else {
            header.removeClass('header-scroll');
        }
    })
    //
$(window).scroll(function () {
    if (window.scrollY > 800) {
        $('.btn-up').addClass('active');
    } else {
        $('.btn-up').removeClass('active');
    }
})


    //MENU BURGER
    const menuBurger = $('.menu-burger');
    const menuListBurger = $('.menu-list-burger');
    const closeBurger = $('.menu-close-burger')

    menuBurger.on('click', function () {
        menuListBurger.addClass('active');
        header.hide()
    })

    closeBurger.on('click', function () {
        menuListBurger.removeClass('active');
        header.show()
    })
    //


    // ЯНДЕКС КАРТА
    async function initMap() {
        // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
        await ymaps3.ready;

        const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker} = ymaps3;
        const content = document.createElement('map')
        // Иницилиазируем карту
        const map = new YMap(
            // Передаём ссылку на HTMLElement контейнера
            document.getElementById('map'),

            // Передаём параметры инициализации карты
            {
                location: {
                    // Координаты центра карты
                    center: [37.599184, 56.517306],

                    // Уровень масштабирования
                    zoom: 12
                }
            }
        );


        const popup = document.createElement('div')
        popup.className = 'popup';
        popup.innerHTML = '<div class="popup-card">Дмитровский проезд, 65</div>';

        const yandexMarker = document.createElement('div')
        yandexMarker.classList.add('yandex-marker');
        yandexMarker.innerHTML = '<img src="../images/yandex-marker/yandex-marker.png" alt="marker">'
        yandexMarker.appendChild(popup);

        // Инициализируйте маркер
        const marker = new YMapMarker(
            {
                coordinates: [37.599184, 56.517306],
                draggable: true
            },
            yandexMarker
        );

        // Добавляем слой для отображения схематической карты
        map.addChild(new YMapDefaultSchemeLayer());
        map.addChild(new YMapDefaultFeaturesLayer());
        map.addChild(marker);
    }
    initMap();
//


     $('.booking-field-date').on('click', (e) => {
        $('#choice-date').show()
        $('.span-text').css('display', 'none');
    })


    //ВИДЖЕТ КАЛЕНДАРЬ
//ERROR ERROR ERROR ERROR
//календарь тут с ошибкой обернул
    try {
        let dp = new AirDatepicker('#choice-date', {
            range: true,
            multipleDatesSeparator: ' - ',
            buttons: ['today', 'clear'],
            navTitles: {
                days(dp) {
                    if (dp.selectedDates.length) {
                        let date = dp.selectedDates[0];
                        return `<small>
                   Вы выбрали  ${dp.formatDate(date, 'dd MMMM yyyy')}
                </small>`;
                    }

                    return 'Выберите дату';
                }
            },
        });
        dp.hide();
    } catch (error) {
    }
    //


// МАСКА INPUT
    $(document).ready(function () {
        $('#input-phone').inputmask({mask: "9-(999) 999-99-99"});
        $('.contacts-input-phone').inputmask({mask: "9-(999) 999-99-99"});
    });


// ПОЛЕ ГОСТИ
    const svgArrow = $('.custom-select-button');
    let customList = $('.custom-select-list')
    svgArrow.click(() => {
        if (customList.css('display') === 'none') {
            customList.show();
        } else {
            customList.hide()
        }
    })

    let customItems = $('.custom-select-list li');
    // console.log(customItems);
    const customSelectText = $('.custom-select-button .span-quantity');


    let priceGuest = 0;

    customItems.each(function () {
        $(this).on('click', function () {

            let guests = $(this).text()
            customSelectText.text(guests);

            // СУММА ЗА КОЛ-ВО ГОСТЕЙ
           let guestArray = guests.split(' ');

            let numGuest = guestArray[0];
            console.log(numGuest);
            priceGuest = numGuest * 2500;

            customList.hide();
            CalculateTotalPrice()
        })
    })


// FAQ ACCORDION
    new Accordion('.accordion-container');


// MODAL WINDOW
    const modalThanksWindow = $('.modal-thanks');
    const modalClose = $('.modal-close');
    const modalWindow = $('.modal-booking');
    const modalWindowPayment = $('.modal-booking-payment');
    const darkOverlay = $('.modal-overlay-dark');

    $('.booking-btn').on('click', function () {
        darkOverlay.show();
        modalWindow.show();
    })

    modalClose.on('click', function () {
        modalWindow.hide();
        modalWindowPayment.hide()
        darkOverlay.hide();
        modalThanksWindow.hide();
    })


    const inputName = $('#input-name');
    const inputPhone = $('#input-phone');
    const inputNameError = $('.input-error-name')
    const inputPhoneError = $('.input-error-phone')


    // modalFillField
    $('.modal-btn').on('click', function (e) {

        let hasError = false;

        e.preventDefault();
        if (!inputName.val()) {
            inputName.css('border', '1px solid #BD0000FF');
            inputNameError.show()
            hasError = true;
        } else {
            inputName.css('border', 'none');
            inputNameError.hide();
        }

        if (!inputPhone.val()) {
            inputPhone.css('border', '1px solid #BD0000FF');
            inputPhoneError.show()
            hasError = true;
        } else {
            inputPhone.css('border', 'none');
            inputPhoneError.hide();
        }

        if (hasError) {
            return;
        }

        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {
                name: inputName.val(),
                phone: inputPhone.val()
            }
        })
            .done(function (response) {
                if (response.success) {
                    modalWindow.hide();
                    modalWindowPayment.show();
                } else {
                    alert('Возникла ошибка! Введите: itlogia')
                }
            });

        if (modalWindowPayment) {
            $('.customer-data-name span').text(inputName.val());
            $('.customer-data-phone span').text(inputPhone.val());
            $('.customer-data-guests span').text(customSelectText.text());
            $('.customer-data-date span').text($('#choice-date').val());
        }
    })


    // contactsFillField
    const contactNameInput = $('.contacts-input-name');
    const contactPhoneInput = $('.contacts-input-phone');
    const contactModal = $('.contact-modal-window')

    $('.form-btn').on('click', function (e) {

        let isError = false;
        if (!contactNameInput.val()) {
            e.preventDefault();
            contactNameInput.css('border', '1px solid #BD0000FF');
            inputNameError.show()
            isError = true;
        } else {
            contactNameInput.css('border', 'none');
            inputNameError.hide();
        }

        if (!contactPhoneInput.val()) {
            e.preventDefault();
            contactPhoneInput.css('border', '1px solid #BD0000FF');
            inputPhoneError.show()
            isError = true;
        } else {
            contactPhoneInput.css('border', 'none');
            inputPhoneError.hide();
        }

        if (isError) {
            return;
        }


        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {
                name: contactNameInput.val(),
                phone: contactPhoneInput.val()
            }
        })
            .done(function (msg) {
                if (msg.success) {
                    console.log('success');
                    $('.form-contacts').hide()
                    contactModal.css('display', 'flex');
                    contactNameInput.val('');
                    contactPhoneInput.val('');
                } else {
                    contactNameInput.css('border', '1px solid #BD0000FF')
                    contactPhoneInput.css('border', '1px solid #BD0000FF');
                    alert('Введите корректные данные')
                }
            });
    })

    $('.contact-close').on('click', function () {
        $('.contact-modal-window').css('display', 'none');
        $('.form-contacts').show();
    })


    $('.booking-payment-btn').on('click', function () {
        modalWindowPayment.hide()
        modalThanksWindow.css('display', 'flex');
    })


    function CalculateTotalPrice() {
        let totalPrice = price + priceGuest;

        $('.price-sum').text(totalPrice + ' руб');
        $('.customer-data-cost span').text(totalPrice + ' руб');
    }

// ДАТЫ КАЛЕНДАРЯ
    let price = 0;
    $('#choice-date').on('change', function () {
        let date = $(this).val();
        let dates = date.split(' - ');

        // ДАТУ ВЫВОЖУ В ПОСЛЕДНЕЕ ОКНО
        let oneDate = dates[0];
        $('.thank-text span').text(oneDate);
        //

        let firstDate = dates[0].split('.');
        let lastDate = dates[1].split('.');

        let date1 = new Date(firstDate[2], firstDate[1] - 1, firstDate[0]);
        let date2 = new Date(lastDate[2], lastDate[1] - 1, lastDate[0]);

        let difference = date2.getTime() - date1.getTime();

        let days = difference / (1000 * 60 * 60 * 24);


        // КАЛЕНДАРЬ СУММА
        price = days * 14436;
        console.log(price);

        CalculateTotalPrice()

    })


})





