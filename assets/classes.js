// var apiURL = `https://www.dnd5eapi.co/api/`;
// var classList = []


// var getClassList = function(serverList, setLocalList) {
//     fetch(`${apiURL}${serverList}`)
//         .then(response => response.json())
//         .then(data => {
//             setLocalList(data);
//         });
// }

// var printList = function(htmlEl, list) {
//     for (var i = 0; i < list.length; i++) {
//         var divEl = $(`<div>`)
//             .addClass(`class-box card`);

//         var titleEl = $(`<h2>`)
//             .text(`${list[i].name}`);

//         $(divEl).append(titleEl);
//         $(`${htmlEl}`).append(divEl);
//     }
// }

// var selectingClassHandler = function(event) {
//     var target = event.target;

//     // // ensures handler only runs when a class-box is selected
//     if (event.target.matches(`.class-box`)) {
//         // sets selected class to what was selected
//         char.race = $(target).find('h2').text().toLocaleLowerCase();

//         getList(`class/${char.class}`);
//         console.log("clicked " + char.class);

//         // navigate to class
//         location.replace(`name.html?class=${char.class}`)
//     }    
// }

// var printClasses = function(list) {
//     classList = list.results;
//     printList(".class-boxes", classList);
// }

// getClassList("classes", printClasses)

// $(".class-boxes").on("click", selectingClassHandler);

