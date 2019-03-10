angular.module('app').controller('PostsCtrl', function($rootScope, $scope, $document){
$rootScope.India = {lat:22.5619491, lng: 85.364927};
$rootScope.map = new google.maps.Map($document[0].getElementById('map'), {
    center: $rootScope.India,
    zoom: 4
});
$rootScope.infoWindow;
$rootScope.service;
$rootScope.loc = {
    lat: 0,
    lng: 0
};


$scope.find_pin = function(){
    $scope.input_placeholder = "enter what you are looking for - restaurant/ food/ cafe/ bar";
    var address = $scope.pin;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            $rootScope.loc.lat = results[0].geometry.location.lat();
            $rootScope.loc.lng = results[0].geometry.location.lng();
        }
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
};

    $scope.find_l = function(){
        //console.log($rootScope.India);

        $scope.input_placeholder = "enter what you are looking for - restaurant/ food/ cafe/ bar";

        $rootScope.infoWindow = new google.maps.InfoWindow({map: $rootScope.map});

        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude

            };
            $rootScope.infoWindow.setPosition(pos);
            $rootScope.infoWindow.setContent('Location found.');
            $rootScope.map.setCenter(pos);
            $rootScope.map.setZoom(12);

            $rootScope.loc.lat = pos.lat;
            $rootScope.loc.lng = pos.lng;

        }, function() {
            handleLocationError(true, $rootScope.infoWindow,$rootScope.map.getCenter());
        }, {enableHighAccuracy:true});
    };

    $scope.find_r = function(){
        clat = $rootScope.loc.lat;
        clng = $rootScope.loc.lng;
        //console.log(clat);
        //console.log(clng);
        $rootScope.service = new google.maps.places.PlacesService($rootScope.map);
        $rootScope.service.nearbySearch({
            location: {lat:clat, lng:clng},
            radius: 5000,
            type: $scope.r_type,
        }, callback);

    };
    function callback(results, status) {
        var c;
        console.log(results);
        $document[0].getElementById('results').style.visibility = "visible";
        if (status === google.maps.places.PlacesServiceStatus.OK) {
                $scope.route = results
        }

        $scope.$apply();

        var td = $document[0].getElementsByTagName('td');
        console.log(td);
        var count = 0;
        for(count = 0; count < td.length; count++){
            if(!td[count].innerHTML){
                td[count].innerHTML = "NA";
            }

        }


    };
});
