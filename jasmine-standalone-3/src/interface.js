var thermostat = new Thermostat();
set_events()
update_temperature()
update_energy_usage()
update_psm()

function update_temperature() {
  document.getElementById('temperature').innerHTML = thermostat.currentTemperature();
}

function update_energy_usage() {
  document.getElementById('energy-usage').innerHTML = thermostat.currentEnergyUsage();
  if (document.getElementById('energy-usage').innerHTML == 'Low') {
    document.getElementById('energy-usage').classList.add('low')
    document.getElementById('energy-usage').classList.remove('medium')
    document.getElementById('energy-usage').classList.remove('high')
  }else if (document.getElementById('energy-usage').innerHTML == 'Medium') {
    document.getElementById('energy-usage').classList.add('medium')
    document.getElementById('energy-usage').classList.remove('low')
    document.getElementById('energy-usage').classList.remove('high')
  }else if (document.getElementById('energy-usage').innerHTML == 'High') {
    document.getElementById('energy-usage').classList.add('high')
    document.getElementById('energy-usage').classList.remove('medium')
    document.getElementById('energy-usage').classList.remove('low')
  }
}

function update_psm() {
  if (thermostat.psmTurnedOn() == true) {
    document.getElementById('psm').innerHTML = 'On';
    document.getElementById('psm').classList.add('psm_on')
    document.getElementById('psm').classList.remove('psm_off')
  }else {
    document.getElementById('psm').innerHTML = 'Off';
    document.getElementById('psm').classList.add('psm_off')
    document.getElementById('psm').classList.remove('psm_on')
  }
}

function temperature_up() {
  thermostat.up()
  update_temperature()
  update_energy_usage()
}

function temperature_down() {
  thermostat.down()
  update_temperature()
  update_energy_usage()
}

function temperature_reset() {
  thermostat.reset()
  update_temperature()
  update_energy_usage()
}

function temperature_psm_toggle() {
  thermostat.psmToggle()
  update_temperature()
  update_energy_usage()
  update_psm()
}

function set_events() {

  document.getElementById('temp-up').addEventListener('click',this.temperature_up.bind(this))
  document.getElementById('temp-down').addEventListener('click',this.temperature_down.bind(this))
  document.getElementById('temp-reset').addEventListener('click',this.temperature_reset.bind(this))
  document.getElementById('psm_toggle').addEventListener('click',this.temperature_psm_toggle.bind(this))
  
}