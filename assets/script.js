// APIs
var apiURL = `https://www.dnd5eapi.co/api/`;

// variables
var racesList = [];
var raceInfo = [];
var classList = []
var classInfo = []

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
var printList = function(htmlEl, list, imgFolder, propername) {
    for (var i = 0; i < list.length; i++) {
        var divEl = $(`<div>`)
            .addClass(`${propername}-box`);

        var titleEl = $(`<h2>`)
            .text(`${list[i].name}`);

        var imgEl = $(`<img>`)
            .attr(`src`, `./assets/images/${imgFolder}/${list[i].name}.png`);
            
        var button1El = $(`<button>`)
            .addClass(`${propername}-select button is-medium`)
            .text(`select`);
        
        var button2El = $(`<button>`)
            .addClass(`${propername}Info button is-medium`)
            .text(`info`);

        $(divEl).append(titleEl, imgEl, button1El, button2El);
        $(`${htmlEl}`).append(divEl);
    }
}

// RACE SPECIFIC FUNCTIONS ////////////////////////////////////////////////////
// Prints races
var printRaces = function(list) {
    racesList = list.results;
    printList(".race-boxes", racesList, "d&d races", "race");
}

// Store race information
var storeRaceInfo = function(list) {
    raceInfo = list;
}

// Handler for when selecting a race
var selectingRaceHandler = function(event) {
    var target = event.target;

    // // ensures handler only runs when a race-box is selected
    if (event.target.matches(`.race-select`)) {
        // sets selected race to what was selected
        char.race = $(target).parents(`.race-box`).find('h2').text().toLocaleLowerCase();

        getList(`races/${char.race}`, storeRaceInfo);
        console.log("clicked " + char.race);

        // navigate to class
        location.replace(`classes.html?race=${char.race}`)
    }    
}

// CLASS SPECIFIC FUNCTIONS ///////////////////////////////////////////////////
var printClasses = function(list) {
    classList = list.results;
    printList(".class-boxes", classList, "d&d classes", "class");
}


var selectingClassHandler = function(event) {
    var target = event.target;

    // // ensures handler only runs when a select btn is selected
    if (event.target.matches(`.class-select`)) {
        // sets selected class to what was selected
        char.class = $(target).find('h2').text().toLocaleLowerCase();

        getList(`class/${char.class}`, storeClassInfo);
        console.log("clicked " + char.class);

        // navigate to name
        location.replace(`name.html?class=${char.class}`)
    }    
}

var storeClassInfo = function(list) {
    classInfo = list;
}

// RUNNING SCRIPT /////////////////////////////////////////////////////////////
getList("races", printRaces);
getList("classes", printClasses)

// event listeners
$(".race-boxes").click(selectingRaceHandler);
$(".class-boxes").click(selectingClassHandler);

// testLink(`https://www.dnd5eapi.co/api/ability-scores`);
