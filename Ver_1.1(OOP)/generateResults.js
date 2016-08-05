
function Stats(){
	this.absolute = {};
	this.relative = {};
}

Stats.prototype.updateCountryRating = function() {
	this.updateAbsoluteRating(country, popSize);
	this.updateRelativeRating(country, popSize);	
}


function updateCountryRating(country, popSize){
	updateAbsoluteRating(country, popSize);
	updateRelativeRating(country, popSize);
}

function updateAbsoluteRating(country, popSize){

	if (popSize=="xCountry"){
		countriesAbsolute[findCountry("Country Unknown or broken TX", true)].counter++;
		return;
	}
	else if (popSize=="BlockChain.info"){
		countriesAbsolute[findCountry("BlockChain.info", true)].counter++;
		return;
	}
	else{
				countriesAbsolute[findCountry(country, true)].counter++;
				countriesAbsolute[findCountry(country, true)].absoluteRating++;
				countriesAbsolute[findCountry(country, true)].populationSize = popSize;
				
				absoluteSort(countriesAbsolute);
				return;
		}
}

function updateRelativeRating(country, popSize){

	if (popSize=="xCountry"){
		countriesRelative[findCountry("Country Unknown or broken TX", false)].counter++;
		return;
	}
	else if (popSize=="BlockChain.info"){
		countriesRelative[findCountry("BlockChain.info", false)].counter++;
		return;
	}
	else{
				countriesRelative[findCountry(country, false)].counter++;
				countriesRelative[findCountry(country, false)].populationSize = popSize;
				countriesRelative[findCountry(country, false)].relativeRating = (countriesRelative[findCountry(country, false)].counter)/((popSize/1000000));
				
				relativeSort(countriesRelative);
				return;
		}
}






function showTopResults(absolute){
	var totalAbsolute = 0;
	var totalRelative = 0;
	
	var absoluteAddress = require('./public/countriesAbsolute.json');
	var relativeAddress = require('./public/countriesRelative.json');

	for (let i = 0; i<6; i++){
		if (absolute){
			console.log(absoluteAddress['update'][i]); 
		}
		else if (!absolute){
			console.log(relativeAddress['update'][i]);
		}
		console.log("");
	}
	for (let i = 0; i<absoluteAddress['update'].length; i++){
		totalAbsolute = totalAbsolute + absoluteAddress['update'][i].counter;
	}
	for (let i = 0; i<relativeAddress['update'].length; i++){
		totalRelative = totalRelative + relativeAddress['update'][i].counter;
	}
	console.log("Total Absolute TXs - " + totalAbsolute);
	console.log("Total Relative TXs - " + totalRelative);
}


function outputResults(){
	console.log("Absolute Rating: ");
	showTopResults(true);
	console.log("");
	console.log("____________________________________________________________");
	console.log("");
	console.log("Relative Rating: ");
	showTopResults(false);
	console.log("");
}

