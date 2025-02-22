const weatherApiKey = "76435e9d581246fddeb9f081212853bd"; 
const geoApiKey = "ad2b51c816964a409f231603b8032036"; 

function getWeatherByCity() {
    const city = document.getElementById("cidade").value.trim(); 

    if (city === "") {
        alert("Por favor, insira o nome de uma cidade.");
        return;
    }

    const urlClima = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${weatherApiKey}`;

   
    fetch(urlClima)
        .then(response => {
            if (!response.ok) {
                throw new Error("Cidade não encontrada.");
            }
            return response.json();
        })
        .then(data => {
            const lat = data.coord.lat;
            const lon = data.coord.lon;

            document.getElementById("nomecidade").innerText = `${data.name}, ${data.sys.country}`; // Atualize com o ID correto
            document.getElementById("temperatura").innerText = `${data.main.temp} °C`;
            document.getElementById("clima").innerText = data.weather[0].description;
            document.getElementById("umidade").innerText = `${data.main.humidity}%`;
            document.getElementById("vento").innerText = `${(data.wind.speed * 3.6).toFixed(2)} km/h`; // Convertendo m/s para km/h
            document.getElementById("latitude").innerText = lat;
            document.getElementById("longitude").innerText = lon;

            return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geoApiKey}&language=pt`);
        })
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const details = data.results[0].components;
                document.getElementById("estado").innerText = details.state || "Não disponível";
                document.getElementById("cep").innerText = details.postcode || "Não disponível";
            }

            document.getElementById("info-clima").classList.remove("d-none");
        })
        .catch(error => {
            alert(error.message);
        });
}
