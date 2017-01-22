import Ember from 'ember';
import CommentMixin from '../../mixins/comments';

export default Ember.Route.extend(CommentMixin, {
	loggedInUser: Ember.inject.service('user'),

	model: function(params) {
		return this.store.find('event', params.event_id);
	},



});
