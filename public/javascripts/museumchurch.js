// General Map Setup
function initMap() {
    var map = new google.maps.Map(document.getElementById('musch'), {
      center: {lat: 52.219841, lng: 6.896377},
      zoom: 16.6
    });
  //Until here
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails(
      {
     placeId: 'ChIJ4wC4knMUuEcRnuCafwrxE78'
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK)
        {
       var iconBase = 'http://retroactivesolutions.com/premadeRoutes/icons';
             var marker = new google.maps.Marker(
            {
              map: map,
              position: place.geometry.location,
                   icon: iconBase + 'icon-kerk.png'
            });
          google.maps.event.addListener(marker, 'click', function()
            {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + '<br>' + '<b>Adress:</b>' + '<br>' + place.formatted_address + '</div>' + '<br>' + '<b>Opening Times:</b>' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1] + '<br>' + place.opening_hours.weekday_text[2] + '<br>' + place.opening_hours.weekday_text[3] + '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
            infowindow.open(map, this);
                });
              }
      });
      service.getDetails(
        {
       placeId: 'ChIJJ9Q0lnMUuEcRl_ZA1_i-df8'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK)
          {
         var iconBase = 'http://retroactivesolutions.com/premadeRoutes/icons';
               var marker = new google.maps.Marker(
              {
                map: map,
                position: place.geometry.location,
                     icon: iconBase + 'icon-kerk.png'
              });
            google.maps.event.addListener(marker, 'click', function()
              {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + '<br>' + '<b>Adress:</b>' + '<br>' + place.formatted_address + '</div>' + '<br>' + '<b>Opening Times:</b>' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1] + '<br>' + place.opening_hours.weekday_text[2] + '<br>' + place.opening_hours.weekday_text[3] + '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
              infowindow.open(map, this);
                  });
                }
        });


          service.getDetails(
            {
           placeId: 'ChIJRwShv3MUuEcRiY0kMa6o4pU'
            }, function(place, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK)
              {
             var iconBase = 'http://retroactivesolutions.com/premadeRoutes/icons';
             var marker = new google.maps.Marker(
                  {
                    map: map,
                    position: place.geometry.location,
                     icon: iconBase + 'icon-theater.png'
                  });
                google.maps.event.addListener(marker, 'click', function()
                  {
                  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + '<br>' + '<b>Adress:</b>' + '<br>' + place.formatted_address + '</div>' + '<br>' + '<b>Opening Times:</b>' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1] + '<br>' + place.opening_hours.weekday_text[2] + '<br>' + place.opening_hours.weekday_text[3] + '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
                  infowindow.open(map, this);
                  });
              }
            });

            service.getDetails(
              {
             placeId: 'ChIJA9-59nMUuEcR19Ysq2DhDOc'
              }, function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK)
                {
               var iconBase = 'http://retroactivesolutions.com/premadeRoutes/icons';
               var marker = new google.maps.Marker(
                    {
                      map: map,
                      position: place.geometry.location,
                       icon: iconBase + 'icon-theater.png'
                    });
                  google.maps.event.addListener(marker, 'click', function()
                    {
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + '<br>' + '<b>Adress:</b>' + '<br>' + place.formatted_address + '</div>' + '<br>' + '<b>Opening Times:</b>' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1] + '<br>' + place.opening_hours.weekday_text[2] + '<br>' + place.opening_hours.weekday_text[3] + '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
                    infowindow.open(map, this);
                    });
                }
              });

              service.getDetails(
                {
               placeId: 'ChIJRR7jwXMUuEcRsul020B8jP8'
                }, function(place, status) {
                  if (status === google.maps.places.PlacesServiceStatus.OK)
                  {
                 var iconBase = 'http://retroactivesolutions.com/premadeRoutes/icons';
                 var marker = new google.maps.Marker(
                      {
                        map: map,
                        position: place.geometry.location,
                         icon: iconBase + 'icon-theater.png'
                      });
                    google.maps.event.addListener(marker, 'click', function()
                      {
                      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + '<br>' + '<b>Adress:</b>' + '<br>' + place.formatted_address + '</div>' + '<br>' + '<b>Opening Times:</b>' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1] + '<br>' + place.opening_hours.weekday_text[2] + '<br>' + place.opening_hours.weekday_text[3] + '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
                      infowindow.open(map, this);
                      });
                  }
                });


  service.getDetails(
    {
    placeId: 'ChIJY-34S3IUuEcRQInBMslCYjE'
    }, function(place, status)
    {
      if (status === google.maps.places.PlacesServiceStatus.OK)
      {
        var iconBase = 'http://retroactivesolutions.com/premadeRoutes/icons';

           var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
            });
        //Making Marker Clickable
           google.maps.event.addListener(marker, 'click', function()
         {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 'Place ID: '	+ place.place_id + '<br>' + '<br>' + '<b>Adress:</b>' + '<br>' + place.formatted_address + '</div>' + '<br>' + 'Opening Times:' + '<br>' + place.opening_hours.weekday_text[0] + '<br>' + place.opening_hours.weekday_text[1] + '<br>' + place.opening_hours.weekday_text[2] + '<br>' + '<br>' + place.opening_hours.weekday_text[4] + '<br>' + place.opening_hours.weekday_text[5] + '<br>' + place.opening_hours.weekday_text[6]);
          infowindow.open(map, this);
             });
               //End of clickable
      }
    });

     var map; 
    var src = 'http://retroactivesolutions.com/premadeRoutes/Culture/directionsTheaterChurch.kml';

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