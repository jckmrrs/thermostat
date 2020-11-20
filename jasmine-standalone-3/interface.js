$(document).ready(function() {
  let endpoint = 'http://api.openweathermap.org/data/2.5/weather?q='
  let apiKey = '&appid=ffdee33ee43b3154807ccd18142ac90c'
  var thermostat = new Thermostat();
  reload();

  $('#temp-up').on('click', function() { // event listener
    thermostat.up(); // update model
    reload(); // update view
  });

  $('#temp-down').on('click', function() {
    thermostat.down();
    reload();
  });

  $('#temp-reset').on('click', function() {
    thermostat.reset();
    reload();
  });

  $('#psm').on('click', function() {
    thermostat.psmToggle();
    // $('#psm').text('ON');
    reload();
  });

  displayWeather('london');

  $("#citySelect").submit(function(){
    event.preventDefault();
      var city = $("#cityText").val();
      displayWeather(city);
  });

  function displayWeather(city) {
    $.get(endpoint + city + apiKey, function(data) {
      $('#weather').text((data.main.temp - 273.15).toFixed(2))
    });
    $('#cityName').text(city[0].toUpperCase() + city.substring(1).toLowerCase());
  };

  function reload() {
    $('#temperature').text(thermostat.currentTemperature());
    $('#energy-usage').text(thermostat.currentEnergyUsage());
    $('#psm-status').text(thermostat.psmTurnedOn() ? 'On' : 'Off');
    $('#mainDiv').css('background-color', energies[thermostat.currentEnergyUsage()]);
  };

});
