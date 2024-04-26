import express from "express";
import access_control from "../access_control.js";
import * as changelog from "../model/changelog.js"

const changelogController = express.Router();

changelogController.get(
    "/changelog",
    access_control(['manager']),
    (request,response)=>{
        changelog.getAll().then(allEntries=> {
            response.render("changelog.ejs",{allEntries,
                accessRole: request.session.user.accessRole,})

        })

})


export default changelogController
