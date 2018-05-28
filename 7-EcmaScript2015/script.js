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
})
console.log(ages5);

// In ES6, it's easier to write the callback
let ages6 = years.map(el => 2016 - el); // one arg, one line of code
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index+1}: ${2016-el}.`); // multiple args
console.log(ages6);

ages6 = years.map((el, index) => { // multiple args, multiple lines of code
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index+1}: ${age}.`
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
        })
    }
}
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
        })
    }
}
box6.clickMe();

function Person(name) {
    this.name = name;
}

Person.prototype.myFriends5 = function (friends) {
    var arr = friends.map(function (el) {
        return this.name + ' is friends with ' + el;
    }.bind(this)); // bind creates a copy of a function and allows you to specify the this variable!
    console.log(arr);
}

var friends = ['bob', 'jane', 'mark'];
new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function (friends) {
    var arr = friends.map(el => this.name + ' is friends with ' + el);
    console.log(arr);
}
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
}

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

var boxesArr5 = Array.prototype.slice.call(boxes);

// ES6 arrays
const boxes = document.querySelectorAll('.box');
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// Array loops
// ES6 - for of loop
for (const cur of boxesArr6) {
    // can break and continue
    // cannot in map or foreach
    if (cur.className === 'box blue') {
        continue;
    }

    cur.textContent = 'I changed to blue';
}

// 2 new array methods that allow us to find elements 
const ages = [12, 17, 8, 21, 14, 11];
// ES5
var full = ages.map(function(cur) {
    return cur >= 18;
});

console.log(full);

console.log(full.indexOf(true));

// Es6
// findindex and find methods
ages.findIndex(cur => cur >=18); // returns an index for the element is true.


// Rest parameters - look like spread operator but are completey different
// Spread operator takes array transforms to single values
// Rest parms take individual values and transforms

// Es5
function isFullAge5() {
    // arguments keyword used
    console.log(arguments); // looks like array but it's not! it's array-like, but not really array.
    var argsArr = Array.prototype.slice.call(arguments); //  hack

    argsArr.forEach(function(cur) {
        console.log((2018-cur) > 18);
    });
}

isFullAge5(1990, 1999, 1965);

// ES6 Rest parameters
function isFullAge6(...years) {
    // as soon as we call function it tranforms args into array and pass into function
    // whcih we can access as an array
    console.log(years);
    years.forEach(cur => console.log((2018-cur) > 18 ));
}

isFullAge6(1990, 1999, 1962);
*/

// Default parameters
// ES5
/*function SmithPerson(firstName, yearOfBierth, lastName, nationality) {
    lastName === undefined ? lastName = 'Smith' : lastName=lastName;
    nationality === undefined ? nationality = 'American': nationality=nationality;
    this.firstName=firstName;
    this.lastName=lastName;
    this.yearOfBierth=yearOfBierth;
    this.nationality= nationality;
}

var john = new SmithPerson('John', 1990);
var emily = new SmithPersion('Emily', 1983, 'Diaz', 'Spanish');
*/
// ES6
//function SmithPerson(firstName, yearOfBirth, lastName='Smith', nationality='American');
//var john = new SmithPerson('John',1990);

// Maps - a new data structure in ES6
// use object as hash map
// map keys to arbitrary values
// until es6 we had to use objects for hash maps

// in maps, we can use anything for the keys - any primitive. Even functions or objects!
/*
const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2016');
question.set(4, 'ES2015');
question.set('correct', 4);
question.set(true, 'Correct Answer');
question.set(false, 'Wrong Answer');

console.log(question.get('question'));
console.log(question.size);

if (question.has(4)) {
    question.delete(4);
}

question.forEach((value,key)=>console.log(`Key: ${key}, value: ${value}`));

for (let [key, value] of question.entries()) { 
    // use destructuring to store key and value in 2 elements of array
    console.log(`Key: ${key}, value: ${value}`);
}*/

// ES6 classes add syntactic sugar

// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth=yearOfBirth;
    this.job=job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('john',1990,'teacher');

// ES6
class Person6 {
    constructor(name, yearOfBirth,job) { // Every class declaration needs a constructor
        this.name=name;
        this.yearOfBirth=yearOfBirth;
        this.job=job;
    }

    calculateAge() {
        let age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
    }

    static greeting() {
        console.log('Hello');
    }
}

const john6 = new Person6('John',1990,'teacher');
john6.calculateAge();
Person6.greeting();