import { executeSelectQuery, returnFirst } from "./helpers";

describe('Inside', () => {

    test('should be able to identify a point inside a non-donut polygon', async () => {

        const query = `
        PREFIX geosf: <http://www.opengis.net/def/function/geosparql/>
        SELECT ?inside
        WHERE{
            BIND("POINT(1.5 1.5)" AS ?point)
            BIND("POLYGON (1 1, 1 2, 2 2, 2 1)" AS ?polygon)
            BIND(geosf:inside(?point, ?polygon) AS ?inside)
        }`;

        const qRes = await executeSelectQuery(query);
        const sRes = await returnFirst(qRes, "?inside");

        expect(sRes).toBe(true);
    })

    test('should be able to identify a point outside a non-donut polygon', async () => {

        const query = `
        PREFIX geosf: <http://www.opengis.net/def/function/geosparql/>
        SELECT ?inside
        WHERE{
            BIND("POINT Z(4.9 1.2 1.0)" AS ?point)
            BIND("POLYGON (1 1, 1 2, 2 2, 2 1)" AS ?polygon)
            BIND(geosf:inside(?point, ?polygon) AS ?inside)
        }`;

        const qRes = await executeSelectQuery(query);
        const sRes = await returnFirst(qRes, "?inside");

        expect(sRes).toBe(false);
    })

    test('should be able to identify a point inside a donut polygon', async () => {

        const query = `
        PREFIX geosf: <http://www.opengis.net/def/function/geosparql/>
        SELECT ?inside
        WHERE{
            BIND("POINT(0 1)" AS ?point)
            BIND("POLYGON ((35 10, 45 45, 15 40, 10 20, 35 10),(20 30, 35 35, 30 20, 20 30))" AS ?polygon)
            BIND(geosf:inside(?point, ?polygon) AS ?inside)
        }`;

        // NB! Not yet supported
        const qRes = await executeSelectQuery(query);
        const sRes = await returnFirst(qRes, "?inside");
        console.log(sRes);

        expect(sRes).toBe("ERROR");
    })

});