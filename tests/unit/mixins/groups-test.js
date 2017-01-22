import Ember from 'ember';
import GroupsMixin from 'club-network-client/mixins/groups';
import { module, test } from 'qunit';

module('Unit | Mixin | groups');

// Replace this with your real tests.
test('it works', function(assert) {
  let GroupsObject = Ember.Object.extend(GroupsMixin);
  let subject = GroupsObject.create();
  assert.ok(subject);
});
