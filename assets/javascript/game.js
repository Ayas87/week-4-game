var dbzConfig = {
    Goku: {
        name: 'Goku',
        healthPoints: 100,
        attackPower: 5,
        attackPowerModifer: 5,
        counterAttackPower: 10,
    },
    Vegeta: {
        name: 'Vegeta',
        healthPoints: 150,
        attackPower: 3,
        attackPowerModifer: 3,
        counterAttackPower: 3,
    },
    Trunks: {
        name: 'Trunks',
        healthPoints: 110,
        attackPower: 5,
        attackPowerModifer: 5,
        counterAttackPower: 10,
    },
    Gohan: {
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
        $('.fight-button').on('click', function() {
            for (var key in dbzConfig) {
                if (selectedOpponentName == dbzConfig[key].name) {
                    opponentHealthPoints = dbzConfig[key].healthPoints;
                    opponentCounterAttackPower = dbzConfig[key].counterAttackPower;

                }
                if (selectedCharName == dbzConfig[key].name) {
                    myHealthPoints = dbzConfig[key].healthPoints;
                    myAttackPower = dbzConfig[key].attackPower;
                    myAttackPowerModifier = dbzConfig[key].attackPowerModifer;

                }
            }
            self.fightCalc();
        });
    }
    self.fightCalc = function() {
        //stopping here
        console.log(myAttackPower + myAttackPowerModifier)
        
        // opponentHealthPoints - myAttacks;
        console.log('selected opponent hp is: ' + opponentHealthPoints)
        console.log('selected opponent counter attack power is: ' + opponentCounterAttackPower)
        console.log('selected char hp is :' + myHealthPoints)
        console.log('selected char attack power is :' + myAttackPower)
        console.log('selected char attack power modifer is :' + myAttackPowerModifier)
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
