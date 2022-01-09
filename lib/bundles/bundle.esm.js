var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var rdfDataFactory = {};

var BlankNode$1 = {};

Object.defineProperty(BlankNode$1, "__esModule", { value: true });
BlankNode$1.BlankNode = void 0;
/**
 * A term that represents an RDF blank node with a label.
 */
class BlankNode {
    constructor(value) {
        this.termType = 'BlankNode';
        this.value = value;
    }
    equals(other) {
        return !!other && other.termType === 'BlankNode' && other.value === this.value;
    }
}
BlankNode$1.BlankNode = BlankNode;

var DataFactory$1 = {};

var DefaultGraph$1 = {};

Object.defineProperty(DefaultGraph$1, "__esModule", { value: true });
DefaultGraph$1.DefaultGraph = void 0;
/**
 * A singleton term instance that represents the default graph.
 * It's only allowed to assign a DefaultGraph to the .graph property of a Quad.
 */
class DefaultGraph {
    constructor() {
        this.termType = 'DefaultGraph';
        this.value = '';
        // Private constructor
    }
    equals(other) {
        return !!other && other.termType === 'DefaultGraph';
    }
}
DefaultGraph$1.DefaultGraph = DefaultGraph;
DefaultGraph.INSTANCE = new DefaultGraph();

var Literal$1 = {};

var NamedNode$1 = {};

Object.defineProperty(NamedNode$1, "__esModule", { value: true });
NamedNode$1.NamedNode = void 0;
/**
 * A term that contains an IRI.
 */
class NamedNode {
    constructor(value) {
        this.termType = 'NamedNode';
        this.value = value;
    }
    equals(other) {
        return !!other && other.termType === 'NamedNode' && other.value === this.value;
    }
}
NamedNode$1.NamedNode = NamedNode;

Object.defineProperty(Literal$1, "__esModule", { value: true });
Literal$1.Literal = void 0;
const NamedNode_1$1 = NamedNode$1;
/**
 * A term that represents an RDF literal, containing a string with an optional language tag or datatype.
 */
class Literal {
    constructor(value, languageOrDatatype) {
        this.termType = 'Literal';
        this.value = value;
        if (typeof languageOrDatatype === 'string') {
            this.language = languageOrDatatype;
            this.datatype = Literal.RDF_LANGUAGE_STRING;
        }
        else if (languageOrDatatype) {
            this.language = '';
            this.datatype = languageOrDatatype;
        }
        else {
            this.language = '';
            this.datatype = Literal.XSD_STRING;
        }
    }
    equals(other) {
        return !!other && other.termType === 'Literal' && other.value === this.value &&
            other.language === this.language && other.datatype.equals(this.datatype);
    }
}
Literal$1.Literal = Literal;
Literal.RDF_LANGUAGE_STRING = new NamedNode_1$1.NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString');
Literal.XSD_STRING = new NamedNode_1$1.NamedNode('http://www.w3.org/2001/XMLSchema#string');

var Quad$1 = {};

Object.defineProperty(Quad$1, "__esModule", { value: true });
Quad$1.Quad = void 0;
/**
 * An instance of DefaultGraph represents the default graph.
 * It's only allowed to assign a DefaultGraph to the .graph property of a Quad.
 */
class Quad {
    constructor(subject, predicate, object, graph) {
        this.termType = 'Quad';
        this.value = '';
        this.subject = subject;
        this.predicate = predicate;
        this.object = object;
        this.graph = graph;
    }
    equals(other) {
        // `|| !other.termType` is for backwards-compatibility with old factories without RDF* support.
        return !!other && (other.termType === 'Quad' || !other.termType) &&
            this.subject.equals(other.subject) &&
            this.predicate.equals(other.predicate) &&
            this.object.equals(other.object) &&
            this.graph.equals(other.graph);
    }
}
Quad$1.Quad = Quad;

var Variable$1 = {};

Object.defineProperty(Variable$1, "__esModule", { value: true });
Variable$1.Variable = void 0;
/**
 * A term that represents a variable.
 */
class Variable {
    constructor(value) {
        this.termType = 'Variable';
        this.value = value;
    }
    equals(other) {
        return !!other && other.termType === 'Variable' && other.value === this.value;
    }
}
Variable$1.Variable = Variable;

Object.defineProperty(DataFactory$1, "__esModule", { value: true });
DataFactory$1.DataFactory = void 0;
const BlankNode_1 = BlankNode$1;
const DefaultGraph_1 = DefaultGraph$1;
const Literal_1 = Literal$1;
const NamedNode_1 = NamedNode$1;
const Quad_1 = Quad$1;
const Variable_1 = Variable$1;
let dataFactoryCounter = 0;
/**
 * A factory for instantiating RDF terms and quads.
 */
