// Timer
document.addEventListener('DOMContentLoaded', () => {
    const timer = () => {
        // Установите конечную дату
        const deadline = new Date('2026-08-29T16:00:00');
        
        // Найдите элементы DOM
        const elDays = document.querySelector('#days .sm-timer-time_numbers');
        const elHours = document.querySelector('#hours .sm-timer-time_numbers');
        const elMinutes = document.querySelector('#minutes .sm-timer-time_numbers');
        const elSeconds = document.querySelector('#seconds .sm-timer-time_numbers');
        
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
    const addClassForModal = () => {
        document.querySelector('.sm-modal-mobile').classList.add('modal-open');
    };
    const removeClassForModal = () => {
        document.querySelector('.sm-modal-mobile').classList.remove('modal-open');
    };
    const formSubmit = (event) => {
        event.preventDefault();
        removeClassForModal();
        document.querySelector('.sm-thanks').classList.add('active');
        console.log('formSubmit');
    };
    const removeClassFromTYP = () => {
        document.querySelector('.sm-thanks').classList.remove('active');
    };

    document.querySelector('.sm-modal-close').addEventListener('click', removeClassForModal);
    document.querySelector('.open-modal').addEventListener('click', addClassForModal);
    document.querySelector('.open-modal-2').addEventListener('click', addClassForModal);

    document.getElementById('form_approve').addEventListener('submit', formSubmit);
    document.querySelector('.close_typ').addEventListener('click', removeClassFromTYP);
    
})();
// Modal End

