export interface WKTGeometry {
    type: geometryType;
    coordinates: any;
}
export declare enum geometryType {
    POINT = "point"
}
export declare function parseWKT(wktString: string): WKTGeometry | null;
//# sourceMappingURL=wkt-parser.d.ts.map