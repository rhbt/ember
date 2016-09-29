import Ember from 'ember';
import CommentMixin from 'club-network-client/mixins/comment';
import { module, test } from 'qunit';

module('Unit | Mixin | comment');

// Replace this with your real tests.
test('it works', function(assert) {
  let CommentObject = Ember.Object.extend(CommentMixin);
  let subject = CommentObject.create();
  assert.ok(subject);
});
