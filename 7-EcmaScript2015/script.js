/* jshint esversion: 6 */
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



/*
// Blocks and iffes

// Variables declared using let and const use block scope
// not accessible outside the block
// ... does this sound like data privacy

// Until now, we always used IIFEs for that
// but in ES6, all we need for data privacy is a block

// A block is not restricted to if statements.
// All we need to do is have some curly braces - that's a block

{
    const a = 1;
    let b = 2;
}

//console.log(a+b); // Not accessible outside the block
// So the above block is just like an IIFE

// Big improvements in how we handle strings in ES6

//let firstName = 'john';
//let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2018 - year;
}

// Template literals - the coolest new things about strings
// ES5
//console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today he is ' + calcAge(yearOfBirth) + ' years old');

// ES6
//console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`)

// There are also a few more new string methods
//const n = `${firstName} ${lastName}`;

//console.log(n.startsWith('j'));
//console.log(n.endsWith('th'));
//console.log(n.includes('oh'));
//console.log(firstName.repeat(3));

// Here be dragons - arrow functions.

// ES5
const years = [1990, 1945, 1960, 1991];
let ages5 = years.map(function (el) {
    return 2016 - el;
});
console.log(ages5);

// In ES6, it's easier to write the callback
let ages6 = years.map(el => 2016 - el); // one arg, one line of code
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index+1}: ${2016-el}.`); // multiple args
console.log(ages6);

ages6 = years.map((el, index) => { // multiple args, multiple lines of code
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index+1}: ${age}.`;
});

console.log(ages6);

// Lexical this

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        var self = this;
        document.querySelector('.green').addEventListener('click', function () { // callback this points to global execution context
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
};
//box5.clickMe();

// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function () {
      document.querySelector('.green').addEventListener('click', () => {
        // shares this keyword with surrounding
        var str = 'This is box number ' + this.position + ' and it is ' + this.color;
        alert(str);
      });
    }
};
box6.clickMe();

function Person(name) {
    this.name = name;
}

Person.prototype.myFriends5 = function (friends) {
    var arr = friends.map(function (el) {
        return this.name + ' is friends with ' + el;
    }.bind(this)); // bind creates a copy of a function and allows you to specify the this variable!
    console.log(arr);
};

var friends = ['bob', 'jane', 'mark'];
new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function (friends) {
    var arr = friends.map(el => this.name + ' is friends with ' + el);
    console.log(arr);
};
new Person('Dave').myFriends6(friends);

// Destructuring - convenient way to extract data from a data structure

// ES5
//var john = ['John', 26];
//var name = john[0];
//var age = john[1];

// ES6
// Destructuring
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    firstName,
    lastName
} = obj;
console.log(firstName);
console.log(lastName);

// if we dont want variable names to match with key names
const {
    firstName: a,
    lastName: b
} = obj;
console.log(a);
console.log(b);

// practical application of destructuring
// return multiple values from a function
// in ES5 - return an object

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);

// Arrays

const boxes = document.querySelectorAll('.box');
// returns nodeList
// transform to array
// Es5 workaround is a hack
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
    cur.style.backgroundColor = 'dodgerblue';
});
*/

// ES6
const boxes = document.querySelectorAll('.box');
const boxesArr6 = Array.from(boxes); // hurrah!
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// When looping around an array we use foreach or map
// problem is, we cannot break from them or use the continue statement.

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