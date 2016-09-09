import Ember from 'ember';

export default Ember.Controller.extend({

  loggedInUser: Ember.inject.service('user'),


  admin: Ember.computed(function() {
		const that = this;

		this.get('loggedInUser').get('currentUser.administrating')
			.then(function(groups) {
				const groupID = that.get('group').get('id');
					groups.forEach(function(group) {
						if (group.get('id') == groupID) {
							return true;
						} 
					})
					return false;
			});
	}),

  observerAdmin: Ember.observer('isAdmin', function() {
    this.set('adminn', true);
  })


});
