const showResult = function(queryResponse) {
    // We gaan eerst een paar onderdelen opvullen
    // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
    document.querySelector('.js-location').innerText = capitalizeFirstLetter(`${queryResponse.meta.station.name}`);
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    let now = new Date();
    let dateNow = new Date(now.getTime())
    let HourNow = dateNow.getHours()
    let hoogte = queryResponse.data[HourNow].sg
    console.log(hoogte)
    hoogte = (hoogte + 2) * 25
    console.log(hoogte)
    htmlWave = document.querySelector(".js-waves");
    let Percentage = 100 - hoogte;
    htmlWave.style.transform = `translateY(${Percentage}%)`;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getAPI = async() => {
    // Eerst bouwen we onze url op
    // Met de fetch API proberen we de data op te halen.
    const data = await fetch(`./script/response.json`)
        .then((r) => r.json())
        .catch((err) => console.error('An error occured:', err));
    // Als dat gelukt is, gaan we naar onze showResult functie
    console.log(data);
    showResult(data);
};

document.addEventListener('DOMContentLoaded', function() {
    getAPI();
});