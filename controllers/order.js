import express from "express";
import validator from "validator";
import access_control from "../access_control.js";
import * as OrdersProducts from "../model/orders-product.js";
import * as Orders from "../model/orders.js";
import * as Products from "../model/products.js";

const orderController = express.Router();

orderController.post("/create_order", (request, response) => {
    if (request.body) {
        let formData = request.body;
        console.log(formData)

        // Validation
        if (!/[0-9]{1,}/.test(formData.product_id)) {
            response.render("status.ejs", {
                status: "Invalid product ID",
                message: "Please pick another product.",
            });
            return;
        }

        if (!/[a-zA-Z-]{2,}/.test(formData.customer_first_name)) {
            response.render("status.ejs", {
                status: "Invalid first name",
                message: "First name must be letters",
            });
            return;
        }

        if (!/[a-zA-Z-]{2,}/.test(formData.customer_last_name)) {
            response.render("status.ejs", {
                status: "Invalid last name",
                message: "Last name must be letters",
            });
            return;
        }

        if (
            !/(^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$)/.test(
                formData.customer_phone
            )
        ) {
            response.render("status.ejs", {
                status: "Invalid phone number",
                message: "Please enter a valid australian phone number",
            });
            return;
        }

        if (!/^\S{1,}@\S{1,}[.]\S{1,}$/.test(formData.customer_email)) {
            response.render("status.ejs", {
                status: "Invalid email address",
                message: "Please enter a valid email address",
            });
            return;
        }

        const newOrder = Orders.newOrder(
            null,
            "pending",
            validator.escape(formData.product_id),
            validator.escape(formData.customer_firstName), // Corrected property name
            validator.escape(formData.customer_lastName),  // Corrected property name
            validator.escape(formData.customer_phone),
            validator.escape(formData.customer_email),
            new Date().toISOString().slice(0, 19).replace('T', ' ')
        )

        // Call model function
        Orders.create(newOrder).then(([result]) => {
            response.redirect("/order_confirmation?id=" + result.insertId);
        });
    }
});

orderController.get("/order_confirmation", (request, response) => {
    if (!/[0-9]{1,}/.test(request.query.id)) {
        response.render("status.ejs", {
            status: "Invalid order ID",
            message: "Please contact support.",
        });
        return;
    }

    if (request.query.id) {
        OrdersProducts.getAllByOrderId(request.query.id).then(
            orderProduct => {
                response.render("order_confirmation.ejs", {
                    orderProduct,
                });
            }
        ).catch(error => {
            response.render("status.ejs", {
                status: "Failed to get order status",
                message: error,
            });
        })
    }
});

orderController.get(
    "/admin_order",
    access_control(["manager", "sales"]),
    (request, response) => {
        let orderStatus = request.query.status;
        if (!orderStatus) {
            orderStatus = "pending";
        }

        OrdersProducts.getAllByOrderStatus(orderStatus).then(ordersProducts => {
            response.render("admin_orders.ejs", {
                ordersProducts,
                orderStatus,
                accessRole: request.session.user.accessRole,
            });
        });
    }
);

orderController.get("/order_admin_create", (request, response) => {
    Products.getAll().then(products => {
        response.render("order_admin_create.ejs", {
            products,
            accessRole: request.session.user.accessRole,
        })
    })
})

orderController.post(
    "/admin_order",
    access_control(["manager", "sales"]),
    (request, response) => {
        const formData = request.body;
        Orders.updateStatusById(formData.order_id, formData.status).then(
            ([result]) => {
                if (result.affectedRows > 0) {
                    response.redirect("/admin_order");
                }
            }
        );
    }
);

export default orderController;
