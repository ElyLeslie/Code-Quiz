//I'm gonna begin with the start button that activates the actual quiz! ^-^
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".buttons .quit_game");
const continue_btn = document.querySelector(".buttons .restart_game");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .quit_game")
const quit_game = result_box.querySelector(".buttons .restart_game")
const all_choices = document.querySelector(".option_list");
var timeCount = quiz_box.querySelector(".timer .timer_sec");


var wrongChoice = false


quit_game.onclick = ()=>{
  window.location.reload();
}

restart_quiz.onclick = ()=>{
  quiz_box.classList.add("activeQuiz")
  result_box.classList.remove("activeResult");
  
  let que_count = 0;
  let que_numb = 1;
  let counter;

  let userScore = 0;
  magicQuestions(que_count);
  questionCounter(que_numb);
  next_btn.style.display = "none";
  startTimer();
}

var time = 90;


//This is what happens when you actually click the start button. MAGIC.

start_btn.onclick = () => {
  info_box.classList.add("activeInfo")
  
  
}


//This is the exit button.
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //We REMOVED the active info.
}

//Smack the continue button

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //We REMOVED the active info.
  quiz_box.classList.add("activeQuiz"); //We're gonna show the Quiz box

  magicQuestions(0); //clicking the button calls the magicQuestions function!
  questionCounter(1);
  startTimer(time);
  
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let userScore = 0;



const next_btn = document.querySelector(".next_btn")

//Let's decide what happens when the user clicks the Next >> button. <3

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    magicQuestions(que_count);
    questionCounter(que_numb);
    next_btn.style.display = "none";

  }
  else {
    console.log("All questions complete! :D")
    showResultBox();
  }
}

//Now that we've actually created all of our questions in our little list, let's make it MAGIC even further.
//This is how we get every question and option from the arrays.
function magicQuestions(index) {
  const que_text = document.querySelector(".question_box");
  let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
  let choices_tag = "<div class='option'>" + questions[index].options[0] + "<span></span></div>"
    + "<div class='option'>" + questions[index].options[1] + "<span></span></div>"
    + "<div class='option'>" + questions[index].options[2] + "<span></span></div>"
    + "<div class='option'>" + questions[index].options[3] + "<span></span></div>"
  que_text.innerHTML = que_tag;
  all_choices.innerHTML = choices_tag;
  const option = all_choices.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
    
  }

}


let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function startTimer() {
  counter = setInterval(timer, 1000);
  function timer(){
    timeCount.textContent = time; 
    time--;

    

    if(time < 0){
      clearInterval(counter);
      timeCount.textContent = "00";

      let correctAnswer = questions[que_count].answer
      let allOptions = all_choices.children.length;

      for (let i = 0; i < allOptions; i++) {
        if(all_choices.children[i].textContent == correctAnswer) {
          all_choices.children[i].setAttribute("class", "option correct");
          all_choices.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
       
      for (let i = 0; i < allOptions; i++) {
      all_choices.children[i].classList.add("disabled");
        }
      next_btn.style.display = "block";
      showResultBox()
    }

  }
} }


function optionSelected(answer){

  
  let userAnswer = answer.textContent;
  let correctAnswer = questions[que_count].answer
  let allOptions = all_choices.children.length;

  if(userAnswer == correctAnswer){
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is correct!");
    answer.insertAdjacentHTML("beforeend", tickIcon);

  }
  else {
    wrongChoice = true;
    time = time - 20;
    console.log(time)
    
    answer.classList.add("incorrect");
    console.log ("Answer is incorrect!!!");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    
    
    
    
    
    
    for (let i = 0; i < allOptions; i++) {
      if(all_choices.children[i].textContent == correctAnswer) {
        all_choices.children[i].setAttribute("class", "option correct");
        all_choices.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
      
    }
    
  }

  for (let i = 0; i < allOptions; i++) {
    all_choices.children[i].classList.add("disabled");
    
  }
  next_btn.style.display = "block";

}

function showResultBox() {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score_text");
  if(userScore < 3){
    let scoreTag = '<span>Yikes. You <p>failed</p> with only <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else if(userScore > 2){
    let scoreTag = '<span>Decent. You made it with <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else{
    let scoreTag = '<span>Amazing. You got <p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
};


// Now we create our timer!




//let's fix up the questions at the bottom.




function questionCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector(".total_questions");
  let totalQuestionCountTag = "<span><p>" + index + "</p>out of<p>" + questions.length + "</p>Questions</span>";

  bottom_ques_counter.innerHTML = totalQuestionCountTag
}





