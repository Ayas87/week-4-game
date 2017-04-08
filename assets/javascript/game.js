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

var RpgGame = {

};
//consider figuring out a formula where each character gets a bonus hP and it can random damage calculations that will always yield to a win possibility... 
////this may not be possible. but it would have to follow the logic where 100hP+bonus hP slightly >= all cP * # of attacks required to win combined & aP is calculated as total enemy hP - (# attacks required * aP increment ... not sure if i want it additive or multiplicitive yet)
var hP = 0; //health points.. minmum hP should be 100
var aP = 0; //attack power.. needs to increment
var cAp = 0; //counter attack power
