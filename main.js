// Global Variables to keep track of question count and user score
let counter = 0;
let score = 0;

// Array of Objects that hold the question data
const QUIZ = [
    {
        question: "Where were the Beatles formed?",
        choices: ["Manchester", "Oxford", "Liverpool", "Hamburg"],
        correctChoice: "Liverpool"
    },
    {
        question: "Who was the oldest member of The Beatles?",
        choices: ["Paul McCartney", "Ringo Starr", "George Harrison", "John Lennon"],
        correctChoice: "Ringo Starr"
    },
    {
        question: "What was the first single released by The Beatles?",
        choices: ["A Hard Day’s Night", "She loves you", "Yesterday", "Love me Do"],
        correctChoice: "Love me Do"
    },
    {
        question: "What is Ringo Starr's real name?",
        choices: ["Richard Starkey", "Ronald Stern", "Albert Stroller", "Patrick Stone"],
        correctChoice: "Richard Starkey"
    },
    {
        question: "Which famous guitarist guest starred on ‘While My Guitar Gently Weeps’?",
        choices: ["Jimi Hendrix", "Eric Clapton", "Jimmy Page", "Keith Richards"],
        correctChoice: "Eric Clapton"
    },
    {
        question: "What year did The Beatles break up?",
        choices: ["1968", "1970", "1972", "1975"],
        correctChoice: "1970"
    },
    {
        question: "What was the last studio album released by The Beatles?",
        choices: ["Rubber Soul", "Revolver", "Abbey Road", "Let it Be"],
        correctChoice: "Let it Be"
    },
    {
        question: "On what TV show did The Beatles debut in the US?",
        choices: ["American Bandstand", "The Dick Van Dyke Show", "The Ed Sullivan Show", "Saturday Night Live"],
        correctChoice: "The Ed Sullivan Show"
    },
    {
        question: "In which German city did The Beatles play in clubs before breaking through?",
        choices: ["Dresden", "Berlin", "Bremen", "Hamburg"],
        correctChoice: "Hamburg"
    },
    {
        question: "Which Beatle was the first to earn a knighthood and the right to be called 'Sir'?",
        choices: ["Paul McCartney", "Ringo Starr", "George Harrison", "John Lennon"],
        correctChoice: "Paul McCartney"
    }
]

// Array to store images to be displayed for each question
const beatlesPhotos = [
    `<img class="question-img" src="images/ali-beatles.jpg" alt="the beatles with muhammed ali">`,
    `<img class="question-img" src="images/beatles-sandwich.jpg" alt="the beatles with a sandwich">`,
    `<img class="question-img" src="images/beatles-sgt-pepper.jpg" alt="the beatles in sargent pepper outfits">`,
    `<img class="question-img" src="images/john-sneeze.jpeg" alt="john lennon sneezing">`,
    `<img class="question-img" src="images/little-richard.jpg" alt="the beatles with little richard">`,
    `<img class="question-img" src="images/paul-monkey.jpg" alt="paul dressed as a monkey">`,
    `<img class="question-img" src="images/paul-weird.jpg" alt="paul being weird">`,
    `<img class="question-img" src="images/beatles-yellow-sub.jpg" alt="beatles yellow submarine drawing">`,
    `<img class="question-img" src="images/beatles-day-in-life.jpg" alt="a day in the life of the beatles">`,
    `<img class="question-img" src="images/ringo-choke.jpg" alt="ringo choking himself">`
]

// Array to store type of feedback depending on user's answer
const userFeedback = [
    `<h3 class="feedback">Correct! You chose <span class="correct-answer"></span>. Great Job!</h3>
    <p><em>"Happiness is a correct answer!"</em> - John Lennon</p>
        <form class="next-question" name="next-question">
            <button class="feedback-btn js-next-question" type="submit">Next</button>
            <button class="feedback-btn js-restart-quiz" type="submit">Start over</button>
        </form>`,
    `<h3 class="feedback">Wrong! You chose <span class="incorrect-answer"></span>. The correct answer was <span class="correct-answer"></span>.</h3>
    <p>"All you need is love," but you ain't gettin none...because you gave a wrong answer...in case you didn't get that...</p>
        <form class="next-question" name="next-question">
            <button class="feedback-btn js-next-question" type="submit">Next</button>
            <button class="feedback-btn js-restart-quiz" type="submit">Start over</button>
        </form>`
]

