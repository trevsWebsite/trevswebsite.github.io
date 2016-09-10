/*

	Trevor Kelley 2020267 CIS166 
	Project 2
	Project 3
	9/8/16

*/
    var mainPic= 0;  //mainPage pic index
	
	var pics = ['images/at_stPeter.jpg', 
				'images/britGallery.jpg', 
				'images/cityHall.jpg',
				'images/britMuse.JPG',
				'images/dali.jpg',
				'images/stairs.jpg',
				'images/norteDame.jpg',
				'images/munPalace.jpg',
				'images/DSC_0059.jpg',
				'images/DSC_0265.jpg',
				'images/DSC_0406.jpg',
				'images/DSC_0530.jpg',				
				'images/val1.jpg',
				'images/val2.JPG'];


// function converts pounds to kilos or kilos to pounds
function convertWeight() {
    var name = document.getElementById("selectTypeWeight").value; // determine value of selection

    if (name == "pounds") { 
        kilo = 0.453592;
        var pnds = document.getElementById("inPounds").value; // get pounds
        if (isNaN(pnds))
            window.alert("Entry invalid, please enter a number");
        document.getElementById("inKilos").value = (pnds * kilo).toFixed(2); // display kilos
    }
    else {
        pnd = 2.20465;
        var kilos = document.getElementById("inKilos").value; // get kilos
        if (isNaN(kilos))
            window.alert("Entry invalid, please enter a number");
        document.getElementById("inPounds").value = (pnd * kilos).toFixed(2); //display pounds
    }
}

//function converts yards to meters or meters to yards
function convertLength() {
     var name = document.getElementById("selectTypeLength").value; // determine value of selection

     if (name == "yards") {
         meter = 0.9144;
         var yards = document.getElementById("inYards").value; //get yards
         if (isNaN(yards))
             window.alert("Entry invalid, please enter a number");
         document.getElementById("inMeters").value = (yards * meter).toFixed(2); //display meters
     }
     else {
         yard = 1.09361;
         var meters = document.getElementById("inMeters").value; //get meters
         if (isNaN(meters))
             window.alert("Entry invalid, please enter a number");
         document.getElementById("inYards").value = (yard * meters).toFixed(2); //display yards
     }
}

//function converts celsius to Fahrenheit or Fahrenheit to celsius
function convertTemp() {
     var name = document.getElementById("selectTemperature").value; // determine value of selection
     if (name == "_F") {
         var fahr = document.getElementById("f_temp").value; //get yards
         if (isNaN(fahr))
             window.alert("Entry invalid, please enter a number");
         document.getElementById("c_temp").value = ((fahr-32) *(5.0/9.0)).toFixed(2); //display Cel Temperature
     }
     else {
         var celi = document.getElementById("c_temp").value; //get meters
         if (isNaN(celi))
             window.alert("Entry invalid, please enter a number");
         document.getElementById("f_temp").value = (celi * (9.0/5.0) + 32).toFixed(2); //display Fahr Temperature
     }
}

// this function will get the added country selected by user and add it to the state dept link, then redirect window
function createHLink() {
    document.getElementById("pWait").innerHTML = "Loading Website, Please wait";
	var yourElement = document.getElementById("stateDept");
	var con =  document.getElementById("country").value
	var _link = "https://travel.state.gov/content/passports/en/alertswarnings/worldwide-caution.html#" + con;
	window.location= _link;

}


// this function will show/update the title of the Main pic on the index page
function showMainPicTitle() {
    var title = "";

    var img = document.getElementById("varImage");
    var fileName = img.src; // get src file location
    var pos = fileName.lastIndexOf("/"); // parse to get file name
    name = fileName.substring(pos + 1);
    switch (name) { // match file name with Title of picture

        case "at_stPeter.jpg": title = "St. Peter's Altar, Rome, Italy"; 
            break;

        case "britGallery.jpg": title = "National Gallery, Trafalgar Square, London, England";
            break;

        case "cityHall.jpg": title = "City Hall, London, England";
            break;

        case "britMuse.JPG": title = "British Museum, London, England";
            break;

        case "dali.jpg": title = "Salvador Dalí, Espace Dalí, Paris, France";
            break;

        case "stairs.jpg": title = "Saint-Étienne-du-Mont, Paris, France";
            break;

        case "norteDame.jpg": title = "Notre Dame, Paris, France";
            break;

        case "munPalace.jpg": title = "Munich Residenz, Munich, Germany";
            break;

        case "DSC_0059.jpg": title = "Arc de Triomphe, Paris, France";
            break;

        case "DSC_0265.jpg": title = "Louvre, Paris, France";
            break;

        case "DSC_0406.jpg": title = "Musee Armee, Paris, France";
            break;

        case "DSC_0530.jpg": title = "Trevi Fountain, Rome, Italy";
            break;

        case "val1.jpg": title = "Château de Versailles, Versailles, France";
            break;

        case "val2.JPG": title = "Château de Versailles, Versailles, France";
            break;

        case "various.jpg": title = "World Places";
            break;

        default: title = "Don't remember";
    }

    document.getElementById("picTitle").innerHTML = title;
}


// Change the main picture on the index page when clicked
function changePic() {
    document.getElementById("varImage").src = pics[mainPic];  //change src
    
    mainPic++;
    if (mainPic > 13)
        mainPic = 0;
    setTimeout(showMainPicTitle(), 350) // update title, add small delay to give time for picutre to load before title changes.
}






