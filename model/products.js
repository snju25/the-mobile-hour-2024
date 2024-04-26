import { db_conn } from "../database.js";

export function newProduct(
    id,
    name,
    model,
    manufacturer,
    price,
    feature_id,
    stock,
    description,
    last_updated_by_staff_id
) {
    return {
        id,
        name,
        model,
        manufacturer,
        price,
        feature_id,
        stock,
        description,
        last_updated_by_staff_id
    }
}

// create

export function create(product) {
    return db_conn.query(`
    INSERT INTO products
    (product_name,product_model,product_manufacturer,product_price,product_feature_id,product_stock,product_description,product_last_updated_by_staff_id)
    VALUES ( ? , ? , ? , ? , ? , ? , ? , ?)
    `,
        [
            product.name,
            product.model,
            product.manufacturer,
            product.price,
            product.feature_id,
            product.stock,
            product.description,
            product.last_updated_by_staff_id
        ]
    )
}

// read

export function getAll() {
    return db_conn.query("SELECT * FROM products WHERE deleted_product = 0")
        .then(([queryResult]) => {
            return queryResult.map(
                result => newProduct(
                    result.product_id,
                    result.product_name,
                    result.product_model,
                    result.product_manufacturer,
                    result.product_price,
                    result.product_feature_id,
                    result.product_stock,
                    result.product_description,
                    result.product_last_updated_by_staff_id

                )

            )
        })
}

export function getById(productId) {
    return db_conn.query(`
    SELECT * FROM products WHERE product_id = ?`, [productId])
        .then(([queryResult]) => {
            if (queryResult.length > 0) {
                const result = queryResult[0]
                return newProduct(
                    result.product_id,
                    result.product_name,
                    result.product_model,
                    result.product_manufacturer,
                    result.product_price,
                    result.product_feature_id,
                    result.product_stock,
                    result.product_description,
                    result.product_last_updated_by_staff_id
                )
            }
            else {
                return Promise.reject("no matching results")
            }
        })

}

export function getBySearch(searchTerm) {
    return db_conn.query(
        "SELECT * FROM products WHERE deleted_product = 0 AND (product_name LIKE ? OR product_description LIKE ?)",
        [`%${searchTerm}%`, `%${searchTerm}%`]
    ).then(([queryResult]) => {
        return queryResult.map(
            result => newProduct(
                result.product_id,
                result.product_name,
                result.product_model,
                result.product_manufacturer,
                result.product_price,
                result.product_feature_id,
                result.product_stock,
                result.product_description,
                result.product_last_updated_by_staff_id
            )
        )
    })
}


// Sort by Price accending
export function sortByLowToHighPrice(){
    return db_conn.query('SELECT * FROM products WHERE deleted_product=0 ORDER BY product_price')
    .then(([queryResult]) => {
        return queryResult.map(
            result => newProduct(
                result.product_id,
                result.product_name,
                result.product_model,
                result.product_manufacturer,
                result.product_price,
                result.product_feature_id,
                result.product_stock,
                result.product_description,
                result.product_last_updated_by_staff_id

            )

        )
    })
}


export function sortByHighToLowPrice(){
    return db_conn.query('SELECT * FROM products WHERE deleted_product=0 ORDER BY product_price DESC')
    .then(([queryResult]) => {
        return queryResult.map(
            result => newProduct(
                result.product_id,
                result.product_name,
                result.product_model,
                result.product_manufacturer,
                result.product_price,
                result.product_feature_id,
                result.product_stock,
                result.product_description,
                result.product_last_updated_by_staff_id

            )

        )
    })
}

// Filter by brand
export function filterByBrand(brand) {
    return db_conn
      .query('SELECT * FROM products WHERE deleted_product=0 AND (product_manufacturer = ?)', [brand])
      .then(([queryResult]) => {
        return queryResult.map((result) =>
          newProduct(
            result.product_id,
            result.product_name,
            result.product_model,
            result.product_manufacturer,
            result.product_price,
            result.product_feature_id,
            result.product_stock,
            result.product_description,
            result.product_last_updated_by_staff_id
          )
        );
      });
  }

// Update

export function update(product) {
    return db_conn.query(
        `UPDATE products 
        SET 
        product_name = ?,
        product_model = ?,
        product_manufacturer = ?,
        product_price = ?,
        product_feature_id = ?,
        product_stock = ?,
        product_description = ?,
        product_last_updated_by_staff_id = ?
        WHERE 	product_id = ?
        `,
        [
            product.name,
            product.model,
            product.manufacturer,
            product.price,
            product.feature_id,
            product.stock,
            product.description,
            product.last_updated_by_staff_id,
            product.id
        
        ]
    );
}


// delete

export function deleteById(productID) {
    return db_conn.query("UPDATE products SET deleted_product = 1 WHERE product_id=?",[productID]
    );
}