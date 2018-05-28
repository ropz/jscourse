/*
Suppose you're working in a small town administration and you're in charge of two town elements, parks and streets.

All parks and streets have a name and a build year - there are 3 parks and 4 streets.

At an end of year meeting, your boss wants a final report with the following:
1. Tree density of each park (no of trees/area)
2. Average age of each town's park (sum of all ages/no of parks)
3. Name of park with more than 1000  trees
4. Total and average length of town's streets
5. Size classification of all streets tiny/small/normal/big/huge/ If unknown, deault is normal.
*/
class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element {
    constructor(name, buildYear, trees, area) {
        super(name, buildYear);
        this.trees = trees;
        this.area = area;
    }

    reportTreeDensity() {
        this.TreeDensity = Math.floor(this.trees/this.area);
        return `${this.name} has a tree density of ${this.TreeDensity} trees per sq km.`;
    }

    reportTreeThresholdReached() {
        if (this.trees > 1000) {
            return `${this.name} has more than 1000 trees.`
        }
        return '';
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size='normal' ) {
        super(name, buildYear);
        this.length = length;
        this.size=size;
    }

    report() {
        return `${this.name}, built in ${this.buildYear}, is a ${this.size} street.`;
    }
}

let parkAgeRunningTotal=0;
let streetLengthRunningTotal = 0;
let parkCount=0;
let streetCount = 0;

let parks = [
    new Park('Green Park', 1945, 8780, 45),
    new Park('National Park', 1960, 10010, 122),
    new Park('Oak Park', 1955, 8880, 33)
];

let streets = [
    new Street('Ocean Avenue', 1999, 0.5, 'huge'),
    new Street('Evergreen Street', 2008, 0.25, 'small'),
    new Street('4th Street', 2015, 1.35),
    new Street('Sunset Boulevard', 1982, 2.44, 'huge')
]

for (let i = 0; i < parks.length; i++) {
    parkCount++;
    parks[i].age = new Date().getFullYear() - parks[i].buildYear;
    parkAgeRunningTotal += parks[i].age;
}

for (let i = 0; i < streets.length; i++) {
    streetCount++;
    streetLengthRunningTotal += streets[i].length;
}

console.log("----PARKS REPORT----");
console.log(`Our ${parkCount} parks have an average age of ${parkAgeRunningTotal/parkCount} years.`);
for (let i = 0; i < parks.length; i++) {
    console.log(parks[i].reportTreeDensity());
}
for (let i = 0; i < parks.length; i++) {
    console.log(parks[i].reportTreeThresholdReached());
}

console.log("----STREETS REPORT----");
console.log(`Our ${streetCount} streets have a total length of ${streetLengthRunningTotal} km, with an average of ${streetLengthRunningTotal/streetCount} km.`);
for (let i = 0; i < streets.length; i++) {
    console.log(streets[i].report());
}