import Ember from 'ember';
import JoinGroup from '../../mixins/join-group';
import _array from 'lodash/array';

export default Ember.Route.extend(JoinGroup, {

  loggedInUser: Ember.inject.service('user'),

  model() {
    const uid = this.get('session').get('uid');
    const user = uid ? this.store.find('user', uid) : null;
    return Ember.RSVP.hash({
      user: user,
      groups: this.store.findAll('group')
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'user', model.user);
    let groupChunks = _array.chunk(model.groups.toArray(), 4)
    Ember.set(controller, 'groups', model.groups);
    Ember.set(controller, 'groupChunks', groupChunks);
    const user = model.user;
    const groups = user.get('memberships').then(function(groups){
    	Ember.set(controller, 'memberships', groups);
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