// Stores type of feeback depending on user's final score
const finalFeedback = [
    `<h3>Final Score</h3>
    <h4>You scored <span class="correct-count"></span> out fo 10 question correctly</h4>
    <h4>Wow! you got a perfect score! I want to hold your hand!</h4>
    <form name="quiz-start" class="js-start-quiz">
    <button class="js-restart-btn stay-leave" type="submit">Try Again</button>
    </form>
    <form name="leave-quiz" class="js-leave-quiz">
    <button class="js-leave-btn stay-leave" type="submit">Maybe some other time</button>
    </form>`,
    `<h3>Final Score</h3>
    <h4>You scored <span class="correct-count"></span> out fo 10 question correctly</h4>
    <h4>Nice Score! You could do better, but we can "Let it be."</h4>
    <form name="quiz-start" class="js-start-quiz">
    <button class="js-restart-btn stay-leave" type="submit">Try Again</button>
    </form>
    <form name="leave-quiz" class="js-leave-quiz">
    <button class="js-leave-btn stay-leave" type="submit">Maybe some other time</button>
    </form>`,
    `<h3>Final Score</h3>
    <h4>You scored <span class="correct-count"></span> out fo 10 question correctly</h4>
    <h4>HELP! You need somebody and I need a drink after seeing you bomb!</h4>
    <form name="quiz-start" class="js-start-quiz">
        <button class="js-restart-btn stay-leave" type="submit">Try Again</button>
    </form>
    <form name="leave-quiz" class="js-leave-quiz">
        <button class="js-leave-btn stay-leave" type="submit">Maybe some other time</button>
    </form>`
]

// Starts the quiz 
function startQuiz() {
    // Listens for click event on start button 
    $('.start').on('click', '.js-start-btn', (event) => {
        // overrides default behavior
        event.preventDefault();
        // logs status 
        console.log('startQuiz ran')
        // ensure that global variables are set at 0
        resetQuiz()
        // calls handleQuestions to ensure correct sequence
        handleQuestions();
        // removes hide-display class to view question
        $('.question-page').removeClass("hide-display");
        // hides welcome page.
        $('.welcome-page').addClass("hide-display");

    })
};

// if user chooses to not take quiz, then I hate them.
function leaveQuiz() {
    $('.leave').on('click', '.js-leave-btn', (event) => {
        event.preventDefault();
        console.log('Redirecting')
        window.open("https://thatsthefinger.com/", "_self")
    })
};

// This function determins which question to display 
function handleQuestions() {
    // log status
    console.log('handleQuestions ran')
    // logs counter and score
    console.log("counter " + counter)
    console.log("score " + score)
    // pulls question based on counter as index and stores it in variable
    let currentQuestion = QUIZ[counter];
    // pulls photo based on counter as index and stores it in variable
    let currentPhoto = beatlesPhotos[counter]
    // constructs html to be appended
    let questionHTML = `
        <div class="question">
            <form class="question-form js-question-form" name="current-question">
            <fieldset name="quiz-question">
                <legend class="current-question">
                <h4><span class="question-count">${counter + 1}/10</span> : <span class="question-text">${currentQuestion.question}</span></h4>
                </legend>
                <ol type="A" class="choices">
                    <li>
                        <input type="radio" name="user-answer" id="choice-one" value="${currentQuestion.choices[0]}" required>
                        <label for="choice-one" class="answers">${currentQuestion.choices[0]}</label>
                    </li>
                    <li>

                        <input type="radio" name="user-answer" id="choice-two" value="${currentQuestion.choices[1]}" required>
                        <label for="choice-two" class="answers">${currentQuestion.choices[1]}</label>
                    </li>
                    <li>

                        <input type="radio" name="user-answer" id="choice-three" value="${currentQuestion.choices[2]}" required>
                        <label for="choice-three" class="answers">${currentQuestion.choices[2]}</label>
                    </li>
                    <li>

                        <input type="radio" name="user-answer" id="choice-four" value="${currentQuestion.choices[3]}" required>
                        <label for="choice-four" class="answers">${currentQuestion.choices[3]}</label>
                    </li>
                </ol>
                <button class="js-submit submit-answer" type="submit">Submit</button>
                <h4>Correct answers: <span class="correct-count">${score}/10</span></h4>
            </fieldset>
            </form>
            
        </div>
        <div>
            ${currentPhoto}
        </div>
        `;
    // appends html to specified ID
    $('#question-page').html(questionHTML);


};

