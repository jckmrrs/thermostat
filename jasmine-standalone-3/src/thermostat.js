"use strict";

function Thermostat() {
  this.MIN_TEMP = 10;
  this.maxTemp = 25;
  this.temp = 20;
  this.psmIsOn = true;
};

Thermostat.prototype.up = function(delta = 1) {
  if (delta <= 0) throw new Error("Up must be called with a value greater than 0");
  if (this.currentTemperature() + delta > this.maxTemp) throw new Error(`Temperature cannot go above ${this.maxTemp}`);
  this.temp += delta;
};

Thermostat.prototype.down = function(delta = 1 ) {
  if (delta <= 0) throw new Error("Down must be called with a value greater than 0");
  if (this.currentTemperature() - delta < this.MIN_TEMP) throw new Error("Temperature cannot go below 10");
  this.temp -= delta;
};

Thermostat.prototype.psmToggle = function() {
  this.psmIsOn = !(this.psmIsOn);
  this.maxTemp = this.psmTurnedOn() == true ? 25 : 32;
}

Thermostat.prototype.reset = function() {
  this.temp = 20;
}

Thermostat.prototype.currentEnergyUsage = function() {
  return this.currentTemperature() < 18 ? 'low-usage' : this.currentTemperature() <= 25 ? 'medium-usage' : 'high-usage';
}

Thermostat.prototype.psmTurnedOn = function() {
  return this.psmIsOn
}

Thermostat.prototype.currentTemperature = function() {
  return this.temp
}
