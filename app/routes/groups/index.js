import Ember from 'ember';

export default Ember.Route.extend({

  loggedInUser: Ember.inject.service('user'),

  model() {
    const uid = this.get('session').get('uid');

    return Ember.RSVP.hash({
      user: this.store.find('user', uid),
      groups: this.store.findAll('group')
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'user', model.user);
    Ember.set(controller, 'groups', model.groups);
    model.user.get('memberships').then(function(memberships){
    	Ember.set(controller, 'memberships', memberships);
    });
  },

});
