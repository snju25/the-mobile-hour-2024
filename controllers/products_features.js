import express, { response } from "express"
import * as Features from "../model/products_feature.js"
import * as Feature from "../model/feature.js"
import access_control from "../access_control.js";
import validator from "validator";

const productFeatureController = express.Router();

productFeatureController.get(
"/product_feature",
(req,res)=>{
    if(req.query.id){
        Features.getById(req.query.id).then(feature => {
            res.status(200).render("product_feature.ejs",{
                feature
                })
            
        })
        .catch(error =>{
            res.status(500).send(error)
        })
    }
    })
    
productFeatureController.get("/create_feature",access_control(["manager", "stock","sales"]),(req,res)=>{
    const editID = req.query.edit_id;
    if(editID){
        Feature.getById(editID).then(editFeature =>{

            Feature.getAll().then(AllFeatures => {
                res.status(200).render("edit_feature.ejs",{
                    AllFeatures,
                    editFeature,
                    accessRole: req.session.user.accessRole
                })
            })

        }).catch(error =>{
            res.status(500).send(error)
        })

    } else{
        Feature.getAll().then(AllFeatures =>{
            res.render("create_update_features.ejs",{
                AllFeatures,
                editFeature: Feature.newFeatures(0,"","","","","","","","","","",""),
                accessRole: req.session.user.accessRole
            })
        })
    }
})

productFeatureController.post("/edit_feature",(req,res)=>{
    const formData = req.body

    if (!/^[0-9]+g?$/.test(formData.weight)) {
        res.render("status.ejs", {
            status: "Invalid feature Weight",
            message: "Feature weight must be in numeric and in grams such as 85g",
        });
        return;
    }
    if (!/^\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*mm$/.test(formData.dimensions)) {
        res.render("status.ejs", {
            status: "Invalid feature Dimensions",
            message: "Dimensions must be in numeric and end with mm ",
        });
        return;
    }
    if (!/^[\w\s]+(?:[\d.]+)?$/.test(formData.os)) {
        res.render("status.ejs", {
            status: "Invalid feature Operating system",
            message: "Operating system must be in alphanumeric only ",
        });
        return;
    }
    if (!/^[A-Za-z0-9\s.-]+$/.test(formData.screen_size)) {
        res.render("status.ejs", {
            status: "Invalid feature Operating system",
            message: "Screen Size must be in numbers ",
        });
        return;
    }
    if (!/^\d+\s*[x×]\s*\d+$/.test(formData.resolution)) {
        res.render("status.ejs", {
            status: "Invalid feature resolution",
            message: "Resolution must be in 1136 x 640 this format",
        });
        return;
    }
    if (!/^[A-Za-z0-9\s.-]+$/.test(formData.cpu)) {
        res.render("status.ejs", {
            status: "Invalid feature CPU",
            message: "CPU must be in alphanumeric and accepts decimals",
        });
        return;
    }
    if (!/^\d+\s?(GB|MB)$/.test(formData.ram)) {
        res.render("status.ejs", {
            status: "Invalid feature RAM",
            message: "RAM must start with numbers and end with GB or MB at the end",
        });
        return;
    }
    if (!/^\d+\s?(GB|MB)$/.test(formData.storage)) {
        res.render("status.ejs", {
            status: "Invalid feature Storage",
            message: "Storage must start with numbers and end with GB or MB at the end",
        });
        return;
    }
    if (!/^[A-Za-z0-9 -]+$/.test(formData.battery)) {
        res.render("status.ejs", {
            status: "Invalid feature Storage",
            message: "Battery must be number and alphabet only",
        });
        return;
    }
    if (!/^\d+MP$/.test(formData.front_camera)) {
        res.render("status.ejs", {
            status: "Invalid feature front_camera",
            message: "front_camera must be numbers followed by MP",
        });
        return;
    }
    if (!/^\d+MP$/.test(formData.rear_camera)) {
        res.render("status.ejs", {
            status: "Invalid feature rear camera",
            message: "rear_camera must be numbers followed by MP",
        });
        return;
    }

    const editedFeature = Feature.newFeatures(
        validator.escape(formData.feature_id),
        validator.escape(formData.weight),
        validator.escape(formData.dimensions),
        validator.escape(formData.os),
        validator.escape(formData.screen_size),
        validator.escape(formData.resolution),
        validator.escape(formData.cpu),
        validator.escape(formData.ram),
        validator.escape(formData.storage),
        validator.escape(formData.battery),
        validator.escape(formData.rear_camera),
        validator.escape(formData.front_camera),
    )
    if(formData.action == "create"){
        Feature.create(editedFeature).then(([result])=>{
            res.redirect("/create_feature")
        })
    } else if (formData.action=="update"){
        Feature.update(editedFeature).then(([result])=>{
            res.redirect("create_feature")
        })
    } else if (formData.action=="delete"){
        Feature.deleteById(editedFeature.id).then(([result])=>{
            res.redirect("create_feature")
        }).catch(error => {
            // Handle the error when the feature is associated with a product
            if (error.code === 'FEATURE_ASSOCIATED') {
                res.render("status.ejs", {
                    status: "Delete Operation Failed",
                    message: error.message,
                });
            } else {
                // Handle other types of errors
                res.status(500).render("status.ejs", {
                    status: "Error",
                    message: "An unexpected error occurred.",
                });
            }
        });
    }
})

