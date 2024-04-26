import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000; // Using environment variable for port

// Security enhancements
app.use(helmet());
app.use(cors()); // Configure appropriately based on your needs

// Session configuration
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'default_secret', // Environment variable for secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Secure cookie in production
};
app.use(session(sessionConfig));

// Enable URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For JSON payloads

// View engine and static files setup
app.set("view engine", "ejs");
app.use(express.static("static"));


// Import and use controllers
import productController from './controllers/product.js'
app.use(productController)

import orderController from './controllers/order.js'
app.use(orderController)

import staffController from './controllers/staff.js'
app.use(staffController)

import homeController from './controllers/home.js'
app.use(homeController)

import productFeatureController from './controllers/products_features.js'
app.use(productFeatureController)

import changelogController from './controllers/changelog.js';
app.use(changelogController)

// setup 404 and root page redirects
// Error handling and 404
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get("*", (req, res) => {
    res.status(404).render("status.ejs", { status: "404 Not Found" });
});

app.listen(port, () => {
    console.log(`Express Server started on http://localhost:${port}`);
});