var searchM = document.getElementById("search");
var query = document.getElementById("searchText");
searchM.onclick = function()
{
	if(query.value !== "")
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			if(xhttp.readyState == 4 && xhttp.status == 200)
			{
				var json = xhttp.responseText;
				var jsonObj = JSON.parse(json);
				if(jsonObj.Response == "True")
				{
					document.getElementById("title").innerHTML = "<u>Title:</u> "+jsonObj.Title;
					document.getElementById("year").innerHTML = "<u>Year:</u> "+jsonObj.Year;
					document.getElementById("runtime").innerHTML = "<u>Runtime:</u> "+jsonObj.Runtime;
					document.getElementById("rating").innerHTML = "<u>IMDb Rating:</u> "+jsonObj.imdbRating;
					document.getElementById("type").innerHTML = "<u>Type:</u> "+jsonObj.Type;
					document.getElementById("genre").innerHTML = "<u>Genre:</u> "+jsonObj.Genre;
					document.getElementById("plot").innerHTML = "<u>Plot:</u> "+jsonObj.Plot;
					document.getElementById("poster").src = jsonObj.Poster;
					document.getElementById("director").innerHTML = "<u>Director:</u> "+jsonObj.Director;
					document.getElementById("writers").innerHTML = "<u>Writer(s):</u> "+jsonObj.Writer;
					document.getElementById("actors").innerHTML = "<u>Actors:</u> "+jsonObj.Actors;
					document.getElementById("language").innerHTML = "<u>Language(s):</u> "+jsonObj.Language;
					document.getElementById("country").innerHTML = "<u>Country:</u> "+jsonObj.Country;
					document.getElementById("awards").innerHTML = "<u>Awards:</u> "+jsonObj.Awards;
					document.getElementById("error").innerHTML = "";
					
				}
				else
				{
					document.getElementById("title").innerHTML = "";
					document.getElementById("year").innerHTML = "";
					document.getElementById("runtime").innerHTML = "";
					document.getElementById("plot").innerHTML = "";
					document.getElementById("rating").innerHTML = "";
					document.getElementById("type").innerHTML = "";
					document.getElementById("genre").innerHTML = "";
					document.getElementById("director").innerHTML = "";
					document.getElementById("writers").innerHTML = "";
					document.getElementById("actors").innerHTML = "";
					document.getElementById("language").innerHTML = "";
					document.getElementById("country").innerHTML = "";
					document.getElementById("awards").innerHTML = "";
					document.getElementById("error").innerHTML = "<u>Error:</u> "+jsonObj.Error;
					document.getElementById("poster").src = "error.jpg";
				}
			}
		};
		var base_url = "http://www.omdbapi.com/?r=json&t=";
		xhttp.open("POST",base_url+query.value,true);
		xhttp.send();
	}
}