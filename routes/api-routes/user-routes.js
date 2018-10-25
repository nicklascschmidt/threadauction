var db = require("../../models");

module.exports = function(app) {
    app.post("/api/profile", function(req,res) {

        console.log(req.body);
        db.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode
        }).then(function(results) {
            res.end();
        });
    });

    app.get("/api/logIn", (req,res) => {
        db.User.findAll(
            {
                // where: {userName : req.db.},
                includes: [db.User]
            }
        ).then(data => {
            res.json(data);
        });
        console.log(req.body.User, "looooooooooooooooooooooook at this");
    });


};

