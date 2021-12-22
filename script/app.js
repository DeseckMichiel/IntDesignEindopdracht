let number = 0,
    lengte = 0;

const showResult = function(queryResponse) {
    // We gaan eerst een paar onderdelen opvullen
    // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
    document.querySelector('.js-location').innerText = titleCase(`${queryResponse.list[number].meta.station.name}`)
    number_before = number - 1
    if (number_before < 0) {
        number_before = lengte - 1
    }
    number_next = number + 1
    if (number_next >= lengte) {
        number_next = 0
    }
    document.querySelector('.js-location-before').innerText = titleCase(`${queryResponse.list[number_before].meta.station.name}`)
    document.querySelector('.js-location-next').innerText = titleCase(`${queryResponse.list[number_next].meta.station.name}`)
        // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang. ●
    let now = new Date()
    let dateNow = new Date(now.getTime())
    let HourNow = dateNow.getHours()
    let hoogte = queryResponse.list[number].data[HourNow].sg
    console.log(hoogte)
    document.querySelector('.js-height').innerText = `${hoogte} meter`
    hoogte = (hoogte + 2) * 25
    hoogte = 100 - (hoogte / 100 * 70)
    console.log(hoogte)
    document.querySelector(".js-waves").style.transform = `translateY(${hoogte}%)`
};

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ')
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ');
}

const clickedButton = function() {
    const buttonNext = document.querySelector('.js-next')
    buttonNext.addEventListener('click', function() {
        number++
        if (number >= lengte) {
            number = 0
        }
        console.log(number)
        getAPI()
    });
    const buttonBefore = document.querySelector('.js-before')
    buttonBefore.addEventListener('click', function() {
        number--
        if (number < 0) {
            number = lengte - 1
        }
        console.log(number)
        getAPI()
    });
}

const getAPI = async() => {
    // Eerst bouwen we onze url op
    // Met de fetch API proberen we de data op te halen.
    const data = await fetch(`./script/response.json`)
        .then((r) => r.json())
        .catch((err) => console.error('An error occured:', err))
        // Als dat gelukt is, gaan we naar onze showResult functie
    console.log(data)
    lengte = data.list.length
    showResult(data)
};

document.addEventListener('DOMContentLoaded', function() {
    clickedButton();
    getAPI();
});