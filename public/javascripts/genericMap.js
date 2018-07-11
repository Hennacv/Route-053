// General Map Setup
var map;
var laLigna = "ChIJY-34S3IUuEcRQInBMslCYjE"
var laLignaLatLng = { lat: 52.2202142, lng: 6.89785119999999 }

function initMap(id, destination) {
    map = new google.maps.Map(document.getElementById(id), {
        center: {lat: 52.219841, lng: 6.896377},
        zoom: 16.6
    });
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    var request = {
        origin: laLignaLatLng,
        destination: destination.location,
        travelMode: "WALKING"
    }

    directionsService.route(request, function(result, status){
        if(status == "OK"){
            directionsDisplay.setDirections(result);
        } else {
            console.error("WAYPOINTS MAP ERROR:", result, status)
        }
    })

    directionsDisplay.setMap(map);

    //First Marker
    service.getDetails({
        placeId: destination.placeId
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var iconBase = 'http://chananbos.com/pinkball/icons/';
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                // icon: iconBase + 'icon-poolen.png'
            });
            //Making Marker Clickable
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(
                    '<div><strong>' + place.name + '</strong><br>' +
                    '<br>'
                    + '<b>Adress:</b>'
                    + '<br>'
                    + place.formatted_address
                    + '</div>'
                    + '<br>'
                    + '<b>Opening Times:</b>'
                    + '<br>'
                    + place.opening_hours.weekday_text[0]
                    + '<br>'
                    + place.opening_hours.weekday_text[1]
                    + '<br>'
                    + place.opening_hours.weekday_text[2]
                    + '<br>'
                    + place.opening_hours.weekday_text[3]
                    + '<br>'
                    + place.opening_hours.weekday_text[4]
                    + '<br>'
                    + place.opening_hours.weekday_text[5]
                    + '<br>'
                    + place.opening_hours.weekday_text[6]
                );
                infowindow.open(map, this);
            });
        }
    });

    // Second Marker
    service.getDetails({
        placeId: laLigna
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var iconBase = 'http://chananbos.com/pinkball/icons/';
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                //  icon: iconBase + 'poolmarker.png'
            });

            google.maps.event.addListener(marker, 'click', function() {
                if(place.opening_hours){
                    infowindow.setContent(
                        '<div><strong>' + place.name + '</strong><br>' +
                        '<br>'
                        + '<b>Adress:</b>'
                        + '<br>'
                        + place.formatted_address
                        + '</div>'
                        + '<br>'
                        + '<b>Opening Times:</b>'
                        + '<br>'
                        + place.opening_hours.weekday_text[0]
                        + '<br>'
                        + place.opening_hours.weekday_text[1]
                        + '<br>'
                        + place.opening_hours.weekday_text[2]
                        + '<br>'
                        + place.opening_hours.weekday_text[3]
                        + '<br>'
                        + place.opening_hours.weekday_text[4]
                        + '<br>'
                        + place.opening_hours.weekday_text[5]
                        + '<br>'
                        + place.opening_hours.weekday_text[6]
                    );
                    infowindow.open(map, this);
                } else {
                    infowindow.setContent(
                        '<div><strong>' + place.name + '</strong><br>' +
                        '<br>'
                        + '<b>Adress:</b>'
                        + '<br>'
                        + place.formatted_address
                    );
                    infowindow.open(map, this);
                }
            });
        }
    });

    return true;
}

function createWayPointsMap(id, waypoints, markers) {
    map = new google.maps.Map(document.getElementById(id), {
        center: {lat: 52.219841, lng: 6.896377},
        zoom: 16.6
    });
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    var request = {
        origin: laLignaLatLng,
        destination: waypoints[1].location,
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: "WALKING"
    }

    directionsService.route(request, function(result, status){
        if(status == "OK"){
            directionsDisplay.setDirections(result);
        } else {
            console.error("WAYPOINTS MAP ERROR:", result, status)
        }
    })

    directionsDisplay.setMap(map);

    for(let i = 0; i < markers.length; i++){
        service.getDetails({
            placeId: markers[i]
        }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var iconBase = 'http://chananbos.com/pinkball/icons/';
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    // icon: iconBase + 'icon-poolen.png'
                });
                google.maps.event.addListener(marker, 'click', function() {
                    if(place.opening_hours){
                        infowindow.setContent(
                            '<div><strong>' + place.name + '</strong><br>' +
                            '<br>'
                            + '<b>Adress:</b>'
                            + '<br>'
                            + place.formatted_address
                            + '</div>'
                            + '<br>'
                            + '<b>Opening Times:</b>'
                            + '<br>'
                            + place.opening_hours.weekday_text[0]
                            + '<br>'
                            + place.opening_hours.weekday_text[1]
                            + '<br>'
                            + place.opening_hours.weekday_text[2]
                            + '<br>'
                            + place.opening_hours.weekday_text[3]
                            + '<br>'
                            + place.opening_hours.weekday_text[4]
                            + '<br>'
                            + place.opening_hours.weekday_text[5]
                            + '<br>'
                            + place.opening_hours.weekday_text[6]
                        );
                        infowindow.open(map, this);
                    } else {
                        infowindow.setContent(
                            '<div><strong>' + place.name + '</strong><br>' +
                            '<br>'
                            + '<b>Adress:</b>'
                            + '<br>'
                            + place.formatted_address
                        );
                        infowindow.open(map, this);
                    }
                });
            }
        });
    }

    return true;
}