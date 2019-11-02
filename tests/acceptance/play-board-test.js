import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | play board', function(hooks) {
  setupApplicationTest(hooks);

  async function buttonClickAcceptance(assert, element, position, expectedValue) {
    await click(`#square${position}`);
    assert.equal(element.querySelector('#square'+position).textContent, expectedValue)
  }

  test('should show board as the home page', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/play-board', 'should redirect automatically');
  });

  test('should show buttons on board as the home page', async function (assert) {

    await visit('/');
    assert.equal(this.element.querySelectorAll('button')[0].textContent, "Start New Game With X")
    assert.equal(this.element.querySelectorAll('button')[1].textContent, "Start New Game With O")

  });

  test('should show winner successfully', async function (assert) {

    await visit('/');

    //Start game with X
    await click('button','Start New Game With X');

    //Do alternate clicks
    await buttonClickAcceptance(assert, this.element, 0, 'X')
    await buttonClickAcceptance(assert, this.element, 1, 'O')
    await buttonClickAcceptance(assert, this.element, 3, 'X');
    await buttonClickAcceptance(assert, this.element, 4, 'O');
    await buttonClickAcceptance(assert, this.element, 8, 'X');
    await buttonClickAcceptance(assert, this.element, 7, 'O');
    await buttonClickAcceptance(assert, this.element, 5, '');
    
    //Check winner 
    assert.equal(this.element.querySelector('#winner_result').textContent, 'O')

  });

});
