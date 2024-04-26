import { db_conn } from "../database.js";

export function newFeatures(
    id,
    weight,
    dimensions,
    os,
    screen_size,
    resolution,
    cpu,
    ram,
    storage,
    battery,
    rear_camera,
    front_camera

) {
    return {

        id,
        weight,
        dimensions,
        os,
        screen_size,
        resolution,
        cpu,
        ram,
        storage,
        battery,
        rear_camera,
        front_camera
    }
}

// CRUD
// create

export function create(feature){
    return db_conn.query (`
    INSERT INTO feature
    (weight,dimensions,OS,screensize,resolution,CPU,RAM,storage,battery,rear_camera,front_camera)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)
    ` , 
    [
        feature.weight,
        feature.dimensions,
        feature.os,
        feature.screen_size,
        feature.resolution,
        feature.cpu,
        feature.ram,
        feature.storage,
        feature.battery,
        feature.rear_camera,
        feature.front_camera
        
    ])
}

// read
export function getAll(){
    return db_conn.query(`
    SELECT * FROM feature`)
    .then(([queryResult])=>{
        return queryResult.map(
            result => newFeatures(
                result.feature_id,
                result.weight,
                result.dimensions,
                result.OS,
                result.screensize,
                result.resolution,
                result.CPU,
                result.RAM,
                result.storage,
                result.battery,
                result.rear_camera,
                result.front_camera
            )
        )
    })
}

export function getById(featureID){
    return db_conn.query(`
    SELECT * FROM feature WHERE feature_id = ?
    `,[featureID])
    .then(([queryResult])=> {
        if(queryResult.length > 0) {
            const result = queryResult[0]
            return newFeatures (
                result.feature_id,
                result.weight,
                result.dimensions,
                result.OS,
                result.screensize,
                result.resolution,
                result.CPU,
                result.RAM,
                result.storage,
                result.battery,
                result.rear_camera,
                result.front_camera
            )
        } else{
            return Promise.reject("no match found")
        }
    })
}

// 

// update

export function update(feature){
    return db_conn.query(`
    UPDATE feature 
    SET 
    weight = ?,
    dimensions = ?,
    OS = ?,
    screensize = ?,
    resolution = ?,
    CPU = ?,
    RAM = ?,
    storage = ?,
    battery = ?,
    rear_camera = ?,
    front_camera = ?
    WHERE feature_id = ?
    `,
    [
        feature.weight,
        feature.dimensions,
        feature.os,
        feature.screen_size,
        feature.resolution,
        feature.cpu,
        feature.ram,
        feature.storage,
        feature.battery,
        feature.rear_camera,
        feature.front_camera,
        feature.id


    ])

}

// delete

// export function deleteById(featureID) {
//     return db_conn.query("DELETE FROM feature WHERE feature_id = ?", [
//         featureID,
//     ]);
// }
export function deleteById(featureID) {
    // First check if the feature is associated with any products
    return db_conn.query(`
        SELECT COUNT(*) as count 
        FROM feature
        WHERE feature_id = ?
    `, [featureID])
    .then(([results]) => {
        if (results[0].count > 0) {
            // If the feature is associated with a product, throw an error
            const error = new Error('This feature is associated with a product in your database. You can only update it.');
            error.code = 'FEATURE_ASSOCIATED'; // Custom error code
            throw error;
        } else {
            // If the feature is not associated, proceed with the deletion
            return db_conn.query(`
                DELETE FROM feature 
                WHERE feature_id = ?
            `, [featureID]);
        }
    });
}