import Ember from 'ember';
import FacebookLoginMixin from 'club-network-client/mixins/facebook-login';
import { module, test } from 'qunit';

module('Unit | Mixin | facebook login');

// Replace this with your real tests.
test('it works', function(assert) {
  let FacebookLoginObject = Ember.Object.extend(FacebookLoginMixin);
  let subject = FacebookLoginObject.create();
  assert.ok(subject);
});
