//Timer Engine that runs code every second
var Timer = window.setInterval(function(){Tick()}, 100);
var Timer = window.setInterval(function(){TimeTick()}, 1000);

//This function makes rogue decimals go away
function prettify(input){
	var output = Math.round(input * 1000000)/1000000;
	return output;
}

//This function is for 00 format (two digit format)
function twoDigit(n){
    return n > 9 ? "" + n: "0" + n;
}

//Updates
function Update(elem_id, contents){
	document.getElementById(elem_id).innerHTML = contents;
}

function PrettyUpdate (elem_id, contents){
	document.getElementById(elem_id).innerHTML = prettify(contents);
}

//Shortcuts
function UpdateScrap(){
	PrettyUpdate("scrap",scrap.toFixed(0));
}

function UpdateHeat(){
	PrettyUpdate("heat",heat.toFixed(0));
}

function UpdateBoth(){
	UpdateScrap();
	UpdateHeat();
}	

//Scaling
var SCRAP_SCALING = 1.15
var HEAT_SCALING = 1.15

function ScaleBuildingCost(baseprice, BuildingQty){
	return Math.floor(baseprice * Math.pow(SCRAP_SCALING,BuildingQty))
}

function ScaleBuildingHeat(baseprice, BuildingQty){
	return Math.floor(baseprice * Math.pow(HEAT_SCALING,BuildingQty))
}

//function for clicky button
function GatherScrap(){
	scrap += ScrapPerClick;
	UpdateScrap();
}

//Time
var time = {
	minute : 0,
	hour : 0,
}

//Unit Statistics
var unit = {
	OrbDroid : {
		Qty : 0,
		ScrapPerSec : 1
	},

	CoolieBot : {
		Qty : 0,
		HeatRegen : 0.2,
	},
	
	FlamebearerGolem: {
		Qty : 0,
		HeatMax : 10,
	}
}

var OrbDroidPerSec = (unit.OrbDroid.Qty*unit.OrbDroid.ScrapPerSec);
var CoolieBotHeatRegenPerSec = unit.CoolieBot.Qty*unit.CoolieBot.HeatRegen;
var FlamebearerGolemTotalHeatMax = unit.FlamebearerGolem.Qty * unit.FlamebearerGolem.HeatMax;

//Scrap Variables
var scrap = 0;
var ScrapPerClick = 1;
var TotalScrapPerSecond = OrbDroidPerSec;

//Heat Variables
var heat = 0;
heatMax = 10 + FlamebearerGolemTotalHeatMax;
var heatRegen = 0.2 + (unit.CoolieBot.HeatRegen*unit.CoolieBot.Qty);

//Buying Units
function GainOrbDroid(){
	//calculate cost of next unit
	 var OrbDroidScrapCost = ScaleBuildingCost(15, unit.OrbDroid.Qty); 
	 var OrbDroidHeatCost = ScaleBuildingHeat(2, unit.OrbDroid.Qty); 

	//checks for scrap and heat
	if (heatMax-heat >= OrbDroidHeatCost && scrap >= OrbDroidScrapCost){
		unit.OrbDroid.Qty += 1;
		OrbDroidPerSec = (unit.OrbDroid.Qty*unit.OrbDroid.ScrapPerSec);
		TotalScrapPerSecond = OrbDroidPerSec;
		scrap -= OrbDroidScrapCost;
		heat += OrbDroidHeatCost;
		UpdateBoth();
		Update("OrbDroidQty", unit.OrbDroid.Qty);
		Update("OrbDroidPerSec", OrbDroidPerSec);
		Update("TotalScrapPerSecond", TotalScrapPerSecond);
	
	//updates cost of next building
	 var nextOrbDroidScrapCost = ScaleBuildingCost(15, unit.OrbDroid.Qty);
		Update('OrbDroidScrapCost', nextOrbDroidScrapCost);
	 var nextOrbDroidHeatCost = ScaleBuildingHeat(2, unit.OrbDroid.Qty);
		Update('OrbDroidHeatCost', nextOrbDroidHeatCost);
	}
}

