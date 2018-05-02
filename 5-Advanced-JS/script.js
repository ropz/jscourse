// Function constructor
/*
let john = {
    name: 'John',
    yearOfBirth: '1990',
    job: 'teacher'
}*/

// most popular way
// standard way to create objects
// function constructor
let Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    // inefficient because all instances contain copy of the function
    this.calculateAge = function() {
        console.log(2018-this.yearOfBirth);
    }
}

Person.prototype.calculateAge1 = function() {
    console.log(2018-this.yearOfBirth);
}

Person.prototype.lastName = 'Smith';

let john = new Person('John', 1990, 'teacher'); // an instance of the Person object

let jane = new Person('Jane', 1969, 'designer');
let mark = new Person('Mark', 1948, 'retired');
john.calculateAge1();
jane.calculateAge1();
mark.calculateAge1();

console.log(john.lastName);