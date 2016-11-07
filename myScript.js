/*

	Trevor Kelley 2020267 CIS166 
	Project 7
	10/8/16

*/
var waitForUser; // for getting location (project 10)
var mapSuccess = false;
var startTime =0 ;
var processTime =0;

var isChrome =false;
var isIE = false;
var isFireFox = false;

var mainPic = 0;  //mainPage pic index
var availWidth = 0;

var phDataOK = true;
var zipDataOK = true;
var lNameDataOK = true;
var fNameDataOK = true;
var addDataOK = true;

var formOK = 0; //(project 6);
var formObject ={
	ctry: "",
	title:"",
	fname:"",
	lname:"",
	phone:-1,
	zip: -1,
	type: "",
	areas: "",
	size: -1
	};
	
// arrary of all pics on server
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
	var con =  document.getElementById("country").value
	var _link = "https://travel.state.gov/content/passports/en/alertswarnings/worldwide-caution.html#" + con;
	//window.location= _link;
	window.open(_link);

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

var mainImage = document.getElementById("varImage");

//// Change the main picture on the index page when clicked
function changePic() {
    document.getElementById("varImage").src = pics[mainPic];  //change src
    
    mainPic++;
    if (mainPic > 13)
        mainPic = 0;
    setTimeout(showMainPicTitle(), 350) // update title, add small delay to give time for picutre to load before title changes.
}

function changePic(direction) {

    if (direction =="left") 
        mainPic--;
    if (direction =="right")
        mainPic++;
    if (mainPic > 13)
        mainPic = 0;
    if (mainPic == -1)
        mainPic = 13;
    document.getElementById("varImage").src = pics[mainPic];  //change src
    setTimeout(showMainPicTitle(), 350) // update title, add small delay to give time for picutre to load before title changes.
}


// Update for Ch9, check phone zip code non-numbers or name for numbers
function verifyData(data) {

    var nums = /[0-9]/g; //regex for chars and spaces
	//var specChars = /[;:<>%\(\)\.=\+]/;
	var specChars = /[^a-zA-Z-\s]/;// allow letters or dash for name inputs
	var specChars2 = /[^a-zA-Z0-9\.\s]/;// allow letters or period for address inputs
    var mess="Please correct the field marked"
	var mess2="No special characters are allowed as input";


    try{
        switch (data.getAttribute("id")) 
        {
            case "zip": //verify is a number
                if (!(data.value > 0)) {
                    zipDataOK = false;
                    throw mess;
                }
                else
				{
                    zipDataOK = true;
				}
                break;
            case "phone": //verify is a number
                if (!(data.value > 0)) {
                    phDataOK = false;
                    throw mess;
                }
                else
				{
                    phDataOK = true;
				}
                break;

            case "lastName": //verify is a letter or space
                if (data.value.match(nums)) {
                    lNameDataOK = false;
                    throw mess;
                }
                else
				{
					if(data.value.match(specChars)){
						lNameDataOK = false;
						throw mess2;
					}
					else
						lNameDataOK = true;
                }
				break;
            case "firstName": //verify is a letter or space
                if (data.value.match(nums)) {
                    fNameDataOK = false;
                    throw mess;
                }
                else
				{
					if(data.value.match(specChars)){
						fNameDataOK = false;
						throw mess2;
					}
					else
						fNameDataOK = true;
				}
                break;
			case "address": //verify is a letter or space
					if(data.value.match(specChars2)){
						addDataOK = false;
						throw mess2;
					}
					else
						addDataOK  = true;
				break; 
         }
    }
    catch (message) {
        document.getElementById("errorMessage").innerHTML = message;
    }
    finally {
        if (phDataOK && zipDataOK && lNameDataOK && fNameDataOK && addDataOK ) {
            document.getElementById("errorMessage").innerHTML = "";
        }
		if(!fNameDataOK)
			document.getElementById("fNameMark").innerHTML = "*";
		if(fNameDataOK)
			document.getElementById("fNameMark").innerHTML = "";
		if(!lNameDataOK)
			document.getElementById("lNameMark").innerHTML = "*";
		if(lNameDataOK)
			document.getElementById("lNameMark").innerHTML = "";
		if(!phDataOK)
			document.getElementById("phoneMark").innerHTML = "*";
		if(phDataOK)
			document.getElementById("phoneMark").innerHTML = "";
		if(!zipDataOK)
			document.getElementById("zipMark").innerHTML = "*";
		if(zipDataOK)
			document.getElementById("zipMark").innerHTML = "";
		if(!addDataOK)
			document.getElementById("addMark").innerHTML = "*";
		if(addDataOK)
			document.getElementById("addMark").innerHTML = "";
    }
}

