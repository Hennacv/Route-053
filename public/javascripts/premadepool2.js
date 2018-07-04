// General Map Setup
function initMap() {
    var map = new google.maps.Map(document.getElementById('snpc'), {
        center: {lat: 52.219841, lng: 6.896377},
        zoom: 16.6
    });

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

//First Marker
    service.getDetails({
    placeId: 'ChIJ3TIlNHEUuEcRo7vTQKW0QDY'
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var iconBase = 'http://retroactivesolutions.com/premadeMapForPool2/';
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
           icon: iconBase + 'poolmarker.png'
        });
        //Making Marker Clickable
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Place ID: '
            + place.place_id
            + '<br>'
            + '<br>'
            + '<b>Adress:</b>'
            + '<br>'
            + place.formatted_address
            + '</div>'
            + '<br>'
            + '<b>T-Mobile is an electronics store</b>'
            + '<br>'
            + 'Opening Times:'
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
            var iconBase = 'http://retroactivesolutions.com/premadeMapForPool2/';
			var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location,
			 //  icon: iconBase + 'poolmarker.png'
            });
            //Making Marker Clickable
			google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: '
				+ place.place_id
				+ '<br>'
				+ '<br>'
				+ '<b>Adress:</b>'
				+ '<br>'
				+ place.formatted_address
				+ '</div>'
				+ '<br>'
				+ '<b>T-Mobile is an electronics store</b>'
				+ '<br>'
				+ 'Opening Times:'
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
	var src = 'http://retroactivesolutions.com/premadeMapForPool2/directionsPool2.kml';

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