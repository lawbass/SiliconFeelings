define(['angular', 'io'], function(angular) {
	'use strict';


  /* Services */

	angular.module('myApp.services', [])
		.factory('SharedSocket', ['$rootScope', function($rootScope) {
		  // Singleton class constructor
			var Singleton = function() {
			    return function(params) {
			        if (Singleton.prototype._singletonInstance) {
					      return Singleton.prototype._singletonInstance;
					    }
					    Singleton.prototype._singletonInstance = this;

			        // Call initialize method (does not accept params).
			        this.initialize.apply(this);
			    }
			}

		  var SharedSocket = Singleton();
		  SharedSocket.prototype = {
		    initialize: function() {
		    	this.connection = io.connect('/', {});
		    },
		    connectionStatus: function() {
		  		return this.connection.socket.connected;
		  	},
		    on: function(eventName, callback) {
		    	var self = this;
		      this.connection.on(eventName, function() {
		        var args = arguments;
		        $rootScope.$apply(function() {
		          callback.apply(self.connection, args);
		        });
		      });
		    },
		    emit: function(eventName, data, callback) {
		    	var self = this;
		      this.connection.emit(eventName, data, function() {
		        var args = arguments;
		        $rootScope.$apply(function() {
		          if (callback) {
		            callback.apply(self.connection, args);
		          }
		        });
		      })
		    }
		  }

		  return SharedSocket;

		}]);
});
