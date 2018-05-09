// BUDGET CONTROLLER
let budgetController = (function () {

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let calculateTotal = function (type) {
        let sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        })
        data.totals[type] = sum;
    }

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    }

    return {
        addItem: function (type, des, value) {
            let newItem, ID;
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            if (type === 'exp') {
                newItem = new Expense(ID, des, value);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, value);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },
        deleteItem: function (type, id) {
            let ids, index;
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });
            index = ids.indexOf(id); // returnds index number in array that has an id of id
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        calculateBudget: function () {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },
        calculatePercentages: function () {
            // calculate expense percentage for each expense object
            data.allItems['exp'].forEach(function (cur) {
                cur.calcPercentage(data.totals.inc);
            })

        },
        getPercentages: function () {
            let allPerc = data.allItems['exp'].map(function (cur) {
                return cur.getPercentage();
            })
            return allPerc;
        },
        getBudget: function () {
            return {
                budget: data.budget,
                percentage: data.percentage,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
        testing: function () {
            console.log(data);
        }
    }

})();


// UI CONTROLLER
let UIController = (function () {
    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage'
    }

    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        addListItem: function (obj, type) {
            let html, newHtml, element;

            // create html string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // replace placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', this.formatNumber(obj.value, type));

            // insert the html into the DOM.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        deleteListItem: function (selectorID) {
            let element;
            element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
            // can only remove a child from the dom, weird but that's how it works.

        },
        clearFields: function () {
            let fields, fieldsArray;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields); // trick into thinking its an array
            fieldsArray.forEach(function (current, index, array) {
                current.value = '';
            });
            fieldsArray[0].focus();
        },
        displayBudget: function (obj) {
            let type;
            obj.budget > 0 ? type = 'inc' : type='exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = UIController.formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.expensesLabel).textContent = UIController.formatNumber(obj.totalExp, 'exp');
            document.querySelector(DOMstrings.incomeLabel).textContent = UIController.formatNumber(obj.totalInc, 'inc');

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },
        displayPercentages: function (percentages) {
            let fields;
            fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel); // returns a nodeList

            let nodeListForEach = function (list, callback) {
                for (let i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            }

            nodeListForEach(fields, function (cur, index) {
                if (percentages[index] > 0) {
                    cur.textContent = percentages[index] + '%';
                } else {
                    cur.textContent = '---';
                }
            })
        },
        formatNumber: function (num, type) {
            let numSplit, int, dec, sign;
            num = Math.abs(num);
            // + or -
            // exactly 2 decimal points
            num = num.toFixed(2); // already a string
            // comma if in 1000s
            numSplit = num.split('.');
            int = numSplit[0];
            if (int.length > 3) {
                int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            }
            dec = numSplit[1];
            type === 'exp' ? sign = '- ' : sign = '+ ';
            return sign + int + '.' + dec;
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    }
})();


// GLOBAL APP CONTROLLER
let controller = (function (budgetCtrl, UICtrl) {

    let setupEventListeners = function () {
        let DOM = UIController.getDOMstrings();
        // add budget item
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) { // event.which is for older browsers
                // enter key pressed
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    }

    let updateBudget = function () {
        // Calculate budget
        budgetController.calculateBudget();
        // return the budget
        let budget = budgetController.getBudget();
        // Display budget on ui
        UIController.displayBudget(budget);
    };

    let updatePercentages = function () {
        // calculate percentages
        budgetController.calculatePercentages();
        // read from budget controller
        let percentages = budgetController.getPercentages();
        UIController.displayPercentages(percentages);
    };

    let ctrlAddItem = function () {
        // Retrieve input data
        let input = UIController.getinput();

        if (input.description != '' && !isNaN(input.value) && input.value > 0) {
            // Add item to budget controller
            let newItem = budgetController.addItem(input.type, input.description, input.value);
            // Add item to ui
            UIController.addListItem(newItem, input.type);
            // clear the fields
            UIController.clearFields();
            updateBudget();
            // update percentages
            updatePercentages();
        }
    };

    let ctrlDeleteItem = function (event) {
        let itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // delete item from the data structure
            budgetController.deleteItem(type, ID);
            // delete item from ui
            UIController.deleteListItem(itemID);
            // re-render ui
            updateBudget();
            updatePercentages();
        }
    };

    return {
        init: function () {
            console.log("App started.");
            UIController.displayBudget({
                budget: 0,
                percentage: -1,
                totalInc: 0,
                totalExp: 0
            })
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();