class cardSite {
    constructor() {
        this.$cardFrom = $("#card2card_form_internet_card_from"); // Карта отправителя
        this.$cardBig = $('select[id^="card2card_form_internet_uralsib_to"]'); // Общий чекбокс "Карта получателя"
        this.$comission = $('#simm-c'); // Сюда вписывается информация о комиссии
        this.$perevod = $('#month-pay-c'); // Сюда вписывается информация о переводе
        this.$summPlus = $('#time-c'); // Сюда вписывается информация о сумме вместе с комиссией
        this.$buttonLink = $('#button__link-internet'); // Ссылка интернет-банка
        this.$summ = $('#card2card_form_internet_summ'); // Сумма перевода
        this.$noService = $('#no__service'); // Сервис отсутствует 
        this.$summRow = $('#time-c_row'); // Контейнер поля "Сумма перевода с комиссией"
        this.$tab2 = $('#tab-tab2'); // Таб банкоматов и терминалах
        this.noComissionArray = ['uralsib-debit-uralsib_card-recipient', 'uralsib-debit-mir-uralsib_card-recipient', 'visa-uralsib-recipient', 'visa-uralsib-credit-recipient', 'mc-uralsib-recipient', 'mc-recipient'];
        this.rates = [
            ['uralsib-debit-other_card-recipient', 1.5, 60],
            ['uralsib-debit-mir-other_card-recipient', 1.5, 40],
            ['uralsib-credit-uralsib_card-recipient', 3.99, 300],
            ['uralsib-credit-other_card-recipient', 3.99, 300],
            ['mc-mc-recipient', 1.5, 60],
            ['visa-visa-recipient', 1.5, 60],
            ['visa-mir-recipient', 1.5, 60],
            ['mc-visa-recipient', 2, 60],
            ['visa-mc-recipient', 2, 60],
            ['mc-mir-recipient', 1.5, 60],
            ['mir-uralsib-mir-recipient', 1.5, 40],
            ['mir-uralsib-visa-mc-recipient', 1.5, 40],
            ['mir-uralsib-credit-new-recipient', 1.5, 40],
        ];
    }

    // Функция-разделитель числа по триадам
    NumPrettify(num) {
        let n = num.toString();
        let separator = " ";
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
    }

    // Получение актуального чекбокса "Карта получателя"
    getCardTo() {
        for (let i of this.$cardBig) {
            if ($(i).is(":hidden") === false) {
                return $(i).val();
            }
        }
    }

    // Основная функция расчета
    calculate() {
        let sender = this.$cardFrom.val();
        let recipient = this.getCardTo();
        let result = `${sender}-${recipient}`;
        let summ = Number(this.$summ.val().replace(' ', ''));
        let com, summPer;
        // Проверка на совпадение перевода без комиссии
        if (this.noComissionArray.includes(result) !== -1) {
            this.$comission.text('Отсутствует');
        } 
        // Рассчитываем комиссию 
        else {
            for (let value of this.rates) {
                if (value[0] === result) {
                    // Проверка на расчет комиссии по кредитной карте
                    if (sender.indexOf('credit') !== -1) {
                        com = Math.ceil(summ / 100 * value[1] + value[2]);
                    }
                    // Обычная карта
                    else {
                        com = summ / 100 * value[1] > value[2] ? Math.ceil(summ / 100 * value[1]) : value[2];
                    }
                }
            } 
        }
        // Проставляем все значения
        summPer = com ? summ + com : summ;
        if (result === 'visa-mc-recipient' && this.$tab2.is(':checked')) {
            this.$noService.show();
            this.$buttonLink.hide();
        }
        else {
            this.$buttonLink.attr('href','https://card2card.uralsib.ru/?amount=' + summ); 
            this.$buttonLink.show();
            this.$noService.hide();
        }
        if (com) {
            com = this.NumPrettify(com);
            animateNumbers(this.$perevod, summ, '<i class="currency currency_rub"></i>', 0);
            this.$comission.html(`${com} <i class="currency currency_rub"></i>`);
            animateNumbers(this.$summPlus, summPer, '<i class="currency currency_rub"></i>', 0);
            this.$summRow.show();
        } 
        else {
            animateNumbers(this.$perevod, summ, '<i class="currency currency_rub"></i>', 0);
            this.$summRow.hide();
        }
    }

    bindEvents() {
        let _this = this;
        this.$cardFrom.on('change', _this.calculate.bind(_this));
        this.$cardBig.on('change', _this.calculate.bind(_this));
        this.$summ.on('change', _this.calculate.bind(_this));   
    }
}

class cardOffices extends cardSite {
    constructor() {
        super();
        this.$cardFrom = $("#card2card_form_offices_card_from"); // Карта отправителя
        this.$cardBig = $('select[id^="card2card_form_offices_uralsib_to"]'); // Общий чекбокс "Карта получателя"
        this.$comission = $('#simm-c-offices'); // Сюда вписывается информация о комиссии
        this.$perevod = $('#month-pay-c-offices'); // Сюда вписывается информация о переводе
        this.$summPlus = $('#time-c-offices'); // Сюда вписывается информация о сумме вместе с комиссией
        this.$buttonLink = $('#button__link-offices'); // Ссылка интернет-банка
        this.$summ = $('#card2card_form_offices_summ'); // Сумма перевода
        this.$summRow = $('#time-c_row-offices'); // Контейнер поля "Сумма перевода с комиссией"
        this.noComissionArray = ['uralsib-debit-uralsib_card-recipient'];
        this.rates = [
            ['uralsib-debit-other_card-recipient', 1.5, 60],
            ['uralsib-credit-uralsib_card-recipient', 3.99, 300],
            ['uralsib-credit-other_card-recipient', 3.99, 300],
            ['visa-visa-recipient', 1.5, 60],
            ['visa-mc-recipient', 2, 60],
            ['visa-visa-recipient', 1.5, 60],
            ['mc-mc-recipient', 1.5, 60],
            ['mc-visa-recipient', 2, 60],
            ['partner-visa-recipient', 1.5, 60],
            ['partner-mc-recipient', 1.5, 60],
        ];
    }
}