function feature(index) {
    switch (index) {
        case "online": 
					if(navigator.onLine)
						document.getElementById("info_online").innerHTML = "Online";
					else
						document.getElementById("info_online").innerHTML = "Offline";
            break;
        case "platform": document.getElementById("info_plat").innerHTML = navigator.platform;
            break;
        case "userA": document.getElementById("info_userA").innerHTML = navigator.userAgent;
            break;
        case "appN": document.getElementById("info_appName").innerHTML = navigator.appName;
            break;
        case "appV": document.getElementById("info_appVer").innerHTML = navigator.appVersion;
            break;
        case "high": document.getElementById("info_high").innerHTML = screen.availHeight;
            break;
        case "inHigh": document.getElementById("info_inHigh").innerHTML = window.innerHeight;
            break;
        case "width": document.getElementById("info_width").innerHTML = screen.availWidth;
            break;
        case "inWidth": document.getElementById("info_inWidth").innerHTML = window.innerWidth;
            break;
    }
}

function clearElement(index) {
    var hg = /high/; //regex for high
    var wd = /width/; // regex for width
    if(index.match(hg) || index.match(wd))
		document.getElementById(index).innerHTML = "&nbsp;";
	else
        document.getElementById(index).innerHTML = "";
}

function alignDivs()
{
	availWidth = window.innerWidth; //get available width
	avgBoxWidth = (availWidth -150) / 8; //get average and set width on divs
	document.getElementsByClassName("box1B")[0].style.width = avgBoxWidth;
	document.getElementsByClassName("box1B")[1].style.width = avgBoxWidth;
	document.getElementsByClassName("box1B")[2].style.width = avgBoxWidth;
	document.getElementsByClassName("box1B")[3].style.width = avgBoxWidth;
	document.getElementsByClassName("box1B")[4].style.width = avgBoxWidth;
	document.getElementsByClassName("box1B")[5].style.width = avgBoxWidth;
	document.getElementsByClassName("box1B")[6].style.width = avgBoxWidth;
}

//(project 6), validate form
function validateForm(event) {
    if (event.preventDefault) {
        event.preventDefault(); // prevent form from submitting
    } else {
        event.returnValue = false; // prevent form from submitting in IE8
    }
    if (phDataOK & zipDataOK & lNameDataOK & fNameDataOK & addDataOK) 
    {
        if (!checkRadio("country","errorMessage")[0])
        { }
        else {
            if (!checkMinLength("phone", 9))
            { }
            else {
                if (!checkMinLength("zip", 5))
                { }
                else {
                    if (!checkMaxLength("details", 500))
                    { }
					else{
						if(!checkMinLength("address", 3))
						{}
						else {
							document.getElementsByTagName("form")[0].submit();
							window.alert("Thank you for submitting your information.");
                    	}
					}
				}
			}
		}
	}
}

