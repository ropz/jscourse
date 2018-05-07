// Passing functions as arguments
/*let years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    let arrResult = [];
    for (let i = 0; i < arr.length; i++) {
        arrResult.push(fn(arr[i]));
    }
    return arrResult;
}

function calculateAge(el) {
    return 2018 - el;
}

function isAdult(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
}

let ages = arrayCalc(years, calculateAge);
let fullAges = arrayCalc(years, isAdult);
let heartRates = arrayCalc(ages, maxHeartRate);
console.log(ages);
console.log(heartRates);*/

// returning functions

/*function interviewQuestion(job) {
    if (job==='designer') {
        return function (name) {
            console.log(name + ", please explain what UX design is?");
        }
    }
    if (job==='teacher') {
        return function (name) {
            console.log(name + ", what subject do you teach?");
        }
    } else {
        return function (name) {
            console.log('Hello ' + name + ' what do you do?');
        }
    }
}

let teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');
let designerQuestion = interviewQuestion('designer');
designerQuestion('Mark');*/

//IIFE

/*function game() {
    let score = Math.random()*10;
    console.log(score >= 5);
}

game();

(function () {
    let score = Math.random()*10;
    console.log(score >= 5);
})();*/

// closures
/*function retirement(retirementAge) {
    let a = ' years left until retirement ';
    return function(yearOfBirth) {
        let age = 2018 - yearOfBirth;
        console.log(retirementAge-age + a);
    }
}

let retireUK = retirement(65);
retireUK(1960);*/

// Bind, call and apply
// Although functions are objects, they get a few special methods
let john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ' ladies and gentlemen, I\'m ' + this.name  + ' and I\'m a ' + this.job);
        } else if (style === 'friendly') {
            console.log('Hey, what\'s up? I\'m ' + this.name  + ' and I\'m a ' + this.job);
        }
    }
}

let emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
}

john.presentation('formal','morning');
john.presentation('friendly', 'afternoon');
// Call method allows us to set this in first argument
// We wanted to use john's method on emily
john.presentation.call(emily, 'formal', 'morning');

// Similar method apply - accepts arguments as an array
john.presentation.apply(emily, ['formal','morning']); // wont work because johns method doesn't expect an array

// Bind method - very similar to call so it also allows us to explicitly set this variable
// ... doesn't immediately call the function, generates a copy so we can store it somewhere
let johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');
// currying