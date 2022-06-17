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
var printList = function(htmlEl, list, imgFolder) {
    for (var i = 0; i < list.length; i++) {
        var cardDivEl = $(`<div>`)
            .addClass(`column is is-12-mobile is-6-tablet is-4-desktop`);

        var divEl = $(`<div>`)
            .addClass(`race-box card`);
        
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
            .addClass(`race-select has-text-grey`)
            .text(`select`);

        var infoEl = $(`<a>`)
            .addClass(`has-text-grey`)
            .text(`info`);

        var titleEl = $(`<p>`)
            .addClass(`title is-size-5 has-text-centered`)
            .text(`${list[i].name}`);

        var imgEl = $(`<img>`)
            .addClass(`class-img`)
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

// Prints races
var printRaces = function(list) {
    racesList = list.results;
    printList(".race-boxes", racesList, "d&d races");
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
        char.race = $(target).find('p').text().toLocaleLowerCase();

        getList(`races/${char.race}`, storeRaceInfo);
        console.log("clicked " + char.race);

        // navigate to class
        location.replace(`classes.html?race=${char.race}`)
    }    
}

getList("races", printRaces);

// event listeners
$(".race-boxes").click(selectingRaceHandler);

// testLink(`https://www.dnd5eapi.co/api/ability-scores`);

var getClassList = function(serverList, setLocalList) {
    fetch(`${apiURL}${serverList}`)
        .then(response => response.json())
        .then(data => {
            setLocalList(data);
        });
}

// var printClassList = function(htmlEl, list, imgFolder) {
//     for (var i = 0; i < list.length; i++) {
//         var divEl = $(`<div>`)
//             .addClass(`class-box card`);

//         var titleEl = $(`<h2>`)
//             .text(`${list[i].name}`);

//         var imgEl = $(`<img>`)
//             .attr(`src`, `./assets/images/${imgFolder}/${list[i].name}.png`);
            
//         var button1El = $(`<button>`)
//             .addClass(`class-select button is-medium`)
//             .text(`select`);
        
//         var button2El = $(`<button>`)
//             .addClass(`classInfo button is-medium`)
//             .text(`info`);
//         $(button2El).click(selectingRaceHandler);

//         $(divEl).append(titleEl, imgEl, button1El, button2El);
//         $(`${htmlEl}`).append(divEl);
//     }
// }

var printClassList = function(htmlEl, list, imgFolder) {
    for (var i = 0; i < list.length; i++) {
        var cardDivEl = $(`<div>`)
            .addClass(`column column is is-12-mobile is-6-tablet is-4-desktop`);

        var divEl = $(`<div>`)
            .addClass(`class-box card`);
        
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
            .addClass(`class-select has-text-grey`)
            .text(`select`);

        var infoEl = $(`<a>`)
            .addClass(`has-text-grey`)
            .text(`info`);

        var titleEl = $(`<p>`)
            .addClass(`title is-size-5 has-text-centered`)
            .text(`${list[i].name}`);

        var imgEl = $(`<img>`)
            .addClass(`class-img`)
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

var selectingClassHandler = function(event) {
    var target = event.target;

    // // ensures handler only runs when a select btn is selected
    if (event.target.matches(`.class-select`)) {
        // sets selected class to what was selected
        char.class = $(target).find('p').text().toLocaleLowerCase();

        getList(`class/${char.class}`, storeClassInfo);
        console.log("clicked " + char.class);

        // navigate to name
        location.replace(`name.html?class=${char.class}`)
    }    
}

var storeClassInfo = function(list) {
    classInfo = list;
}

var printClasses = function(list) {
    classList = list.results;
    printClassList(".class-boxes", classList, "d&d classes");
}

getClassList("classes", printClasses)

