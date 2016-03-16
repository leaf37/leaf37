/**
 * StateBoot state.
 */
function StateBoot() {  
  Phaser.State.call(this);


}

/** @type Phaser.State */
StateBoot.prototype = Object.create(Phaser.State.prototype);
StateBoot.prototype.constructor = StateBoot;

StateBoot.prototype.preload = function(game) {
  game.load.pack('pack1','assets/assets-pack.json');
};

StateBoot.prototype.create = function(game) {
  game.state.start("StateGame");
}