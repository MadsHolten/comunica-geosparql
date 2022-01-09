"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geometryType = void 0;
exports.parseWKT = parseWKT;
var geometryType;
exports.geometryType = geometryType;

(function (geometryType) {
  geometryType["POINT"] = "point";
})(geometryType || (exports.geometryType = geometryType = {}));

function parseWKT(wktString) {
  wktString = wktString.toLocaleLowerCase();

  if (wktString.startsWith("point")) {
    var coordinates = parsePoint(wktString);
    return {
      coordinates: coordinates,
      type: geometryType.POINT
    };
  }
}

function parsePoint(wktString) {
  var point = wktString.split("(")[1].split(")")[0].trim(); // Ex ["0 0 0"]

  return point.split(" ").map(function (p) {
    return parseFloat(p);
  });
}
//# sourceMappingURL=wkt-parser.js.map