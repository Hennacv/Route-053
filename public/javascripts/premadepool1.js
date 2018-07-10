// General Map Setup
function initMap() {
    var map = new google.maps.Map(document.getElementById('bridge'), {
        center: {lat: 52.219841, lng: 6.896377},
        zoom: 16.6
    });

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

//First Marker
    service.getDetails({
    placeId: 'ChIJHdpjg3MUuEcRU7vwSFdUl-E'
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var iconBase = 'http://retroactivesolutions.com/icons/';
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
           icon: iconBase + 'poolmarker.png'
        });
        //Making Marker Clickable
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(
            '<div><strong>' + place.name + '</strong><br>' +
            '<br>'
            + '<b>Adress:</b>'
            + '<br>'
            + place.formatted_address
            + '<br>'
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
         //End of clickable
      }
    });

// Second Marker
    service.getDetails({
        placeId: 'ChIJY-34S3IUuEcRQInBMslCYjE'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // var iconBase = 'http://retroactivesolutions.com/premadeRoutes/';
			var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location,
			 //  icon: iconBase + 'poolmarker.png'
            });
            //Making Marker Clickable
			google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(
              '<div><strong>' + place.name + '</strong><br>' +
              '<br>'
              + '<b>Adress:</b>'
              + '<br>'
              + place.formatted_address
              + '<br>'
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
			 //End of clickable
          }
        });

    var map;
	var src = 'http://retroactivesolutions.com/Route053/premadeRoutes/directionsPool1.kml';

	var kmlLayer = new google.maps.KmlLayer(src, {
        suppressInfoWindows: true,
        preserveViewport: true,
        map: map
    });

		kmlLayer.addListener('click', function(event) {
    var content = event.featureData.infoWindowHtml;
    var testimonial = document.getElementById('capture');
        testimonial.innerHTML = content;
        });

      }