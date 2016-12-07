var n;
var inputted = false;
var startInput = document.getElementById("startInput");
var results = document.getElementById("results");
startInput.onclick = function()
{
	n = document.getElementById("nom").value;
	for(var i = 0; i < n; i++)
	{
		results.innerHTML += "<input type='text' class='titles' id='title"+i+"' placeholder='Enter movie name'/><br/><br/>";
	}
	results.innerHTML += "<p id='error'></p>";	
	results.innerHTML += "<button id='compareMov'>Sort Movies</button>";
	inputted = true;
	document.getElementById("nom").style.visibility = "hidden";
	startInput.style.visibility = "hidden";
	var arr = [];
	var num = 0;
	document.getElementById('compareMov').onclick = function()
	{
		arr = [];
		var bo = compareMovies(arr);
	}
}

function compareMovies(arr)
{
	for(var i = 0; i < n; i++)
	{
		var name = document.getElementById("title"+i).value;
		if(name === "")
		{
			arr = [];
			alert("Enter all movies names");
			return false;
		}
		var imdb = getImdb(name, arr);
	}
	return true;
}

function getImdb(name, arr)
{
	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			if(xhttp.readyState == 4 && xhttp.status == 200)
			{
				var json = xhttp.responseText;
				var jsonObj = JSON.parse(json);
				if(jsonObj.Response == "True"){
					arr.push({name:name, rating:jsonObj.imdbRating});
					document.getElementById("error").innerHTML = "";
					if(arr.length == n)
					{
						compareIms(arr);
						return true;
					}
					return true;
				}
				else
				{
					document.getElementById("error").innerHTML = name+" "+jsonObj.Error;
					arr.push({name:name, rating:-1});
					if(arr.length == n)
					{
						compareIms(arr);
						return false;
					}
					return false;
				}
			}
		};
		var base_url = "http://www.omdbapi.com/?r=json&t=";
		xhttp.open("POST", base_url+name, true);
		xhttp.send();
}

function compareIms(arr)
{	
	arr.sort(function(a,b)
	{
		return b.rating-a.rating;
	});
	var count = 0;
	
	results.innerHTML = "";
	results.innerHTML += "<h1 style='color: #FF0'>Results in Descending order of IMDb Rating</h1><br /><br />"
	
	for(var i=0; i<arr.length; ++i)
	{
		if(arr[i].rating == -1)
		{
			count++;
			results.innerHTML+="<div id = 'list'><li><span style = 'color: #0F0'>No movie named "+arr[i].name+"</li></div><br /><br />";
		}
		else
		{
			results.innerHTML+="<div id = 'list'><li><span style = 'color: #0F0'>Movie: "+arr[i].name+" </span>&nbsp;<span style = 'color: #0FF'>IMDb: "+arr[i].rating+"</span></li></div><br /><br />";
		}
	}
	results.innerHTML+="<button id='tryAgain'>Try Again</button>";
	document.getElementById('tryAgain').onclick = function()
	{
		location.reload();
	}
	return;
}
