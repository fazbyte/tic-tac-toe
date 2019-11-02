import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | play board', function(hooks) {
  setupApplicationTest(hooks);


  test('should show board as the home page', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/play-board', 'should redirect automatically');
  });

  test('should show buttons on board as the home page', async function (assert) {
    await visit('/');
    assert.equal(this.element.querySelectorAll('button')[0].textContent, "Start New Game With X")
    assert.equal(this.element.querySelectorAll('button')[1].textContent, "Start New Game With O")

  });

});
