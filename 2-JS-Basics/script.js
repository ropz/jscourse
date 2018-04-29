/*
const name = 'John';
const lastName = 'Smith'; // second part with a capital letter - camel case
const age = 26;
const fullAge = true;
console.log(name);
console.log(lastName);
console.log(age);
console.log(fullAge);
*/

//
// Boolean logic and switch
//
const age = 20;
/*
if (age < 20) {
    console.log('John is a teenager.');
} else if (age > 20 && age < 30) {
    console.log('John is a young man');
} else {
    console.log('John is an adult.');
}
*/

/*
var job = 'butler';

switch (job) {
    case 'butler':
        console.log('john buttles');
        break;
    case 'fireman':
        console.log('john fires');
        break;
    default:
        console.log('john doesnt do anything');
        break;
}
*/

// Coding challenge number 1.
const heightJohn = 176;
const ageJohn = 25;

const heightFriend = 251;
const ageFriend = 22;

const heightThird = 200;
const ageThird =40;

const johnScore = heightJohn + (5 * ageJohn);
const friendScore = heightFriend + (5 * ageFriend);
const thirdScore = heightThird + (5 * ageThird);

if (johnScore > friendScore && johnScore > thirdScore) {
    console.log('John wins');
} else if (friendScore > johnScore && friendScore > thirdScore) {
    console.log('Friend wins');
} else if (thirdScore > johnScore && thirdScore > friendScore) {
    console.log('Third wins');
} 
else {
    console.log('draw');
}