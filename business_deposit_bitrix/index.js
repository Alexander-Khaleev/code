$(document).ready(function e() { 

    var ratesData = JSON.parse('<?=htmlspecialchars_decode($arResult["RATES"]);?>');
    var ratesDataMonthRoubles = '<?=$arResult["PROPERTIES"]["RATES_RUB_MONTH"]["VALUE"]?>'.split(",");
    var ratesDataMonthUsd = '<?=$arResult["PROPERTIES"]["RATES_USD_MONTH"]["VALUE"]?>'.split(",");
    var ratesDataMonthEuro = '<?=$arResult["PROPERTIES"]["RATES_EURO_MONTH"]["VALUE"]?>'.split(",");
    var showTablesFlag = '<?=$arResult["PROPERTIES"]["SHOW_TABLES"]["VALUE"]?>';

    var roubleTerm, dollarTerm, eurTerm, roubleRates = [], dollarRates = [], eurRates = [], roubleRatesYear = [], dollarRatesYear = [], eurRatesYear = [], roubleRatesMonth = [], usdRatesMonth = [], eurRatesMonth = [];

    getCurrencyTerms([[ratesData.rub, 'rub'], [ratesData.usd, 'usd'], [ratesData.eur, 'eur']]);
    getDepositRatesBitrix([[roubleTerm, 'rub'], [dollarTerm, 'usd'], [eurTerm, 'eur']]);
    getCurrenciesRatesMonth([[ratesDataMonthRoubles, 'rub'], [ratesDataMonthUsd, 'usd'], [ratesDataMonthEuro, 'eur']]);     

    function getDepositRatesBitrix(rates) {
        for (var i = 0; i < rates.length; i++) {
            for (var element in rates[i][0]) {
                if (rates[i][1] === 'rub') {
                    var newRubObject = {"hi": 0, "lo": 500000, "term": Number(element), "ps": Number(rates[i][0][element])};
                    roubleRates.push(newRubObject);
                    roubleRatesYear.push(Number(rates[i][0][element]));
                }
                else if (rates[i][1] === 'usd') {
                    var newUsdObject = {"hi": 0, "lo": 15000, "term": Number(element), "ps": Number(rates[i][0][element])}
                    dollarRates.push(newUsdObject);
                    dollarRatesYear.push(Number(rates[i][0][element]));
                }
                else {
                    var newEurObject = {"hi": 0, "lo": 15000, "term": Number(element), "ps": Number(rates[i][0][element])}
                    eurRates.push(newEurObject);
                    eurRatesYear.push(Number(rates[i][0][element]));
                }
            }
        }
    }

    function getCurrenciesRatesMonth(rates) {
        for (var i = 0; i < rates.length; i++) {
            for (var j = 0; j < rates[i][0].length; j++) {
                if (rates[i][1] === 'rub') {
                    roubleRatesMonth.push(Number(rates[i][0][j].trim()));
                }
                else if (rates[i][1] === 'usd') {
                    usdRatesMonth.push(Number(rates[i][0][j].trim()));
                } 
                else {
                    eurRatesMonth.push(Number(rates[i][0][j].trim()));
                }
            }
        }
    }

    function getCurrencyTerms(terms) {
        for (var i = 0; i < terms.length; i++) {
            for (var element in terms[i][0]) {
                if (terms[i][1] === 'rub') {
                    roubleTerm = ratesData.rub[element].term;
                }
                else if (terms[i][1] === 'usd') {                    
                    dollarTerm = ratesData.usd[element].term;
                }
                else {                    
                    eurTerm = ratesData.eur[element].term;
                }
            }
        }
    }

    var _classicDeposit = {
        "kind": "classic",
        "flags": {"Пополнение": "нет", "Расход": "нет"},
        "setup": {
            "rub": {
                "avaliable": true,
                "limits": [500000, 0],
                "terms": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 30, 36],
                "mode": "m"
            },
            "usd": {
                "avaliable": true,
                "limits": [15000, 0],
                "terms": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 30, 36],
                "mode": "m"
            },
            "eur": {
                "avaliable": true,
                "limits": [15000, 0],
                "terms": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 30, 36],
                "mode": "m"
            }
        },
        "rates": {
            "rub": roubleRates,
            "usd": dollarRates,
            "eur": eurRates
        }
    };

    var _depositRatesFixes = {
        'rub': {
            'm': roubleRatesMonth,
            'p': roubleRatesYear
        },
        'usd': {
            'm': usdRatesMonth,
            'p': dollarRatesYear
        },
        'eur': {
            'm': eurRatesMonth,
            'p': eurRatesYear
        }
    };

    if (showTablesFlag === "Y") {
        var tableMonthString = '<tr><td colspan="1"><b>Срок, мес.</b></td><td colspan="3" align="center"><b>Ставка, %</b></td></tr><tr><td colspan="1"><b></b></td><td colspan="1"><b>RUB </b></td><td colspan="1"><b>USD </b></td><td colspan="1"><b>EUR </b></td></tr>';
        var tableYearString = '<tr><td colspan="1"><b>Срок, мес.</b></td><td colspan="3" align="center"><b>Ставка, %</b></td></tr><tr><td colspan="1"><b></b></td><td colspan="1"><b>RUB </b></td><td colspan="1"><b>USD </b></td><td colspan="1"><b>EUR </b></td></tr>';
        var roubleMonthEl, usdMonthEl, eurMonthEl;
        var roubleYearEl, usdYearEl, eurYearEl;
        for (var i = 0; i < _classicDeposit.setup.rub.terms.length; i++) {
            roubleMonthEl = roubleRatesMonth[i] !== undefined && roubleRatesMonth[i] !== 0 ? roubleRatesMonth[i].toString().replace('.',',') : "&ndash;";
            usdMonthEl = usdRatesMonth[i] !== undefined &&  usdRatesMonth[i] !== 0 ? usdRatesMonth[i].toString().replace('.',',') : "&ndash;";
            eurMonthEl = eurRatesMonth[i] !== undefined && eurRatesMonth[i] !== 0 ? eurRatesMonth[i].toString().replace('.',',') : "&ndash;";
            roubleYearEl = roubleRatesYear[i] !== undefined && roubleRatesYear[i] !== 0 ? roubleRatesYear[i].toString().replace('.',',') : "&ndash;";
            usdYearEl = dollarRatesYear[i] !== undefined && dollarRatesYear[i] !== 0 ? dollarRatesYear[i].toString().replace('.',',') : "&ndash;";
            eurYearEl = eurRatesYear[i] !== undefined && eurRatesYear[i] !== 0 ? eurRatesYear[i].toString().replace('.',',') : "&ndash;";
            tableMonthString += '<tr><td colspan="1">' + _classicDeposit.setup.rub.terms[i] + '</td>';
            tableMonthString += '<td colspan="1">' + roubleMonthEl  + '</td>';
            tableMonthString += '<td colspan="1">' + usdMonthEl  + '</td>';
            tableMonthString += '<td colspan="1">' + eurMonthEl  + '</td></tr>';
            tableYearString += '<tr><td colspan="1">' + _classicDeposit.setup.rub.terms[i] + '</td>';
            tableYearString += '<td colspan="1">' + roubleYearEl  + '</td>';
            tableYearString += '<td colspan="1">' + usdYearEl  + '</td>';
            tableYearString += '<td colspan="1">' + eurYearEl  + '</td></tr>';
        }
        $("#month__table").append(tableMonthString);
        $("#year__table").append(tableYearString);
        $("#bets__tables").show();
    }

        var $container = $('._calculate'),
            $result    = $container.find('._calculate__result'),
            $term      = $container.find('._calculate__term'),
            $currency  = $container.find('._calculate__currency'),
            $rate      = $container.find('._calculate__rate'),
            $percent   = $container.find('._calculate__percent'),
            $error     = $container.find('._calculate__error');

        var elements = {
            currency: '._currency',
            amount:   '._deposit_sum:visible',
            term:     '._term_deposit',
            mode:     '[name="business_deposit_calculator[term_percent]"] option:selected'
        };

        var data = {
            min: null,
            precision: {ps: 2, rub: 0, usd: 0, eur: 0},
            su: null,
            type: "mb"
        };

        function getData() {
            for (var prop in elements) {
                var $elem  = $(elements[prop]);
                data[prop] = $elem.val();
                if ($elem.is('[type=range]')) {
                    data[prop] *= 1;
                }
            }
            return data;
        }


        loadForm('#business_deposit_calculator', '<?=$arResult['PROPERTIES']["TYPE_FORM"]['VALUE_XML_ID'] ;?>');

        $('#business_deposit_calculator').on('fc.form.loaded', 'form', function (e) {
            var $form = $(this),
                name  = $form.attr('name');

            customRangeSteps(
                $form.find('._term_deposit'),
                12,
                {step: 1, min: 1},
                {step: 6, min: 0}
            );

            var calculator = new MsbDepositCalculator(_classicDeposit);

            var onChange = function (e) {
                var data = getData(),
                    result, restore;

                if ($("._term_percent option:selected").text() === 'В конце срока') {
                    data.mode = "p";
                }
                else {
                    data.mode = "m";
                }

                var allowedTerm = calculator.deposit.rates[data.currency].filter(function (e) {
                    return e.term == data.term;
                });

                if (!allowedTerm.length) {
                    return;
                }

                if (_depositRatesFixes.hasOwnProperty(data.currency) && _depositRatesFixes[data.currency].hasOwnProperty(data.mode)) {
                    restore = calculator.deposit.rates[data.currency].slice(0);

                    calculator.deposit.rates[data.currency] = restore.map(function(e, i) {
                        var obj = Object.assign({}, e);
                        obj.ps = _depositRatesFixes[data.currency][data.mode][i];
                        return obj;
                    });

                    result = calculator.calculateDeposit(data);
                    calculator.deposit.rates[data.currency] = restore;
                }else {
                    result = calculator.calculateDeposit(data);
                }

                $currency.html(
                    {'rub': '&#8381;', 'usd': '&#36;', 'eur': '&#8364;'}[data.currency]
                );

                $term.text(
                    data.term + ' месяц' + pluralize(data.term, '', 'а', 'ев')
                );

                animateNumbers($rate, result.rate.ps, '%', 2);
                animateNumbers($percent, result.success ? result.percent : 0, '', 0);
                animateNumbers($result,  result.success ? result.percent + result.amount : result.amount, '', 0);
                $result.add($percent).add($currency).toggle(result.success);
                $error.toggle(!result.success);
            };

            var startSummDeposit = '<?=$_REQUEST['summ']?>';
            if(startSummDeposit !== '')
                $('#business_deposit_calculator_deposit_sum_rub').val(startSummDeposit).get(0).dispatchEvent(new CustomEvent('change'));

            $form.find('[type=range]').on('change', onChange);
            $form.on('change', onChange).trigger('change');
        });
    });