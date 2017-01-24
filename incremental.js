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

//Shortcuts
function UpdateScrap(){
	PrettyUpdate("scrap",scrap);
}

function UpdateHeat(){
	PrettyUpdate("heat",heat);
}

//Scaling

var SCRAP_SCALING = 1.15
var HEAT_SCALING = 1.05

function ScaleBuildingCost(baseprice, BuildingQty){
	return Math.floor(baseprice * Math.pow(SCRAP_SCALING,BuildingQty))
}

function ScaleBuildingHeat(baseprice, BuildingQty){
	return Math.floor(baseprice * Math.pow(HEAT_SCALING,BuildingQty))
}

//function for clicky button
function GatherScrap(){
	scrap += 1;
	UpdateScrap();
}

//Unit Statistics
var OrbDroidScrap= 1;
var OrbDroidQty= 0;
var OrbDroidPerSec = (OrbDroidQty*OrbDroidScrap);
var CoolieBotQty= 0;
var CoolieBotHeatRegen= 0.2;
var CoolieBotHeatRegenPerSec= CoolieBotQty*CoolieBotHeatRegen;
var FlamebearerGolemQty= 0;
var FlamebearerGolemHeatMax= 10;
var FlamebearerGolemTotalHeatMax = FlamebearerGolemQty * FlamebearerGolemHeatMax;

//Scrap Variables
var scrap = 0;
var TotalScrapPerSecond = OrbDroidPerSec

//Heat Variables
var heat = 0;
heatMax = 50 + (FlamebearerGolemHeatMax*FlamebearerGolemQty);
var heatRegen = 0.2 + (CoolieBotHeatRegen*CoolieBotQty);

//Buying Units
function GainOrbDroid(){
	//calculate cost of next unit
	 var OrbDroidCost = ScaleBuildingCost(15, OrbDroidQty); 
	 var OrbDroidHeat = ScaleBuildingHeat(2, OrbDroidQty); 

	//checks for scrap and heat
	if (heatMax-heat >= OrbDroidHeat && scrap >= OrbDroidCost){
		OrbDroidQty += 1;
		OrbDroidPerSec = OrbDroidQty * OrbDroidScrap;
		TotalScrapPerSecond = OrbDroidPerSec;
		scrap -= OrbDroidCost;
		heat += OrbDroidHeat;
		UpdateScrap();
		UpdateHeat();
		Update("OrbDroidQty", OrbDroidQty);
		Update("OrbDroidPerSec", OrbDroidPerSec);
		Update("TotalScrapPerSecond", TotalScrapPerSecond);
	
	//updates cost of next building
	 var nextOrbDroidCost = ScaleBuildingCost(15, OrbDroidQty);
		Update('OrbDroidCost', nextOrbDroidCost);
	 var nextOrbDroidHeat = ScaleBuildingHeat(2, OrbDroidQty);
		Update('OrbDroidHeat', nextOrbDroidHeat);
	}
}

function GainCoolieBot(){
	//calculate cost of next unit
	 var CoolieBotCost = ScaleBuildingCost(10, CoolieBotQty);
	 var CoolieBotHeat = ScaleBuildingHeat(3, CoolieBotQty);

	//checks for scrap and heat
	if (heatMax-heat >= CoolieBotHeat && scrap >= CoolieBotCost){
		CoolieBotQty += 1;
		CoolieBotHeatRegenPerSec = CoolieBotQty * CoolieBotHeatRegen;
		heatRegen = 0.2 + (CoolieBotQty*CoolieBotHeatRegen);
		scrap -= CoolieBotCost;
		heat += CoolieBotHeat;
		UpdateScrap();
		UpdateHeat();
		Update("CoolieBotQty", CoolieBotQty);
		PrettyUpdate("CoolieBotHeatRegenPerSec", CoolieBotHeatRegenPerSec);
		PrettyUpdate("heatRegen", heatRegen);
		
	//updates cost of next building
	var nextCoolieBotCost = ScaleBuildingCost(10, CoolieBotQty);
		Update('CoolieBotCost', nextCoolieBotCost);
	 var nextCoolieBotHeat = ScaleBuildingHeat(3, CoolieBotQty);
		Update('CoolieBotHeat', nextCoolieBotHeat);
	}
}

function GainFlamebearerGolem(){
	//calculate cost of next unit
	 var FlamebearerGolemCost = ScaleBuildingCost(5, FlamebearerGolemQty);
	 var FlamebearerGolemHeat = ScaleBuildingHeat(10, FlamebearerGolemQty);

	//checks for scrap and heat
	if (heatMax-heat >= FlamebearerGolemHeat && scrap >= FlamebearerGolemCost){
		FlamebearerGolemQty += 1;
		FlamebearerGolemTotalHeatMax = (FlamebearerGolemQty * FlamebearerGolemHeatMax);
		heatMax = 50 + (FlamebearerGolemHeatMax*FlamebearerGolemQty);
		scrap -= FlamebearerGolemCost;
		heat += FlamebearerGolemHeat;
		UpdateScrap();
		UpdateHeat();
		Update("FlamebearerGolemQty", FlamebearerGolemQty);
		PrettyUpdate("FlamebearerGolemTotalHeatMax", FlamebearerGolemTotalHeatMax);
		PrettyUpdate("heatMax", heatMax);
				Update("FlamebearerGolemCost", FlamebearerGolemCost);
		Update("FlamebearerGolemHeat", FlamebearerGolemHeat);
	
	//updates cost of next building
	var nextFlamebearerGolemCost = ScaleBuildingCost(5, FlamebearerGolemQty);
		Update('FlamebearerGolemCost', nextFlamebearerGolemCost);
	var nextFlamebearerGolemHeat = ScaleBuildingHeat(10, FlamebearerGolemQty);
		Update('FlamebearerGolemHeat', nextFlamebearerGolemHeat);
	}
}

//Buying Upgrades

function Tick(){
	scrap = scrap + (OrbDroidPerSec);
	if (heat>0){
		heat = heat-heatRegen
	}
	if (heat<=0){
		heat = 0
	}
	UpdateScrap();
	UpdateHeat();
}
	