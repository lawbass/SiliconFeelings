define([], function() {
	return ['$scope', '$sce', '$rootScope', '$http', '$location', 'socket', function($scope, $sce, $rootScope, $http, $location, socket) {


	  /* Setup */

	  $scope.tweet_data;
	  $scope.canvas_width = 1000;
    $scope.canvas_height = 600;
    $scope.connection_status = false;


	  /* Socket Listeners */

	  socket.on('init', function(data) {
	    console.log(data.message);
	  });

	  socket.on('connecting', function() {
	  	$rootScope.message = 'Connecting';
	  });

	  socket.on('connect', function() {
	  	$rootScope.message = 'Connected';
	  	$scope.connection_status = true;
	  });

	  socket.on('disconnect', function() {
	  	$rootScope.message = 'Disconnected';
	  	$scope.connection_status = false;
	  });

	  socket.on('error', function() {
	  	$rootScope.message = 'Error';
	  	$scope.connection_status = false;
	  });

	  socket.on('reconnecting', function() {
	  	$rootScope.message = 'Reconnecting...';
	  	// NOTE: Fires one or more times!
	  	// TODO
	  });

	  socket.on('reconnect', function() {
	  	$rootScope.message = 'Connected';
	  	$scope.connection_status = true;
	  });

	  socket.on('reconnect_failed', function() {
	  	$rootScope.message = 'Failure to Connect';
	   	// TODO
	 	});

	  socket.on('new_tweets', function(tweets) {
	  	$scope.tweet_data = tweets;
	  });


	  // Because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
	  $scope.$apply();
	}];
});
