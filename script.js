window.onload = function() {
	console.log('ok');

	var http = new XMLHttpRequest();
	var url = "pokemons.json";
	http.open("GET", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onload = function() {
		if(http.readyState == 4 && http.status == 200) {
			var myArr = JSON.parse(this.responseText);
			myPokedex(myArr);
			console.log('ok');
		} else{
			var errors = JSON.parse(http.responseText);
			for(var error in errors['errors']){
				console.log(error+' : '+errors['errors'][error]);
			}
		}
	};

	function myPokedex(myPokemon) {


		document.forms["myform"].onsubmit = function () {


			var valueName = document.getElementById("mytext").value;
			var pokemonName = document.querySelector("#pokeName");
			var pokemonType = document.querySelector("#pokeType");       
			console.log(valueName);
			if (valueName > 0 && valueName < 152) {
				console.log(valueName);
				pokemonName.innerHTML = "Name :" + myPokemon[valueName].name;
				pokemonType.innerHTML = "Type :" + myPokemon[valueName].type;
			}
			return false;
		};
	};
	http.send();
};
