var dbzConfig = {
    char1 : {
        name: 'Goku',
        healthPoints: 100,
        attackPower: 5,
        attackPowerModifer: 5,
        counterAttackPower: 10,
    },
    char2 : {
        name: 'Vegeta',
        healthPoints: 150,
        attackPower: 3,
        attackPowerModifer: 3,
        counterAttackPower: 3,
    },
    char3 : {
        name: 'Trunks',
        healthPoints: 110,
        attackPower: 5,
        attackPowerModifer: 5,
        counterAttackPower: 10,
    },
    char4 : {
        name: 'Gohan',
        healthPoints: 130,
        attackPower: 5,
        attackPowerModifer: 25,
        counterAttackPower: 10,
    }
};
var dbzRpgGame = new RpgGame(dbzConfig); //creates a dbz instanced object where charName is passed through
dbzRpgGame.startGame(); //calls for game start.. test by consoling dbzRpgGame.charName. confirmed to work

function RpgGame(config) {
    var self = this;
    self.selectedCharName = "";
    self.isCharSelected = false;
    self.isEnemySelected = false;
    self.char = config.char //this is where putting in the dbz config will pull the charName object that is passed through... you would apply .config to anything you want to vary per game
    self.startGame = function() {
        self.makeChars();
    };
    self.makeChars = function() {
        for (var i = 0; i < dbzConfig.length; i++) {
            console.log('looping');
            var charDiv = $('<div>');
            charDiv.addClass('char-box char-name').attr('data-char', this.dbzConfig[i].name).text(this.dbzConfig[i].name);
            $('.your-char').append(charDiv);
        };
    };
    self.charCheck = function() {
        if (this.isCharSelected === false) {
            var selectedChar = $('<div id="selected-char">');
            selectedChar.text(selectedCharName);
            $('.char-box').remove();
            $('.your-char').append(selectedChar);
            $('.instructions').text('Select an enemy!')
            isCharSelected = true;
            self.createEnemies();
        };
    };
    self.createEnemies = function() {
        for (i = 0; i < this.char.name.length; i++) {
            var enemyList = $('<div class="enemy-box">');
            enemyList.attr('data-char', this.char.name[i]).text(this.char.name[i]);
            if (isCharSelected == true && selectedCharName !== this.char.name[i]) {         
                $('.your-enemies').append(enemyList);
            };
        };
    };
};
$(document).ready(function() {
    $('.char-box').on('click', function() {
        var textBoxDiv = $('<div id="selected-char-text">');
        selectedCharName = $(this).attr('data-char')
        textBoxDiv.text('You have selected ' + selectedCharName);
        $('.text-box').prepend(textBoxDiv)
        dbzRpgGame.charCheck();
    });
});
