// Timer
document.addEventListener('DOMContentLoaded', () => {
    const timer = () => {
        // Установите конечную дату
        const deadline = new Date('2026-08-29T16:00:00');
        
        // Найдите элементы DOM
        const elDays = document.querySelector('#days .sm-timer-time_number-span');
        const elHours = document.querySelector('#hours .sm-timer-time_number-span');
        const elMinutes = document.querySelector('#minutes .sm-timer-time_number-span');
        const elSeconds = document.querySelector('#seconds .sm-timer-time_number-span');
        
        // Функция склонения числительных
        const declensionNum = (num, words) => {
            return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
        };

        // Функция обновления таймера
        const updateTimer = () => {
            const now = new Date();
            const diff = Math.max(0, deadline - now);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            elDays.textContent = String(days).padStart(2, '0');
            elHours.textContent = String(hours).padStart(2, '0');
            elMinutes.textContent = String(minutes).padStart(2, '0');
            elSeconds.textContent = String(seconds).padStart(2, '0');

            elDays.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
            elHours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
            elMinutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
            elSeconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);

            if (diff === 0) {
                clearInterval(timerId);
            }
        };

        // Запустите таймер
        updateTimer();
        const timerId = setInterval(updateTimer, 1000);
    };
    timer();
});
// Timer End

// Modal
(() => {
    const form = document.getElementById('form_approve');
    const addClassForModal = () => {
        document.querySelector('.sm-modal-mobile').classList.add('modal-open');
    };
    const removeClassForModal = () => {
        document.querySelector('.sm-modal-mobile').classList.remove('modal-open');
    };
    const sendToBot = (message) => {
        const TOKEN = '8521166016:AAGrr08Y2KAYQkEr_pM2mkzp00lIcDPBlPs';
        const USER_ID = '769398036';
        const URI_API = `https://aged-surf-5bc9.00corsair0.workers.dev/bot${TOKEN}/sendMessage`;

        fetch(URI_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: USER_ID,
                parse_mode: 'html',
                text: message,
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Сообщение отправлено!');
                form.reset();
            } else {
                console.log('Ошибка при отправке');
            }
        })
        .catch(error => console.error('Ошибка:', error));
    };
    const getMessage = () => {
        const data = Object.fromEntries(new FormData(form));
        const alcoArray = Object.keys(data).filter((item) => item.includes('alco'));

        let message = `Кто-то не поленился и отписался по свадьбе!\n`;
        message += `Человек: ${ data.myName }\n`;
        message += `Придёт: ${ data.choice ? 'Да' : 'Нет' }`;

        if (data.friendsName) {
            message += `\nНамечается +N: ${ data.friendsName }`;
        }
        if (alcoArray.length > 0) {
            const dataAlco = {
                alco1: 'Шампанское',
                alco2: 'Белое вино',
                alco3: 'Красное вино',
                alco4: 'Коньяк',
                alco5: 'Самогон',
                alco6: 'Безалкогольные напитки',
            };
            message += `\nХочет на стол: ${ alcoArray.reduce((result, item, index) => {
                console.log('item', item);
                result+= `${dataAlco[item]}`;

                if (Number(index) + 1 !== Number(alcoArray.length)) {
                    result+= ', ';
                }
                return result;
            }, '') }`;
        }

        return message;
    };
    const formSubmit = function (event) {
        event.preventDefault();
        removeClassForModal();
        document.querySelector('.sm-thanks').classList.add('active');

        const message = getMessage();

        console.log('message', message);
        sendToBot(message);
    };
    const removeClassFromTYP = () => {
        document.querySelector('.sm-thanks').classList.remove('active');
    };

    document.querySelector('.sm-modal-close').addEventListener('click', removeClassForModal);
    document.querySelector('.open-modal').addEventListener('click', addClassForModal);
    document.querySelector('.open-modal-2').addEventListener('click', addClassForModal);

    form.addEventListener('submit', formSubmit);
    document.querySelector('.close_typ').addEventListener('click', removeClassFromTYP);
    
})();
// Modal End

