"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoSPARQLFunctions = void 0;

var _rdfDataFactory = require("rdf-data-factory");

var _wktParser = require("./wkt-parser");

var DF = new _rdfDataFactory.DataFactory();
var geoSPARQLFunctions = {
  // geosf:distance(p1, p2, decimals)
  'http://www.opengis.net/def/function/geosparql/distance': function httpWwwOpengisNetDefFunctionGeosparqlDistance(args) {
    var decimals = args[2] != undefined ? parseFloat(args[2].value) : 8;

    if (args[0].termType === 'Literal' && args[1].termType === 'Literal') {
      var p1 = (0, _wktParser.parseWKT)(args[0].value);
      var p2 = (0, _wktParser.parseWKT)(args[1].value);

      if (p1 && p2) {
        if (p1.type == _wktParser.geometryType.POINT && p2.type == _wktParser.geometryType.POINT) {
          var a = p1.coordinates[0] - p2.coordinates[0];
          var b = p1.coordinates[1] - p2.coordinates[1];
          var c = p1.coordinates[2] - p2.coordinates[2];
          var d = round(Math.sqrt(a * a + b * b + c * c), decimals); // if(p1.length == 2 && p2.length == 2){
          // } 

          return DF.literal(d.toString(), DF.namedNode('http://www.w3.org/2001/XMLSchema#decimal'));
        }
      }
    }

    return DF.literal("ERROR");
  },
  // geosf:sfWithin(p1, p2, decimals)
  'http://www.opengis.net/def/function/geosparql/inside': function httpWwwOpengisNetDefFunctionGeosparqlInside(args) {
    var decimals = args[2] != undefined ? parseFloat(args[2].value) : 8;

    if (args[0].termType === 'Literal' && args[1].termType === 'Literal') {
      var p1 = (0, _wktParser.parseWKT)(args[0].value);
      var p2 = (0, _wktParser.parseWKT)(args[1].value);

      if (p1 && p2) {
        if (p1.type == _wktParser.geometryType.POINT && p2.type == _wktParser.geometryType.POINT) {
          var a = p1.coordinates[0] - p2.coordinates[0];
          var b = p1.coordinates[1] - p2.coordinates[1];
          var c = p1.coordinates[2] - p2.coordinates[2];
          var d = round(Math.sqrt(a * a + b * b + c * c), decimals); // if(p1.length == 2 && p2.length == 2){
          // } 

          return DF.literal(d.toString(), DF.namedNode('http://www.w3.org/2001/XMLSchema#decimal'));
        }
      }
    }

    return DF.literal("ERROR");
  }
};
exports.geoSPARQLFunctions = geoSPARQLFunctions;

function round(num) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Math.round(num * Math.pow(10, decimals) + Number.EPSILON) / Math.pow(10, decimals);
}
//# sourceMappingURL=index.js.map