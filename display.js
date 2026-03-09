function updateDisplay(){

const data=localStorage.getItem("game")
if(!data) return

const game=JSON.parse(data)

document.getElementById("homeScore").textContent=game.homeScore
document.getElementById("awayScore").textContent=game.awayScore
document.getElementById("clock").textContent=formatTime(game.clock)
document.getElementById("period").textContent=game.period

document.getElementById("homeName").textContent=game.homeTeam
document.getElementById("awayName").textContent=game.awayTeam

renderPenalties(game)
showTimeout(game)
renderPowerplay(game)

}

function renderPenalties(game){

const homeBox=document.getElementById("homePenalties")
const awayBox=document.getElementById("awayPenalties")

homeBox.innerHTML=""
awayBox.innerHTML=""

game.penalties.home.forEach(p=>{
homeBox.innerHTML+=`<div class="penalty">#${p.player} ${formatTime(p.time)}</div>`
})

game.penalties.away.forEach(p=>{
awayBox.innerHTML+=`<div class="penalty">#${p.player} ${formatTime(p.time)}</div>`
})

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
