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

var characters = JSON.parse(localStorage.getItem('characters'));

var savedCharacters;

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
    console.log(list);
    for (var i = 0; i < list.length; i++) {

        var cardDivEl = $(`<div>`)
            .addClass(`column is is-12-mobile is-6-tablet is-4-desktop`);

        var divEl = $(`<div>`)
            .addClass(`${propername}-box card`);
        
        var divEl2 = $(`<div>`)
            .addClass(`card-content`);

        var divEl3 = $(`<div>`)
            .addClass(`card-image has-text-centered px-6`);

        var footerEl = $(`<footer>`)
            .addClass(`card-footer`);

        var footerP = $(`<p>`)
            .addClass(`card-footer-item`);

        var footerP2 = $(`<p>`)
            .addClass(`card-footer-item`);

        var selectEl = $(`<a>`)
            .addClass(`${propername}-select has-text-grey`)
            .text(`select`);

        var infoEl = $(`<a>`)
            .addClass(`info-select has-text-grey`)
            .text(`info`);

        var titleEl = $(`<p>`)
            .addClass(`title is-size-5 has-text-centered`)
            .text(`${list[i].name}`);

        var imgEl = $(`<img>`)
            .addClass(`${propername}-img`)
            .attr(`src`, `./assets/images/${imgFolder}/${list[i].name}.png`);

        $(cardDivEl).append(divEl);
        $(divEl).append(divEl2, divEl3, footerEl);
        $(divEl2).append(titleEl);
        $(divEl3).append(imgEl);
        $(footerEl).append(footerP, footerP2);
        $(footerP).append(selectEl);
        $(footerP2  ).append(infoEl);

        $(`${htmlEl}`).append(cardDivEl);
    }
}

// RACE SPECIFIC FUNCTIONS ////////////////////////////////////////////////////
// Prints races
var printRaces = function(list) {
    racesList = list.results;
    printList(".race-boxes", racesList, "d&d-races", "race");
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
        char.race = $(target).parents(`.race-box`).find('.title').text().toLocaleLowerCase();
        // char.race = $(target).find('p').text().toLocaleLowerCase();

        getList(`races/${char.race}`, storeRaceInfo);
        console.log("clicked " + char.race);

        // navigate to class
        location.replace(`classes.html?race=${char.race}`)
        storeRaceSelection(char.race);

    }  else if (event.target.matches(`.info-select`)) {
        char.race = $(target).parents(`.race-box`).find('.title').text().toLocaleLowerCase();
        var apiUrl = `https://www.dnd5eapi.co/api/races/${char.race}`
        fetch(apiUrl) 
        .then(response => response.json())
        .then(data => {
            
            $(`.modal`).addClass(`is-active`);
            $(`.infoContainer`).empty()
            var sub = $("<p>").text(`${char.race}`)
            var info = $("<p>").text(data.alignment);
            $(`.infoContainer`).append(sub, info);
            $(`.modal-background`).on(`click`, () => {
                $(`.modal`).removeClass('is-active');
            })
    });
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
    }}

// testLink(`https://www.dnd5eapi.co/api/ability-scores`);

var getClassList = function(serverList, setLocalList) {
    fetch(`${apiURL}${serverList}`)
        .then(response => response.json())
        .then(data => {
            setLocalList(data);
        });
}

// CLASS SPECIFIC FUNCTIONS ///////////////////////////////////////////////////
var printClasses = function(list) {
    classList = list.results;
    printList(".class-boxes", classList, "d&d-classes", "class");
}


var selectingClassHandler = function(event) {
    var target = event.target;

    // // ensures handler only runs when a select btn is selected
    if (event.target.matches(`.class-select`)) {
        // sets selected class to what was selected
        char.class = $(target).parents(`.class-box`).find('.title').text().toLocaleLowerCase();
        // char.class = $(target).find('p').text().toLocaleLowerCase();

        getList(`class/${char.class}`, storeClassInfo);
        console.log("clicked " + char.class);

        var race = getQuerySelections("race");

        // navigate to name
        location.replace(`name.html?race=${race}&class=${char.class}`);

    }  
    else if (target.matches(`.info-select`)) {
        char.class = $(target).parents(`.class-box`).find('.title').text().toLocaleLowerCase();
        var apiUrl = `https://www.dnd5eapi.co/api/classes/${char.class}`
        fetch(apiUrl) 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            $(`.modal`).addClass(`is-active`);
            $(`.infoContainer`).empty()
            var sub = $("<p>").text(`${char.class} Proficiencies:`)
            $(`.infoContainer`).append(sub);
            for (var i = 0; i < data.proficiencies.length; i++) {
                var info = $("<p>").text(`${data.proficiencies[i].index}`);
                $(`.infoContainer`).append(info);
            }
            $(`.modal-background`).on(`click`, () => {
                $(`.modal`).removeClass('is-active');
            })
        });
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

var saveHandler = function() {
    // gets class and race from query 
    char.race = getQuerySelections('race');
    char.class = getQuerySelections('class');
    
    // get value from input 
    char.name = $('#name').val()

    savedCharacters = JSON.parse(localStorage.getItem('characters'));
    

    // save locally
    if (!savedCharacters) {
        // sets saved characters as an array
        savedCharacters = [];
    }

    savedCharacters.push(char);

    localStorage.setItem('characters', JSON.stringify(savedCharacters));

    $('#submit').attr('disabled', true);
}

// RUNNING SCRIPT /////////////////////////////////////////////////////////////
getList("races", printRaces);
getList("classes", printClasses);


// event listeners
$(".race-boxes").click(selectingRaceHandler);
$(".class-boxes").click(selectingClassHandler);
$("#submit").click(saveHandler)

// testLink(`https://www.dnd5eapi.co/api/classes/wizard`);
getCharacterDetails("class");
getCharacterDetails("race");

