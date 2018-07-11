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
        console.log(status, result);
        if(status == "OK"){
            directionsDisplay.setDirections(result);
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

    return true;
    // FUCK EM --> USE DIRECTIONS API INSTEAD
    // var map;
    // var src = 'http://chananbos.com/pinkball/premadeRoutes/directionsPool1.kml';

    // var kmlLayer = new google.maps.KmlLayer(src, {
    //     suppressInfoWindows: true,
    //     preserveViewport: true,
    //     map: map
    // });

    // kmlLayer.addListener('click', function(event) {
    //     var content = event.featureData.infoWindowHtml;
    //     var testimonial = document.getElementById('capture');
    //     testimonial.innerHTML = content;
    // });
}