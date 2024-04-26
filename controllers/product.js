import express, { response } from "express";
import access_control from "../access_control.js";
import * as Products from "../model/products.js"
import * as changelog from "../model/changelog.js"
import * as ProductStaff from "../model/products_staff.js"
import * as Features from "../model/feature.js"
import validator from "validator";


const productController = express.Router();

// Endpoints
productController.get("/product_list",(req,res)=>{
    if(req.query.search_term){
        Products.getBySearch(req.query.search_term).then(products => {
            res.status(200).render("products_list.ejs", {products})
        }).catch(error =>{
            res.status(500).send("An error happened!" + error)
        })

    } else if (req.query.sort === "Low_price") {
        // Sort products by price
        Products.sortByLowToHighPrice()
          .then((products) => {
            res.status(200).render("products_list.ejs", { products });
          })
          .catch((error) => {
            res.status(500).send("An error happened!" + error);
          });
          
      } else if (req.query.sort === "High_price") {
        // Sort products by price
        Products.sortByHighToLowPrice()
          .then((products) => {
            res.status(200).render("products_list.ejs", { products });
          })
          .catch((error) => {
            res.status(500).send("An error happened!" + error);
          });
          
      }else if (req.query.brand) {
        // Filter products by brand
        Products.filterByBrand(req.query.brand)
          .then((products) => {
            res.status(200).render("products_list.ejs", { products });
          })
          .catch((error) => {
            res.status(500).send("An error happened!" + error);
          });

      } else {
        Products.getAll().then(products => {
            res.status(200).render("products_list.ejs", {products})
        }).catch(error =>{
            res.status(500).send("An error happened!" + error)
        })

    }

})

productController.get('/product_checkout',(req,res)=>{
    // Check if there is a selected product in the url
    if(req.query.id){
        // load that products details of the selected products
        Products.getById(req.query.id).then(product =>{
            // render checkout page view with selected product
            res.render('product_checkout.ejs',{product})
            
        }).catch(error =>{
            res.status(500).send("An error happened!" + error)
        })
    } 


})

productController.get(
    "/product_admin",
    access_control(["manager", "stock","sales"]),
    (request, response) => {
        const editID = request.query.edit_id;
        if (editID) {
            Products.getById(editID).then(editProduct => {

                ProductStaff.getAll().then(productsStaff => {
                    Features.getAll().then(features => {
                        response.render("edit_product.ejs", {
                            productsStaff,
                            editProduct,
                            features,
                            accessRole: request.session.user.accessRole,
                        });
                    });
                });
            }).catch(error => {
                response.render("status.ejs", {
                    status: "Edit product not found",
                    message: error
                });
            })
        }else {
            ProductStaff.getAll().then(productsStaff => {
                response.render("admin_products.ejs", {
                    productsStaff,
                    editProduct: Products.newProduct(0, "", "", "","" ,"" ,"","",""),
                    accessRole: request.session.user.accessRole,
                
                });
            });
        }
    }
);

