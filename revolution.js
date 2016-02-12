(function() {
    'use strict';

    var Revolution = function(moment) {
        var date = revolution(moment.year(), moment.month() + 1, moment.date());
        this.dayName = date.dayName;
        this.day = date.day;
        this.month = date.month;
        this.year = date.year;
    };

    var Gregorian = function(republicanDate) {
        var date = republican(republicanDate);
        this.day = date.day;
        this.month = date.month;
        this.year = date.year;
    };

    Revolution.prototype.format = function(template) {
        if (typeof template === 'undefined' || template === '') {
            template = this.format.default;
        }
        for (var token in this.format.tokens) {
            template = template.replace(this.format.tokens[token], this[token]);
        }
        return template;
    };

    Revolution.prototype.format.default = 'ddd D M YYYY';

    Revolution.prototype.format.tokens = {
        day: /D/,
        dayName: /ddd/,
        month: /M/,
        year: /YYYY/
    };

    Gregorian.prototype.format = function(template) {
        if (typeof template === 'undefined' || template === '') {
            template = this.format.default;
        }
        for (var token in this.format.tokens) {
            template = template.replace(this.format.tokens[token], this[token]);
        }
        return template;
    };

    Gregorian.prototype.format.default = 'DD/MM/YYYY';
    Gregorian.prototype.format.tokens = {
        day: /DD/,
        month: /MM/,
        year: /YYYY/
    };

    moment.fn.revolution = function() {
        return new Revolution(this);
    };

    moment.fn.gregorian = function(string) {
        return new Gregorian(string);
    };

    var days = [
            'Décadi', 'Primidi', 'Duodi', 'Tridi', 'Quartidi', 'Quintidi', 'Sextidi', 'Septidi', 'Octidi', 'Nonidi',
            '', 'Jour de la Vertu', 'Jour du Génie', 'Jour du Travail', 'Jour de l\'Opinion', 'Jour des Récompenses', 'Jour de la Révolution'
        ],
        months = [
            'Vendémiaire', 'Brumaire', 'Frimaire',
            'Nivôse', 'Pluviôse', 'Ventôse',
            'Germinal', 'Floréal', 'Prairial',
            'Messidor', 'Thermidor', 'Fructidor',
            'Sans-culottides'
        ],
        vendemiaire = {
            1: 22, 2: 23, 3: 24, 4: 25, 5: 26, 6: 27, 7: 28,
            8: 29, 9: 30, 10: 1, 11: 2, 12: 3, 13: 4, 14: 5,
            15: 6, 16: 7, 17: 8, 18: 9, 19: 10, 20: 11, 21: 12,
            22: 13, 23: 14, 24: 15, 25: 16, 26: 17, 27: 18,
            28: 19, 29: 20, 30: 21
        },
        brumaire = {
            1: 22, 2: 23, 3: 24, 4: 25, 5: 26, 6: 27, 7: 28,
            8: 29, 9: 30, 10: 31, 11: 1, 12: 2, 13: 3, 14: 4,
            15: 5, 16: 6, 17: 7, 18: 8, 19: 9, 20: 10, 21: 11,
            22: 12, 23: 13, 24: 14, 25: 15, 26: 16, 27: 17,
            28: 18, 29: 19, 30: 20
        },
        frimaire = {
            1: 21, 2: 22, 3: 23, 4: 24, 5: 25, 6: 26, 7: 27,
            8: 28, 9: 29, 10: 30, 11: 1, 12: 2, 13: 3, 14: 4,
            15: 5, 16: 6, 17: 7, 18: 8, 19: 9, 20: 10, 21: 11,
            22: 12, 23: 13, 24: 14, 25: 15, 26: 16, 27: 17,
            28: 18, 29: 19, 30: 20
        },
        nivose = {
            1: 21, 2: 22, 3: 23, 4: 24, 5: 25, 6: 26, 7: 27,
            8: 28, 9: 29, 10: 30, 11: 31, 12: 1, 13: 2, 14: 3,
            15: 4, 16: 5, 17: 6, 18: 7, 19: 8, 20: 9, 21: 10,
            22: 11, 23: 12, 24: 13, 25: 14, 26: 15, 27: 16,
            28: 17, 29: 18, 30: 19
        },
        pluviose = {
            1: 20, 2: 21, 3: 22, 4: 23, 5: 24, 6: 25, 7: 26,
            8: 27, 9: 28, 10: 29, 11: 30, 12: 31, 13: 1, 14: 2,
            15: 3, 16: 4, 17: 5, 18: 6, 19: 7, 20: 8, 21: 9,
            22: 10, 23: 11, 24: 12, 25: 13, 26: 14, 27: 15,
            28: 16, 29: 17, 30: 18
        },
        ventose = {
            1: 19, 2: 20, 3: 21, 4: 22, 5: 23, 6: 24, 7: 25,
            8: 26, 9: 27, 10: 28, 11: 1, 12: 2, 13: 3, 14: 4,
            15: 5, 16: 6, 17: 7, 18: 8, 19: 9, 20: 10, 21: 11,
            22: 12, 23: 13, 24: 14, 25: 15, 26: 16, 27: 17,
            28: 18, 29: 19, 30: 20
        },
        germinal = {
            1: 21, 2: 22, 3: 23, 4: 24, 5: 25, 6: 26, 7: 27,
            8: 28, 9: 29, 10: 30, 11: 31, 12: 1, 13: 2, 14: 3,
            15: 4, 16: 5, 17: 6, 18: 7, 19: 8, 20: 9, 21: 10,
            22: 11, 23: 12, 24: 13, 25: 14, 26: 15, 27: 16,
            28: 17, 29: 18, 30: 19
        },
        floreal = {
            1: 20, 2: 21, 3: 22, 4: 23, 5: 24, 6: 25, 7: 26,
            8: 27, 9: 28, 10: 29, 11: 30, 12: 1, 13: 2, 14: 3,
            15: 4, 16: 5, 17: 6, 18: 7, 19: 8, 20: 9, 21: 10,
            22: 11, 23: 12, 24: 13, 25: 14, 26: 15, 27: 16,
            28: 17, 29: 18, 30: 19
        },
        prairial = {
            1: 20, 2: 21, 3: 22, 4: 23, 5: 24, 6: 25, 7: 26,
            8: 27, 9: 28, 10: 29, 11: 30, 12: 31, 13: 1, 14: 2,
            15: 3, 16: 4, 17: 5, 18: 6, 19: 7, 20: 8, 21: 9,
            22: 10, 23: 11, 24: 12, 25: 13, 26: 14, 27: 15,
            28: 16, 29: 17, 30: 18
        },
        messidor = {
            1: 19, 2: 20, 3: 21, 4: 22, 5: 23, 6: 24, 7: 25,
            8: 26, 9: 27, 10: 28, 11: 29, 12: 30, 13: 1, 14: 2,
            15: 3, 16: 4, 17: 5, 18: 6, 19: 7, 20: 8, 21: 9,
            22: 10, 23: 11, 24: 12, 25: 13, 26: 14, 27: 15,
            28: 16, 29: 17, 30: 18
        },
        thermidor = {
            1: 19, 2: 20, 3: 21, 4: 22, 5: 23, 6: 24, 7: 25,
            8: 26, 9: 27, 10: 28, 11: 29, 12: 30, 13: 31, 14: 1,
            15: 2, 16: 3, 17: 4, 18: 5, 19: 6, 20: 7, 21: 8,
            22: 9, 23: 10, 24: 11, 25: 12, 26: 13, 27: 14,
            28: 15, 29: 16, 30: 17
        },
        fructidor = {
            1: 18, 2: 19, 3: 20, 4: 21, 5: 22, 6: 23, 7: 24,
            8: 25, 9: 26, 10: 27, 11: 28, 12: 29, 13: 30, 14: 31,
            15: 1, 16: 2, 17: 3, 18: 4, 19: 5, 20: 6, 21: 7,
            22: 8, 23: 9, 24: 10, 25: 11, 26: 12, 27: 13,
            28: 14, 29: 15, 30: 16
        },
        sansculottide = {
            1: 16,
            'vertu': 16,
            2: 17,
            'genie': 17,
            'génie': 17,
            3: 18,
            'travail': 18,
            4: 19,
            'opinion': 19,
            5: 20,
            'recompenses': 20,
            'récompenses': 20,
            6: 21,
            'revolution': 21,
            'révolution': 21
        },
        monthList = {
            1: vendemiaire, 2: brumaire, 3: frimaire, 4: nivose,
            5: pluviose, 6: ventose, 7: germinal, 8: floreal,
            9: prairial, 10: messidor, 11: thermidor, 12: fructidor
        },
        daysWithoutComplementaries = [
            'Décadi', 'Primidi', 'Duodi', 'Tridi', 'Quartidi', 'Quintidi', 'Sextidi', 'Septidi', 'Octidi', 'Nonidi'
        ];

    var dayOfMonth = {
        1: 122, 2: 153, 3: 181,
        4: 212, 5: 242, 6: 273,
        7: 303, 8: 334, 9: 365,
        10: 30, 11: 61, 12: 91
    };

    function _romanize(num) {
        if (!+num) {
            return false;
        }
        var digits = String(+num).split(''),
            key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
            '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
            '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
            roman = '',
            i = 3;
        while (i--) {
            roman = (key[+digits.pop() + (i * 10)] || '') + roman;
        }
        return new Array(+digits.join('') + 1).join('M') + roman;
    }

    /* Credits to https://github.com/jonschlinkert/deromanize */
    function _deromanize(roman) {
        if (typeof roman !== 'string' || !roman.match(/^[IVXLCDM]+$/gi)) {
            return roman;
        }
        var romanNum = roman.toUpperCase().split('');
        var num = 0,
            val = 0,
            lookup = {
                I: 1,
                V: 5,
                X: 10,
                L: 50,
                C: 100,
                D: 500,
                M: 1000
            };

        while (romanNum.length) {
            val = lookup[romanNum.shift()];
            num += val * (val < lookup[romanNum[0]] ? -1 : 1);
        }

        return num;
    }

    /**
    * Polyfill for Math._trunc()
    */
    function _trunc(x) {
        return x < 0 ? Math.ceil(x) : Math.floor(x);
    }

    /**
    * Return the number of days elapsed in the Republican year
    */
    function _numberOfElapsedDays(year, month, day, repYear) {
        var md, sj, elapsedDays;

        md = _lastDayOfPreviousYear(repYear);
        sj = _isLeap(repYear);

        // First days of the republican year
        if (month === 9 && year === repYear + 1791) {
            elapsedDays = day - md - 1;
        } else {
            elapsedDays = dayOfMonth[month] +
            sj * (month > 2 && month < 10 ? 1 : 0) +
            day - md - 1;
        }

        return elapsedDays;
    }

    /**
    * Return the last day of the previous day ?
    */
    function _lastDayOfPreviousYear(repYear) {
        return (function() { // Last day of the previous year ?
            switch (repYear) {
            case 4: case 8: return 22;
            case 12: case 16: return 23;
            default:
                return 23 -
                Math.floor((repYear - 1) / 100) +
                Math.floor((repYear - 1) / 400) +
                Math.floor((repYear - 209) / 100) -
                Math.floor((repYear - 209) / 400);
            }
        })();
    }

    /**
    * Return 1 for a leap year, 0 for a normal year
    */
    function _isLeap(repYear) {
        return (repYear % 4 === 0 ? 1 : 0) - // Leap year ?
        ((repYear + 1792) % 100 === 0 ? 1 : 0) +
        ((repYear + 1792) % 400 === 0 ? 1 : 0);
    }

    /**
    * Calculate republican repYear
    */
    function _getRepYear(year, month, day) {
        var repYear, firstDayOfTheYear;
        repYear = year - 1792;
        firstDayOfTheYear = (function() {
            switch (year) {
            case 1792: case 1799: return 22;
            case 1803: case 1807: return 23;
            default:
                return 8 +
                Math.floor(year / 100) -
                Math.floor(year / 400) -
                Math.floor((year - 1972) / 100) +
                Math.floor((year - 1972) / 400);
            }
        })();
        // If we are beyond the first day of the year => next year
        if ((month === 9 && day >= firstDayOfTheYear) || month >= 10) {
            repYear += 1;
        }
        return repYear;
    }

    function _getRepDayName(repDay, repMonth) {
        var lastMonth;
        lastMonth = repMonth === 12 ? 10 : 0;
        return days[(repDay  % 10) + lastMonth];
    }

    function _getRepDay(year, month, day, elapsedDays) {
        return (elapsedDays % 30) + 1;
    }

    function _getRepMonth(year, month, day, elapsedDays) {
        return _trunc(elapsedDays / 30);
    }

    function _getRepMonthName(repMonth) {
        return months[repMonth];
    }

    function _getYear(repYear, repDay, repMonth) {
        var result = 1792;
        if (repDay >= 1 && repDay <= 11) {
            if (typeof repMonth === 'string') {
                if (repMonth.toLowerCase() === 'vendémiaire'
                    || repMonth.toLowerCase() === 'vendemiaire'
                    || repMonth.toLowerCase() === 'brumaire'
                    || repMonth.toLowerCase() === 'frimaire'
                    || repMonth.toLowerCase() === 'nivôse'
                    || repMonth.toLowerCase() === 'nivose') {
                    result--;
                }
            }
        }
        return repYear + result;
    }

    function _getMonth(repMonth, repDay) {
        var month = 1;
        if (repMonth.toLowerCase() === 'vendémiaire' || repMonth.toLowerCase() === 'vendemiaire') {
            if (repDay >= 1 && repDay <= 9) {
                month = 9;
            } else {
                month = 10;
            }
        } else if (repMonth.toLowerCase() === 'brumaire') {
            if (repDay >= 1 && repDay <= 10) {
                month = 10;
            } else {
                month = 11;
            }
        } else if (repMonth.toLowerCase() === 'frimaire') {
            if (repDay >= 1 && repDay <= 10) {
                month = 11;
            } else {
                month = 12;
            }
        } else if (repMonth.toLowerCase() === 'nivôse' || repMonth.toLowerCase() === 'nivose') {
            if (repDay >= 1 && repDay <= 11) {
                month = 12;
            } else {
                month = 1;
            }
        } else if (repMonth.toLowerCase() === 'pluviôse' || repMonth.toLowerCase() === 'pluviose') {
            if (repDay >= 1 && repDay <= 12) {
                month = 1;
            } else {
                month = 2;
            }
        } else if (repMonth.toLowerCase() === 'ventôse' || repMonth.toLowerCase() === 'ventose') {
            if (repDay >= 1 && repDay <= 10) {
                month = 2;
            } else {
                month = 3;
            }
        } else if (repMonth.toLowerCase() === 'germinal') {
            if (repDay >= 1 && repDay <= 11) {
                month = 3;
            } else {
                month = 4;
            }
        } else if (repMonth.toLowerCase() === 'floréal' || repMonth.toLowerCase() === 'floreal') {
            if (repDay >= 1 && repDay <= 11) {
                month = 4;
            } else {
                month = 5;
            }
        } else if (repMonth.toLowerCase() === 'prairial') {
            if (repDay >= 1 && repDay <= 12) {
                month = 5;
            } else {
                month = 6;
            }
        } else if (repMonth.toLowerCase() === 'messidor') {
            if (repDay >= 1 && repDay <= 12) {
                month = 6;
            } else {
                month = 7;
            }
        } else if (repMonth.toLowerCase() === 'thermidor') {
            if (repDay >= 1 && repDay <= 13) {
                month = 7;
            } else {
                month = 8;
            }
        } else if (repMonth.toLowerCase() === 'fructidor') {
            if (repDay >= 1 && repDay <= 14) {
                month = 8;
            } else {
                month = 9;
            }
        } else if (repMonth.toLowerCase() === 'sans-culottide' || repMonth.toLowerCase() === 'sansculottide') {
            month = 9;
        }
        return month;
    }

    function _getDay(repDay, repMonth, repYear) {
        var listToUse = {};
        var day,
            dateIsOk = false,
            monthNumber = 0;
        if (typeof repMonth === 'string') {
            if (repMonth.toLowerCase() === 'vendémiaire' || repMonth.toLowerCase() === 'vendemiaire') {
                dateIsOk = true;
                monthNumber = 1;
            } else if (repMonth.toLowerCase() === 'brumaire') {
                dateIsOk = true;
                monthNumber = 2;
            } else if (repMonth.toLowerCase() === 'frimaire') {
                dateIsOk = true;
                monthNumber = 3;
            } else if (repMonth.toLowerCase() === 'nivôse' || repMonth.toLowerCase() === 'nivose') {
                dateIsOk = true;
                monthNumber = 4;
            } else if (repMonth.toLowerCase() === 'pluviôse' || repMonth.toLowerCase() === 'pluviose') {
                monthNumber = 5;
            } else if (repMonth.toLowerCase() === 'ventôse' || repMonth.toLowerCase() === 'ventose') {
                monthNumber = 6;
            } else if (repMonth.toLowerCase() === 'germinal') {
                monthNumber = 7;
            } else if (repMonth.toLowerCase() === 'floréal' || repMonth.toLowerCase() === 'floreal') {
                monthNumber = 8;
            } else if (repMonth.toLowerCase() === 'prairial') {
                monthNumber = 9;
            } else if (repMonth.toLowerCase() === 'messidor') {
                monthNumber = 10;
            } else if (repMonth.toLowerCase() === 'thermidor') {
                monthNumber = 11;
            } else if (repMonth.toLowerCase() === 'fructidor') {
                monthNumber = 12;
            }
        }
        if (monthNumber > 0) {
            listToUse = monthList[monthNumber];
        } else {
            listToUse = sansculottide;
        }
        day = listToUse[repDay];
        if (repYear % 4 === 0 && dateIsOk && repDay >= 1 && repDay <= 11) {
            if (!listToUse.hasOwnProperty(repDay + 1)) {
                if (monthNumber + 1 <= 12) {
                    listToUse = monthList[monthNumber + 1];
                } else {
                    listToUse = monthList[1];
                }
                day = listToUse[1];
            } else {
                day = listToUse[repDay + 1];
            }
        }
        return day;
    }

    function revolution(year, month, day) {
        var repDay, repDayName, repMonth, repMonthName, repYear, elapsedDays;

        repYear = _getRepYear(year, month, day);

        elapsedDays = _numberOfElapsedDays(year, month, day, repYear);

        repMonth = _getRepMonth(year, month, day, elapsedDays);
        repMonthName = _getRepMonthName(repMonth);

        repDay = _getRepDay(year, month, day, elapsedDays);
        repDayName = _getRepDayName(repDay, repMonth);

        return {
            dayName: repDayName,
            day: repDay,
            month: repMonthName,
            year: repYear,
            romanYear: _romanize(repYear)
        };
    }

    function republican(republicanDate) {
        var day, month, year, textDate;
        textDate = republicanDate.toLowerCase();
        // Replace Primidi / Nonidi etc. because it's not important in date checking
        if (textDate.match(daysWithoutComplementaries.join('|').toLowerCase())) {
            textDate = textDate.replace(textDate.match(daysWithoutComplementaries.join('|').toLowerCase()), '');
        }
        // Remove ' an ' to only get year
        if (textDate.indexOf(' an ') !== -1) {
            textDate = textDate.replace(' an ', ' ');
        }
        // Remove 'jour du' 'jour de la' 'jour des' 'jour de l'' and 'jour compl[eé]mentaire' to only get the number / the name
        if (textDate.match(/jour\s((du|de|des)\s((l(\'|a))|(r*))*|compl[eé]mentaire)/gi)) {
            textDate = textDate.replace(textDate.match(/jour\s((du|de|des)\s((l(\'|a)))*|compl[eé]mentaire)/gi), '');
        }
        textDate = textDate.trim();
        textDate = textDate.replace(/\s\s+/g, ' ');
        // Here, all we can get is :
        // 2 Ventôse III
        // 2 Ventôse 3
        // 1 3
        // 1 III
        // Vertu III
        var repDate = textDate.split(' ');
        if (repDate.length < 2 || repDate.length > 3) {
            // Return NaN to provok an error
            return {
                day: NaN,
                month: NaN,
                year: NaN
            };
        }
        var repDay, repMonth, repYear;
        if (repDate.length === 2) {
            month = 9;
            if (typeof repDate[0] === 'string') {
                repDay = repDate[0].toLowerCase();
            } else {
                repDay = repDate[0];
            }
            repYear = parseInt(_deromanize(repDate[1]));
        } else {
            repDay = parseInt(repDate[0]);
            repMonth = repDate[1];
            repYear = parseInt(_deromanize(repDate[2]));
        }
        year = _getYear(repYear, repDay, repMonth);
        if (typeof month === 'undefined') {
            month = _getMonth(repMonth, repDay);
        }
        day = _getDay(repDay, repMonth, repYear);
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        var myDate = moment(new Date(year + '-' + month + '-' + day));
        if (myDate.isAfter('1800-02-28')) {
            myDate.add(1, 'd');
        }
        return {
            day: myDate.get('date'),
            month: myDate.get('month') + 1,
            year: myDate.get('year')
        };
    }
})();
