"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoSPARQLFunctions = void 0;

var _rdfDataFactory = require("rdf-data-factory");

var _wktParser = require("./wkt-parser");

const DF = new _rdfDataFactory.DataFactory();
const geoSPARQLFunctions = {
  // geosf:distance(p1, p2, decimals)
  'http://www.opengis.net/def/function/geosparql/distance'(args) {
    const decimals = args[2] != undefined ? parseFloat(args[2].value) : 8;

    if (args[0].termType === 'Literal' && args[1].termType === 'Literal') {
      const p1 = (0, _wktParser.parseWKT)(args[0].value);
      const p2 = (0, _wktParser.parseWKT)(args[1].value);

      if (p1 && p2) {
        if (p1.type == _wktParser.geometryType.POINT && p2.type == _wktParser.geometryType.POINT) {
          const a = p1.coordinates[0] - p2.coordinates[0];
          const b = p1.coordinates[1] - p2.coordinates[1];
          const c = p1.coordinates[2] - p2.coordinates[2];
          const d = round(Math.sqrt(a * a + b * b + c * c), decimals); // if(p1.length == 2 && p2.length == 2){
          // } 

          return DF.literal(d.toString(), DF.namedNode('http://www.w3.org/2001/XMLSchema#decimal'));
        }
      }
    }

    return DF.literal("ERROR");
  },

  // geosf:sfWithin(p1, p2, decimals)
  'http://www.opengis.net/def/function/geosparql/inside'(args) {
    const decimals = args[2] != undefined ? parseFloat(args[2].value) : 8;

    if (args[0].termType === 'Literal' && args[1].termType === 'Literal') {
      const p1 = (0, _wktParser.parseWKT)(args[0].value);
      const p2 = (0, _wktParser.parseWKT)(args[1].value);

      if (p1 && p2) {
        if (p1.type == _wktParser.geometryType.POINT && p2.type == _wktParser.geometryType.POINT) {
          const a = p1.coordinates[0] - p2.coordinates[0];
          const b = p1.coordinates[1] - p2.coordinates[1];
          const c = p1.coordinates[2] - p2.coordinates[2];
          const d = round(Math.sqrt(a * a + b * b + c * c), decimals); // if(p1.length == 2 && p2.length == 2){
          // } 

          return DF.literal(d.toString(), DF.namedNode('http://www.w3.org/2001/XMLSchema#decimal'));
        }
      }
    }

    return DF.literal("ERROR");
  }

};
exports.geoSPARQLFunctions = geoSPARQLFunctions;

function round(num, decimals = 0) {
  return Math.round(num * 10 ** decimals + Number.EPSILON) / 10 ** decimals;
}
//# sourceMappingURL=index.js.map