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