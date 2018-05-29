'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var Element = function Element(name, buildYear) {
    _classCallCheck(this, Element);

    this.name = name;
    this.buildYear = buildYear;
};

var Park = function (_Element) {
    _inherits(Park, _Element);

    function Park(name, buildYear, trees, area) {
        _classCallCheck(this, Park);

        var _this = _possibleConstructorReturn(this, (Park.__proto__ || Object.getPrototypeOf(Park)).call(this, name, buildYear));

        _this.trees = trees;
        _this.area = area;
        return _this;
    }

    _createClass(Park, [{
        key: 'reportTreeDensity',
        value: function reportTreeDensity() {
            this.TreeDensity = Math.floor(this.trees / this.area);
            return this.name + ' has a tree density of ' + this.TreeDensity + ' trees per sq km.';
        }
    }, {
        key: 'reportTreeThresholdReached',
        value: function reportTreeThresholdReached() {
            if (this.trees > 1000) {
                return this.name + ' has more than 1000 trees.';
            }
            return '';
        }
    }]);

    return Park;
}(Element);

var Street = function (_Element2) {
    _inherits(Street, _Element2);

    function Street(name, buildYear, length) {
        var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'normal';

        _classCallCheck(this, Street);

        var _this2 = _possibleConstructorReturn(this, (Street.__proto__ || Object.getPrototypeOf(Street)).call(this, name, buildYear));

        _this2.length = length;
        _this2.size = size;
        return _this2;
    }

    _createClass(Street, [{
        key: 'report',
        value: function report() {
            return this.name + ', built in ' + this.buildYear + ', is a ' + this.size + ' street.';
        }
    }]);

    return Street;
}(Element);

var parkAgeRunningTotal = 0;
var streetLengthRunningTotal = 0;
var parkCount = 0;
var streetCount = 0;

var parks = [new Park('Green Park', 1945, 8780, 45), new Park('National Park', 1960, 10010, 122), new Park('Oak Park', 1955, 8880, 33)];

var streets = [new Street('Ocean Avenue', 1999, 0.5, 'huge'), new Street('Evergreen Street', 2008, 0.25, 'small'), new Street('4th Street', 2015, 1.35), new Street('Sunset Boulevard', 1982, 2.44, 'huge')];

for (var i = 0; i < parks.length; i++) {
    parkCount++;
    parks[i].age = new Date().getFullYear() - parks[i].buildYear;
    parkAgeRunningTotal += parks[i].age;
}

for (var _i = 0; _i < streets.length; _i++) {
    streetCount++;
    streetLengthRunningTotal += streets[_i].length;
}

console.log("----PARKS REPORT----");
console.log('Our ' + parkCount + ' parks have an average age of ' + parkAgeRunningTotal / parkCount + ' years.');
for (var _i2 = 0; _i2 < parks.length; _i2++) {
    console.log(parks[_i2].reportTreeDensity());
}
for (var _i3 = 0; _i3 < parks.length; _i3++) {
    console.log(parks[_i3].reportTreeThresholdReached());
}

console.log("----STREETS REPORT----");
console.log('Our ' + streetCount + ' streets have a total length of ' + streetLengthRunningTotal + ' km, with an average of ' + streetLengthRunningTotal / streetCount + ' km.');
for (var _i4 = 0; _i4 < streets.length; _i4++) {
    console.log(streets[_i4].report());
}
