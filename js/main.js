$(document).ready(function(){
  /* make map height from bottom of nav to bottom of page */
  // var windowHeight = $( window ).height();
  // var navHeight = $(".navbar").height();
  // $("#map").css( "height", windowHeight - navHeight);

  /* Print location search from input */
  function handleKeyPress(e){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that rusn

        alert("Enter was pressed was presses");
    }
  }
  var printSearchInput = function () {
    var value = $("#pac-input").val();
    $("#searchResultText").bindTo(value);
  };

  $("#locationSearch").click(printSearchInput);

  $("#locationSearchForm").keypress(function(event) {
    if (event.keyCode == 13) {
           printSearchInput();
    }
  });

  // datapicker
  $('#datepicker').datepicker();
})


/* Google Maps */
function initialize() {

    var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.425057, lng: -86.911447},
          zoom: 12,
          scrollwheel: false,
          draggable: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var input = /** @type {!HTMLInputElement} */(
            document.getElementById('pac-input'));

        var types = document.getElementById('type-selector');
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          }));
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
          infowindow.open(map, marker);
        });

}