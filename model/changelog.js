import { db_conn } from "../database.js";

export function newChangelog(
    id,
    date,
    productName,
    staffUsername,
    message
) {
    return {
        id,
        date,
        productName,
        staffUsername,
        message
    };
}
export function newProductChangelog(
    id,
    date,
    product_id,
    staff_id,
    message
) {

    return {
        id,
        date,
        product_id,
        staff_id,
        message
    }
}
// // create
export function create(changelog) {
    return db_conn.query(`
    INSERT INTO changelog 
    (changeLog_date,changeLog_product_id,changeLog_staff_id,changeLog_message)
    VALUES (now(),?,?,?)
    `, [
        changelog.product_id,
        changelog.staff_id,
        changelog.message
    ])
}
// Read
export function getAll(){
    return db_conn.query(`
    SELECT 
        c.changeLog_id,
        c.changeLog_date,
        p.product_name,
        s.staff_username,
        c.changeLog_message
    FROM 
        changelog c
    INNER JOIN products p ON c.changeLog_product_id = p.product_id
    INNER JOIN staff s ON c.changeLog_staff_id = s.staff_id
    `)
    .then(([queryResult])=>{
        return queryResult.map(
            result => newChangelog(
                result.changeLog_id,
                result.changeLog_date,
                result.product_name,
                result.staff_username,
                result.changeLog_message
            )
        );
    });
}