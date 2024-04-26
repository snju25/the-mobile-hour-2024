import { db_conn } from "../database.js";

export function newProductFeatures(
    product_id,
    product_name,
    product_model,
    product_manufacturer,
    product_price,
    product_feature_id,
    product_stock,
    product_description,
    feature_id,
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

        product_id,
        product_name,
        product_model,
        product_manufacturer,
        product_price,
        product_feature_id,
        product_stock,
        product_description,
        feature_id,
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
        front_camera,

    }
}


export function getById(productID){
    return db_conn.query(`
    SELECT *
    FROM products 
    INNER JOIN feature
    ON products.product_feature_id = feature.feature_id 
    WHERE products.product_id = ?
    `,
    [productID])
    .then(([queryResult])=> {
        if(queryResult.length > 0) {
            const result = queryResult[0]
            return newProductFeatures (
                result.product_id,
                result.product_name,
                result.product_model,
                result.product_manufacturer,
                result.product_price,
                result.product_feature_id,
                result.product_stock,
                result.product_description,
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
