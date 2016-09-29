import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('users', function() {
    this.route('show', { path: '/:user_id/show' });
  });

  this.route('groups', function() {
    this.route('new');
    this.route('show', {path: ':group_id/show'});
  });

  this.route('events', function() {
    this.route('show', {path: ':event_id/show'});
  });
});

export default Router;
