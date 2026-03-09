function updateDisplay(){

const data=localStorage.getItem("game")

if(!data)return

const game=JSON.parse(data)

homeScore.textContent=game.homeScore
awayScore.textContent=game.awayScore

clock.textContent=formatTime(game.clock)

period.textContent="PERIOD "+game.period

homeLogo.src=game.homeLogo
awayLogo.src=game.awayLogo

homeName.textContent=game.homeTeam
awayName.textContent=game.awayTeam

updatePenalties("home",game.penaltiesHome)
updatePenalties("away",game.penaltiesAway)

if(game.timeout){

timeoutDisplay.textContent="TIMEOUT "+game.timeout.toUpperCase()

}else{

timeoutDisplay.textContent=""

}

if(game.breakTime>0){

breakDisplay.textContent="PAUSE "+formatTime(game.breakTime)

}else{

breakDisplay.textContent=""

}

}

function updatePenalties(team,penalties){

const container=document.getElementById(team+"Penalties")

container.innerHTML=""

const rows={}

penalties.forEach(p=>{

if(!rows[p.number])rows[p.number]=[]

rows[p.number].push(p)

})

Object.values(rows).forEach(group=>{

const row=document.createElement("div")
row.className="penaltyRow"

group.forEach(p=>{

const div=document.createElement("div")
div.className="penalty"

if(p.time>0){

div.textContent="#"+p.number+" "+formatTime(p.time)

}else{

div.textContent="#"+p.number

}

row.appendChild(div)

})

container.appendChild(row)

})

}

function formatTime(seconds){

const m=Math.floor(seconds/60)
const s=seconds%60

return m+":"+s.toString().padStart(2,"0")

}

setInterval(updateDisplay,300)

}

function renderPowerplay(game){

const homeBar=document.getElementById("homePowerplay")
const awayBar=document.getElementById("awayPowerplay")

if(game.penalties.home.length>0 && game.penalties.away.length===0){
homeBar.style.display="none"
awayBar.style.display="block"
}
else if(game.penalties.away.length>0 && game.penalties.home.length===0){
awayBar.style.display="none"
homeBar.style.display="block"
}
else{
homeBar.style.display="none"
awayBar.style.display="none"
}

}

function showTimeout(game){

const el=document.getElementById("timeoutDisplay")

if(game.timeout>0){

const team=game.timeoutTeam==="home"?game.homeTeam:game.awayTeam
el.textContent="TIMEOUT "+team+" "+game.timeout

}
else if(game.breakTime>0){

el.textContent=game.breakType+" "+formatTime(game.breakTime)

}
else{

el.textContent=""

}

}

function formatTime(seconds){

const m=Math.floor(seconds/60)
const s=seconds%60

return m+":"+s.toString().padStart(2,"0")
}

setInterval(updateDisplay,500)

updateDisplay()
