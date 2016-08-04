'use strict';

// Создаётся объект promise
var promise = new Promise( (resolve, reject) => {

	var a=8;

  if(a===5){
  	return resolve("Success");
  }

  else if (a===6){
  	return reject("Oops");
  }

});

// promise.then навешивает обработчики на успешный результат или ошибку
promise
  .then(
    b => {console.log("Fulfilled: " + b);},
    c => {console.log("Rejected: " + c);}
  )
  .catch (error => {
  	console.log("We've catched an error. hooray!");
  		});
