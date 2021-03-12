
var input_name="";
var level="";
var time=0;

function levelfun(x){
    level = x.value ; 
}

// quiz start function
function startQuiz(){
     input_name = document.getElementById("input_name").value ;
    
    //  validation for name and quiz level
     if( input_name==""){
         alert( 'enter the NAME first :  NAME ? ' ) ;
         return ;
     }
     if( level==="" ){
        alert(' Select the QUIZ LEVEL first : LEVEL ? ') ;
        return ;
    }

    updateArray();
    time=0; 
    setInterval;
    document.getElementById("name").innerText="Hii , "+input_name ;
    document.getElementById("con1").style.display="none" ;
    document.getElementById("con2").style.display="grid" ;
    nextQuestion();
}

//  timer function
var timer=setInterval( ()=>{
    document.getElementById("time").innerText=time ; 
     time++;
    if( time>30 ){
      clearInterval(timer);
      quizFinish();
    }
    },1000) ;

//  quiz finish function
function quizFinish(){
    document.getElementById("con2").style.display="none" ;
    document.getElementById("con3").style.display="flex" ;
    finalResult();
}

//  quiz restart function
function restartTest(){
    document.getElementById("con3").style.display="none" ;
    document.getElementById("con1").style.display="grid" ;
    question_number=0;
    question_index=[-1,-1,-1,-1,-1];
    result=0;
    count2=1;
    time=0;
    document.getElementById("question_display").innerHTML="" ;
}

//  function that fetch question from the local file
//  present at same folder
function questionBank(str,num){
   url=str+".json";
   fetch(url)
    .then((response) => {
       return response.json();
    })
    .then( (data) => {
        questionDisplay(data.questions[num]);
    });
 }
 
 var random;
 var question_index=[-1,-1,-1,-1,-1];

 function updateArray(){
 var count=0;
 while( count<5 ){
  random = Math.floor(Math.random() * 16 );
  if( question_index[random]!=-1 && !question_index.includes(random) ){
      question_index[count]=random;
      count++;
  }
 } 
}

// function to fecth next question from question bank
var question_number=0;
function nextQuestion(){
    questionBank(level,question_index[question_number]);
    question_number++;
    
    answerValidate();

    if( question_number>5 ){
        quizFinish(); 
    }
}

var present_question="";
var answer="";

// function to display question 
function questionDisplay(que){
    document.getElementById("question").innerHTML=que.question ;
    document.getElementById("option1").innerHTML=que.option1 ;
    document.getElementById("option2").innerHTML=que.option2 ;
    document.getElementById("option3").innerHTML=que.option3 ;
    document.getElementById("option4").innerHTML=que.option4 ; 
    
    present_question=que.question;
    answer=que.answer;
}

// function to display question in the result
// section if it is correct
var count2=1;
function correctQuestionDisplay(){
    document.getElementById("question_display").innerHTML += `
    
       <div class="each-question">
           <h2>Q${count2} . ${present_question}</h2>
           <h4> Ans :..   ${answer}</h4>
       </div>
    ` ;
    count2++;
}

// function to select option from option.s
var given_answer;
function optionSelected(opt){
 var ele=document.getElementsByClassName("q_option");
    for(let i=0;i<ele.length;i++){
           ele[i].style.backgroundColor= "#c9d9ec";
           ele[i].style.color= "black";
    }

    opt.style.backgroundColor= "#034f84";
           opt.style.color= "white";
    given_answer=opt.innerText;
}

// function to check the given answer is correct or not
var result=0;
function answerValidate(){
    if( answer==given_answer ){
        correctQuestionDisplay();
        result++;
    }
}


// function to print the result
function finalResult(){
  if( result==0 ){
    document.getElementById("result").innerHTML= 0 ; 
  }
  if( result==1 ){
    document.getElementById("result").innerHTML= "Poor" ; 
  }
  if( result==2 ){
    document.getElementById("result").innerHTML= "Bad" ; 
  }
  if( result==3 ){
    document.getElementById("result").innerHTML= "Good" ; 
  }
  if( result==4 ){
    document.getElementById("result").innerHTML= "Strong" ; 
  }
  if( result==5 ){
    document.getElementById("result").innerHTML= "Excellent" ; 
  }
}