function GainCoolieBot(){
	//calculate cost of next unit
	 var CoolieBotCost = ScaleBuildingCost(10, unit.CoolieBot.Qty);
	 var CoolieBotHeat = ScaleBuildingHeat(3, unit.CoolieBot.Qty);

	//checks for scrap and heat
	if (heatMax-heat >= CoolieBotHeat && scrap >= CoolieBotCost){
		unit.CoolieBot.Qty += 1;
		CoolieBotHeatRegenPerSec = unit.CoolieBot.Qty * unit.CoolieBot.HeatRegen;
		heatRegen = 0.2 + (unit.CoolieBot.Qty*unit.CoolieBot.HeatRegen);
		scrap -= CoolieBotCost;
		heat += CoolieBotHeat;
		UpdateBoth();
		Update("CoolieBotQty", unit.CoolieBot.Qty);
		PrettyUpdate("CoolieBotHeatRegenPerSec", CoolieBotHeatRegenPerSec);
		PrettyUpdate("heatRegen", heatRegen);
		
	//updates cost of next building
	var nextCoolieBotCost = ScaleBuildingCost(10, unit.CoolieBot.Qty);
		Update('CoolieBotCost', nextCoolieBotCost);
	 var nextCoolieBotHeat = ScaleBuildingHeat(3, unit.CoolieBot.Qty);
		Update('CoolieBotHeat', nextCoolieBotHeat);
	}
}

function GainFlamebearerGolem(){
	//calculate cost of next unit
	 var FlamebearerGolemCost = ScaleBuildingCost(5, unit.FlamebearerGolem.Qty);
	 var FlamebearerGolemHeat = ScaleBuildingHeat(10, unit.FlamebearerGolem.Qty);

	//checks for scrap and heat
	if (heatMax-heat >= FlamebearerGolemHeat && scrap >= FlamebearerGolemCost){
		unit.FlamebearerGolem.Qty += 1;
		FlamebearerGolemTotalHeatMax = (unit.FlamebearerGolem.Qty * unit.FlamebearerGolem.HeatMax);
		heatMax = 10 + FlamebearerGolemTotalHeatMax;
		scrap -= FlamebearerGolemCost;
		heat += FlamebearerGolemHeat;
		UpdateBoth();
		Update("FlamebearerGolemQty", unit.FlamebearerGolem.Qty);
		PrettyUpdate("FlamebearerGolemTotalHeatMax", FlamebearerGolemTotalHeatMax);
		PrettyUpdate("heatMax", heatMax);
		Update("FlamebearerGolemCost", FlamebearerGolemCost);
		Update("FlamebearerGolemHeat", FlamebearerGolemHeat);
	
	//updates cost of next building
	var nextFlamebearerGolemCost = ScaleBuildingCost(5, unit.FlamebearerGolem.Qty);
		Update('FlamebearerGolemCost', nextFlamebearerGolemCost);
	var nextFlamebearerGolemHeat = ScaleBuildingHeat(10, unit.FlamebearerGolem.Qty);
		Update('FlamebearerGolemHeat', nextFlamebearerGolemHeat);
	}
}

//Buying Upgrades

function Tick(){
	scrap = scrap + (TotalScrapPerSecond/10);
	if (heat>0){
		heat = heat-(heatRegen/10)
	}
	if (heat<=0){
		heat = 0
	}
	UpdateBoth();
}

function TimeTick(){
	//adds 1min per second, adds 1 to hour when 60mins, then resets minutes to 0.
	time.minute += 1;
	
	if (time.minute >= 60) {
		time.minute = 0;
		time.hour += 1;
	}
	
	if (time.hour >= 24) {
		time.hour = 0;
	}
	
	//updates the time with 00:00 format
	Update("minute", twoDigit(time.minute));
	Update("hour", twoDigit(time.hour));
}

//SaveLoad Functions
function saveData(){
	localStorage.setItem('SteamClickerSaveData', JSON.stringify(time));
}


function loadData(){
	time = JSON.parse(SteamClickerSaveData);
}

function deleteData(){
	localStorage.removeItem("SteamClickerSaveData")
}
	