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

var characters = JSON.parse(localStorage.getItem('characters'));

console.log(characters);

var printCharList = function(htmlEl) {

    if(!characters) {
        $(".saved-title").text("No Saved Characters")
        return;
    }

    $(".saved-title").text("Saved Characters")

    for (var i = 0; i < characters.length; i++) {
        // converts time to Luxon Object
        var time = luxon.DateTime.fromISO(characters[i].created);
        // converts Luxon Object into string
        time = time.toLocaleString(luxon.DateTime.DATETIME_SHORT);

        var div1El = $(`<div>`)
            .addClass(`character-box`);
        var div2El = $(`<h3>`)
            .addClass(`characer-name`)
            .html(characters[i].name);
        var div3El = $(`<p>`)
            .addClass(`character-race`)
            .text(characters[i].race);
        var div4El = $(`<p>`)
            .addClass(`character-class`)
            .text(characters[i].class);
        var div5El = $(`<p>`)
            .addClass(`character-created`)            
            .text(time);

        $(div1El).append(div2El, div3El, div4El, div5El);
        $(`${htmlEl}`).append(div1El);
    }
}

printCharList(".character-list");
