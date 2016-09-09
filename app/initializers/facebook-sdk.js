/* global FB */
export default {
  name: 'facebook',

  initialize: function() {
    let fbAsyncInit = function() {
      FB.init({
        appId      : '2089782327914389',
        xfbml      : true,
        version    : 'v2.2'
      });
    };

    (function(d, s, id){
       let js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = fbAsyncInit;
  }
};