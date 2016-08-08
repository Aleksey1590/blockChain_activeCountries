module.exports = Sorting;

//module.exports = {absComparator: fn()..., relComparator: fn()...}Sorting;
//Sorting

function Sorting(items, field) {
	items.sort(function (a, b) {
		if (a[field] < b[field]) {return 1;}
		else if (a[field] > b[field]) {return -1;}
		else {return 0;}
		});
}

// Sorting(items, false)
// Sorting(items, true)

// items.sort(comp.relRating)
// items.sort(comp.absRating)
// //_______________________________
// _ = require('underscore');

// _.sortBy(items,'absoluteRating')
// _.sortBy(items,'relativeRating')