import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Controller | play-board', function(hooks) {
  setupTest(hooks);

  function buttonClickModelTest(assert, controller, position, currentPlayer, winner, nextPlayer, playerXScore, playerOScore) {
    controller.send('buttonClick', position);
    assert.equal(controller.get('model.board')[position], currentPlayer, `position ${position} filled with ${currentPlayer}`);
    assert.equal(controller.get('model.winner'), winner, `Winner ${winner}`);
    assert.equal(controller.get('model.nextPlayer'), nextPlayer, `Next Player ${nextPlayer}`);
    assert.equal(controller.get('model.playerXScore'), playerXScore, `Player X Score ${playerXScore}`);
    assert.equal(controller.get('model.playerOScore'), playerOScore, `Player O Score ${playerOScore}`);
  }

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:play-board');
    assert.ok(controller);

    controller.set('model', EmberObject.create({ board: Array(9).fill(null),
      nextPlayer: 'X',
      winner: null,
      playerXScore: 0,
      playerOScore: 0 }));

    controller.send('newGame', 'X');
    assert.equal(controller.get('model.winner'), null, 'Empty winner');
    assert.equal(controller.get('model.nextPlayer'), 'X', 'Next Player X');
    assert.equal(controller.get('model.board').join(','), Array(9).fill(null).join(','), 'Empty Board');
    assert.equal(controller.get('model.playerXScore'), 0, 'Player X Score 0');
    assert.equal(controller.get('model.playerOScore'), 0, 'Player O Score 0');


    buttonClickModelTest(assert, controller, 0, 'X', null, 'O', 0, 0);
    buttonClickModelTest(assert, controller, 1, 'O', null, 'X', 0, 0);
    buttonClickModelTest(assert, controller, 3, 'X', null, 'O', 0, 0);
    buttonClickModelTest(assert, controller, 4, 'O', null, 'X', 0, 0);
    buttonClickModelTest(assert, controller, 6, 'X', 'X', 'O', 1, 0);

    controller.send('reset');
    assert.equal(controller.get('model.winner'), null, 'Empty winner');
    assert.equal(controller.get('model.nextPlayer'), '', 'Next Player ');
    assert.equal(controller.get('model.board').join(','), Array(9).fill(null).join(','), 'Empty Board');
    assert.equal(controller.get('model.playerXScore'), 0, 'Player X Score 0');
    assert.equal(controller.get('model.playerOScore'), 0, 'Player O Score 0');

  });
});
