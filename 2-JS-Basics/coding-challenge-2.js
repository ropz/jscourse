const years = [1960, 1961, 1963, 1991, 1994];
let receivedYears = [];
let now = 2018;

for (let i = 0; i < years.length; i++) {
    receivedYears.push(years[i]);
}

for (let i = 0; i < years.length; i++) {
    let age = 2018 - years[i]
    if (age >= 18) {
        console.log("Person " + i + " is an adult and is " + age + " years old");
    } else {
        console.log("Person " + i + " is NOT an adult and is " + age + " years old");
    }
}

function printFullAge(years) {
    let rYears = [];
    let boolResult = [];
    for (let i = 0; i < years.length; i++) {
        rYears[i] = years[i];
    }
    for (let i = 0; i < rYears.length; i++) {
        let age = 2018 - years[i];
        if (age >= 18) {
            console.log("Person " + i + " is an adult and is " + age + " years old");
            boolResult[i] = true;
        } else {
            console.log("Person " + i + " is NOT an adult and is " + age + " years old");
            boolResult[i] = false;
        }
    }
    return boolResult;
}

let firstCall = printFullAge(years);
console.log(firstCall);

let secondCall = printFullAge([1945, 1955, 1965, 2013]);
console.log(secondCall);