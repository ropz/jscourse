// let and const

// ES5 code
/*
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller'; // can simly mutate the name5 variable
console.log(name5);

// ES6 code
// const is for values we don't want to change
// let is like the old var
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name6); // error assignment to constant variable
                    // consts are immutable once set
                    */

// var variables in ES5 are function scoped
// let and const in ES6 are block scoped

/*
// scoping changes
// ES5
function driversLicense5(passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    //console.log(firstName + ' born in ' + yearOfBirth); // will work - function scoped variables
}

driversLicense5(true);

// ES6
function driversLicense6(passedTest) {
    if (passedTest) {
        let firstname = 'John';
        const yearOfBirth = 1990;
    }
    //console.log(firstName + ' born in ' + yearOfBirth); // won't work - block scoped variables
}

driversLicense6(true);


// ES6
function driversLicense6a(passedTest) {
    let firstName, yearOfBirth;
    if (passedTest) {
        firstName = 'John';
        yearOfBirth = 1990;
    }
    console.log(firstName + ' born in ' + yearOfBirth); // will work - variables are declared in the same (block) scope as console.log
}

driversLicense6a(true);

// Hoisting in ES6 works differently too - we now cannot use a variable at all before it is declared.
// 'Temporal bad zone'

*/

// Spread operator
function addFourAges(a, b, c, d) {
    return a + b + c + d;
}
var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);
var ages = [18, 30, 12, 21]; // Remember teh apply method receives an array and calls the function using the elements of the array as the arguments
var sum2 = addFourAges.apply(null, ages); // null is this variable in which we're not interested here
console.log(sum2);

// ES6
const sum3 = addFourAges(...ages); /// ... spread operator expands the ages array into its componetns
console.log(sum3);

// More use cases
const familySmith = ['John','Jane','Mark'];
const familyMiller = ['Mary','Bob','Ann'];
// can use spread operator to join these 2 arrays
const bigFamily = [...familySmith,...familyMiller];
console.log(bigFamily);
// can  use it on other structures - e.g. nodeList
const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];
Array.from(all).forEach(cur =>
cur.style.color = 'purple');