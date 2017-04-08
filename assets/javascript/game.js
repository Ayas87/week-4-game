var dbzConfig = {
    charName: ['Goku', 'Vegeta', 'Trunks', 'Gohan'],
};
var dbzRpgGame = new RpgGame(dbzConfig); //creates a dbz instanced object where charName is passed through
dbzRpgGame.startGame(); //calls for game start.. test by consoling dbzRpgGame.charName. confirmed to work

function RpgGame(config) {
    var self = this; //used to make identifying scope easier
    self.hP = 100; //health points.. minmum hP should be 100
    self.aP = 0; //attack power.. needs to increment
    self.cAp = 0; //counter attack power
    self.charName = config.charName //this is where putting in the dbz config will pull the charName object that is passed through... you would apply .config to anything you want to vary per game
    self.startGame = function() {
        console.log(dbzRpgGame);
        self.makeChars();
    };
    self.makeChars = function() {
        for (var i = 0; i < this.charName.length; i++) {
            console.log('makeChar function is looping ' + [this.charName]);
            var charDiv = $('<div>');
            charDiv.addClass('char-box char-name').attr('data-char', this.charName[i]).text(this.charName[i]);
            $('.your-char').append(charDiv);
        }
    };
};
$(document).ready(function() {
    $('.char-box').on('click', function() {
        console.log('on click is working, ' + $(this).attr('data-char') + ' was clicked');
        if ($('.char-box').attr('data-char') !== $(this).attr('data-char')) {
            $('.char-box').remove();
        }
    });
});
