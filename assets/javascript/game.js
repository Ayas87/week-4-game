var dbzConfig = {
    Goku: {
        name: 'Goku',
        healthPoints: 105,
        attackPower: 10,
        attackPowerModifer: 1,
        counterAttackPower: 10,
        img: 'assets/images/Goku.jpg',
    },
    Vegeta: {
        name: 'Vegeta',
        healthPoints: 150,
        attackPower: 5,
        attackPowerModifer: 35,
        counterAttackPower: 3,
        img: 'assets/images/Vegeta.jpg',
    },
    Trunks: {
        name: 'Trunks',
        healthPoints: 110,
        attackPower: 5,
        attackPowerModifer: 35,
        counterAttackPower: 10,
        img: 'assets/images/Trunks.jpg',
    },
    Gohan: {
        name: 'Gohan',
        healthPoints: 130,
        attackPower: 5,
        attackPowerModifer: 25,
        counterAttackPower: 50,
        img: 'assets/images/Gohan.jpg',
    }
};
var dbzRpgGame = new RpgGame(dbzConfig); //creates a dbz instanced object where charName is passed through
dbzRpgGame.startGame(); //calls for game start.

function RpgGame(config) { //takes in config files .. most of game code runs here
    var self = this;
    self.startGame = function() {
        self.makeChars();
    };
    self.makeChars = function() { //resets all variables, clears divs, and creates new chars (starts new game)
        self.isCharSelected = false;
        self.isEnemySelected = false;
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
            charDiv.append(dbzConfig[key].name);
            charDiv.append('<img src="' + dbzConfig[key].img  + '">');
            $('.your-char').append(charDiv);
             $('.char-box').on('click', function() {
            if (dbzRpgGame.isCharSelected === false) {
                selectedCharName = $(this).text();
                dbzRpgGame.charCheck();
        }
    });
        }
    };
    self.newGameButton = function() { //creates a clickable button that reruns the makeChar function
        $('.win-counter').empty();
        var newGame = $('<button id="new-game">');
        $('.fight-button').prepend(newGame);
        newGame.text('New Game');
        $('#new-game').on('click', function() {
            self.makeChars();
        });
    }
    self.charCheck = function() { //appends selected character and initates the createEnemies function
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
    self.createEnemies = function() { //checks to make sure enemies are not selected heroes or opponents or defeated enemies
        for (var key in dbzConfig) {
            var enemyList = $('<div class="enemy-box char-box">');
            enemyList.attr('data-char', dbzConfig[key].name).text(dbzConfig[key].name);
            if (self.isCharSelected === true && selectedCharName !== dbzConfig[key].name && dbzRpgGame.defatedEnemies.indexOf(dbzConfig[key].name) == -1) {
                $('.your-enemies').append(enemyList);
            }
        }
        $('.enemy-box').on('click', function() { //assigns click event
            selectedOpponentName = $(this).text();
            self.selectOpponent();
        });
    };
    self.selectOpponent = function() { //recreates enemy list to not include selected opponent, creates opponent, runs fight function
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
    self.fight = function() { //creates a fight button and pulls stats for each char based on the config object, assigns click handler
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
    self.fightCalc = function() { //does damage calculations as well as appends text
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
    self.winCondition = function() { //checks if we beat the opponent or lost the game, creates a new game button if win or lose occurs, else it continues back to select opponent
        if(opponentHealthPoints <=0) {
            dbzRpgGame.defatedEnemies.push(selectedOpponentName);
            $('.battle-text').text('You have defeated ' + selectedOpponentName);
            $('.your-opponent').empty();
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
