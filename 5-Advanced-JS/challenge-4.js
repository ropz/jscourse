(function () {
    let Question = function (text, ans, correct) {
        this.questionText = text;
        this.answers = ans;
        this.correct = correct;
    }

    Question.prototype.ask = function () {
        console.log(this.questionText);
        console.log("Possible answers are: " + this.answers);
    };

    let Game = function () {
        console.log("Game constructor called");
        this.score = 0;
        this.questions = [];
        this.questions.push(new Question('How old is Clive', [58, 27, 49], 0));
        this.questions.push(new Question('What\'s the tallest mountain in the world?', ['K2', 'Everest', 'Snowdon'], 1));
        this.questions.push(new Question('How many legs does an insect have?', [2, 4, 6], 2));
        this.start = function () {
            console.log('starting');
            let exitDesire = false;
            while (!exitDesire) {
                let randomQuestionNumber = Math.floor(Math.random() * this.questions.length);
                let randomQuestion = this.questions[randomQuestionNumber].ask();
                let reply = prompt('Choice?');
                if (reply == this.questions[randomQuestionNumber].correct) {
                    console.log('correct!');
                    this.score++;
                } else if (reply === 'exit') {
                    exitDesire = true;
                } else {
                    console.log('sorry, try again');
                }
                console.log('Your score is: ' + this.score);
                console.log('------------------------');
            }
        }

    }

    let g = new Game();
    g.start();


})();