//(project 6), make sure one of radio buttons is checked
function checkRadio(_element, errorMes) {
    var cty = document.getElementsByName(_element)
    if (!cty[0].checked && !cty[1].checked) {
        // verify that a country is selected
        cty[0].style.outline = "1px solid red";
        cty[1].style.outline = "1px solid red";
		if(_element == "country")
			document.getElementById("errorMessage").innerHTML ="please choose Inside the US or outside the US";
		if(_element == "time")
			document.getElementById("errors").innerHTML ="please choose Elapsed time or Projected time.";
        return [false, cty];
    }
    else
    {
		document.getElementById(errorMes).innerHTML ="";
		cty[0].style.outline = "";
        cty[1].style.outline = "";
        return [true, cty];
    }
}

//(project 6), make sure fields are min length
function checkMinLength(id, len) {
    var leng = document.getElementById(id).value.length
    if (leng < len) {
        if (id == "phone")
            document.getElementById("errorMessage").innerHTML = "the Phone number must be at least 9 digits";
        if (id == "zip")
            document.getElementById("errorMessage").innerHTML = "the Zip code must be at least 5 digits";
        return false;
    }
    else
    {   
        document.getElementById("errorMessage").innerHTML = "";
        return true;
    }

}
// supports project 6
function checkMaxLength(id, len) {
    var leng = document.getElementById(id).value.length
    if (leng > len) {
        if (id == "details")
            document.getElementById("errorMessage").innerHTML = "The details can not be more than 500 characters.";
        return false;
    }
    else {
        document.getElementById("errorMessage").innerHTML = "";
        return true;
    }

}

//for project 6, clear select values so user will choose 
function clearSelect(str) {
    var selectBox = document.getElementById(str);
    selectBox.selectedIndex = -1;
    selectBox.style.boxShadow = "none";
}

