// Import Express
const express = require('express');
// Import Router
const router = new express.Router();
// Import JWT
const jwt = require('jsonwebtoken');
// Import bcryptjs
const bcryptjs = require('bcryptjs');
// Import Admin Collection/Model
const Admin = require("../Model/admin");
// Import Admin Profile Collection/Model
const AdminProfile = require("../Model/adminProfile");

// Import Authentication
// const auth = require("../Middleware/auth");

// SIGN UP API
router.post("/register", async (req, res) => {
    try {
        if (req.body.person.toLowerCase() === "admin") {
            // Check the email is already exists or not
            let admin = await Admin.findOne({ email: req.body.email });
            // If exists the email
            if (admin) {
                // Set Conflict Status
                res.status(409).send("Admin Already Registered !!");
            }
            else {
                // Check the phoneno is already exists or not
                admin = await Admin.findOne({ phone: req.body.phone });
                // If exists the phone
                if (admin) {
                    // Set Conflict Status
                    res.status(409).send("Admin Already Registered !!");
                }
                else {
                    // Generating the Salt
                    const secPass = await bcryptjs.genSalt(Number(process.env.SALT));
                    // Hashing the Password
                    const passwordHash = await bcryptjs.hash(req.body.password, secPass);

                    // Set the Collection Field with Data
                    admin = new Admin({
                        fullname: req.body.fullname,
                        email: req.body.email,
                        password: passwordHash,
                        person: req.body.person.toLowerCase(),
                        phone: req.body.phone
                    })

                    //  Save the Document in the Admin Collection
                    const createAdmin = await admin.save();
                    //  Set Created Status
                    res.status(201).send(createAdmin);
                }
            }
        }
        else {
            //  Set Bad Request Status
            res.status(400).send("Server Error !!");
        }
    } catch (error) {
        //  Set Bad Request Status
        res.status(400).send(`${error}`);
    }
})

// SIGN IN API
router.post("/login", async (req, res) => {
    try {
        if (req.body.person.toLowerCase() === "admin") {
            // Store the Email & Password & Person from request
            const { email, password, person } = req.body;
            // Check the Email is exists or not
            let logAdmin = await Admin.findOne({ email: email });

            // If not exists
            if (!logAdmin) {
                //  Set Not Found Status
                res.status(404).send("Admin Not Registered !!")
            }
            // If exists
            else {
                // Compare the password with database password
                const comparePassword = await bcryptjs.compare(password, logAdmin.password);
                // If the Password is wrong
                if (!comparePassword) {
                    //  Set Not Found Status
                    res.status(404).send("Password is Incorrect !!")
                }
                // If the Password is Correct
                else {
                    // Create a token by secret key
                    const token = jwt.sign({ id: logAdmin._id }, process.env.SECRET_KEY,
                        {
                            // Token expires by 365 days or 1 after year
                            expiresIn: "365d"
                        }
                    );
                    // Set Ok Status
                    res.status(200).json({ token, userid: logAdmin._id, person: logAdmin.person })
                }
            }
        }
        else {
            //  Set Bad Request Status
            res.status(400).send("Server Error !!");
        }
    } catch (error) {
        //  Set Bad Request Status
        res.status(400).send(`${error}`);
    }
})

// Exports the Router
module.exports = router;