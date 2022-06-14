var apiURL = `https://www.dnd5eapi.co/api/`;

var races = []
var selectedRace = "";

// Pull list from DnD API
// serverList: the list we want to pull from the DnD api
// setLocalList: calls a function that stores the server list as a local variable and also prints it to the html
var getList = function(serverList, setLocalList) {
    fetch(`${apiURL}${serverList}`)
        .then(response => response.json())
        .then(data => {
            setLocalList(data.results);
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
    races = list;
    printList(".race-boxes", races);
}

// Handler for when selecting a race
var selectingRaceHandler = function(event) {
    var listItem = event.target;
    // ensures handler only runs when a list item is selected
    if (listItem.matches("li")) {
        // sets selected race to what is selected
        selectedRace = $(listItem).text();
        // proceed with class selection
        console.log(`Race selected: ${selectedRace}. Proceed with class selection.`);
    }
}

getList("races", printRaces);

// event listeners
$(".races").on('click', selectingRaceHandler);


