angular.module('ARVeo.services', [])

.factory('Moodstocks', function($rootScope, $q){
  var deferred;
  var $scope;
	var openSuccess = function(msg){
    console.log("Open success");
    MoodstocksPlugin.sync(null, syncInProgress, syncFinished, syncFailure);
  }
  var openFailure = function(msg){
    console.log("Open fail");
    deferred.reject("Scanner open failed "+msg);
  }
  var syncInProgress = function(progress){
    console.log("Syncing..."+progress);
  }
  var syncFinished = function(msg){
    deferred.resolve("Sync finished");
  }
  var syncFailure = function(msg){
    deferred.reject("Sync failed");
  }
  var init = function(){
    deferred = $q.defer();
    MoodstocksPlugin.open(openSuccess, openFailure);
    return deferred.promise;
  }
  var scanSuccess = function(format, value){
    console.log(format, value);
    deferred.resolve(value);
    $scope.scanOpen();
    /*
    MoodstocksPlugin.dismiss(function(){
      console.log(format, value);
      deferred.resolve(value);
    }, null);
    */
  }
  var scanCancelled = function(){
    console.log("Scan Cancelled", $scope);
    deferred.reject("Scan Cancelled");
    $scope.scanClose();
  }
  var scanFailure = function(msg){
    console.log(msg);
    deferred.reject(msg);
    $scope.scanClose();
  }
  var scan = function(scope){
    $scope = scope;
    console.log($scope);
    var scanOptions = {
      image: true,
      ean8: false,
      ean13: false,
      qrcode: false,
      dmtx: false
    },
    scanFlags = {
      useDeviceOrientation: true,
      noPartialMatching: false,
      smallTargetSuport: true
    };
    deferred = $q.defer();
    MoodstocksPlugin.scan(scanSuccess, scanCancelled, scanFailure, scanOptions, scanFlags);
    return deferred.promise;
  }
  var dismiss = function(){
    MoodstocksPlugin.dismiss(null, null);
  }
  return {
  	init: init,
    scan: scan,
    cancel: dismiss
  }
})