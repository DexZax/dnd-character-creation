// APIs
var apiURL = `https://www.dnd5eapi.co/api/`;

// variables
var racesList = [];
var raceInfo = [];

// info of current character being made
var char = {
    race: "",
    class: "",
    name: ""
}


// FOR TESTING API LINKS
var testLink = function(apiUrl) {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

// Pull list from DnD API
// serverList: the list we want to pull from the DnD api
// setLocalList: calls a function that stores the server list as a local variable and also prints it to the html
var getList = function(serverList, setLocalList) {
    fetch(`${apiURL}${serverList}`)
        .then(response => response.json())
        .then(data => {
            setLocalList(data);
        });
}

// Print list to HTML
// htmlEl: the html element we want to append the <li> to
// list: the array we want to print
var printList = function(htmlEl, list) {
    for (var i = 0; i < list.length; i++) {
        var divEl = $(`<div>`)
            .addClass(`race-box`);

        var titleEl = $(`<h2>`)
            .text(`${list[i].name}`);

        $(divEl).append(titleEl);
        $(`${htmlEl}`).append(divEl);
    }
}

// Prints races
var printRaces = function(list) {
    racesList = list.results;
    printList(".race-boxes", racesList);
}

// Store race information
var storeRaceInfo = function(list) {
    raceInfo = list;
}

// Handler for when selecting a race
var selectingRaceHandler = function(event) {
    var target = event.target;

    // // ensures handler only runs when a race-box is selected
    if (event.target.matches(`.race-box`)) {
        // sets selected race to what was selected
        char.race = $(target).find('h2').text();
        var race = char.race.toLocaleLowerCase();

        getList(`races/${race}`, storeRaceInfo);
        console.log("clicked " + race);

        // navigate to class
        location.replace('classes.html')
    }    
}

getList("races", printRaces);

// event listeners
// $(".race-boxes").click(selectingRaceHandler);

// testLink(`https://www.dnd5eapi.co/api/ability-scores`);

// saved character modal

const characterButton = document.querySelector('#saved-characters');
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');

// shows character list on button click
characterButton.addEventListener('click', () => {
    modal.classList.add('is-active');
});

// hides character list when clicking off window
modalBg.addEventListener('click', () => {
    modal.classList.remove('is-active');
});