import * as rdf_data_factory from 'rdf-data-factory';
import * as RDF from '@rdfjs/types';

declare const geoSPARQLFunctions: {
    'http://www.opengis.net/def/function/geosparql/distance'(args: RDF.Term[]): rdf_data_factory.Literal;
    'http://www.opengis.net/def/function/geosparql/inside'(args: RDF.Term[]): rdf_data_factory.Literal;
};

export { geoSPARQLFunctions };
