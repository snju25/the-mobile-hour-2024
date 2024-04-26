import {db_conn} from "../database.js"

export function newStaff(
    id,
    first_name,
    last_name,
    access_role,
    username,
    password
){
    return {
        id,
        first_name,
        last_name,
        access_role,
        username,
        password
    }
}


// create

export function create(staff){
    return db_conn.query(`
    INSERT INTO staff
    (staff_firstName,staff_lastName,staff_role,staff_username,staff_password)
    VALUES(?,?,?,?,?)
    `, [
        staff.first_name,
        staff.last_name,
        staff.access_role,
        staff.username,
        staff.password
    ]);
}

// Read
export function getAll() {
    return db_conn.query(`SELECT * FROM staff`)
        .then(([queryResult])=>{
            return queryResult.map(
                result => newStaff(
                    result.staff_id,
                    result.staff_firstName,
                    result.staff_lastName,
                    result.staff_role,
                    result.staff_username,
                    result.staff_password
                )
            )
        })
}


export function getById(staffId) {
    return db_conn.query(`SELECT * FROM staff WHERE staff_id = ?`,[staffId])
        .then(([queryResult])=>{
            if(queryResult.length > 0){
                const result = queryResult[0]
                return newStaff(
                       result.staff_id,
                       result.staff_firstName,
                       result.staff_lastName,
                       result.staff_role,
                       result.staff_username,
                       result.staff_password
                   )
            }
            else{
                return Promise.reject("no results found")
            }

            
        })
}

export function getByUsername(username) {
    return db_conn.query(`SELECT * FROM staff WHERE staff_username = ?`,[username])
        .then(([queryResult])=>{
            if(queryResult.length > 0){
                const result = queryResult[0]
                return newStaff(
                       result.staff_id,
                       result.staff_firstName,
                       result.staff_lastName,
                       result.staff_role,
                       result.staff_username,
                       result.staff_password
                   )
            }
            else{
                return Promise.reject("no results found")
            }

            
        })
}


// Update
export function Update(staff){
    return db_conn.query(`
    UPDATE staff 
    SET
    staff_firstName=?,
    staff_lastName=?,
    staff_role=? ,
    staff_username= ?,
    staff_password =?
    WHERE staff_id =?
    `,[
        staff.first_name,
        staff.last_name,
        staff.access_role,
        staff.username,
        staff.password,
        staff.id
    ]) 
}


// Delete
export function deleteByID(staffId) {
    return db_conn.query("DELETE FROM staff WHERE staff_id =?",[staffId])
}

