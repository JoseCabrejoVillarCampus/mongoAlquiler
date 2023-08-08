import { MongoClient } from "mongodb";

const uri ="mongodb+srv://cabre920903:onepiece@clusterdb.hicawdu.mongodb.net/"

let db;

export async function connect(){

    try {
        const client = new MongoClient(uri, {useUnifiedTopology:true})
        console.log("Se ha establecido la conexión");
        db = client.db(process.env.ATLAS_DB);
    } catch (error) {
        console.error("Error al establecer la conexión");
        throw error;
    }    
}

export function getDB() {
    if (!db) {
        throw new Error('La conexión a la base de datos no ha sido establecida.');
    }
    return db;
} 

export async function closeDatabase() {
    if (db) {
        await db.client.close();
        console.log('Conexión a la base de datos cerrada.');
    }
}