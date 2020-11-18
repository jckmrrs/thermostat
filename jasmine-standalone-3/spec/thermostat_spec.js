"use strict";

describe("Thermostat", function() {
  
  var thermostat;
  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe("#constructor", function() {
    it(".temp returns the initial temperature of 20 degrees", function() {
      expect(thermostat.currentTemperature()).toEqual(20);
    })
    it(".minTemp returns the initial minimum temperature of 10 degrees", function() {
      expect(thermostat.MIN_TEMP).toEqual(10);
    })
    it(".maxTemp returns the initial maximum temperature of 25 degrees", function() {
      expect(thermostat.psmTurnedOn()).toEqual(true);
      expect(thermostat.maxTemp).toEqual(25);
    })
    it(".psmTurnedOn() is true by default", function() {
      expect(thermostat.psmTurnedOn()).toEqual(true);
    })
  })

  describe("#up", function() {
    it("increases the temperature by 2 degrees", function() {
      var beforeTemp = thermostat.currentTemperature()
      thermostat.up(2)
      expect(thermostat.currentTemperature()).toEqual(beforeTemp + 2)
    })
    it("cannot increase by a 0 or negative temperature", function() {
      expect(function() {thermostat.up(-2)}).toThrowError("Up must be called with a value greater than 0");
    })
    it("cannot increase the temperature beyond the psm max temp", function() {
      var beforeTemp = thermostat.currentTemperature()
      expect(thermostat.psmTurnedOn()).toEqual(true)
      expect(function() {thermostat.up((thermostat.maxTemp - beforeTemp) + 1)}).toThrowError("Temperature cannot go above 25")
    })
    it("cannot increase the temperature beyond the non-psm max temp", function() {
      var beforeTemp = thermostat.currentTemperature()
      thermostat.psmToggle()
      expect(thermostat.psmTurnedOn()).toEqual(false)
      expect(function() {thermostat.up((thermostat.maxTemp - beforeTemp) + 1)}).toThrowError("Temperature cannot go above 32")
    })
    it("increases the temperature by default amount", function() {
      var beforeTemp = thermostat.currentTemperature()
      thermostat.up()
      expect(thermostat.currentTemperature()).toEqual(beforeTemp + 1)
    })
  })

  describe("#down", function() {
    it("decreases the temperature by 2 degrees", function() {
      var beforeTemp = thermostat.currentTemperature()
      thermostat.down(2)
      expect(thermostat.currentTemperature()).toEqual(beforeTemp - 2)
    })
    it("cannot decrease by a 0 or negative temperature", function() {
      expect(function() {thermostat.down(-2)}).toThrowError("Down must be called with a value greater than 0");
    })
    it("cannot drop the temperature below 10", function() {
      var beforeTemp = thermostat.currentTemperature()
      expect(function() {thermostat.down((beforeTemp - thermostat.MIN_TEMP) + 1)}).toThrowError("Temperature cannot go below 10");
    })
    it("decreases the temperature by default amount", function() {
      var beforeTemp = thermostat.currentTemperature()
      thermostat.down()
      expect(thermostat.currentTemperature()).toEqual(beforeTemp - 1)
    })
  })

  describe("#reset", function() {
    it("resets the temperature to 20", function() {
      var beforeTemp = thermostat.currentTemperature()
      thermostat.up(4)
      expect(thermostat.currentTemperature()).toEqual(beforeTemp + 4)
      thermostat.reset()
      expect(thermostat.currentTemperature()).toEqual(20)
    })
  })

  describe("#psmToggle", function() {
    it("turns power saving mode off", function() {
      thermostat.psmToggle()
      expect(thermostat.psmTurnedOn()).toEqual(false);
    })
    it("changes the maximum temperature to 32 when turning off", function() {
      expect(thermostat.maxTemp).toEqual(25)
      thermostat.psmToggle()
      expect(thermostat.maxTemp).toEqual(32)
    })
    it("changes the maximum temperature to 25 when turning on", function() {
      expect(thermostat.maxTemp).toEqual(25)
      thermostat.psmToggle()
      expect(thermostat.maxTemp).toEqual(32)
      thermostat.psmToggle()
      expect(thermostat.maxTemp).toEqual(25)
    })
  })

  describe("#currentEnergyUsage", function() {
    beforeEach(function() {
      var beforeTemp = thermostat.currentTemperature()
    });
    it("returns low usage when temperature is 17", function() {
      thermostat.down((thermostat.currentTemperature() - 18) + 1)
      expect(thermostat.currentTemperature()).toEqual(17)
      expect(thermostat.currentEnergyUsage()).toEqual('low-usage')
    })
    it("returns medium usage when temperature is 18", function() {
      thermostat.down((thermostat.currentTemperature() - 18))
      expect(thermostat.currentTemperature()).toEqual(18)
      expect(thermostat.currentEnergyUsage()).toEqual('medium-usage')
    })
    it("returns medium usage when temperature is 24", function() {
      thermostat.up((25 - thermostat.currentTemperature()) - 1)
      expect(thermostat.currentTemperature()).toEqual(24)
      expect(thermostat.currentEnergyUsage()).toEqual('medium-usage')
    })
    it("returns medium usage when temperature is 25", function() {
      thermostat.up((25 - thermostat.currentTemperature()))
      expect(thermostat.currentTemperature()).toEqual(25)
      expect(thermostat.currentEnergyUsage()).toEqual('medium-usage')
    })
    it("returns high usage when temperature is 26", function() {
      thermostat.psmToggle()
      thermostat.up((26 - thermostat.currentTemperature()))
      expect(thermostat.currentTemperature()).toEqual(26)
      expect(thermostat.currentEnergyUsage()).toEqual('high-usage')
    });
  });
});
