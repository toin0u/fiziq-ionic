angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('WorkoutCtrl', function($scope, $interval, $state, displayDone) {
  $scope.sets = [];

  $scope.clock = new Date(0, 0, 0, 0, 0, 0, 0);
  $interval(function () {
    $scope.clock.setSeconds($scope.clock.getSeconds() + 1)
  }, 1000);

  $scope.addSet = function (clock, set) {
    var set = {clock:clock.valueOf(), reps:set.reps, weight:set.weight};
    console.log(set);
    $scope.sets.push(set);
    $scope.sets.reverse();
  };

  $scope.done = function () {
    // $scope.sets = [];
    // set.reps = '';
    // set.weight = '';
    displayDone.setSets($scope.sets);
    $state.go('app.done');
  }
})

.controller('DoneCtrl', function($scope, displayDone) {
  $scope.sets = displayDone.getSets();

  console.log($scope.sets);
  console.log(displayDone.getSets());
})

.controller('SelectionCtrl', function($log, $scope, muscleGroups, workouts, activeWorkoutSession, WorkoutSession, Workout, activeWorkout) {

  if (!activeWorkoutSession.getWorkoutSession()) {
    activeWorkoutSession.setWorkoutSession(new WorkoutSession());
  };

  $scope.muscleGroups = muscleGroups;
  $scope.selectedMuscleGroup = muscleGroups[0];
  $scope.selectedWorkout = workouts[muscleGroups[0].label][0];

  var getWorkoutsBasedOnMuscleGroupSelection = function () {
    for (var key in workouts) {
      if (key == $scope.selectedMuscleGroup.label) {
        return workouts[key];
      }
    }

    return [];
  };
  $scope.workouts = getWorkoutsBasedOnMuscleGroupSelection();

  $scope.updateWorkouts = function () {
    $scope.workouts = getWorkoutsBasedOnMuscleGroupSelection();

    console.log('MG selected: ' +  + $scope.selectedMuscleGroup.label);
  };

  $scope.doSelect = function () {
    console.log('Selected Muscle Group: ' + $scope.selectedMuscleGroup.label);
    console.log('Selected Workout: ' + $scope.selectedWorkout.label);

    var session = activeWorkoutSession.getWorkoutSession();
    var newWorkout = new Workout($scope.selectedWorkout.label);
    session.addWorkout(newWorkout);
    activeWorkout.setWorkout(newWorkout);

    console.log(activeWorkoutSession.getWorkoutSession());
  };
})

;
