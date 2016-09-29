import Ember from 'ember';

export default Ember.Route.extend({

	model: function(){
		return this.store.createRecord('group');
	},

	deactivate: function() {
	    const model = this.controller.get('model');
	    model.rollbackAttributes();
  	},

	actions: {
		createGroup: function(newGroup) {
			console.log('entered');
			const that = this;
			const uid = this.get('session').get('uid');
			this.store.find('user', uid).then(function(user) {
				newGroup.get('admins').addObject(user);
				newGroup.get('members').addObject(user);
				user.get('administrating').addObject(newGroup);
				user.get('memberships').addObject(newGroup);
				user.save();
			})
				.then(function() {
					newGroup.save()
						.then(function(){
							that.transitionTo('index');
						});
				});
		},
		
	}

});

