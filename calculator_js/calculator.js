$(function() {
    // Небольшой страховочный костыль для input range
    function Range() { 
        $('.range').css({'width': $('.new-calculator__field_input').width() + 'px'});
    }
    Range();
    $(window).resize(function() {
        Range();
    });

    // Выносим данные в массив для наиболее удобной дальнейшей модификации в случае необходимости
    var data = [{
        surname: "Иванов",
        name: "Иван",
        patronym: "Иванович",
        birthdate: "01.01.1971"
    },
    {
        surname: "Петров",
        name: "Петр",
        patronym: "Петрович",
        birthdate: "02.02.1972" 
    },
    {
        surname: "Николаев",
        name: "Николай",
        patronym: "Николаевич",
        birthdate: "03.03.1973" 
    }
    ];
    // Сбрасываем данные для input
    $('.person').val('');
    $('.new-calculator__field_credit input, .new-calculator__field_month input').val('0').attr('disabled','true');
    $('.percent__payment input').attr('disabled','true').val('');
    $('.new-calculator__submit button').attr('disabled','true');
    
    // Проверка на совпадение данных
    $('.person').change(function() {
        var surname = $('.surname').val();
        var name = $('.name').val();
        var patronym = $('.patronym').val();
        var birthdate = $('.birthdate').val();
        
        for (i=0; i < data.length; i++) {
            if (surname.toUpperCase() === data[i].surname.toUpperCase() && name.toUpperCase() === data[i].name.toUpperCase() && patronym.toUpperCase() === data[i].patronym.toUpperCase() && birthdate === data[i].birthdate) {
                $('#mask').show();
                $('#myModalBox').show();
            }
        }        
    });

    // Пользователь даёт согласие на предложение
    $('#accept').click(function() {
        $('#mask').hide();
        $('#myModalBox').hide();
        $('.new-calculator__field_credit input, .new-calculator__field_credit .range').removeAttr('disabled').attr('min','35000').attr('max','1500000').val('900000');
        $('.new-calculator__field_month input').removeAttr('disabled').val('36').attr('min','12').attr('max','84');
        $('.new-calculator__submit button').removeAttr('disabled');
        $('.percent__rate input').val('15');
        $('.new-calculator__field_title-left-insurance, .new-calculator__field_insurance').hide();

        $('.new-calculator__field_credit .range').mousemove(function() {
            $('.new-calculator__field_credit input').val($('.new-calculator__field_credit .range').val());
        });
        $('.new-calculator__field_month .range').mousemove(function() {
             $('.new-calculator__field_month input').val($('.new-calculator__field_month .range').val());
        });
        // Для мобильных устройств
        $('.new-calculator__field_credit .range').change(function() {
            $('.new-calculator__field_credit input').val($('.new-calculator__field_credit .range').val());
        });
        $('.new-calculator__field_month .range').change(function() {
             $('.new-calculator__field_month input').val($('.new-calculator__field_month .range').val());
        });
    });
   // Пользователь отказывается от предложения
   $('#cancel').click(function() {
        $('#mask').hide();
        $('#myModalBox').hide();
        $('.new-calculator__field_credit input, .new-calculator__field_credit .range').removeAttr('disabled').val('50000').attr('min','50000').attr('max','1000000');
        $('.new-calculator__field_month input').removeAttr('disabled').val('12').attr('min','12').attr('max','60');
        $('.new-calculator__submit button').removeAttr('disabled');
        $('.percent__rate input').val('19');

        $('.new-calculator__field_credit .range').mousemove(function() {
            $('.new-calculator__field_credit input').val($('.new-calculator__field_credit .range').val());
        });
        $('.new-calculator__field_month .range').mousemove(function() {
             $('.new-calculator__field_month input').val($('.new-calculator__field_month .range').val());
        });
        // Для мобильных устройств
        $('.new-calculator__field_credit .range').change(function() {
            $('.new-calculator__field_credit input').val($('.new-calculator__field_credit .range').val());
        });
        $('.new-calculator__field_month .range').change(function() {
             $('.new-calculator__field_month input').val($('.new-calculator__field_month .range').val());
        });

        //Страхование
        $('.radio-circle-yes, .radio-circle-no').click(function() {
            var newClass = $(this).attr('class');
            if  (newClass === 'radio-circle-yes') {
                $('.percent__rate input').val('22');
            }
            else {
                $('.percent__rate input').val('19');
            }
            if ($('.radio-circle-active').is(":visible")) {
                $('.radio-circle-active').hide();
            }
            var el = $(this).children();
            $(el[0]).show();
        });
   });
   // Расчёт ежемесячного платежа
   $('.new-calculator__submit button').click(function() {
        var sum = Number($('.new-calculator__field_credit input').val());
        var months = Number($('.new-calculator__field_month input').val());
        var payment = Math.floor(sum / months);
        var percent = sum * Number($('.percent__rate input').val()) / 100;
        var ourPayment = Math.floor(payment + (percent/months));
        $('.percent__payment input').val(ourPayment);
   });      
});