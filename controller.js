const game = {
homeTeam:"",
awayTeam:"",
homeLogo:"",
awayLogo:"",
homeScore:0,
awayScore:0,
clock:1200,
running:false,
period:1,
timeout:null,
breakTime:0,
penaltiesHome:[],
penaltiesAway:[]
}

let teamsData=[]
let penaltyTeam=null

fetch("data/teams.json")
.then(res=>res.json())
.then(data=>{
teamsData=data.teams
initLeague()
})

function initLeague(){

const leagues=[...new Set(teamsData.map(t=>t.league))]

const leagueSelect=document.getElementById("leagueSelect")

leagues.forEach(l=>{
const opt=document.createElement("option")
opt.value=l
opt.textContent=l
leagueSelect.appendChild(opt)
})

leagueSelect.addEventListener("change",loadTeams)

loadTeams()

}

function loadTeams(){

const league=document.getElementById("leagueSelect").value

const homeSelect=document.getElementById("homeTeamSelect")
const awaySelect=document.getElementById("awayTeamSelect")

homeSelect.innerHTML=""
awaySelect.innerHTML=""

teamsData.forEach(team=>{

if(team.league===league){

const o1=document.createElement("option")
o1.value=team.short
o1.textContent=team.name
homeSelect.appendChild(o1)

const o2=document.createElement("option")
o2.value=team.short
o2.textContent=team.name
awaySelect.appendChild(o2)

}

})

updateLogoPreview()

homeSelect.addEventListener("change",updateLogoPreview)
awaySelect.addEventListener("change",updateLogoPreview)

}

function updateLogoPreview(){

const homeTeam=teamsData.find(t=>t.short===homeTeamSelect.value)
const awayTeam=teamsData.find(t=>t.short===awayTeamSelect.value)

if(homeTeam){
homeLogoPreview.src=homeTeam.logo
}

if(awayTeam){
awayLogoPreview.src=awayTeam.logo
}

}

function startMatch(){

const homeTeam=teamsData.find(t=>t.short===homeTeamSelect.value)
const awayTeam=teamsData.find(t=>t.short===awayTeamSelect.value)

game.homeTeam=homeTeam.short
game.awayTeam=awayTeam.short
game.homeLogo=homeTeam.logo
game.awayLogo=awayTeam.logo

setupScreen.style.display="none"
controllerScreen.style.display="block"

updateDisplay()

}

function score(team,change){

if(team==="home"){
game.homeScore=Math.max(0,game.homeScore+change)
}

if(team==="away"){
game.awayScore=Math.max(0,game.awayScore+change)
}

updateDisplay()

}

function startClock(){ game.running=true }
function pauseClock(){ game.running=false }

function resetClock(){
game.clock=1200
updateDisplay()
}

function changePeriod(change){
game.period=Math.max(1,game.period+change)
periodDisplay.textContent=game.period
updateDisplay()
}

function timeout(team){
game.timeout=team
updateDisplay()
}

function clearTimeout(){
game.timeout=null
updateDisplay()
}

function startBreak(seconds){
game.breakTime=seconds
game.running=false
updateDisplay()
}

function cancelBreak(){
game.breakTime=0
updateDisplay()
}

function showPenaltyForm(team){
penaltyTeam=team
penaltyForm.style.display="flex"
}

function closePenalty(){
penaltyForm.style.display="none"
}

function addPenalty(){

const number=document.getElementById("penaltyNumber").value
const type=document.getElementById("penaltyType").value

let time=0

if(type==="2") time=120
if(type==="4") time=120
if(type==="10") time=600

const penalty={number:number,time:time}

if(penaltyTeam==="home"){
game.penaltiesHome.push(penalty)
}

if(penaltyTeam==="away"){
game.penaltiesAway.push(penalty)
}

closePenalty()

updateDisplay()

}

function updateDisplay(){

liveScore.textContent=
game.homeScore+" : "+game.awayScore

liveClock.textContent=formatTime(game.clock)

localStorage.setItem("game",JSON.stringify(game))

}

function formatTime(seconds){

const m=Math.floor(seconds/60)
const s=seconds%60

return m+":"+s.toString().padStart(2,"0")

}

setInterval(()=>{

if(game.running && game.clock>0){

game.clock--

game.penaltiesHome.forEach(p=>{
if(p.time>0)p.time--
})

game.penaltiesAway.forEach(p=>{
if(p.time>0)p.time--
})

updateDisplay()

}

},1000)

leagueSelect.addEventListener("change",loadTeams)

loadTeams()

}

function loadTeams(){

const league=document.getElementById("leagueSelect").value

const homeSelect=document.getElementById("homeTeamSelect")
const awaySelect=document.getElementById("awayTeamSelect")

homeSelect.innerHTML=""
awaySelect.innerHTML=""

teamsData.forEach(team=>{

if(team.league===league){

const o1=document.createElement("option")
o1.value=team.short
o1.textContent=team.name
homeSelect.appendChild(o1)

const o2=document.createElement("option")
o2.value=team.short
o2.textContent=team.name
awaySelect.appendChild(o2)

}

})

updateLogoPreview()

homeSelect.addEventListener("change",updateLogoPreview)
awaySelect.addEventListener("change",updateLogoPreview)

}

function updateLogoPreview(){

const homeSelect=document.getElementById("homeTeamSelect")
const awaySelect=document.getElementById("awayTeamSelect")

const homeTeam=teamsData.find(t=>t.short===homeSelect.value)
const awayTeam=teamsData.find(t=>t.short===awaySelect.value)

if(homeTeam){
document.getElementById("homeLogoPreview").src=homeTeam.logo
}

if(awayTeam){
document.getElementById("awayLogoPreview").src=awayTeam.logo
}

}

function startMatch(){

const homeTeam=teamsData.find(t=>t.short===document.getElementById("homeTeamSelect").value)
const awayTeam=teamsData.find(t=>t.short===document.getElementById("awayTeamSelect").value)

game.homeTeam=homeTeam.short
game.awayTeam=awayTeam.short

game.homeLogo=homeTeam.logo
game.awayLogo=awayTeam.logo

document.getElementById("setupScreen").style.display="none"
document.getElementById("controllerScreen").style.display="block"

updateDisplay()

}

function score(team,change){

if(team==="home"){
game.homeScore=Math.max(0,game.homeScore+change)
}

if(team==="away"){
game.awayScore=Math.max(0,game.awayScore+change)
}

updateDisplay()

}

function startClock(){
game.running=true
}

function pauseClock(){
game.running=false
}

function resetClock(){
game.clock=1200
updateDisplay()
}

function updateDisplay(){

document.getElementById("liveScore").textContent=
game.homeScore+" : "+game.awayScore

document.getElementById("liveClock").textContent=formatTime(game.clock)

localStorage.setItem("game",JSON.stringify(game))

}

function formatTime(seconds){

const m=Math.floor(seconds/60)
const s=seconds%60

return m+":"+s.toString().padStart(2,"0")

}

setInterval(()=>{

if(game.running && game.clock>0){

game.clock--
updateDisplay()

}

},1000)
