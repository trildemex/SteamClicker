//Timer Engine that runs code every second
var Timer = window.setInterval(function(){Tick()}, 1000);

//This function makes rogue decimals go away
function prettify(input){
	var output = Math.round(input * 1000000)/1000000;
	return output;
}

//Updates
function Update(elem_id, contents){
	document.getElementById(elem_id).innerHTML = contents;
}

function PrettyUpdate (elem_id, contents){
	document.getElementById(elem_id).innerHTML = prettify(contents);
}

//Shortcut Updates
function UpdateScrap(){
	PrettyUpdate("scrap",scrap);
}

function UpdateHeat(){
	PrettyUpdate("heat",heat);
}

var scrap = 0;

//Heat Variables
var heat = 0;
var maxheat = 100;
var heatRegen = 0.5

//function for clicky button
function GatherScrap(){
	scrap += 1;
	UpdateScrap();
}

//Unit Statistics
var OrbDroidScrap=1;
var OrbDroidQty=0;
var OrbDroidPerSec = OrbDroidQty*OrbDroidScrap;

		
function GainOrbDroid(){
	//calculate cost of next unit
	 var OrbDroidCost = Math.floor(15 * Math.pow(1.15,OrbDroidQty)); 
	 var OrbDroidHeat = Math.floor(2 * Math.pow(1.1,OrbDroidQty)); 

	//checks for scrap and heat
	if (maxheat-heat >= OrbDroidHeat && scrap >= OrbDroidCost){
		OrbDroidQty = OrbDroidQty + 1;
		OrbDroidPerSec = OrbDroidQty * OrbDroidScrap;
		scrap -= OrbDroidCost;
		heat += OrbDroidHeat;
		UpdateScrap();
		UpdateHeat();
		Update("OrbDroidQty", OrbDroidQty);
		Update("OrbDroidPerSec", OrbDroidPerSec);
		Update("OrbDroidPerSec", OrbDroidPerSec);
		Update("OrbDroidCost", OrbDroidCost);
		Update("OrbDroidHeat", OrbDroidHeat);	
	}
}


function Tick(){
	scrap = scrap + (OrbDroidPerSec);
	if (heat>0){
		heat = heat-heatRegen
	}
	if (heat<=0){
		heat = 0
	}
	UpdateScrap()
	UpdateHeat()
}
	