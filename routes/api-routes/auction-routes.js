var db = require("../../models/");
var moment = require('moment');
const { Op } = require('sequelize')


module.exports = function(app) {
    app.post("/api/auction/create", function(req, res) {
        console.log("Auction Data:");
        console.log(req.body);

        db.Auction.create({
            UserId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            imgLink: req.body.imgLink,
            createdAt: req.body.createdAt,
            category: req.body.category,
            gender: req.body.gender,
            minBidIncrement: req.body.minBidIncrement,
            startingPrice: req.body.startingPrice,
        }).then(function(results) {
            res.json(results);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });

    });


    app.get("/api/auction/id", (req, res) => {
        console.log("finding one -- req.query", req.query);
        db.Auction.findOne({
            where: {
                id: req.query.auctionId,
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    });
    
    app.get("/api/auction/complete", (req, res) => {
        console.log("finding one -- req.query", req.query);
        db.Auction.findAll({
            where: {
                createdAt: {
                    [Op.lte]: moment().subtract(7, 'days').toDate()
                  }
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    });
    
    app.get("/api/auction", (req, res) => {
        console.log("req.query", req.query);
        
        let whereObj = {};
        if (req.query.gender === undefined && req.query.category === undefined) {
            console.log('~~ no filters ~~',whereObj);
            whereObj.where = {}
        } else if (req.query.gender !== '' && req.query.category !== '') {
            console.log('~~ filter query and category ~~',whereObj);
            whereObj.where = {
                gender: req.query.gender,
                category: req.query.category,
            }
        } else if (req.query.gender !== '') {
            console.log('~~ filter gender only ~~',whereObj);
            whereObj.where = {
                gender: req.query.gender,
            }
        } else if (req.query.category !== '') {
            console.log('~~ filter category only ~~',whereObj);
            whereObj.where = {
                category: req.query.category,
            }
        } else {
            console.log('~~ no filters ~~',whereObj);
            whereObj.where = {}
        }
        whereObj.where.createdAt = {
            // [Op.gte]: moment().subtract(7, 'days').toDate()
            [Op.gte]: moment('20181107').subtract(7, 'days').toDate() // snapshot of auction listings at Nov 7th
        }
        console.log('whereObj',whereObj)

        db.Auction.findAll(whereObj)
        .then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    });

	
};