class DataFactory {
    constructor(options) {
        this.blankNodeCounter = 0;
        options = options || {};
        this.blankNodePrefix = options.blankNodePrefix || `df_${dataFactoryCounter++}_`;
    }
    /**
     * @param value The IRI for the named node.
     * @return A new instance of NamedNode.
     * @see NamedNode
     */
    namedNode(value) {
        return new NamedNode_1.NamedNode(value);
    }
    /**
     * @param value The optional blank node identifier.
     * @return A new instance of BlankNode.
     *         If the `value` parameter is undefined a new identifier
     *         for the blank node is generated for each call.
     * @see BlankNode
     */
    blankNode(value) {
        return new BlankNode_1.BlankNode(value || `${this.blankNodePrefix}${this.blankNodeCounter++}`);
    }
    /**
     * @param value              The literal value.
     * @param languageOrDatatype The optional language or datatype.
     *                           If `languageOrDatatype` is a NamedNode,
     *                           then it is used for the value of `NamedNode.datatype`.
     *                           Otherwise `languageOrDatatype` is used for the value
     *                           of `NamedNode.language`.
     * @return A new instance of Literal.
     * @see Literal
     */
    literal(value, languageOrDatatype) {
        return new Literal_1.Literal(value, languageOrDatatype);
    }
    /**
     * This method is optional.
     * @param value The variable name
     * @return A new instance of Variable.
     * @see Variable
     */
    variable(value) {
        return new Variable_1.Variable(value);
    }
    /**
     * @return An instance of DefaultGraph.
     */
    defaultGraph() {
        return DefaultGraph_1.DefaultGraph.INSTANCE;
    }
    /**
     * @param subject   The quad subject term.
     * @param predicate The quad predicate term.
     * @param object    The quad object term.
     * @param graph     The quad graph term.
     * @return A new instance of Quad.
     * @see Quad
     */
    quad(subject, predicate, object, graph) {
        return new Quad_1.Quad(subject, predicate, object, graph || this.defaultGraph());
    }
    /**
     * Create a deep copy of the given term using this data factory.
     * @param original An RDF term.
     * @return A deep copy of the given term.
     */
    fromTerm(original) {
        // TODO: remove nasty any casts when this TS bug has been fixed:
        //  https://github.com/microsoft/TypeScript/issues/26933
        switch (original.termType) {
            case 'NamedNode':
                return this.namedNode(original.value);
            case 'BlankNode':
                return this.blankNode(original.value);
            case 'Literal':
                if (original.language) {
                    return this.literal(original.value, original.language);
                }
                if (!original.datatype.equals(Literal_1.Literal.XSD_STRING)) {
                    return this.literal(original.value, this.fromTerm(original.datatype));
                }
                return this.literal(original.value);
            case 'Variable':
                return this.variable(original.value);
            case 'DefaultGraph':
                return this.defaultGraph();
            case 'Quad':
                return this.quad(this.fromTerm(original.subject), this.fromTerm(original.predicate), this.fromTerm(original.object), this.fromTerm(original.graph));
        }
    }
    /**
     * Create a deep copy of the given quad using this data factory.
     * @param original An RDF quad.
     * @return A deep copy of the given quad.
     */
    fromQuad(original) {
        return this.fromTerm(original);
    }
    /**
     * Reset the internal blank node counter.
     */
    resetBlankNodeCounter() {
        this.blankNodeCounter = 0;
    }
}
DataFactory$1.DataFactory = DataFactory;

(function (exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(BlankNode$1, exports);
__exportStar(DataFactory$1, exports);
__exportStar(DefaultGraph$1, exports);
__exportStar(Literal$1, exports);
__exportStar(NamedNode$1, exports);
__exportStar(Quad$1, exports);
__exportStar(Variable$1, exports);

}(rdfDataFactory));

var geometryType;

(function (geometryType) {
  geometryType["POINT"] = "point";
})(geometryType || (geometryType = {}));

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

var DF = new rdfDataFactory.DataFactory();
var geoSPARQLFunctions = {
  // geosf:distance(p1, p2, decimals)
  'http://www.opengis.net/def/function/geosparql/distance': function httpWwwOpengisNetDefFunctionGeosparqlDistance(args) {
    var decimals = args[2] != undefined ? parseFloat(args[2].value) : 8;

    if (args[0].termType === 'Literal' && args[1].termType === 'Literal') {
      var p1 = parseWKT(args[0].value);
      var p2 = parseWKT(args[1].value);

      if (p1 && p2) {
        if (p1.type == geometryType.POINT && p2.type == geometryType.POINT) {
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
      var p1 = parseWKT(args[0].value);
      var p2 = parseWKT(args[1].value);

      if (p1 && p2) {
        if (p1.type == geometryType.POINT && p2.type == geometryType.POINT) {
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

function round(num) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Math.round(num * Math.pow(10, decimals) + Number.EPSILON) / Math.pow(10, decimals);
}

export { geoSPARQLFunctions };
//# sourceMappingURL=bundle.esm.js.map
