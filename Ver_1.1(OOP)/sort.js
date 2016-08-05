//Sorting
function absoluteSort(items){

		items.sort(function (a, b) {
		  if (a.absoluteRating < b.absoluteRating) {
		    return 1;
		  }
		  if (a.absoluteRating > b.absoluteRating) {
		    return -1;
		  }
		  return 0;
		});

}

function relativeSort(items){

		items.sort(function (a, b) {
		  if (a.relativeRating < b.relativeRating) {
		    return 1;
		  }
		  if (a.relativeRating > b.relativeRating) {
		    return -1;
		  }
		  return 0;
		});

}