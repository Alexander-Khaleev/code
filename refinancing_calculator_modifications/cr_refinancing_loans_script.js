$(document).ready(function () {

    $(".form-result__container").css({"opacity":"0"}); // Для того, чтобы пользователю не было видно перерасчета калькулятора

    // Функция-ядро для запуска логики              
    var getNewInsuranceVariant = function() {
        this.oldUnsuranceRatesPercent = ajaxForm.percent; // Выносим ставку в переменную для дальнейших расчётов
        this.newInsuranceRate; // Выносим значение страховой ставки по матрице КЗЗ в переменную для дальнейших расчётов
        this.newInsuranceFlag = 1; // Флаг для страхования
        this.insuranceFlagChecked = 1;
        this.dopField = 500000;
        this.maxSumma = 2000000; // Максимальная сумма кредита по рефинансированию

        // Кэшируем основные элементы
        this.$timeC = $('#time-c'); // Новый срок кредита
        this.$simmC = $("#simm-c"); // Сумма нового кредита
        this.$insuranceBonus = $("#insurance-bonus"); // Страховая премия
        this.$percentC = $('#percent-c'); // Ставка
        this.$monthPay = $("#month-pay-c"); // Новый ежемесячный платеж
        this.$refinancingSumm = $("#cr_refinancing_loans_summ"); // Осталось заплатить
        this.$refinancingSummDop = $("#cr_refinancing_loans_summ_dop"); // Хочу получить дополнительно
        this.$refinancingSummOst = $("#cr_refinancing_loans_summ_ost"); // Плачу сейчас
        this.$timeRange = $("#cr_refinancing_loans_time"); // Срок кредита - ползунок 
        this.$refinPlusYear = $(".refin__plus_year"); // Год +1
        this.$refinMinusYear = $(".refin__minus_year"); // Год -1
        this.$payAdvantages = $("#pay_advantages"); // Вы будете платить на ... меньше
        this.$inputRange = $("#cr_refinancing_loans_summ_dop_value_output").parent().find(".input__range"); // Получаем блок со слайдером под инпутом "Хочу получить дополнительно"
        this.$inputRangeInput = $(this.$inputRange).find("input"); // Получаем сам инпут слайдера "Хочу получить дополнительно"
    }

    getNewInsuranceVariant.prototype.setDefaultYear = function () {
        ajaxForm.time = 7; // Устанавливаем по умолчанию 7 лет для срока кредита
        this.$timeC.html(ajaxForm.time+' '+pluralize(ajaxForm.time, 'год', 'года', 'лет'));
    }

    getNewInsuranceVariant.prototype.setDefaultData = function () {
        var inputSigns = $(".input__sign-text");
        $(inputSigns[1]).css({"opacity":"0"}); // Скрываем сумму в поле "Плачу сейчас"

        var valMaxDop = this.maxSumma - Number(this.$refinancingSumm.val());
        $("#can-get-c").html(NumPrettify(valMaxDop));
    }

    getNewInsuranceVariant.prototype.bindEvents = function () {
        var self = this;
        // Флажок "Включить страхование жизни"
        $('#cr_refinancing_loans_life_insurance').on("change", function() {
            if (self.insuranceFlagChecked === 1 && ajaxForm.percent === self.oldUnsuranceRatesPercent)  {
                ajaxForm.percent += 3.1;
                self.$insuranceBonus.html(0 + " ₽"); // Выставляем в правое поле страховую премию
                self.$percentC.html(ajaxForm.percent.toString().replace('.', ','));
                self.newInsuranceFlag = 0;
                self.insuranceFlagChecked = 0;
                var newCreditSumm = NumPrettify(Number(self.$refinancingSumm.val()) + Number(self.$refinancingSummDop.val()));            
                self.$simmC.html(newCreditSumm);
                self.PayAddClient(Number(self.$refinancingSumm.val()) + Number(self.$refinancingSummDop.val())); 
            }
            else { 
                ajaxForm.percent = self.oldUnsuranceRatesPercent;
                self.calculateInsuranseRate(ajaxForm.summ, ajaxForm.time *12); // Вызов функции для пересчёта при переключении флага "Включить страхование жизни"
                self.$percentC.html(ajaxForm.percent.toString().replace('.', ','));
                self.newInsuranceFlag = 1; 
                self.insuranceFlagChecked = 1;
            }
        });

         // Сумма кредита
         this.$refinancingSumm.on("change", function() {
                // Связь между полем "Осталось заплатить" и "Хочу получить дополнительно" 
                var newValSummOst = $(this).val();
                var valMaxDop = self.maxSumma - newValSummOst;
                self.dopField = valMaxDop;
        
                self.$inputRangeInput.attr("max", valMaxDop);
                $("#can-get-c").html(NumPrettify(valMaxDop));
                sliderInit(self.$refinancingSummDop);
                if (self.newInsuranceFlag === 1) {
                    self.calculateInsuranseRate(ajaxForm.summ, ajaxForm.time *12);
                }
                else {
                    self.PayAddClient(Number(self.$refinancingSumm.val()) + Number(self.$refinancingSummDop.val())); 
                }
                setTimeout(function() {self.calculateClientAdvantage()}, 1000); 
        });
        
        // Поле "Хочу получить дополнительно"
        this.$refinancingSummDop.on("change", function() {
            self.PayDop();
            if (self.newInsuranceFlag === 1) {
                self.calculateInsuranseRate(ajaxForm.summ, ajaxForm.time *12);
            }
            else {
                self.PayAddClient(Number(self.$refinancingSumm.val()) + Number(self.$refinancingSummDop.val())); 
            }
        });
            
        // Срок кредита
        // Ползунок
        this.$timeRange.on("change", function() {
            if (self.newInsuranceFlag === 1) {
                self.calculateInsuranseRate(ajaxForm.summ, ajaxForm.time*12);       
                setTimeout(function() {self.calculateClientAdvantage()}, 1000);
            }
            else {
                self.PayAddClient(Number(self.$refinancingSumm.val()) + Number(self.$refinancingSummDop.val())); 
            }
        });

        // Кнопки + и - справа  
        this.$refinPlusYear.on("click", function() {
                if (ajaxForm.time < 7) {
                    ajaxForm.time += 1;
                    self.$timeC.html(ajaxForm.time  +' '+pluralize(ajaxForm.time, 'год', 'года', 'лет'));
                }
                if (self.newInsuranceFlag === 1) {
                    self.calculateInsuranseRate(ajaxForm.summ, ajaxForm.time*12);
                    setTimeout(function() {self.calculateClientAdvantage()}, 1000);
                }
                else {
                    self.PayAddClient(Number(self.$refinancingSumm.val()) + Number(self.$refinancingSummDop.val())); 
                }
        });
    
        this.$refinMinusYear.on("click", function() {
                if (ajaxForm.time > 1) {
                    ajaxForm.time -= 1;
                    self.$timeC.html(ajaxForm.time +' '+pluralize(ajaxForm.time , 'год', 'года', 'лет'));       
                }    
                if (self.newInsuranceFlag === 1) {
                    self.calculateInsuranseRate(ajaxForm.summ, ajaxForm.time *12);
                    setTimeout(function() {self.calculateClientAdvantage()}, 1000);
                }
                else {
                    self.PayAddClient(Number(self.$refinancingSumm.val()) + Number(self.$refinancingSummDop.val())); 
                }
        });
    
        // Редактируемость блока "Новый ежемесячный платеж"
        /*this.$monthPay.on("blur", function() {
                self.calculateNewPeriod();
                setTimeout(self.calculateClientAdvantage(), 1000);
                animateNumbers('month-pay-c', Number($(this).text().replace(/\s/gi,"")), '<i class="currency currency_rub"></i>', 0);
        });*/
    
        // Кнопки + и - (Новый ежемесячный платеж)
        /*$(".refin__plus_pay").click(function() {
                var refinPay = Number(this.$monthPay.text().replace(/\s/gi,"")) + 100;
                self.calculateNewPeriod();
                setTimeout(self.calculateClientAdvantage(), 1000);
                animateNumbers('month-pay-c', refinPay, '<i class="currency currency_rub"></i>', 0);
        });*/
    
        /*$(".refin__minus_pay").click(function() {
                var refinPay = Number(this.$monthPay.text().replace(/\s/gi,"")) - 100;
                self.calculateNewPeriod();
                setTimeout(self.calculateClientAdvantage(), 1000);
                animateNumbers('month-pay-c', refinPay, '<i class="currency currency_rub"></i>', 0);
        });*/
    
        this.$refinancingSummOst.change(function() {
                setTimeout(function() { self.calculateClientAdvantage()}, 1000);
        });
    
        // Редактируемость блока "Итоговый ежемесячный платеж с учетом доп. средств на руки"
        /*$("#refin__new_pay").on("blur", function() {
                self.calculateNewPeriod("dop");
                animateNumbers('refin__new_pay', Number($(this).text().replace(/\s/gi,"")), '<i class="currency currency_rub"></i>', 0);
        });*/
    
        // Кнопки + и - (Новый ежемесячный платеж с учетом доп. средств на руки)
        /*$(".refin__plus").click(function() {
                var refinPay = Number($("#refin__new_pay").text().replace(/\s/gi,"")) + 100;
                self.calculateNewPeriod();
                animateNumbers('refin__new_pay', refinPay, '<i class="currency currency_rub"></i>', 0);
        });*/
            
        /*$(".refin__minus").click(function() {
                var refinPay = Number($("#refin__new_pay").text().replace(/\s/gi,"")) - 100;
                self.calculateNewPeriod();
                animateNumbers('refin__new_pay', refinPay, '<i class="currency currency_rub"></i>', 0);
        });*/

        // Для показв тултипов
        $(window).on("resize", function() {
            if ($(window).width() < 768) {
                $(".slice__promt").hide();
            }
            else {
                $(".slice__promt").show();
            }
        });
    }

    // Проверка суммы и периода страхования по матрице КЗЗ
    getNewInsuranceVariant.prototype.checkRatesKZZ = function(creditSumm, creditAdd) {
        // Все варианты с 5%
        if (creditSumm < 600000 && creditAdd <= 36) {
            this.newInsuranceRate = 0.05;
        }
        // Все варианты с 4%
        else if (creditSumm < 600000 && creditAdd <= 84) {
            this.newInsuranceRate = 0.04;
        }
        // Все варианты с 3.80%
        else if ((creditSumm > 600000 && creditAdd <= 36) && (creditSumm <= 2000000 && creditAdd <= 36)) {
            this.newInsuranceRate = 0.038;
        }
        // Все варианты с 3.50%
        else {
            this.newInsuranceRate = 0.035;
        }
    }
    
    // Функция для расчёта страховой премии
    getNewInsuranceVariant.prototype.calculateInsuranseRate = function(creditSumm, creditAdd) {
        // Для расчета используется не более 60 месяцев
        if (creditAdd > 60) {
            creditAdd = 60;
        }
        creditSumm = Number(creditSumm) + Number(this.$refinancingSummDop.val());
        this.checkRatesKZZ(creditSumm, creditAdd); // Прогоняем данные по матрице КЗЗ без учёта страховой надбавки
        var date = new Date();
        date.setMonth(date.getMonth() + creditAdd);
        var newDate = new Date();
        var resultDate = parseInt((date-newDate)/1000);
        var days = parseInt(resultDate/60/60/24);
        var newCreditSumm = Math.floor(creditSumm / (1-this.newInsuranceRate / 365 * days));	
        this.checkRatesKZZ(newCreditSumm, creditAdd); // Прогоняем данные по матрице КЗЗ с учётом страховой надбавки
        var creditPercentNew = Math.floor(newCreditSumm * this.newInsuranceRate / 365 * days);
        var lastCreditSumm = Math.floor(creditSumm / (1-this.newInsuranceRate / 365 * days));
        var creditPercentString = creditPercentNew.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
        var newCreditString = lastCreditSumm.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');       
        this.$insuranceBonus.html(creditPercentString + " ₽"); // Выставляем в правое поле страховую премию
        this.$simmC.html(newCreditString); 
        this.PayAddClient(lastCreditSumm); // Вызываем расчёт ежемесячного платежа
        this.PayDop();  
    }

    // Расчет новых ежемесячных платежей
    getNewInsuranceVariant.prototype.PayAddClient = function(lastCreditSumm) {
        var n1 = ajaxForm.time*12,
            i = ajaxForm.percent/12/100,
            newCreditAdd = lastCreditSumm;    
         
        var newPayAdd = newCreditAdd*((i + (i/(Math.pow((1+i), n1)-1))).toFixed(5));
        newPayAdd = newPayAdd.toFixed();

        animateNumbers('refin__new_pay', newPayAdd, '<i class="currency currency_rub"></i>', 0);
    }

    // Ежемесячный платеж (Плачу сейчас * коэффициент аннуитета)
    getNewInsuranceVariant.prototype.PayDop = function() {  
        var n1 = ajaxForm.time*12;
        var i = ajaxForm.percent/12/100;
        var newPayAddDop = Number(this.$refinancingSumm.val()) * ((i + (i/(Math.pow((1+i), n1)-1))).toFixed(5));
        newPayAddDop = newPayAddDop.toFixed();

        animateNumbers('month-pay-c', newPayAddDop, '<i class="currency currency_rub"></i>', 0);
    }

    // Функция для расчета нового периода при редактировании поля "Новый ежемесячный платеж"
    getNewInsuranceVariant.prototype.calculateNewPeriod = function(dop) {
        // Проверяем ежемесячный платеж (простой или с дополнительными условиями)
        if (dop) {
            var newPayAdd = Number($("#refin__new_pay").text().replace(/\s/gi,""));
            var newCreditSumm = Number(this.$refinancingSummDop.val()) + Number(this.$simmC.text().replace(/\s/gi,""));
        }
        else {
            var newPayAdd = Number(this.$monthPay.text().replace(/\s/gi,""));
            var newCreditSumm = Number(this.$simmC.text().replace(/\s/gi,""));
        }
        var monthPayResult = Math.ceil((newCreditSumm / newPayAdd) / 12);
        ajaxForm.time = monthPayResult;    
        this.$timeC.html(ajaxForm.time+' '+pluralize(ajaxForm.time, 'год', 'года', 'лет'));
    }

    // Функция для расчета блока "Вы будете платить на ... больше"
    getNewInsuranceVariant.prototype.calculateClientAdvantage = function () {
        var payNow = Number(this.$refinancingSummOst.val());
        var payNew = Number(this.$monthPay.text().replace(/\s/gi,""));
        var payAdvantage;
        if (payNew >= payNow) {
            this.$payAdvantages.hide();
        }
        else {
            this.$payAdvantages.show();
            payAdvantage = payNow - payNew;
            animateNumbers('pay_less', payAdvantage, '<i class="currency currency_rub"></i>', 0);
        }
    }

    // Функция для расстановки тултипов-подсказок
    getNewInsuranceVariant.prototype.getTooltips = function() {
        if ($(window).width() > 768) {
            $("label[for='cr_refinancing_loans_summ_ost']").parent().append('<div class="prompt slice__promt"><a class="prompt__item prompt__item-js" data-content="Сумма всех ежемесячных платежей в других банках по всем кредитам и кредитным картам"></a></div>');
            $("label[for='cr_refinancing_loans_summ']").parent().append('<div class="prompt slice__promt"><a class="prompt__item prompt__item-js" data-content="Остаток задолженности по всем кредитам и кредитным картам в других банках"></a></div>');
            initPopover($('.prompt__item-js'));
        }
    }

    // Функция-разделитель числа по триадам
    function NumPrettify(num) {
        var n = num.toString();
        var separator = " ";
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
    }

    // Запуск через функцию, чтобы попасть после загрузки main.js
    var timer = setInterval( function() {
        if (document.querySelector('form[name="cr_refinancing_loans"]')) {
            var core = new getNewInsuranceVariant();
            core.setDefaultYear();
            core.calculateInsuranseRate(ajaxForm.summ, 7*12); // Вызов функции перерасчёта при загрузке страницы
            core.bindEvents();
            core.getTooltips(); // Подсказки(знаки вопроса)
            setTimeout(function() {core.calculateClientAdvantage()}, 1000); // Вычисляем, есть ли преимущество для клиента в ежемесячном платеже
            setTimeout(function() {core.setDefaultData()}, 100); 
            $(".form-result__container").css({"opacity":"1"}); // Для того, чтобы пользователю не было видно пересчета калькулятора         
            clearInterval(timer);
        }
    }, 10);
});
