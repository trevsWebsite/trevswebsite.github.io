/*

	Trevor Kelley 2020267 CIS166 
	Project 7
	10/8/16

*/


var mainPic = 0;  //mainPage pic index

var availWidth = 0;

var phDataOK = true;
var zipDataOK = true;
var lNameDataOK = true;
var fNameDataOK = true;

var formOK = 0; //(project 6);
	
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

    if (direction.id =="left") 
        mainPic--;
    if (direction.id =="right")
        mainPic++;
    if (mainPic > 13)
        mainPic = 0;
    if (mainPic == -1)
        mainPic = 13;
    document.getElementById("varImage").src = pics[mainPic];  //change src
    setTimeout(showMainPicTitle(), 350) // update title, add small delay to give time for picutre to load before title changes.
}


// check phone zip code non-numbers or name for numbers
function verifyData(data) {

    var nums = /[0-9]/g; //regex for chars and spaces
    var mess="Please correct the field marked"

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
                    fNameDataOK = true;
				}
                break; 
         }
    }
    catch (message) {
        document.getElementById("errorMessage").innerHTML = message;
    }
    finally {
        if (phDataOK && zipDataOK && lNameDataOK && fNameDataOK) {
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
    if (phDataOK & zipDataOK & lNameDataOK & fNameDataOK) 
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
                    else {
                        document.getElementsByTagName("form")[0].submit();
                        window.alert("Thank you for submitting your information.");
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
function clearSelect() {
    var selectBox = document.getElementById("title");
    selectBox.selectedIndex = -1;
    selectBox.style.boxShadow = "none";
}

//project 7: calculate the time between input and current time
function getTime()
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
					if(cDay < inDay)
					{
						months--;
						days = dayOfMonths[inMonth-1] - inDay + cDay;
						if( inMonth == 2) // if FEB, check for Leap years, if so, add to more day
							days +=checkForLeaps(cYear, years);
					}
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
					if(cDay < inDay)
						days = inDay - cDay;
					else
						days = cDay - inDay;
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

// create Listeners for Main image on index page.
function createListeners() {

    //create event listener for main Pic
    var mainImage = document.getElementById("varImage");
    mainImage.addEventListener("click", changePic, false);

    alignDivs(); // align boxes

    // (Project 6)create listener for submit on form
    var infoForm = document.getElementsByTagName("form")[0];
    if (infoForm.addEventListener) {
        infoForm.addEventListener("submit", validateForm, false);
    } 
    else if (infoForm.attachEvent) {
       infoForm.attachEvent("onsubmit", validateForm);
   }

   // (Project 6)
   clearSelect();


   // (project 5)
    var ph = document.getElementById("phone");
    ph.value = "";
    var zp = document.getElementById("zip");
    zp.value = "";
    var ln = document.getElementById("lastName");
    ln.value = "";
    var fn = document.getElementById("firstName");
    fn.value = "";


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




