var expect = require('expect');
var request = require("request");

var url = "http://localhost:3000/";

describe('Main page', function(){

  it("returns status 200", function(done) {
    request(url, function(error, response, body) {
      // expect(response).toNotExist();
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it("contains special word", function(done) {
    request(url, function(error, response, body) {
      expect(body).toInclude('Ihor');
      done();
    });
  });

});
