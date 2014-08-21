/* jshint camelcase:false */
/*global google:true */

(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addTreasure);
  });

  function addTreasure(e){
    var lat   = $('#lat').val();

    if(!lat){
      var name = $('#loc').val();
      geocode(name);
      e.preventDefault();
    }
  }

  function geocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address}, function(results, status){
      var name = results[0].formatted_address,
          lat  = results[0].geometry.location.lat(),
          lng  = results[0].geometry.location.lng();

      $('#loc').val(name);
      $('#lat').val(lat);
      $('#lng').val(lng);
      console.log('THIS IS NAME', name);

      $('form').submit();
    });
  }

})();
