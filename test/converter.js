var expect    = require("chai").expect;
var converter = require("../converter");

describe("Color Code Converter", function() {

  describe("RGB to Hex conversion", function() {
    it("converts the basic colors", function() {
        expect("ff0000").to.equal("ff0000");
        // expect(blue).to.deep.equal([0, 0, 255]);
    });
  });

});
