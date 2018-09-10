import uuid from 'goutong/utils/uuid';
import { module, test } from 'qunit';

module('Unit | Utility | uuid', function(hooks) {

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = uuid();
    assert.ok(result);
  });
});
