var apiURL = `https://www.dnd5eapi.co/api/`;

var races = []

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
        var listEl = $(`<li>`)
            .text(`${list[i].name}`);        
        $(`${htmlEl}`).append(listEl);
    }
}

// Prints races
var printRaces = function(list) {
    races = list;
    printList(".races", races);
}

getList("races", printRaces);


