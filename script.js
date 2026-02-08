let savings = 5000;
let debt = 2000;
let season = 1;
let insured = false;
let score = 0;



function updateDashboard(){
savingsEl.innerText = savings;
debtEl.innerText = debt;
seasonEl.innerText = season;
scoreEl.innerText = score;

showStory();
}

const savingsEl = document.getElementById("savings");
const debtEl = document.getElementById("debt");
const seasonEl = document.getElementById("season");
const scoreEl = document.getElementById("score");


// ⭐ STORY MODE
function showStory(){
let story = "";

if(season == 1)
story = "You start your farming journey with hope.";
else if(season == 2)
story = "Weather conditions are uncertain this year.";
else
story = "You are becoming an experienced farmer.";

storyText.innerText = story;

}



// ⭐ WEATHER SYSTEM
function weatherEvent(){
let weather = ["Good Rainfall","Drought","Storm"];
let event = weather[Math.floor(Math.random()*3)];

weatherText.innerText = "Weather: " + event;

if(event == "Drought") savings -= 2000;
if(event == "Storm") savings -= 1500;
if(event == "Good Rainfall") savings += 2000;


}


// ⭐ DECISIONS
let decisions = [
{
title:"Buy Seeds",
options:[
{ text:"Premium Seeds (-2000)", action:()=>{savings-=2000;score+=20;} },
{ text:"Cheap Seeds (-1000)", action:()=>{savings-=1000;score+=10;} }
]
},
{
title:"Take Loan",
options:[
{ text:"Bank Loan (+3000)", action:()=>{savings+=3000;debt+=3200;} },
{ text:"Moneylender (+3000)", action:()=>{savings+=3000;debt+=4500;score-=10;} }
]
},
{
title:"Buy Insurance",
options:[
{ text:"Buy (-800)", action:()=>{savings-=800;insured=true;score+=15;} },
{ text:"Skip", action:()=>{score-=5;} }
]
},
{
title:"Sell Crops",
options:[
{ text:"Trader", action:()=>{savings+=3000;} },
{ text:"Mandi", action:()=>{savings+=4000;score+=10;} },
{ text:"Digital", action:()=>{savings+=4500;score+=20;} }
]
}
];

let currentDecision = 0;

function startDecision(){
dashboard.classList.add("hidden");
showDecision();
}

function showDecision(){

if(currentDecision >= decisions.length){
seasonEnd();
return;
}

let d = decisions[currentDecision];
decisionTitle.innerText = d.title;

let html = "";

d.options.forEach((opt,i)=>{
html += `<button onclick="chooseOption(${i})">${opt.text}</button>`;
});

decisionOptions.innerHTML = html;
decision.classList.remove("hidden");
}

function chooseOption(i){
decisions[currentDecision].options[i].action();
currentDecision++;
updateDashboard();
showDecision();
}


// ⭐ END SEASON
function seasonEnd(){

decision.classList.add("hidden");

weatherEvent();

let loss = insured ? 1000 : 3000;
savings -= loss;

summaryText.innerText = 
`Season ended. Loss ₹${loss}.
Learning Tip: Always manage risks wisely.`;

summary.classList.remove("hidden");

saveLeaderboard();
}


// ⭐ LEADERBOARD
function saveLeaderboard(){

let board = JSON.parse(localStorage.getItem("leaderboard")) || [];
board.push(score);
board.sort((a,b)=>b-a);

localStorage.setItem("leaderboard", JSON.stringify(board.slice(0,5)));

showLeaderboard();
}

function showLeaderboard(){

let board = JSON.parse(localStorage.getItem("leaderboard")) || [];

let text = "Leaderboard:\n";

board.forEach((s,i)=>{
text += `${i+1}. Score: ${s}\n`;
});

leaderboardText.innerText = text;
}


// ⭐ NEXT SEASON
function restartGame(){

season++;
currentDecision = 0;
insured = false;

summary.classList.add("hidden");
dashboard.classList.remove("hidden");

updateDashboard();
}

updateDashboard();
