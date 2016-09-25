import Ember from 'ember';
import JoinGroup from '../../mixins/join-group';

export default Ember.Route.extend(JoinGroup, {

  loggedInUser: Ember.inject.service('user'),

  model() {
    const that = this;
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
    const user = model.user;
    const memberships = user.get('memberships').then(function(memberships){
    	Ember.set(controller, 'memberships', memberships);
    });
  },

  actions: {

      joinGroup: function(group) {
        let user = this.get('loggedInUser').get('currentUser');
        group.get('members').addObject(user);
        user.get('memberships').addObject(group);
        user.save();
        group.save();
        this.set('notMember', false);
      }
      
    }

});
