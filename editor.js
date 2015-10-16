var app = angular.module('vision-sync', []);

app.controller('visionSyncController', ["$scope", function($scope){
  // get the data from local sync
  chrome.storage.sync.get(function(data){
    console.log(data);
    $scope.data = data;
    // since we're in a callback outside the realm of which angular is aware
    // we need to let angular know that we've modified something on $scope so
    // it can update the UI
    $scope.$apply();
  });

  // this update the data on the page
  chrome.storage.onChanged.addListener(function (changes, areaName) {
    $scope.data.items = changes.items.newValue;
    $scope.$apply();
  });


}]);
