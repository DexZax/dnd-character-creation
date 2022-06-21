// APIs
var apiURL = `https://www.dnd5eapi.co/api/`;

// variables
var racesList = [];
var raceInfo = [];
var classList = []
var classInfo = []

// info of current character being made
var char = {
    race: "black",
    class: "white",
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
        storeRaceSelection(char.race);
    }    
}

var getQuerySelections = function(argument) {
    var currentUrl = window.location.href.toString()
    // var testUrl = "dnd.com/name.html?race=dwarf&class=priest"
    var selections = currentUrl.split("?")[1];
    // console.log(selections);
    var seperatedSelections = selections.split("&");
    for (var i = 0; i < seperatedSelections.length; i++) {
        if (argument === seperatedSelections[i].split("=")[0]) {
            return seperatedSelections[i].split("=")[1];
        }
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
        char.class = $(target).parents(`.class-box`).find('h2').text().toLocaleLowerCase();

        getList(`class/${char.class}`, storeClassInfo);
        console.log("clicked " + char.class);

        var race = getQuerySelections("race");

        // navigate to name
        location.replace(`name.html?race=${race}&class=${char.class}`);
        // getCharacterDetails("class");
        // getCharacterDetails("race");
    }    
}

var storeClassInfo = function(list) {
    classInfo = list;
}

// fetch api for name page
var getCharacterDetails = function(selection) {  
    var selectionType;
    var specificSelection;

    // determines the type of data we want
    switch (true) {
        case (selection == 'race'):
            selectionType = 'races';
            specificSelection = `race`;
            break;
        case (selection == 'class'):
            selectionType = 'classes';
            specificSelection = `class`;
            break;
    }
    
    var charUrl = `https://www.dnd5eapi.co/api/${selectionType}/${getQuerySelections(selection)}`;
    fetch(charUrl) 
        .then(response => response.json())
        .then(data => {
            displayInfo(data, specificSelection, selection);
        });
};

var displayInfo = function(data, specificSelection, selection) {

    if (specificSelection == "race") {
        var titleEl = $("<h2>").text(`${getQuerySelections(selection)}`);
        info = $("<p>").text(data.alignment);
        $(`.${specificSelection}-info`).append(titleEl, info);
    }else {
        var titleEl = $("<h2>").text(`${getQuerySelections(selection)}`);
        var subheading = $("<p>").text("proficiencies:");
        $(`.${specificSelection}-info`).append(titleEl, subheading);
        for (var i = 0; i < data.proficiencies.length; i++) {
            var info = $("<p>").text(`${data.proficiencies[i].index}`);
            $(`.${specificSelection}-info`).append(info);
        }
    }  
}

var savehandler= function(){
    console.log(char.race) 
    console.log(char.class)
    // get value from input 
    char.name= $('#name').val()
    // 
    // set name input into char.name 
    // end goal - console log char.name
    console.log(char.name) 
}

// RUNNING SCRIPT /////////////////////////////////////////////////////////////
getList("races", printRaces);
getList("classes", printClasses)


// event listeners
$(".race-boxes").click(selectingRaceHandler);
$(".class-boxes").click(selectingClassHandler);
$("#submit").click(savehandler)

// testLink(`https://www.dnd5eapi.co/api/classes/wizard`);
getCharacterDetails("class");
getCharacterDetails("race");