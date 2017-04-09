var dbzConfig = {
    char1: {
        name: 'Goku',
        healthPoints: 100,
        attackPower: 5,
        attackPowerModifer: 5,
        counterAttackPower: 10,
    },
    char2: {
        name: 'Vegeta',
        healthPoints: 150,
        attackPower: 3,
        attackPowerModifer: 3,
        counterAttackPower: 3,
    },
    char3: {
        name: 'Trunks',
        healthPoints: 110,
        attackPower: 5,
        attackPowerModifer: 5,
        counterAttackPower: 10,
    },
    char4: {
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
    self.selectedOpponentName = "";
    self.isCharSelected = false;
    self.isEnemySelected = false;
    self.wins = 0;
    self.startGame = function() {
        self.makeChars();
    };
    self.makeChars = function() {
        for (var key in dbzConfig) {
            var charDiv = $('<div class="char-box char-name">');
            charDiv.text(dbzConfig[key].name);
            $('.your-char').append(charDiv);
        }
    };
    self.charCheck = function() {
        var selectedChar = $('<div id="selected-char">');
        var textBoxDiv = $('<div id="selected-char-text">');
        textBoxDiv.text('You have selected ' + selectedCharName);
        selectedChar.text(selectedCharName);
        $('.text-box').prepend(textBoxDiv)
        $('.char-box').detach();
        $('.your-char').append(selectedChar);
        $('.instructions').text('Select an enemy!')
        self.isCharSelected = true;
        self.createEnemies();
    };
    self.createEnemies = function() {
        for (var key in dbzConfig) {
            var enemyList = $('<div class="enemy-box char-box">');
            enemyList.attr('data-char', dbzConfig[key].name).text(dbzConfig[key].name);
            if (self.isCharSelected === true && selectedCharName !== dbzConfig[key].name) {
                $('.your-enemies').append(enemyList);
            }
        }
        $('.enemy-box').on('click',function() {
            selectedOpponentName = $(this).text();
            self.selectOpponent();
        });
    };
    self.selectOpponent = function() {
        if (self.isCharSelected === true && self.isEnemySelected === false) {
            var selectedOpponent = $('<div id="selected-opponent">');
            selectedOpponent.text(selectedOpponentName);
            $('.your-opponent').append(selectedOpponent);
            $('.instructions').text('Fight!!')
            self.isEnemySelected = true;
            $('#selected-char-text').html(selectedCharName + ' versus ' + selectedOpponentName);
        }
    }
}


$(document).ready(function() {
    $('.char-box').on('click', function() {
        if (dbzRpgGame.isCharSelected === false) {            
            selectedCharName = $(this).text();
            dbzRpgGame.charCheck();
        }
    });

});