//project 7: calculate the time between input and current time
function get_Time()
{				  //jan feb mar apr may jun jul aug sep oct nov dec
	dayOfMonths = [ 31,  28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	radioResults = checkRadio("time", "errors");
	if(!radioResults[0])
	{	
		///user did not choose either radio button
	}
	else
	{
	    var input = document.getElementById("dateSelected").value;
	    var fslash = /[\/-]/
	    

        // Firefox doesnt support "12.2.16" ir "12-2-16"
	    if (isFireFox ) { 
	        var dash = /\//;
	        if (!input.match(dash)) {
	            window.alert("Please use forward slashes for input (ie: 10/8/2016)");
	            return 0;
	        }
	        var paras = input.split(fslash);
	        if (paras[2].length < 4 || paras[2].length > 4) {
	            window.alert("Please enter a year in 4 digits (ie: 2016)");
	            return 0; // get out of method
	        }

	    }
	    // IE does not interpret year, "1/1/16" is year 0016.
	    if (isIE) {
	       
	        var paras = input.split(fslash);
	        if (paras[2].length < 4 || paras[2].length > 4) {
	            window.alert("Please enter a year in 4 digits (ie: 2016)");
	            return 0; // get out of method
	        }

        }

		var inDate = new Date(input);


		if (inDate == "Invalid Date" )
		{
			// display error message
			document.getElementById("errors").innerHTML = "Error, You have entered an invalid date";
		}
		else // date is valid, continue...
		{
			var inYear = inDate.getFullYear();
			var inMonth = inDate.getMonth() + 1;
			var inDay = inDate.getDate();
			inputD = { year: inYear, month: inMonth, date: inDay}; //create date object from input

			if (isChrome) // chrome reports days differently
			    inDay++;
			cDate = new Date();
			var cYear = cDate.getFullYear();
			var cMonth = cDate.getMonth() + 1;
			var cDay = cDate.getDate();
			currD = { year: cYear, month: cMonth, date: cDay}; //create date object from current date
			
			var years = 0;
			var months = 0;
			var days = 0;
			
			if (radioResults[1][0].checked)// elapsed time
			{
				if(!validateDateBack(currD,inputD))
				{
					document.getElementById("errors").innerHTML = "Error, Value must be less than current date";
				}
				else // date input is OK
				{
					document.getElementById("errors").innerHTML = "";
					years =  cYear -inYear;	
					if ( inMonth <= cMonth )
					{	
						if ( inMonth < cMonth )
						{	
							months = cMonth - inMonth;
						}			
					}
					else
					{
						months = 12 -  inMonth + cMonth;
						years--;
					}
					if (cDay < inDay) {
					    months--;
					    days = dayOfMonths[inMonth - 1] - inDay + cDay;
					    if (inMonth == 2) // if FEB, check for Leap years, if so, add to more day
					        days += checkForLeaps(cYear, years);
					}
					else
					    if (cDay == inDay)
					       days = 0;
                        else
					        days = cDay - inDay;

				}
			}
            else // projected time
			{
				if(!validateDateForward(currD,inputD))
				{
					document.getElementById("errors").innerHTML = "Error, Value must be greater than current date";
				}
				else // input is OK
				{
					document.getElementById("errors").innerHTML = "";
					years = inYear - cYear;	
					if ( inMonth <= cMonth )
					{	
						if ( inMonth < cMonth )
						{	
							years--;
							months = 12 - cMonth + inMonth;
						}	
						if ( inMonth == cMonth && inDay < cDay)
						{
							years--;
							months = 11;
						}			
					}
					else
					{
						months = inMonth - cMonth;
					}
					if (cDay < inDay) {
					    days = inDay - cDay;
					   
					}
					else
					    if (cDay == inDay)
					        days = 0;
					    else {
					        days = dayOfMonths[cMonth - 1] - cDay + inDay;
					        months--;
					    }

				}
			}
			
		    // display info
			document.getElementById("years").innerHTML = " " + years;
			document.getElementById("months").innerHTML = " " + months;
			document.getElementById("days").innerHTML = " " + days;		
		}
	}
}

// project 7:  check for leap years
function checkForLeaps(year, years)
{ 
    var count = 0;
	for(x =0; x < years; x++ )
	{
		if ((year - x) % 4 == 0)
		{	
			count++;
			break;
		}
	}
	return count;
}				
//for project 7:  make sure input date is greater than current Date
function validateDateForward (currentDate,  inputDate)
{
	var ok = true;
	
	if( inputDate.year < currentDate.year)
	{ 
		ok = false;
	}
    else
		if(inputDate.year == currentDate.year && inputDate.month < currentDate.month )
		{
			ok = false;
		}
		else
			if(inputDate.year == currentDate.year && inputDate.month == currentDate.month && inputDate.date < currentDate.date)
			{
				ok = false;
			}
	return ok;
}

//for project 7:  make sure input date is less than current Date
function validateDateBack (currentDate,  inputDate)
{
	var ok = true;
	
	if( inputDate.year > currentDate.year)
	{ 
		ok = false;
	}
    else
		if(inputDate.year == currentDate.year && inputDate.month > currentDate.month )
		{
			ok = false;
		}
		else
			if(inputDate.year == currentDate.year && inputDate.month == currentDate.month && inputDate.date > currentDate.date)
			{
				ok = false;
			}
	return ok;
}

//for project8: 
function upFormObj( _id)
{

    document.getElementById("details").value = formObject.lname;
	var elem = document.getElementById(_id);
	switch (elem.id) {
		case "travelType": formObject.type = elem.value;
		break;
		case "SelectInterest": formObject.areas = elem.value
		break;
		case "title": formObject.title = elem.value
		break;
		case "lastName": formObject.lname = elem.value
		break;
		case "firstName": formObject.fname = elem.value
		break;
		case "zip": formObject.zip = elem.value
		break;
		case "phone": formObject.phone = elem.value
		break;
		case "1to2": formObject.size = elem.value
		break;
		case "3to5": formObject.size = elem.value
		break;
		case "sixPlus": formObject.size = elem.value
		break;
		case "inUS": formObject.ctry = elem.value
		break;
		case "outUS": formObject.ctry = elem.value
		break;
	}

	var strObj = JSON.stringify(formObject);
	document.getElementById("details").value = strObj;
}

// For project 10, get geolocation
function getLocation() {
	
	//clear form
	document.getElementById("proTime").innerHTML = "";
    document.getElementById("latt").innerHTML = "";
	document.getElementById("long").innerHTML = "";
	document.getElementById("alti").innerHTML = "";
	document.getElementById("map").style.visibility = "hidden";
	//start timer
    wait4User = setTimeout(Fail, 10000);
    if (navigator.geolocation) {
		startTime = performance.now(); //start pTime
		navigator.geolocation.getCurrentPosition(displayLocationsParameters, Fail);
    } else {
		mapSuccess = false;
        Fail();
    }
}

// For project 10, display Latitude, longitude, altitude, processTime
function displayLocationsParameters(position) {
    mapSuccess= true;
	document.getElementById("latt").innerHTML = "Latitude: " + position.coords.latitude;
	document.getElementById("long").innerHTML = "Longitude: " + position.coords.longitude;
	var _altitude = position.coords.altitude;
	processTime = performance.now() - startTime;
	if (_altitude > 0)
	{
		document.getElementById("alti").innerHTML = "Altitude: " + position.coords.altitude;
	}
	else
		document.getElementById("alti").innerHTML = "Altitude: Not Available";
    document.getElementById("proTime").innerHTML = "Process Time:  " + (processTime/1000).toFixed(4) + " seconds";
    createMap(position);
}

// For project 10, handle failure to get geolocation
function Fail() {
	mapSuccess = false;
    document.getElementById("latt").innerHTML = "Unable to access your current location.";
    createMap();
}

//For Project 10, create map for geolocation
function createMap( position) {
	
    // set general map of US, if geolocation fails	
    Latt = 39.750453;
    Long = -98.003018;
	var _zoom = 3;
	// show map on index page
	document.getElementById("map").style.visibility = "visible";
	clearTimeout(wait4User);
    if (mapSuccess) {		
        Latt =  position.coords.latitude;
        Long =  position.coords.longitude;
		_zoom = 18;
    }
    else {
        document.getElementById("latt").innerHTML = "Unable to access your current location or permission timed-out.";
    }

    var mapOptions = {
        center: new google.maps.LatLng(Latt, Long),
		zoom: _zoom

    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

// help find browser type
function determineBrowser() 
{
    var ff = /firefox/;
    var ie = /trident/;
    var chm = /chrome/;
    var bswr = navigator.userAgent.toLowerCase();
    if (bswr.match(ff))
        isFireFox = true;
    if (bswr.match(ie))
        isIE = true;
    if (bswr.match(chm))
        isChrome = true ;

}

// create Listeners for Main image on index page.
function createListeners() {

    // determine Browser Type
    determineBrowser();
    //create event listener for main Pic
    var mainImage = document.getElementById("varImage");
    mainImage.addEventListener("click", changePic, false);

    alignDivs(); // align boxes
	clearSelect("SelectInterest");
	clearSelect("travelType");

    // (Project 6)create listener for submit on form
    var infoForm = document.getElementsByTagName("form")[0];
    if (infoForm.addEventListener) {
        infoForm.addEventListener("submit", validateForm, false);
    } 
    else if (infoForm.attachEvent) {
       infoForm.attachEvent("onsubmit", validateForm);
   }

   // (Project 6)
   clearSelect("title");


   // (project 5)
    var ph = document.getElementById("phone");
    ph.value = "";
    var zp = document.getElementById("zip");
    zp.value = "";
    var ln = document.getElementById("lastName");
    ln.value = "";
    var fn = document.getElementById("firstName");
    fn.value = "";
	var ad = document.getElementById("address");
    ad.value = "";


}


// call functions on Load
try {
    if (window.addEventListener) {
        window.addEventListener("load", createListeners, false);
		window.addEventListener("resize", alignDivs, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", createListeners);
    }
}
catch (message) {
    getElementById("error").innerHTML = "There is an error on this page, " + message + ", please notify the webmaster";
}




