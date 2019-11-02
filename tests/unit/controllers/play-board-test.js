import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Controller | play-board', function(hooks) {
  setupTest(hooks);

  function buttonClickModelTest(assert, controller, action, position, currentPlayer, winner, nextPlayer, playerXScore, playerOScore) {
    controller.send(action, (position != null ? position : currentPlayer));
    if (position != null ) {
      assert.equal(controller.get('model.board')[position], currentPlayer, `position ${position} filled with ${currentPlayer}`);
    } else {
      assert.equal(controller.get('model.board').join(','), Array(9).fill(null).join(','), 'Empty Board');
    }
    assert.equal(controller.get('model.winner'), winner, `Winner ${winner}`);
    assert.equal(controller.get('model.nextPlayer'), nextPlayer, `Next Player ${nextPlayer}`);
    assert.equal(controller.get('model.playerXScore'), playerXScore, `Player X Score ${playerXScore}`);
    assert.equal(controller.get('model.playerOScore'), playerOScore, `Player O Score ${playerOScore}`);
  }

  // Test the Controller actions.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:play-board');
    assert.ok(controller);

    //set model
    controller.set('model', EmberObject.create({ board: Array(9).fill(null),
      nextPlayer: 'X',
      winner: null,
      playerXScore: 0,
      playerOScore: 0 }));


    // newGame Action
    buttonClickModelTest(assert, controller, 'newGame', null, 'X', null, 'X', 0, 0);

    // board buttonClick Action    
    buttonClickModelTest(assert, controller, 'buttonClick', 0, 'X', null, 'O', 0, 0);
    buttonClickModelTest(assert, controller, 'buttonClick', 1, 'O', null, 'X', 0, 0);
    buttonClickModelTest(assert, controller, 'buttonClick', 3, 'X', null, 'O', 0, 0);
    buttonClickModelTest(assert, controller, 'buttonClick', 4, 'O', null, 'X', 0, 0);
    buttonClickModelTest(assert, controller, 'buttonClick', 6, 'X', 'X', 'O', 1, 0);

    // reset Action
    buttonClickModelTest(assert, controller, 'reset', null, 'X', null, '', 0, 0);

  });
});
