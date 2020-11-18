function Thermostat() {
  this.minTemp = 10;
  this.maxTemp = 25;
  this.temp = 20;
  this.psmIsOn = true;
};

Thermostat.prototype.up = function(delta) {
  if (delta <= 0) throw new Error("Up must be called with a value greater than 0");
  if (this.temp + delta > this.maxTemp) throw new Error(`Temperature cannot go above ${this.maxTemp}`);
  this.temp += delta;
};

Thermostat.prototype.down = function(delta) {
  if (delta <= 0) throw new Error("Down must be called with a value greater than 0");
  if (this.temp - delta < this.minTemp) throw new Error("Temperature cannot go below 10");
  this.temp -= delta;
};

Thermostat.prototype.psmToggle = function() {
  this.psmIsOn = !(this.psmIsOn);
  this.maxTemp = this.psmIsOn == true ? 25 : 32;
}

Thermostat.prototype.reset = function() {
  this.temp = 20;
}

Thermostat.prototype.currentEnergyUsage = function() {
  return this.temp < 18 ? 'low-usage' : this.temp <= 25 ? 'medium-usage' : 'high-usage';
}
