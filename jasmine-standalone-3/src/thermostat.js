"use strict";

class Thermostat {
  constructor() {
    this.MIN_TEMP = 10;
    this.maxTemp = 25;
    this.temp = 20;
    this.psmIsOn = true;
  }
  up(delta = 1) {
    if (delta <= 0)
      throw new Error("Up must be called with a value greater than 0");
    if (this.currentTemperature() + delta > this.maxTemp)
      throw new Error(`Temperature cannot go above ${this.maxTemp}`);
    this.temp += delta;
    return this.currentTemperature();
  }
  down(delta = 1) {
    if (delta <= 0)
      throw new Error("Down must be called with a value greater than 0");
    if (this.currentTemperature() - delta < this.MIN_TEMP)
      throw new Error("Temperature cannot go below 10");
    this.temp -= delta;
    return this.currentTemperature();
  }
  psmToggle() {
    this.psmIsOn = !(this.psmIsOn);
    this.maxTemp = this.psmTurnedOn() == true ? 25 : 32;
  }
  reset() {
    this.temp = 20;
  }
  currentEnergyUsage() {
    return this.currentTemperature() < 18 ? 'low-usage' : this.currentTemperature() <= 25 ? 'medium-usage' : 'high-usage';
  }
  psmTurnedOn() {
    return this.psmIsOn;
  }
  currentTemperature() {
    return String(this.temp);
  }
};








function myFunction() {
	alert("onclick() called");
}
