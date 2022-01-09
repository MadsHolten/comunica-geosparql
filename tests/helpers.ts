import { newEngine } from '@comunica/actor-init-sparql';
import { geoSPARQLFunctions } from '../src/index';

export async function executeSelectQuery(query: string): Promise<any>{
    const engine = newEngine();
    return await engine.query(query, {
        extensionFunctions: geoSPARQLFunctions
    });
}

export async function returnFirst(qRes: any, varName: string){
    return new Promise((resolve, reject) => {
        qRes.bindingsStream.on('data', (binding) => {
            const b = binding.get(varName);
            let val = b.value;

            // Handle decimal
            if(b.datatype != undefined && b.datatype.value == 'http://www.w3.org/2001/XMLSchema#decimal'){
                val = parseFloat(val);
            }

            // Handle boolean
            if(b.datatype != undefined && b.datatype.value == 'http://www.w3.org/2001/XMLSchema#boolean'){
                val = val == "true" ? true : false;
            }

            resolve(val);
        });
        qRes.bindingsStream.on('error', (err) => {
            reject(err);
        });
    })
}