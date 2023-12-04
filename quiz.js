// get and set the elements and get html questions
let questions=document.querySelector(".questions");
let submit=document.querySelector(".submit");
let counter=document.querySelector(".counter span");
let points=0;
let theChosenAnswer="";
let no=0;
let time=10;
let noSubmit=1;
let circleColor=1;
let noOfShuffle=0;
document.querySelector(".quiz-container").style.display="none"; 

document.querySelector(".html").onclick=function(){
  document.querySelector(".selct-categories").style.display="none"; 
document.querySelector(".quiz-container").style.display="block"; 
// end of getting and setting the elements

// Fetch Online Data
fetch('https://gist.githubusercontent.com/AyaRefaeyy1234/522e320fc43a4f2adc9a4d463818fffa/raw/7b5615ce57d70d5f3d1d375ff14e20ea4796fc38/json')
.then((respone)=>(respone.json()))
.then((repose)=>{
 console.log(repose);
//  start creat questions and answers
let answers=document.createElement("div");
let h2=document.createElement("h2");
answers.className="answers";

let a1=document.createElement("div");
a1.className="answer1";
let input=document.createElement("input");
input.type="radio";
input.id="answer1";
input.className="element";
input.name="qustion";
let lable=document.createElement("label");
lable.className="answer1";
lable.setAttribute("for" , "answer1");
a1.appendChild(input);
a1.appendChild(lable);
answers.append(a1);

let a2=document.createElement("div");
a2.className="answer2";
let input2=document.createElement("input");
input2.type="radio";
input2.id="answer2";
input2.className="element";
input2.name="qustion";
let lable2=document.createElement("label");
lable2.className="answer2";
lable2.setAttribute("for" , "answer2");
a2.appendChild(input2);
a2.appendChild(lable2);
answers.appendChild(a2);

let a3=document.createElement("div");
a3.className="answer3";
let input3=document.createElement("input");
input3.type="radio";
input3.name="qustion";
input3.id="answer3";
input3.className="element";
let lable3=document.createElement("label");
lable3.className="answer3";
lable3.setAttribute("for" , "answer3");
a3.appendChild(input3);
a3.appendChild(lable3);
answers.appendChild(a3);

let a4=document.createElement("div");
a4.className="answer4";
let input4=document.createElement("input");
input4.type="radio";
input4.id="answer4";
input4.name="qustion";
input4.className="element";
let lable4=document.createElement("label");
lable4.className="answer4";
lable4.setAttribute("for" , "answer4");
a4.appendChild(input4);
a4.appendChild(lable4);
answers.appendChild(a4)

questions.appendChild(h2);
questions.appendChild(answers);



// creat array of answers
let array=Array.from(answers.children);
setTimeout(() => {
  changeQuestion();
}, 100);


//  start make questions and answers
function changeQuestion(){ 
  // console.log(no);
  if(no < 9){
    no++;
  array.forEach(element=>{
  element.children[0].classList.remove("selected");
   });
  //  console.log(noSubmit)
  //  console.log(repose[noSubmit-1])    
  let questionsShuffle=Math.floor(Math.random()*repose.length);
   if(repose[questionsShuffle].answers.length){
    h2.innerHTML=repose[questionsShuffle].title;
  
    let answer1=Math.floor(Math.random()*repose[questionsShuffle].answers.length);
    lable.innerHTML=repose[questionsShuffle].answers[answer1];
    repose[questionsShuffle].answers.splice(answer1,1)
  
    let answer2=Math.floor(Math.random()*repose[questionsShuffle].answers.length);
    lable2.innerHTML=repose[questionsShuffle].answers[answer2];
    repose[questionsShuffle].answers.splice(answer2,1)
  
    let answer3=Math.floor(Math.random()*repose[questionsShuffle].answers.length);
    lable3.innerHTML=repose[questionsShuffle].answers[answer3];
    repose[questionsShuffle].answers.splice(answer3,1)
  
    let answer4=Math.floor(Math.random()*repose[questionsShuffle].answers.length);
    lable4.innerHTML=repose[questionsShuffle].answers[answer4]; 
    repose[questionsShuffle].answers.splice(answer4,1)
    console.log(`set noOfShuffle ${noOfShuffle}`);
    noOfShuffle=questionsShuffle;
    console.log(`before noOfShuffle ${noOfShuffle}`);
    array.forEach(element => {
      element.children[0].onclick=function(){;
        theChosenAnswer=element.children[1].innerHTML;
        console.log(`inner${repose[questionsShuffle].theRightAnswer}`);
        console.log(`theChosenAnswer${theChosenAnswer}`);
        if(theChosenAnswer === repose[noOfShuffle].theRightAnswer){
          console.log("yes");
          // repose.splice(noOfShuffle,1);
        }else{
          // repose.splice(noOfShuffle,1);
        }
    }
    });
   
   
   } 

  document.body.addEventListener("click",function(e){
      if(e.target.classList.contains("element")){
          array.forEach(element => {
              element.children[0].classList.remove("selected");
              e.target.classList.add("selected");
              console.log(e.target.nextSibling.innerHTML)
              theChosenAnswer= e.target.nextSibling.innerHTML;
              
          });
        
      }
   })
   }else if(no === 9){
       console.log('the end');
       clearInterval(timer)
       theEnd();
   }
}


// after 20 seconds change question and set time
var timer=setInterval(myIntervalone,1000);
function myIntervalone(){
  counter.innerHTML=counter.innerHTML-1;
  if(parseInt(counter.innerHTML) === 0){
     console.log("change");
     console.log(`time ${noOfShuffle}`);
     checkerquestions();
     
  };
 
}




// if i click submit change question and check answer
submit.onclick=function(){
  array.forEach(element => {
     if(!element.children[0].classList.contains("selected")){
      console.log('must select')
     }else{   
      console.log(`after noOfShuffle ${noOfShuffle}`);
      console.log(theChosenAnswer);
      if(theChosenAnswer === repose[noOfShuffle].theRightAnswer){
        console.log(`${theChosenAnswer} === ${ repose[noOfShuffle].theRightAnswer}`)
            points+=1;
            console.log(`no of points is${points}`);
        }else{
            console.log(`${theChosenAnswer} !== ${ repose[noOfShuffle].theRightAnswer}`);
        }
        checkerquestions();
     }
    
  });
}



function checkerquestions(){
  document.querySelector(".spans").children[circleColor-1].style.backgroundColor="blue";
    circleColor+=1;  
    noSubmit++;
    repose.splice(noOfShuffle,1);
    changeQuestion(); 
    counter.innerHTML=20;
    array.forEach(element => {
    element.children[0].checked=false;
    theChosenAnswer='';
});
}




function theEnd(){
    document.querySelector(".spans").style.display="none";
    document.querySelector(".counter").style.display="none";
    questions.style.display="none";
    submit.style.display="none";
    let result=document.createElement("div");
     result.className="result"; 
     document.querySelector(".quiz-container").appendChild(result);
    if(points <=3 ){
        result.innerHTML=`<span>bad</span>,${points} from 9`;
        document.querySelector('.result span').style.cssText='display:contents;color:red;'; 
    }else if(points >=3 && points<=6 ){
        result.innerHTML=`<span>good</span>,${points} from 9`;
        document.querySelector('.result span').style.cssText='display:contents;color:yellow;'; 
    }else if( points > 6){
        result.innerHTML=`<span>Excellent</span>, ${points} from 9`; 
        document.querySelector('.result span').style.cssText='display:contents;color:blue;'; 
        
    }
    result.style.cssText='background-color: #fff;padding: 20px;display: flex;justify-content: space-between;'
    document.querySelector(".quiz-container").style.cssText='background-color: #eee;width: 791px;height: 206px;padding: 20px;margin: 13px auto;'
}
function clearCheck() {
    array.forEach(element => {
     element.children[0].checked=false;
    });
}

})
}
document.querySelector(".css").onclick=function(){
document.querySelector(".selct-categories").style.display="none"; 
document.querySelector(".quiz-container").style.display="block"; 
// end of getting and setting the elements

// Fetch Online Data
fetch('https://gist.githubusercontent.com/AyaRefaeyy1234/522e320fc43a4f2adc9a4d463818fffa/raw/7b5615ce57d70d5f3d1d375ff14e20ea4796fc38/json')
.then((respone)=>(respone.json()))
.then((repose)=>{
 console.log(repose);
//  start creat questions and answers
let answers=document.createElement("div");
let h2=document.createElement("h2");
answers.className="answers";

let a1=document.createElement("div");
a1.className="answer1";
let input=document.createElement("input");
input.type="radio";
input.id="answer1";
input.className="element";
input.name="qustion";
let lable=document.createElement("label");
lable.className="answer1";
lable.setAttribute("for" , "answer1");
a1.appendChild(input);
a1.appendChild(lable);
answers.append(a1);

let a2=document.createElement("div");
a2.className="answer2";
let input2=document.createElement("input");
input2.type="radio";
input2.id="answer2";
input2.className="element";
input2.name="qustion";
let lable2=document.createElement("label");
lable2.className="answer2";
lable2.setAttribute("for" , "answer2");
a2.appendChild(input2);
a2.appendChild(lable2);
answers.appendChild(a2);

let a3=document.createElement("div");
a3.className="answer3";
let input3=document.createElement("input");
input3.type="radio";
input3.name="qustion";
input3.id="answer3";
input3.className="element";
let lable3=document.createElement("label");
lable3.className="answer3";
lable3.setAttribute("for" , "answer3");
a3.appendChild(input3);
a3.appendChild(lable3);
answers.appendChild(a3);

let a4=document.createElement("div");
a4.className="answer4";
let input4=document.createElement("input");
input4.type="radio";
input4.id="answer4";
input4.name="qustion";
input4.className="element";
let lable4=document.createElement("label");
lable4.className="answer4";
lable4.setAttribute("for" , "answer4");
a4.appendChild(input4);
a4.appendChild(lable4);
answers.appendChild(a4)

questions.appendChild(h2);
questions.appendChild(answers);



// creat array of answers
let array=Array.from(answers.children);
setTimeout(() => {
  changeQuestion();
}, 100);


//  start make questions and answers
function changeQuestion(){ 
  // console.log(no);
  if(no < 9){
    no++;
  array.forEach(element=>{
  element.children[0].classList.remove("selected");
   });
  //  console.log(noSubmit)
  //  console.log(repose[noSubmit-1])    
  let questionsShuffle=Math.floor(Math.random()*repose.length);
   if(repose[questionsShuffle].answers.length){
    h2.innerHTML=repose[questionsShuffle].title;
  
    let answer1=Math.floor(Math.random()*repose[questionsShuffle].answers.length);
    lable.innerHTML=repose[questionsShuffle].answers[answer1];
    repose[questionsShuffle].answers.splice(answer1,1)
  
    let answer2=Math.floor(Math.random()*repose[questionsShuffle].answers.length);
    lable2.innerHTML=repose[questionsShuffle].answers[answer2];
    repose[questionsShuffle].answers.splice(answer2,1)
  
    let answer3=Math.floor(Math.random()*repose[questionsShuffle].answers.length);
    lable3.innerHTML=repose[questionsShuffle].answers[answer3];
    repose[questionsShuffle].answers.splice(answer3,1)
  
    let answer4=Math.floor(Math.random()*repose[questionsShuffle].answers.length);
    lable4.innerHTML=repose[questionsShuffle].answers[answer4]; 
    repose[questionsShuffle].answers.splice(answer4,1)
    console.log(`set noOfShuffle ${noOfShuffle}`);
    noOfShuffle=questionsShuffle;
    console.log(`before noOfShuffle ${noOfShuffle}`);
    array.forEach(element => {
      element.children[0].onclick=function(){;
        theChosenAnswer=element.children[1].innerHTML;
        console.log(`inner${repose[questionsShuffle].theRightAnswer}`);
        console.log(`theChosenAnswer${theChosenAnswer}`);
        if(theChosenAnswer === repose[noOfShuffle].theRightAnswer){
          console.log("yes");
          // repose.splice(noOfShuffle,1);
        }else{
          // repose.splice(noOfShuffle,1);
        }
    }
    });
   
   
   } 

  document.body.addEventListener("click",function(e){
      if(e.target.classList.contains("element")){
          array.forEach(element => {
              element.children[0].classList.remove("selected");
              e.target.classList.add("selected");
              console.log(e.target.nextSibling.innerHTML)
              theChosenAnswer= e.target.nextSibling.innerHTML;
              
          });
        
      }
   })
   }else if(no === 9){
       console.log('the end');
       clearInterval(timer)
       theEnd();
   }
}


// after 20 seconds change question and set time
var timer=setInterval(myIntervalone,1000);
function myIntervalone(){
  counter.innerHTML=counter.innerHTML-1;
  if(parseInt(counter.innerHTML) === 0){
     console.log("change");
     console.log(`time ${noOfShuffle}`);
     checkerquestions();
     
  };
 
}




// if i click submit change question and check answer
submit.onclick=function(){
  array.forEach(element => {
     if(!element.children[0].classList.contains("selected")){
      console.log('must select')
     }else{   
      console.log(`after noOfShuffle ${noOfShuffle}`);
      console.log(theChosenAnswer);
      if(theChosenAnswer === repose[noOfShuffle].theRightAnswer){
        console.log(`${theChosenAnswer} === ${ repose[noOfShuffle].theRightAnswer}`)
            points+=1;
            console.log(`no of points is${points}`);
        }else{
            console.log(`${theChosenAnswer} !== ${ repose[noOfShuffle].theRightAnswer}`);
        }
        checkerquestions();
     }
    
  });
}



function checkerquestions(){
  document.querySelector(".spans").children[circleColor-1].style.backgroundColor="blue";
    circleColor+=1;  
    noSubmit++;
    repose.splice(noOfShuffle,1);
    changeQuestion(); 
    counter.innerHTML=20;
    array.forEach(element => {
    element.children[0].checked=false;
    theChosenAnswer='';
});
}




function theEnd(){
    document.querySelector(".spans").style.display="none";
    document.querySelector(".counter").style.display="none";
    questions.style.display="none";
    submit.style.display="none";
    let result=document.createElement("div");
     result.className="result"; 
     document.querySelector(".quiz-container").appendChild(result);
    if(points <=3 ){
        result.innerHTML=`<span>bad</span>,${points} from 9`;
        document.querySelector('.result span').style.cssText='display:contents;color:red;'; 
    }else if(points >=3 && points<=6 ){
        result.innerHTML=`<span>good</span>,${points} from 9`;
        document.querySelector('.result span').style.cssText='display:contents;color:yellow;'; 
    }else if( points > 6){
        result.innerHTML=`<span>Excellent</span>, ${points} from 9`; 
        document.querySelector('.result span').style.cssText='display:contents;color:blue;'; 
        
    }
    result.style.cssText='background-color: #fff;padding: 20px;display: flex;justify-content: space-between;'
    document.querySelector(".quiz-container").style.cssText='background-color: #eee;width: 791px;height: 206px;padding: 20px;margin: 13px auto;'
}
function clearCheck() {
    array.forEach(element => {
     element.children[0].checked=false;
    });
}

})
}




