# QUIZ APP (version 1.0)

The code creates an HTML form that collects candidate details, starts a countdown timer for the quiz, and defines a set of questions and answers for the quiz.

![Homepage](/assets/user_details.png)

<br><br>
## Tasks to complete.

- [x] <b>Add a timer to keep track of the time taken to complete the quiz</b>

To add a timer to the quiz, you can use JavaScript to set an initial time and then update the timer every second. You can start by adding a timer-container in the HTML code where the timer will be displayed. 

![timer](/assets/timer.png)

Then, in the script.js file, you can create a function to update the timer, which will be called every second using setInterval(). The function should calculate the remaining time and update the display in the timer-container. You can also add a condition to end the quiz when the time runs out.

- [x] <b>Shuffle the questions so that they appear in a random order each time the quiz is taken</b>

To shuffle the questions, you can create an array of questions and use the Fisher-Yates shuffle algorithm to randomize the order of the questions. Then, when the quiz is started, you can loop through the shuffled array of questions and display them one at a time.

- [x] <b>Change the 'start' button to 'next' when moving to the next question for better clarity</b>

To change the 'start' button to 'next' when moving to the next question, you can create a function to change the text of the button and add an event listener to it. 

<div style="display:flex; align-item: center;">
  <span><img src="/assets/start_quiz.png" style="width:50%;"></span>
  <span><img src="/assets/correct.png" style="width:50%;"></span>
</div>

In the function, you can change the text of the button to 'Next' and set its display to 'none'. Then, when the user selects an answer, you can set the display of the 'Next' button to 'block'.

- [x] <b>Remove the default question and replace it with 10 new questions</b>

- [x] <b>Improve the background, font size, and font color to make the quiz more visually appealing</b>

- [x] <b>Implement a scoring system to track the number of correct answers and provide feedback to the student on their performance</b>

To implement a scoring system, you can create a variable to keep track of the number of correct answers. Then, when the user selects an answer, you can compare the index of the selected answer with the index of the correct answer for the current question. 

![scores](/assets/score.png)

If the indexes match, you can increment the score variable. At the end of the quiz, you can calculate the percentage score and display it along with feedback to the student.

- [x] <b>Add a pie chart to display the student's score in a visual format</b>

To add a pie chart, you can use a JavaScript chart library like Chart.js. You can create a canvas element in the HTML code where the chart will be displayed and then initialize a new chart using the library. You can pass the percentage score as a data point and customize the chart to your liking.

![statistics](/assets/statistics.png)

- [x] <b>Include fields for the student's name and number to identify who has taken the quiz</b>


<br><br>
## In script.js file
<br><br>
The code starts by defining variables `form`, `username`, and `index`. The `form` variable selects the HTML form element with the ID `myForm`. The `username` and `index` variables are initialized to empty strings.

An event listener is added to the form that listens for the `submit` event. When the form is submitted, the event listener's callback function is called. This function first prevents the form from submitting normally using `e.preventDefault()` and then retrieves the form data using the `FormData` object. The function then calls the `processCandidate` function and passes the form data as a parameter. The `processCandidate` function assigns values to the `username` and `index` variables based on the form data.

The code then initializes a timer by defining the `startingMinutes` and `time` variables. `startingMinutes` represents the starting time in minutes, and `time` is the remaining time in seconds for the quiz. The `countdownEl` variable selects the HTML element with the ID `timer`. A function named `updateCountdown` is defined to update the countdown timer in real-time. It calculates the minutes and seconds remaining from the `time` variable and displays them in the `countdownEl` element. The function decrements the `time` variable every second, and when the `time` variable reaches zero, the `clearInterval` function is called to stop the timer and the `endQuiz` function is called.

The code defines an array named `questions` that contains objects representing quiz questions and their corresponding answer choices. Each question object contains a `question` key with a string value representing the question and an `answers` key with an array of objects representing answer choices. Each answer choice object contains a `text` key with a string value representing the answer choice and a `correct` key with a boolean value indicating whether the answer choice is correct or not.

The code also defines a variable named `shuffledQuestions` to store the shuffled questions for the quiz. The questions in the `questions` array will be randomly shuffled and stored in this variable before the quiz starts.

Finally, the code sets up the structure of the quiz and prepares it to be displayed to the user.

