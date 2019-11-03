import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | scoreboard', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`<Scoreboard />`);

    assert.equal(this.element.textContent.includes('Score'), true);
    assert.equal(this.element.textContent.includes('Player X'), true);

  }); 
});
