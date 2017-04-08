//requirements:
//each time the player attacks, ap must increment
//enemy can only use cAp
//all enemies and players must have different ap & cAp
//NO healing
//game mechanics - player needs to have a clickable attack button to defeat their opponent
////when defender's hP is reduced to 0 or less, remove the player from the defender area and choose a new opponent
//win condition - must be able to win by picking the correct order but ever char needs to be able to win
////player wins when all enemies are defeated
//lose condition - player loses when their hp falls to zero or below.
////logically, the player attack takes priority, so in case there is a double K.O., the player should still win because you 'hit' your enemy before the counter attack.

//considerations:
////try using objects .. meaning plan so that it would be easy to incorporate other ideas and making the game modular.
////use sounds on attack... if time allows
////use sprites to indicate break points of aP if time allows
$(document).ready(function() {
	var dbzConfig = {
		charName : ['Goku', 'Vegeta', 'Trunks', 'Gohan'],
		//anything that is modular/theme specific goes in here
	};
	var dbzRpgGame = new RpgGame(dbzConfig); //creates a dbz instanced object where charName is passed through
	dbzRpgGame.startGame(); //calls for game start.. test by consoling dbzRpgGame.charName. confirmed to work
	function RpgGame(config) {
		var self = this; //used to make identifying scope easier
		self.hP = 0; //health points.. minmum hP should be 100
		self.baseHp = 100; //may not actually use this
		self.aP = 0; //attack power.. needs to increment
		self.cAp = 0; //counter attack power
		self.charName = config.charName //this is where putting in the dbz config will pull the charName object that is passed through... you would apply .config to anything you want to vary per game
		self.startGame = function () {
			console.log(dbzRpgGame);
			self.makeChars();
			//functions required to load when the page initializes is passed through here so it can all be called at once
		};
		self.makeChars = function () {
			for(var i=0; i < this.charName.length; i++) {
				console.log('makeChar function is looping ' + [this.charName]);
				var makeDiv = $('<div>');
				makeDiv.addClass('class-box char-name').attr('data-char',this.charName[i]).text(this.charName[i]);
				$('.your-char').append(makeDiv);
			}
			$('.your-char')
		};
		//create functions below
	};
});