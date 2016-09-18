import Ember from 'ember';
import _ from 'lodash/lodash';
import JoinGroup from '../../mixins/join-group';

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
    Ember.set(controller, 'groups', model.groups);
    const user = model.user;
    const groups = user.get('memberships').then(function(groups){
    	Ember.set(controller, 'memberships', groups);
    });
    
  }

});
