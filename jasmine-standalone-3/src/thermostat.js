"use strict";

class Thermostat {
  constructor() {
    this.MIN_TEMP = 10;
    this._maxTemp = 25;
    this._temp = 20;
    this._psmIsOn = true;
  }

  up(delta = 1) {
    if (delta <= 0)
      throw new Error("Up must be called with a value greater than 0");
    if (this.currentTemperature() + delta > this._maxTemp)
      throw new Error(`Temperature cannot go above ${this._maxTemp}`);
    this._temp += delta;
    return this.currentTemperature();
  }

  down(delta = 1) {
    if (delta <= 0)
      throw new Error("Down must be called with a value greater than 0");
    if (this.currentTemperature() - delta < this.MIN_TEMP)
      throw new Error("Temperature cannot go below 10");
    this._temp -= delta;
    return this.currentTemperature();
  }

  psmToggle() {
    this._psmIsOn = !(this._psmIsOn);
    this._maxTemp = this.psmTurnedOn() == true ? 25 : 32;
  }

  reset() {
    this._temp = 20;
  }

  currentEnergyUsage() {
    return this.currentTemperature() < 18 ? 'Low' : this.currentTemperature() <= 25 ? 'Medium' : 'High';
  }

  psmTurnedOn() {
    return this._psmIsOn;
  }

  currentTemperature() {
    return this._temp;
  }

};

function myFunction() {
	alert("onclick() called");
}
