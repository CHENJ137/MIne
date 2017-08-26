/*!
 * Raving Roo - Simple Mortgage Payment Calculator (SMPC) v1.0
 * Copyright 2014 by David K. Sutton
 *
 * You are free to use this script on your website.
 * While not required, it would be much appreciated if you could link back to http://ravingroo.com
 */
/*
 * Changes done by Natalia Nehring Unitec NZ 2017 20 Jan.
 * All validation were moved to validation function for all inputs
 * Calculation moved to separate function
 */

function validNumber(fieldinput) {
	var unicode = fieldinput.charCode ? fieldinput.charCode : fieldinput.keyCode;
	if ((unicode != 8) && (unicode != 46)) { //if the key isn't the backspace key (which we should allow)
		if (unicode < 48 || unicode > 57) //if not a number
			return false; //disable key press
	}
}


function myPayment() {
	// Declare variables 
	var loanprincipal = 0;
	var period = 0;
	var months = 0;
	var interest = 0;
	var result = 0;
	var loan = document.mortgagecalc.loan.value;
	var loanL = document.mortgagecalc.loan.value.length;
	var year = document.mortgagecalc.years.value;
	var yearL = document.mortgagecalc.years.value.length;
	var rate = document.mortgagecalc.rate.value;
	var rateL = document.mortgagecalc.rate.value.length;
	var selectValue = document.getElementById('selectId').value;
	console.log(selectValue)
	var msgLoan = inputValidateLoan(loan, loanL);
	document.getElementById('loanError').innerHTML = msgLoan;

	var msgYear = inputValidateYear(year, yearL);
	document.getElementById('yearsError').innerHTML = msgYear;

	var msgRate = inputValidateRate(rate, rateL);
	document.getElementById('rateError').innerHTML = msgRate;

	// Form validation checking
	if ((msgLoan == '') && (msgYear == '') && (msgRate == '')) {
		// Set variables from form data
		loanprincipal = document.mortgagecalc.loan.value;
		if (selectValue == 'weekly') {
			interest = document.mortgagecalc.rate.value / 5200;
			times = document.mortgagecalc.years.value * 52;
		} else if (selectValue == 'fornightly') {
			interest = document.mortgagecalc.rate.value / 2600;
			times = document.mortgagecalc.years.value * 26;
		} else if (selectValue == 'monthly') {
			interest = document.mortgagecalc.rate.value / 1200;
			times = document.mortgagecalc.years.value * 12;
		} else {
			interest = document.mortgagecalc.rate.value / 1200;
			times = document.mortgagecalc.years.value * 12;
		}
		console.log(interest);
		result = myPaymentCalculate(loanprincipal, times, interest);
		console.log(result);
		// Calculate mortgage payment and display result
		document.getElementById('monthlyPayment').innerHTML = result;
	} else {
		document.getElementById('monthlyPayment').innerHTML = document.getElementById('monthlyPayment').innerHTML + '<br>';
	}

	document.getElementById('friendlyReminder').style.display = 'block';
}

function myPaymentCalculate(loanprincipal, times, interest) {
	var res = '';
	// Calculate mortgage payment and display result
	res = 'Your mortgage payment will be ' + '$' + (loanprincipal * interest / (1 - (Math.pow((1 + interest), -times)))).toFixed(2) + '.';
	return res;
}



function inputValidateLoan(inputLoan, inputLoanLeng) {
	var msg = '';
	// Form validation checking
	if ((inputLoan === null) || (inputLoanLeng === 0) || (isNaN(inputLoan) === true)) {
		msg = ' Loan - Numeric value required. Example: 165000';
	}
	return msg;
}


function inputValidateYear(inputYears, inputYearsLeng) {
	var msg = '';
	// Form validation checking	
	if ((inputYears === null) || (inputYearsLeng === 0) || (isNaN(inputYears) === true)) {
		msg = 'Years - Numeric value required. Example: 30';
	}
	return msg;

}

function inputValidateRate(inputRate, inputRateLeng) {
	var msg = '';
	if ((inputRate === null) || (inputRateLeng === 0) || (isNaN(inputRate) === true)) {
		msg = 'Rate - Numeric value required. Example: 5.25';
	}
	return msg;
}


function myPaymentReset() {
	// Reset everything to default/null/blank
	document.getElementById('monthlyPayment').innerHTML = 'Values reset';
	document.getElementById('friendlyReminder').style.display = 'none';
	document.getElementById('loanError').innerHTML = '';
	document.getElementById('yearsError').innerHTML = '';
	document.getElementById('rateError').innerHTML = '';
	document.mortgagecalc.loan.value = null;
	document.mortgagecalc.years.value = null;
	document.mortgagecalc.rate.value = null;
}
