var dbzConfig = {
    Goku: {
        name: 'Goku',
        healthPoints: 105,
        attackPower: 10,
        attackPowerModifer: 1,
        counterAttackPower: 10,
        img: '../images/Goku.jpg',
    },
    Vegeta: {
        name: 'Vegeta',
        healthPoints: 150,
        attackPower: 5,
        attackPowerModifer: 35,
        counterAttackPower: 3,
        img: '../images/Vegeta.jpg',
    },
    Trunks: {
        name: 'Trunks',
        healthPoints: 110,
        attackPower: 5,
        attackPowerModifer: 35,
        counterAttackPower: 10,
        img: '../images/Trunks.jpg',
    },
    Gohan: {
        name: 'Gohan',
        healthPoints: 130,
        attackPower: 5,
        attackPowerModifer: 25,
        counterAttackPower: 50,
        img: '../images/Gohan.jpg',
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
    self.myAttacks;
    self.defatedEnemies = [];
    self.startGame = function() {
        self.makeChars();
    };
    self.makeChars = function() {
        self.isCharSelected = false;
        self.isEnemySelected = false;
        // $('.enemy-box').detach();
        // $('.char-box').detach();
        // $('#your-opponent').detach();
        // $('#selected-char').detach();
        self.defatedEnemies = []
        self.wins = 0;
        $('.your-char').empty();
        $('.your-opponent').empty();
        $('.your-enemies').empty();
        $('.battle-text').empty();
        $('.instructions').empty();
        $('.instructions').text('Select a character!');
        $('#selected-char-text').empty();
        $('#new-game').detach();
        for (var key in dbzConfig) {
            var charDiv = $('<div class="char-box">');
            charDiv.text(dbzConfig[key].name);
            $('.your-char').append(charDiv);
             $('.char-box').on('click', function() {
            if (dbzRpgGame.isCharSelected === false) {
                selectedCharName = $(this).text();
                dbzRpgGame.charCheck();
        }
    });
        }
    };
    self.newGameButton = function() {
        var newGame = $('<button id="new-game">');
        $('.fight-button').prepend(newGame);
        newGame.text('New Game');
        $('#new-game').on('click', function() {
            self.makeChars();
        });
    }
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
            if (self.isCharSelected === true && selectedCharName !== dbzConfig[key].name && dbzRpgGame.defatedEnemies.indexOf(dbzConfig[key].name) == -1) {
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
            $('.enemy-box').detach();
            self.createEnemies();
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
        $('.fight-button').prepend(fightDiv);
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
        $('#fight').on('click', function() {
            self.fightCalc();
        });
    }
    self.fightCalc = function() {
        var battleLogMyDmg = $('<div class="battle-log-my-dmg">');
        var battleLogMyHp = $('<div class="battle-log-my-hp">');
        var battleLogOpponentDmg = $('<div class="battle-log-opponent-dmg">');
        var battleLogOpponentHp = $('<div class="battle-log-opponent-hp">');
        $('.battle-text').prepend(battleLogMyDmg);
        $('.battle-text').prepend(battleLogOpponentHp);
        $('.battle-text').prepend(battleLogOpponentDmg);
        $('.battle-text').prepend(battleLogMyHp);
        myAttackPower += myAttackPowerModifier;
        opponentHealthPoints = opponentHealthPoints - myAttackPower;
        myHealthPoints -= opponentCounterAttackPower;
        battleLogMyDmg.text('You attacked ' + selectedCharName + ' for ' + myAttackPower + ' damage!');
        battleLogOpponentHp.text(selectedOpponentName + ' has ' + opponentHealthPoints + ' hp remaining!');
        battleLogOpponentDmg.text(selectedOpponentName + ' countered for ' + opponentCounterAttackPower + '!');
        battleLogMyHp.text('You have ' + myHealthPoints + ' HP remaining!');

        self.winCondition();
    }
    self.winCondition = function() {
        if(opponentHealthPoints <=0) {
            dbzRpgGame.defatedEnemies.push(selectedOpponentName);
            $('.battle-text').text('You have defeated ' + selectedOpponentName);
            $('.your-opponent').detach();
            $('#fight').detach();
            $('.enemy-box').detach();
            self.wins++;
            $('.win-counter').text('Wins: ' + self.wins);
            if (self.wins >=3) {
                alert('You Win!!');
                self.newGameButton();
            }
            self.isEnemySelected = false;
            self.createEnemies();
        } else if (myHealthPoints <= 0){
            $('#fight').detach();
            alert('You Lose!');
            self.newGameButton();
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
