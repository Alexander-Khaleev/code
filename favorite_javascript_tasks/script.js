// Массивы
// Найти максимальное произведение 3 чисел в массиве
var unsortedArray = [-10, 7, 29, 30, 5, -10, -70];

function Sorted(i,ii) {
	if(i>ii) {
		return 1;
	}
	else if(i< ii) {
		return -1;
	}
	else {
		return 0;
	}
}

unsortedArray = unsortedArray.sort(Sorted);
var proizvedenieMax = unsortedArray[unsortedArray.length - 1];

for(i= unsortedArray.length; i > unsortedArray.length - 2; i--) {
	proizvedenieMax *= unsortedArray[i-2];
}

console.log(proizvedenieMax);	

// Найти пропущенное значение массива
var arrayOfIntegers = [2, 5, 1, 4, 9, 6, 3, 7];
var i = 0;
var prop;

function Sorted(i,ii) {
	if(i>ii) {
		return 1;
	}
	else if(i< ii) {
		return -1;
	}
	else {
		return 0;
	}
}

arrayOfIntegers  = arrayOfIntegers.sort(Sorted); 

function Empty() {
	i++
	if (arrayOfIntegers[i] + 1 == arrayOfIntegers[i + 1]) {
		Empty()
	}
	else {
		prop = arrayOfIntegers[i] + 1;
	}
}

Empty()

// Найти и удалить повторяющиеся значения в массиве
var arrayRepeat = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

function Sorted(i,ii) {
	if(i>ii) {
		return 1;
	}
	else if(i< ii) {
		return -1;
	}
	else {
		return 0;
	}
}

arrayRepeat = arrayRepeat.sort(Sorted);
var newArrayRepeat=[];

for (i=0; i < arrayRepeat.length; i++) {
	if (arrayRepeat[i] !== arrayRepeat[i+1]) {
		newArrayRepeat.push(arrayRepeat[i]);
	}
}

arrayRepeat = newArrayRepeat;
console.log(arrayRepeat);

// Найти наибольшую разность чисел массива
var arrayMax = [7, 8, 4, 9, 9, 15, 3, 1, 10];
var max = Math.max.apply(null, arrayMax);
var min = Math.min.apply(null, arrayMax);

var resultMax = max - min;
console.log(resultMax);

// Найти общие элементы в двух массивах
var firstArray = [2, 2, 4, 1];
var secondArray = [1, 2, 0, 2];
var newArrayCommunity=[];

for (i=0; i < firstArray.length; i++) {
	if(secondArray.indexOf(firstArray[i]) !== -1 && newArrayCommunity.indexOf(firstArray[i]) == -1) {
		newArrayCommunity.push(firstArray[i]);
	}
}

console.log(newArrayCommunity);

//Перевернуть массив без reverse() и второго массива
var array1 =[1,3,5,4,6,9];
var array1ToString = '';

for (i=array1.length-1; i>=0; i--) {
	array1ToString += array1[i];
}

array1 = array1ToString.split('');
for (i=0; i < array1.length;i++) {
	array1[i] = Number(array1[i]);
}
console.log(array1);

// Рекурсия
//Вычислить сумму чисел до указанного числа
function SumTo(n) {
	var summa = 0;
	for(i=n; i>1;i--) {
		summa += i-1;
	}
	console.log(summa);
}

SumTo(10);

// Написать функцию для вычисления факториала числа
function factorial(n) {
if (n !== 1) {
	return n * factorial(n-1)
}
else {
	return 1
}
}

var resultFactorial = factorial(5);
console.log(resultFactorial);

//Определить, является ли число степенью двойки
function Double(n) {
	n = n /2;
	if(n/Math.floor(n)==1 && n > 1) {
		Double(n);
	}
	else if (n == 1) {
		console.log('True');
	}
	else {
		console.log('False');
	}
} 

var resultDouble = Double(18);

//Строки
// Перевернуть каждое слово в строке
var string = "Welcome to this Javascript Guide!";
var newString = string.split(' ');
var stringArray = [];

for (i=0; i < newString.length; i++) {
		var newElement = newString[i].split('').reverse().join('');
		stringArray.push(newElement);
}

newString = stringArray.join(' ');
console.log(newString);

