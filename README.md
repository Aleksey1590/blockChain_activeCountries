# blockChain_activeCountries

0. Download Ver_X.X and node_modules.zip. 
1. Unzip node_modulea.zip file into Ver_X.X file.
2. Install NPM package manager.
3. Run <npm init> in cmd inside Ver_X.X file. 
4. It should automatically install all necessary dependencies from Ver_X.X/package.json file. 
5. If it didnt, here is list of current dependencies: 
  "dependencies": {
    "express": "^4.14.0",
    "fs": "0.0.2",
    "promise": "^7.1.1",
    "request": "^2.74.0",
    "require": "^2.4.20",
    "sort": "0.0.3",
    "ws": "^1.1.1"
  }
6. Modify start.sh file and insert correct directory into <cd "correctPath"> line. 
7. Execute start.sh.
8. Open http://localhost:3000/ in your browser to see execution.



Executing and testing Scripts

1. To populate coutries JSON file, uncomment "app.get('/getTX', startWebSocket);" and execute start.sh. The script will start working and receive real-time data and populate the json file. 
2. To see current statistics of countries, comment "app.get('/getTX', startWebSocket);" back and uncomment "showRating(countriesJSON);" and "app.get('/getTX', showRating);" and execute start.sh. The result should output in your terminal a sorted table of countries in descending order. 
app.get('/getTX', showRating);
