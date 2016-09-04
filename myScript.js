/*

		Trevor Kelley 2020267 CIS166 
		Project 2
		9/3/16
        JavaScript file : MyScript.js

*/

//global var
//int temperature = 0;

function convertWeight() {
    var name = document.getElementById("selectTypeWeight").value; // determine value of selection

    if (name == "pounds") { 
        kilo = 0.453592;
        var pnds = document.getElementById("inPounds").value; // get pounds
        document.getElementById("inKilos").value = (pnds * kilo).toFixed(2); // display kilos
    }
    else {
        pnd = 2.20465;
        var kilos = document.getElementById("inKilos").value; // get kilos
        document.getElementById("inPounds").value = (pnd * kilos).toFixed(2); //display pounds
    }
}

function convertLength() {
     var name = document.getElementById("selectTypeLength").value; // determine value of selection

     if (name == "yards") {
         meter = 0.9144;
         var yards = document.getElementById("inYards").value; //get yards
         document.getElementById("inMeters").value = (yards * meter).toFixed(2); //display meters
     }
     else {
         yard = 1.09361;
         var meters = document.getElementById("inMeters").value; //get meters
         document.getElementById("inYards").value = (yard * meters).toFixed(2); //display yards
     }
}

function convertTemp() {
     var name = document.getElementById("selectTemperature").value; // determine value of selection
     if (name == "_F") {
         var fahr = document.getElementById("f_temp").value; //get yards
         document.getElementById("c_temp").value = ((fahr-32) *(5.0/9.0)).toFixed(2); //display meters
     }
     else {
         var celi = document.getElementById("c_temp").value; //get meters
         document.getElementById("f_temp").value = (celi * (9.0/5.0) + 32).toFixed(2); //display yards
     }
}

function createHLink (){
	var yourElement = document.getElementById("stateDept");
	var con =  document.getElementById("country").value
	var _link = "https://travel.state.gov/content/passports/en/alertswarnings/worldwide-caution.html#" + con;
	window.location= _link;
	//yourElement.setAttribute('href', _link);
 }


