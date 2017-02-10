window.onload = function() {

	var http = new XMLHttpRequest();
	var url = "pokemons.json";
	http.open("GET", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onload = function() {
		if(http.readyState == 4 && http.status == 200) {
			var myArr = JSON.parse(this.responseText);
			myPokedex(myArr);
		} else{
			var errors = JSON.parse(http.responseText);
			for(var error in errors['errors']){
				console.log(error+' : '+errors['errors'][error]);
			}
		}
	};

	function myPokedex(myPokemon) {
		document.forms["myform"].onsubmit = function () {

			var valueName = document.getElementById("mytext").value.toLowerCase();
			var pokemonName = document.querySelector("#pokeName");
			var pokemonType = document.querySelector("#pokeType");
			var imgPokemon = document.querySelector('#leftScreen');
            imgPokemon.innerHTML ="";
            var error = true;



			if (!isNaN(valueName) && valueName > 0 && valueName  < 152) {
				pokemonName.innerHTML = "Name : " + myPokemon[valueName].name;
				pokemonType.innerHTML = "Type : " + myPokemon[valueName].type;
				imgPokemon.innerHTML = "<img src ='http://www.pokestadium.com/sprites/xy/" + myPokemon[valueName].name +".gif'>"
                var pokeGif = myPokemon[valueName].name.toLowerCase();
                imgPokemon.innerHTML = "<img src ='http://www.pokestadium.com/sprites/xy/" + pokeGif +".gif'>"
				var error = false;

			}
			if(isNaN(valueName)){
                for (var i in myPokemon) {
                    if (valueName === myPokemon[i.toString()].name.toLowerCase()) {
                        pokemonName.innerHTML = "Name : " + myPokemon[i].name
                        pokemonType.innerHTML = "Type : " + myPokemon[i].type;
                        var pokeGif = myPokemon[i].name.replace(".", "-").replace("'", "").replace("Nidoran", "nidoran-m").replace(" ", "");
                        imgPokemon.innerHTML = "<img src ='http://www.pokestadium.com/sprites/xy/" + pokeGif.toLowerCase() + ".gif'>"
						var error = false;
                    }
                }
            }
			if (error === true)
            {
                imgPokemon.innerHTML = "<img src ='https://media.tenor.co/images/3338d55fa3df4bd3ae70274b70afec06/raw'>";
            }
			return false;
		};
	};
	http.send();
};
