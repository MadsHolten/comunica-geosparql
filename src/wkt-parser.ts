export interface WKTGeometry{
    type: geometryType,
    value: any
}

export enum geometryType{
    POINT="point",
    POINTZ="pointz",
    POLYGON="polygon",
    POLYGONZ="polygonz",
    UNKNOWN="unknown"
}

export const typeMap = {
    "point": geometryType.POINT,
    "pointz": geometryType.POINTZ,
    "polygon": geometryType.POLYGON,
    "polygonz": geometryType.POLYGONZ
}

export function parseWKT(wktString: string): WKTGeometry|null{

    const type = getType(wktString);

    if(type == geometryType.POINT || type == geometryType.POINTZ){
        const coordinates = parsePoint(wktString);
        return {value: coordinates, type}
    }

    if(type == geometryType.POLYGON){
        const coordinates = parsePolygon(wktString);
        return {value: coordinates, type}
    }

}

function getType(wktString: string): geometryType{

    wktString = wktString.toLocaleLowerCase();

    let typeStr: string = wktString.split("(")[0];  // get everything before the paranthesis
    typeStr = typeStr.replace(/\s+/, "");           // remove all white spaces
    
    if(Object.keys(typeMap).indexOf(typeStr) != -1){
        return typeMap[typeStr];
    }

    return geometryType.UNKNOWN;
}

function parsePolygon(wktString: string): number[]{

    let polygon = [];

    // How many parantheses?
    const count = wktString.split("(").length;
    
    // Non-donut polygon
    if(count == 2){
        const points = wktString.split("(")[1].split(")")[0].trim();  // Ex ["0 0 0"]
        points.split(",").map(point => {
            point = point.trim();
            polygon.push(parseStrCoordinate(point));
        });
    }

    // Donut polygon
    else{
        console.log(wktString);
        console.log("Non-donut not yet supported!!");
    }

    return polygon;
}

function parsePoint(wktString: string): number[]{
    const point = wktString.split("(")[1].split(")")[0].trim();  // Ex ["0 0 0"]
    return parseStrCoordinate(point);
}

function parseStrCoordinate(strCoordinate: string): number[]{
    return strCoordinate.split(" ").map(p => parseFloat(p));
}