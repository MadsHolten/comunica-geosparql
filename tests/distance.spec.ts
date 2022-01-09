import { executeSelectQuery, returnFirst } from "./helpers";

describe('Distance', () => {

    test('should return error if not using points', async () => {

        const query = `
        PREFIX geosf: <http://www.opengis.net/def/function/geosparql/>
        SELECT ?d
        WHERE{
            BIND("XX(0 0 0)" AS ?p1)
            BIND("POINT Z(1 1 1)" AS ?p2)
            BIND(geosf:distance(?p1, ?p2, 3) AS ?d)
        }`;

        const qRes = await executeSelectQuery(query);
        const sRes = await returnFirst(qRes, "?d");

        expect(sRes).toBe("ERROR");
    })

    test('should return correct distance between two XY points', async () => {

        const query = `
        PREFIX geosf: <http://www.opengis.net/def/function/geosparql/>
        SELECT ?d
        WHERE{
            BIND("POINT(0 0)" AS ?p1)
            BIND("POINT(1 1)" AS ?p2)
            BIND(geosf:distance(?p1, ?p2, 3) AS ?d)
        }`;

        const qRes = await executeSelectQuery(query);
        const sRes = await returnFirst(qRes, "?d");

        expect(sRes).toBe(1.414);
    })

    test('should return correct distance between two XYZ points', async () => {

        const query = `
        PREFIX geosf: <http://www.opengis.net/def/function/geosparql/>
        SELECT ?d
        WHERE{
            BIND("POINT Z(0 0 0)" AS ?p1)
            BIND("POINT Z(1 1 1)" AS ?p2)
            BIND(geosf:distance(?p1, ?p2, 3) AS ?d)
        }`;

        const qRes = await executeSelectQuery(query);
        const sRes = await returnFirst(qRes, "?d");

        expect(sRes).toBe(1.732);
    })

});