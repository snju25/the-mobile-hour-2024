import { db_conn } from "../database.js";

export function newOrder (
    number,
    status,
    product_id,
    customer_firstName,
    customer_lastName,
    customer_phone,
    customer_email,
    datetime

) { 
     return {
    number,
    status,
    product_id,
    customer_firstName,
    customer_lastName,
    customer_phone,
    customer_email,
    datetime

}

}

// create

export function create(order){
    return db_conn.query (`
    INSERT INTO orders (order_number,order_status,product_id,customer_firstName,customer_lastName,customer_phone,customer_email,order_datetime)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
        order.number,
        order.status,
        order.product_id,
        order.customer_firstName,
        order.customer_lastName,
        order.customer_phone,
        order.customer_email,
        order.datetime 
    ])
}

// Read

export function getAll(){
    return db_conn.query("SELECT * FROM orders")
    .then(([queryResult])=>{
        return queryResult.map(
            result => newOrder(
                result.order_number,
                result.order_status,
                result.product_id,
                result.customer_firstName,
                result.customer_lastName,
                result.customer_phone,
                result.customer_email,
                result.order_datetime


            )
        )
    })
}

export function getById(orderId){
    return db_conn.query("SELECT * FROM orders WHERE order_number = ?",[orderId])
    .then(([queryResult])=>{
        if(queryResult.length > 0){
            const result = queryResult[0]
            return newOrder(
                    result.order_number,
                    result.order_status,
                    result.product_id,
                    result.customer_firstName,
                    result.customer_lastName,
                    result.customer_phone,
                    result.customer_email,
                    result.order_datetime
    
    
                )
            
        }
        else {
            return Promise.reject("Not Found")
        }


    })
}

// Update

export function updateStatusById(orderID, status) {
    return db_conn.query(
        `
        UPDATE orders
        SET order_status = ?
        WHERE order_number = ?
    `,
        [status, orderID]
    );
}

// delete
export function deleteByID(orderId){
    return db_conn.query ("DELETE from orders where order_number=?", [orderId]);
}