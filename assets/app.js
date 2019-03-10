angular.module('app', [
        'ngRoute'
])

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

angular.module('app')
.controller('ApplicationCtrl', function($scope){
        $scope.$on('login', function(_,user){
                $scope.currentUser = user
                
        })
})

angular.module('app')
        .config(function($routeProvider){

                $routeProvider
                        .when('/', {controller: 'PostsCtrl', templateUrl: 'posts.html' })
                        .when('/register', {controller: 'RegisterCtrl', templateUrl: 'register.html' })
                        .when('/login', {controller: 'LoginCtrl', templateUrl: 'login.html' })
        })

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsInBvc3RzLmN0cmwuanMiLCJhcHBsaWNhdGlvbi5jdHJsLmpzIiwicm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcclxuICAgICAgICAnbmdSb3V0ZSdcclxuXSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmNvbnRyb2xsZXIoJ1Bvc3RzQ3RybCcsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzY29wZSwgJGRvY3VtZW50KXtcclxuJHJvb3RTY29wZS5JbmRpYSA9IHtsYXQ6MjIuNTYxOTQ5MSwgbG5nOiA4NS4zNjQ5Mjd9O1xyXG4kcm9vdFNjb3BlLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoJGRvY3VtZW50WzBdLmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgY2VudGVyOiAkcm9vdFNjb3BlLkluZGlhLFxyXG4gICAgem9vbTogNFxyXG59KTtcclxuJHJvb3RTY29wZS5pbmZvV2luZG93O1xyXG4kcm9vdFNjb3BlLnNlcnZpY2U7XHJcbiRyb290U2NvcGUubG9jID0ge1xyXG4gICAgbGF0OiAwLFxyXG4gICAgbG5nOiAwXHJcbn07XHJcblxyXG5cclxuJHNjb3BlLmZpbmRfcGluID0gZnVuY3Rpb24oKXtcclxuICAgICRzY29wZS5pbnB1dF9wbGFjZWhvbGRlciA9IFwiZW50ZXIgd2hhdCB5b3UgYXJlIGxvb2tpbmcgZm9yIC0gcmVzdGF1cmFudC8gZm9vZC8gY2FmZS8gYmFyXCI7XHJcbiAgICB2YXIgYWRkcmVzcyA9ICRzY29wZS5waW47XHJcbiAgICB2YXIgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcclxuICAgIGdlb2NvZGVyLmdlb2NvZGUoeyAnYWRkcmVzcyc6IGFkZHJlc3N9LCBmdW5jdGlvbihyZXN1bHRzLCBzdGF0dXMpIHtcclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmxvYy5sYXQgPSByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmxvYy5sbmcgPSByZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJHZW9jb2RlIHdhcyBub3Qgc3VjY2Vzc2Z1bCBmb3IgdGhlIGZvbGxvd2luZyByZWFzb246IFwiICsgc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbiAgICAkc2NvcGUuZmluZF9sID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCRyb290U2NvcGUuSW5kaWEpO1xyXG5cclxuICAgICAgICAkc2NvcGUuaW5wdXRfcGxhY2Vob2xkZXIgPSBcImVudGVyIHdoYXQgeW91IGFyZSBsb29raW5nIGZvciAtIHJlc3RhdXJhbnQvIGZvb2QvIGNhZmUvIGJhclwiO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLmluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7bWFwOiAkcm9vdFNjb3BlLm1hcH0pO1xyXG5cclxuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSB7XHJcbiAgICAgICAgICAgICAgICBsYXQ6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgIGxuZzogcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZVxyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5pbmZvV2luZG93LnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuaW5mb1dpbmRvdy5zZXRDb250ZW50KCdMb2NhdGlvbiBmb3VuZC4nKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5tYXAuc2V0Q2VudGVyKHBvcyk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUubWFwLnNldFpvb20oMTIpO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS5sb2MubGF0ID0gcG9zLmxhdDtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5sb2MubG5nID0gcG9zLmxuZztcclxuXHJcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZUxvY2F0aW9uRXJyb3IodHJ1ZSwgJHJvb3RTY29wZS5pbmZvV2luZG93LCRyb290U2NvcGUubWFwLmdldENlbnRlcigpKTtcclxuICAgICAgICB9LCB7ZW5hYmxlSGlnaEFjY3VyYWN5OnRydWV9KTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmZpbmRfciA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2xhdCA9ICRyb290U2NvcGUubG9jLmxhdDtcclxuICAgICAgICBjbG5nID0gJHJvb3RTY29wZS5sb2MubG5nO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coY2xhdCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjbG5nKTtcclxuICAgICAgICAkcm9vdFNjb3BlLnNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UoJHJvb3RTY29wZS5tYXApO1xyXG4gICAgICAgICRyb290U2NvcGUuc2VydmljZS5uZWFyYnlTZWFyY2goe1xyXG4gICAgICAgICAgICBsb2NhdGlvbjoge2xhdDpjbGF0LCBsbmc6Y2xuZ30sXHJcbiAgICAgICAgICAgIHJhZGl1czogNTAwMCxcclxuICAgICAgICAgICAgdHlwZTogJHNjb3BlLnJfdHlwZSxcclxuICAgICAgICB9LCBjYWxsYmFjayk7XHJcblxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKHJlc3VsdHMsIHN0YXR1cykge1xyXG4gICAgICAgIHZhciBjO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMpO1xyXG4gICAgICAgICRkb2N1bWVudFswXS5nZXRFbGVtZW50QnlJZCgncmVzdWx0cycpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VzU2VydmljZVN0YXR1cy5PSykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnJvdXRlID0gcmVzdWx0c1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICB2YXIgdGQgPSAkZG9jdW1lbnRbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RkJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGQpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yKGNvdW50ID0gMDsgY291bnQgPCB0ZC5sZW5ndGg7IGNvdW50Kyspe1xyXG4gICAgICAgICAgICBpZighdGRbY291bnRdLmlubmVySFRNTCl7XHJcbiAgICAgICAgICAgICAgICB0ZFtjb3VudF0uaW5uZXJIVE1MID0gXCJOQVwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfTtcclxufSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxyXG4uY29udHJvbGxlcignQXBwbGljYXRpb25DdHJsJywgZnVuY3Rpb24oJHNjb3BlKXtcclxuICAgICAgICAkc2NvcGUuJG9uKCdsb2dpbicsIGZ1bmN0aW9uKF8sdXNlcil7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY3VycmVudFVzZXIgPSB1c2VyXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKXtcclxuXHJcbiAgICAgICAgICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAud2hlbignLycsIHtjb250cm9sbGVyOiAnUG9zdHNDdHJsJywgdGVtcGxhdGVVcmw6ICdwb3N0cy5odG1sJyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAud2hlbignL3JlZ2lzdGVyJywge2NvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnLCB0ZW1wbGF0ZVVybDogJ3JlZ2lzdGVyLmh0bWwnIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aGVuKCcvbG9naW4nLCB7Y29udHJvbGxlcjogJ0xvZ2luQ3RybCcsIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcgfSlcclxuICAgICAgICB9KVxyXG4iXX0=