// determines feedback for user. Takes user answer and correct answer as parameters
function determineFeedback(userAnswer, correctAnswer) {
    console.log('determineFeedback ran');
    // If user gets correct answer, score increments, feedback appended, with correct answer.
    if (userAnswer === correctAnswer) {
        score += 1;
        $('.feedback-page').html(userFeedback[0])
        $('.correct-answer').html(correctAnswer)
    }
    // if user answer incorectly, then user's answer displayed along with correct answer.
    else {
        $('.feedback-page').html(userFeedback[1])
        $('.incorrect-answer').html(userAnswer)
        $('.correct-answer').html(correctAnswer)
    }

}

// Once the user submits their answer this function handles the feedback determination
function handleFeedback() {
    // listens for submit answer event
    $('.question-page').on('submit', '.js-question-form', event => {
        // overrides default behavior
        event.preventDefault();
        // logs status
        console.log('handleFeedback ran');
        // logs counter and score
        console.log("counter " + counter)
        console.log("score " + score)
        // takes the value of the user answer and stores it
        let userAnswer = $('input[name=user-answer]:checked').val();
        // pulls correct answer from stored data 
        let correctAnswer = QUIZ[counter].correctChoice;
        // runs determineFeedback()
        determineFeedback(userAnswer, correctAnswer);
        // toggle hide-display to display feedback page
        $('.question-page').addClass("hide-display");
        $('.feedback-page').removeClass("hide-display");
        // increments counter for next question
        counter++;
        // determines when to show user their final score
        if (counter < 10) {
            handleQuestions();
        }
    })


}

// Handles next question 
function handleNext() {
   
    // handles next question click event
    $('.feedback-page').on('click', '.js-next-question', event => {
        event.preventDefault();
        if (counter < 10) {
        // logs status and toggles current pages to be displayed/hidden
        console.log('handleNext ran')
        $('.feedback-page').addClass("hide-display");
        $('.question-page').removeClass("hide-display");
    }
    else {
        handleFinalScore();
    }

    });

};

// resets score and counter
function resetQuiz() {
    console.log('resetQuiz ran')
    counter = 0;
    score = 0;
}

// handles quiz restart from feedback page
function handleRestart() {
    // listens for retart quiz click event
    $('.feedback-page').on('click', '.js-restart-quiz', event => {
        event.preventDefault();
        console.log('handleRestart ran');
        // resets counter and score
        resetQuiz()
        // logs data to confirm
        console.log("counter " + counter)
        console.log("score " + score)
        // toggles pages to display/hide
        $('.feedback-page').addClass("hide-display");
        $('.welcome-page').removeClass("hide-display");
    })

};

// takes final score as parameter and determines final feedback message 
// based on users total score after 10th question
function determineFinalFeedback(score) {
    if (score === 10) {
        $('.final-score').html(finalFeedback[0])
        $('.correct-count').html(score)
    }
    else if (score < 10 && score >= 6) {
        $('.final-score').html(finalFeedback[1])
        $('.correct-count').html(score)
    }
    else {
        $('.final-score').html(finalFeedback[2])
        $('.correct-count').html(score)
    }
}

// Handles the final message for user and displays score
function handleFinalScore() {
        // logs status
        console.log('handleFinalScore ran')
        console.log("counter " + counter)
        console.log("score " + score)
        // stores final score 
        let finalScore = score;
        // runs determineFinalFeedback using final score as parameter
        determineFinalFeedback(finalScore)
        // toggles which page to display/hide
        $('.feedback-page').addClass("hide-display");
        $('.final-score').removeClass("hide-display");
    };

    // Allows user to restart quiz from final feedback page
    function restartQuiz() {
        $('.start').on('click', '.js-restart-btn', (event) => {
            event.preventDefault();
            // logs status
            console.log('restartQuiz ran')
            // resets counter and score
            resetQuiz();
            // logs data
            console.log("counter " + counter)
            console.log("score " + score)
            // ensures correct sequence of questions
            handleQuestions();
            // toggles correct page to display/hide
            $('.final-score').addClass("hide-display");
            $('.welcome-page').removeClass("hide-display");
        })
    };


    // this function will be our callback when the page loads. it's responsible for
    // initially rendering the starting questions and activating our individual functions
    function handleQuiz() {
        startQuiz();
        leaveQuiz();
        handleQuestions();
        handleFeedback();
        handleRestart()
        handleNext(); 
        restartQuiz();
    }
    // when the page loads, call `handleQuiz`
    $(handleQuiz);