var dbzConfig = {
    Goku: {
        name: 'Goku',
        healthPoints: 105,
        attackPower: 10,
        attackPowerModifer: 1,
        counterAttackPower: 10,
    },
    Vegeta: {
        name: 'Vegeta',
        healthPoints: 150,
        attackPower: 5,
        attackPowerModifer: 35,
        counterAttackPower: 3,
    },
    Trunks: {
        name: 'Trunks',
        healthPoints: 110,
        attackPower: 5,
        attackPowerModifer: 35,
        counterAttackPower: 10,
    },
    Gohan: {
        name: 'Gohan',
        healthPoints: 130,
        attackPower: 5,
        attackPowerModifer: 25,
        counterAttackPower: 100,
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
    self.opponentHealthPoints;
    self.opponentCounterAttackPower;
    self.myHealthPoints;
    self.myAttackPower;
    self.myAttackPowerModifier;
    self.myAttacks
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
        $('.enemy-box').on('click', function() {
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
            $('#selected-char-text').html(selectedCharName + ' versus ' + selectedOpponentName);
            self.isEnemySelected = true;
            self.fight();
        }
    }
    self.fight = function() {
        var fightDiv = $('<button id="fight">');
        fightDiv.text('Fight!');
        $('.fight-button').append(fightDiv);
        for (var key in dbzConfig) {
            if (selectedOpponentName == dbzConfig[key].name) {
                opponentHealthPoints = eval(dbzConfig[key].healthPoints);
                opponentCounterAttackPower = eval(dbzConfig[key].counterAttackPower);
            }
            if (selectedCharName == dbzConfig[key].name) {
                myHealthPoints = eval(dbzConfig[key].healthPoints);
                myAttackPower = eval(dbzConfig[key].attackPower);
                myAttackPowerModifier = eval(dbzConfig[key].attackPowerModifer);
            }
        }
        $('.fight-button').on('click', function() {
            self.fightCalc();
        });
    }
    self.fightCalc = function() {
        //stopping here
        myAttackPower += myAttackPowerModifier;
        opponentHealthPoints = opponentHealthPoints - myAttackPower;
        console.log(selectedCharName + ' did ' + myAttackPower + ' damage!');
        console.log(selectedOpponentName + ' has ' + opponentHealthPoints + ' hp remaining!');
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
