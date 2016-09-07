import Ember from 'ember';

export default Ember.Route.extend({

	model: function(){
		return this.store.createRecord('group');
	},

	actions: {
		createGroup: function(newGroup) {

			var uid = this.get('session').get('uid');
			var that = this;
			var user = this.store.find('user', uid).then(function(user) {
				newGroup.get('admins').addObject(user);
				user.get('administrating').addObject(newGroup);
				user.save();
			})
				.then(function() {
					newGroup.save()
						.then(function(newGroup){
							that.transitionTo('index')});
				});
		}

	}

});