productFeatureController.post("/create_new_feature",access_control(["manager", "stock","sales"]),(req,res)=>{
    const formData = req.body

    if (!/^[0-9]+g?$/.test(formData.weight)) {
        res.render("status.ejs", {
            status: "Invalid feature Weight",
            message: "Feature weight must be in numeric and in grams such as 85g",
        });
        return;
    }
    if (!/^\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*mm$/.test(formData.dimensions)) {
        res.render("status.ejs", {
            status: "Invalid feature Dimensions",
            message: "Dimensions must be in numeric and end with mm ",
        });
        return;
    }
    if (!/^[\w\s]+(?:[\d.]+)?$/.test(formData.os)) {
        res.render("status.ejs", {
            status: "Invalid feature Operating system",
            message: "Operating system must be in alphanumeric only ",
        });
        return;
    }
    if (!/^[A-Za-z0-9\s.-]+$/.test(formData.screen_size)) {
        res.render("status.ejs", {
            status: "Invalid feature Operating system",
            message: "Screen Size must be in numbers ",
        });
        return;
    }
    if (!/^\d+\s*[x×]\s*\d+$/.test(formData.resolution)) {
        res.render("status.ejs", {
            status: "Invalid feature resolution",
            message: "Resolution must be in 1136 x 640 this format",
        });
        return;
    }
    if (!/^[A-Za-z0-9\s.-]+$/.test(formData.cpu)) {
        res.render("status.ejs", {
            status: "Invalid feature CPU",
            message: "CPU must be in alphanumeric and accepts decimals",
        });
        return;
    }
    if (!/^\d+\s?(GB|MB)$/.test(formData.ram)) {
        res.render("status.ejs", {
            status: "Invalid feature RAM",
            message: "RAM must start with numbers and end with GB or MB at the end",
        });
        return;
    }
    if (!/^\d+\s?(GB|MB)$/.test(formData.storage)) {
        res.render("status.ejs", {
            status: "Invalid feature Storage",
            message: "Storage must start with numbers and end with GB or MB at the end",
        });
        return;
    }
    if (!/^[A-Za-z0-9 -]+$/.test(formData.battery)) {
        res.render("status.ejs", {
            status: "Invalid feature Storage",
            message: "Battery must be number and alphabet only",
        });
        return;
    }
    if (!/^\d+MP$/.test(formData.front_camera)) {
        res.render("status.ejs", {
            status: "Invalid feature front_camera",
            message: "front_camera must be numbers followed by MP",
        });
        return;
    }
    if (!/^\d+MP$/.test(formData.rear_camera)) {
        res.render("status.ejs", {
            status: "Invalid feature rear camera",
            message: "rear_camera must be numbers followed by MP",
        });
        return;
    }

    const newFeature = Feature.newFeatures(
        null,
        validator.escape(formData.weight),
        validator.escape(formData.dimensions),
        validator.escape(formData.os),
        validator.escape(formData.screen_size),
        validator.escape(formData.resolution),
        validator.escape(formData.cpu),
        validator.escape(formData.ram),
        validator.escape(formData.storage),
        validator.escape(formData.battery),
        validator.escape(formData.rear_camera),
        validator.escape(formData.front_camera),
    )
    Feature.create(newFeature).then(([result])=>{
            res.redirect("/create_feature")
        })
     
})

productFeatureController.get("/create_new_feature", access_control(["manager", "stock", "sales"]), (req, res) => {
    res.render("create_feature.ejs", {
        accessRole: req.session.user.accessRole,
    });
});


    



export default productFeatureController