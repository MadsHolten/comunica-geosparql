import { DataFactory } from "rdf-data-factory";
import type * as RDF from '@rdfjs/types';
import { geometryType, parseWKT } from "./wkt-parser";
import pointInPolygon from "point-in-polygon";

const DF = new DataFactory();

export const geoSPARQLFunctions = {

    // geosf:distance(p1, p2, decimals)
    'http://www.opengis.net/def/function/geosparql/distance'(args: RDF.Term[]) {
        const decimals = args[2] != undefined ? parseFloat(args[2].value) : 8;
        if (args[0].termType === 'Literal' && args[1].termType === 'Literal') {
            const p1 = parseWKT(args[0].value);
            const p2 = parseWKT(args[1].value);

            if(p1 && p2 && p1.value && p2.value){

                const a = p1.value[0] - p2.value[0];
                const b = p1.value[1] - p2.value[1];
                let d: number;

                if(p1.type == geometryType.POINT && p2.type == geometryType.POINT){
                    d = round(Math.sqrt(a * a + b * b), decimals);
                }

                if(p1.type == geometryType.POINTZ && p2.type == geometryType.POINTZ){
                    const c = p1.value[2] - p2.value[2];
                    d = round(Math.sqrt(a * a + b * b + c * c), decimals);
                }

                return DF.literal(d.toString(), DF.namedNode('http://www.w3.org/2001/XMLSchema#decimal'));
                
            }
            
        }
        return DF.literal("ERROR");
        
    },

    // geosf:inside(point, polygon)
    'http://www.opengis.net/def/function/geosparql/inside'(args: RDF.Term[]) {
        const decimals = args[2] != undefined ? parseFloat(args[2].value) : 8;
        if (args[0].termType === 'Literal' && args[1].termType === 'Literal') {
            const point = parseWKT(args[0].value);
            const polygon = parseWKT(args[1].value);

            if(point && polygon && point.value && polygon.value.length){

                if(polygon.type == geometryType.POLYGON){

                    const pg = polygon.value;
                    let p: number[] = point.value;

                    if(point.type == geometryType.POINTZ){
                        // Pop last item to make XY instead of XYZ
                        p.pop();
                    }
                    
                    const inside = pointInPolygon(p, pg);
                    return DF.literal(inside.toString(), DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'));

                }
                
            }
            
        }
        return DF.literal("ERROR");
        
    }

}

function round(num: number, decimals: number = 0): number{
    return Math.round( num * (10 ** decimals) + Number.EPSILON ) / (10 ** decimals);
}