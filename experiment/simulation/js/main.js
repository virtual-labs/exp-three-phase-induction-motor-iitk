//Your JavaScript goes in here
var c = false;
var c2 = false;
var c3 = false;
var looper;
var degrees = 0;
var rotorid = document.getElementById('img1');
var switchcount = 0;
var phasecount = 0;
voltage1=0;
Current=0;
Speed=0;

function switch1on(){
	a = document.getElementById('switch1');

	if (c == false) {
		a.setAttribute('transform', 'translate(0,-7.3)');
		a.style.transition = 'transform 0.35s';
		if (phasecount == 0) {
			bulb1color = document.getElementById('firstbulb').style.fill = 'red';
			bulb1color = document.getElementById('secondbulb').style.fill = 'blue';
			bulb1color = document.getElementById('thirdbulb').style.fill = 'yellow';
		}
		else if (phasecount == 1) {
			bulb1color = document.getElementById('firstbulb').style.fill = 'red';
			bulb1color = document.getElementById('secondbulb').style.fill = 'yellow';
			b1 = document.getElementById('sbulb').innerHTML = 'B';
			bulb1color = document.getElementById('thirdbulb').style.fill = 'blue';
			b2 = document.getElementById('tbulb').innerHTML = 'Y';
		}
		c = true;
		switchcount = switchcount + 1;
		voltmeter_1 = document.getElementById('voltmeter').innerHTML = voltage1+' V';

	}


	else if (c == true) {
		a.setAttribute('transform', 'translate(0,0)');
		bulb1color = document.getElementById('firstbulb').style.fill = 'white';
		bulb1color = document.getElementById('secondbulb').style.fill = 'white';
		bulb1color = document.getElementById('thirdbulb').style.fill = 'white';
		c = false;
		switchcount = 0;
		voltmeter_1 = document.getElementById('voltmeter').innerHTML = '0 V';


	}
}
function phasechangefunc() {
	if (switchcount == 0) {
		if (c2 == false) {
			document.getElementById("phasechange").style.transform = "rotate(90deg)";
			document.getElementById("phasechange").style.transformOrigin = "237px 37px";
			document.getElementById("phasechange").style.transition = 'transform 0.5s';
			c2 = true;
			phasecount = phasecount + 1;
			console.log(phasecount);
		}
		else if (c2 == true) {
			document.getElementById("phasechange").style.transform = "rotate(0deg)";
			c2 = false;
			phasecount = phasecount - 1;
			console.log(phasecount);
		}
	}
}
// We have restricted the negtive voltage

function autoswitchfunc() {
	    if (voltage1 <= 0) {
        alert("Please enter a valid voltage greater than 0 before turning on the switch.");
        return;
    }

	if (c3 == false) {
		Current=(voltage1/200).toFixed(2);
		document.getElementById("autoswitch").style.transform = "rotate(90deg)";
		document.getElementById("autoswitch").style.transformOrigin = "105px 200px";
		document.getElementById("autoswitch").style.transition = 'transform 0.5s';
		c3 = true;
		switchcount = switchcount + 1;
		if (switchcount == 2) {
			voltmeter_1 = document.getElementById('voltmeter').innerHTML = voltage1+' V';
			ammeter_1 = document.getElementById('amp').innerHTML = Current+" A";
		}
		// console.log(switchcount, 'on');
		if (phasecount == 0) {
			looper;
			degrees = 1;
			rotateAnimation('img1', 0.1);
		}
		if (phasecount == 1) {
			looper;
			degrees = 359;
			rotateAnimation1('img1', 0.1);
		}
	}
	else if (c3 == true) {
		switchcount = switchcount - 1;
		document.getElementById("autoswitch").style.transform = "rotate(0deg)";
		if (switchcount == 1) {
			voltmeter_1 = document.getElementById('voltmeter').innerHTML = voltage1+" V";
		}
		ammeter_1 = document.getElementById('amp').innerHTML = '0 A';
		c3 = false;

		tachometer_1_0 = document.getElementById('tach').innerHTML = '0 RPM';
		// console.log(switchcount, 'off');
	}
}

function rotateAnimation(el, speed) {
	if (switchcount == 2 && phasecount == 0) {
		var elem = document.getElementById(el);
		elem.style.transform = "rotate(" + degrees + "deg)";
		looper = setTimeout('rotateAnimation(\'' + el + '\',' + speed + ')', speed);
		degrees++;
		if (degrees > 359) {
			degrees = 1;
		}
	}
}
function rotateAnimation1(el, speed) {
	if (switchcount == 2 && phasecount == 1) {
		console.log(switchcount, phasecount);
		var elem = document.getElementById(el);
		elem.style.transform = "rotate(" + degrees + "deg)";
		looper = setTimeout('rotateAnimation1(\'' + el + '\',' + speed + ')', speed);
		degrees--;
		if (degrees < 1) {
			degrees = 359;
		}
	}
}

// Here is the updated function 
function displaytach() {
    if (switchcount == 2 && voltage1 > 0) {
        Speed = ((1 - (138.33 / voltage1)) * 1500).toFixed(2);
        if (isNaN(Speed) || !isFinite(Speed) || Speed < 0) {
            Speed = 0;
        }
        document.getElementById('tach').innerHTML = Speed + " RPM";
    } else {
        document.getElementById('tach').innerHTML = '0 RPM';
    }
}

function popupswitch1() {
	var popup = document.getElementById("myPopup");
	popup.classList.toggle("show");
}

function openNav() {
	document.getElementById("mySidepanel").style.width = "500px";
	document.getElementById("mySidepanel").style.height = "100%";
  }
  
  function closeNav() {
	document.getElementById("mySidepanel").style.width = "0";
  }


// Here is the updated function 

function getVoltage(id) {
    let val = parseFloat(document.getElementById(id).value);
    if (isNaN(val) || val <= 0) {
        alert("Voltage must be a number greater than 0");
        voltage1 = 0;
        document.getElementById("voltage-1-display").innerText = "0";
        document.getElementById("voltmeter").innerHTML = "0 V";
        document.getElementById("amp").innerHTML = "0 A";
        document.getElementById("tach").innerHTML = "0 RPM";
        return;
    }
    voltage1 = val;
    document.getElementById("voltage-1-display").innerText = voltage1;

	
}

    // console.log(voltage1, voltage2);

    // console.log(document.getElementById("voltage-1-display-svg").innerText)
}