productController.post(
    "/edit_product",
    access_control(["manager", "stock","sales"]),
    (request, response) => {
        const formData = request.body

        if (!/[0-9]{1,}/.test(formData.product_id)) {
            response.render("status.ejs", {
                status: "Invalid product ID",
                message: "Please pick another product.",
            });
            return;
        }
        if (!/[a-zA-Z-]{2,}/.test(formData.name)) {
            response.render("status.ejs", {
                status: "Invalid Product name",
                message: "Product name must be letters",
            });
            return;
        }
        if (!/^[a-zA-Z0-9\s-]*$/.test(formData.model)) {
            response.render("status.ejs", {
                status: "Invalid model",
                message: "Model must contain letters, numbers, spaces, and hyphens.",
            });
            return;
        }
        if (!/[a-zA-Z-]{2,}/.test(formData.manufacturer)) {
            response.render("status.ejs", {
                status: "Invalid manufacturer name",
                message: "Manufacturer name must be letters",
            });
            return;
        }
        if (!/^\d+(\.\d{2})?$/.test(formData.price)) {
            response.render("status.ejs", {
                status: "Invalid price",
                message: "Price must be a valid number with up to two decimal places.",
            });
            return;
        }
       
        if (!/^\d+$/.test(formData.stock)) {
            response.render("status.ejs", {
                status: "Invalid stock",
                message: "Stock must be a positive integer.",
            });
            return;
        }
        if (!/^[\s\S]*$/.test(formData.description)) {
            response.render("status.ejs", {
                status: "Invalid description",
                message: "Description is not valid.",
            });
            return;
        }

        const editedProduct = Products.newProduct(
            validator.escape(formData.product_id),
            validator.escape(formData.name), 
            validator.escape(formData.model), 
            validator.escape(formData.manufacturer), 
            validator.escape(formData.price),
            validator.escape(formData.feature_id),
            validator.escape(formData.stock),
            validator.escape(formData.description),  
            request.session.user.staffID

        )

        if (formData.action == "create") {
            Products.create(editedProduct).then(([result]) => {
                response.redirect("/product_admin");
            });
        } else if (formData.action === "update") {
            Products.update(editedProduct).then(([result]) => {
                response.redirect("/product_admin");
            }).catch(error => console.log("this is the error: " + error ));
        } else if (formData.action === "delete") {
            Products.deleteById(editedProduct.id).then(([result]) => {
                response.redirect("/product_admin");
            }).catch(error => console.log("this is the error: " + error ));;
        }
        // Change Log  entry for editing products
        const userEditChangelogEntry = changelog.newProductChangelog(
            null,
            null,
            editedProduct.id,
            request.session.user.staffID,
            "User " + formData.action + "d product with id " +  editedProduct.id
        )
        changelog.create(userEditChangelogEntry).catch(error=>{
            console.log("Failed to add to change log: " + userEditChangelogEntry)
        })
    }
);

productController.post("/create_product",
access_control(["manager", "stock","sales"]),
(request,response)=>{
    const formData = request.body

 
    if (!/[a-zA-Z-]{2,}/.test(formData.name)) {
        response.render("status.ejs", {
            status: "Invalid Product name",
            message: "Product name must be letters",
        });
        return;
    }
    if (!/^[a-zA-Z0-9\s-]*$/.test(formData.model)) {
        response.render("status.ejs", {
            status: "Invalid model",
            message: "Model must contain letters, numbers, spaces, and hyphens.",
        });
        return;
    }
    if (!/[a-zA-Z-]{2,}/.test(formData.manufacturer)) {
        response.render("status.ejs", {
            status: "Invalid manufacturer name",
            message: "Manufacturer name must be letters",
        });
        return;
    }
    if (!/^\d+(\.\d{2})?$/.test(formData.price)) {
        response.render("status.ejs", {
            status: "Invalid price",
            message: "Price must be a valid number with up to two decimal places.",
        });
        return;
    }
    
    if (!/^\d+$/.test(formData.stock)) {
        response.render("status.ejs", {
            status: "Invalid stock",
            message: "Stock must be a positive integer.",
        });
        return;
    }
    if (!/^[\s\S]*$/.test(formData.description)) {
        response.render("status.ejs", {
            status: "Invalid description",
            message: "Description is not valid.",
        });
        return;
    }

    const newProduct = Products.newProduct(
        null,
        validator.escape(formData.name),
        validator.escape(formData.model),
        validator.escape(formData.manufacturer),
        validator.escape(formData.price),
        validator.escape(formData.feature_id),
        validator.escape(formData.stock),
        validator.escape(formData.description),
        request.session.user.staffID
    )

    // Create the product first to get its ID
    Products.create(newProduct)
        .then(([result]) => {
            // Now that you have the product ID, create the changelog entry
            const userCreateChangelogEntry = changelog.newProductChangelog(
                null,
                null,
                result.insertId, // Use the product ID obtained from the insert result
                request.session.user.staffID,
                "User " + formData.action + "d product with id " + result.insertId
            );

            changelog.create(userCreateChangelogEntry)
                .then(() => {
                    response.redirect("/product_admin");
                })
                .catch((error) => {
                    console.log("Failed to add to change log: " + error);
                });
        })
        .catch((error) => {
            console.log("Failed to create a new product: " + error);
        });
}
)


productController.get("/create_product", (req, res) => {
    Features.getAll() 
        .then((features) => {
            res.render("create_product.ejs", {
                features: features, // Pass the features to the EJS template
                accessRole: req.session.user.accessRole,
            });
        })
        .catch((error) => {
            res.status(500).send("An error happened: " + error);
        });
});







export default productController







