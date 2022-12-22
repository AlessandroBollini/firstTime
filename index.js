const express = require('express');
const app = express();
const fs = require('fs');
const parseUrl = require('body-parser');
const encodeUrl = parseUrl.urlencoded({ extended: true });
const controller = require('./database/controller');
const exec = require('await-exec');
require("dotenv").config();
const contract=process.env.CONTRACT;

const port = 8080;
app.set('view engine', 'ejs');
const myCss = {
    style: fs.readFileSync('./views/style.css', 'utf-8')
};

app.get('/', (_req, res) => {
    res.render("form", { myCss: myCss });
});

app.post('/', encodeUrl, async (req, res) => {
    const check = await controller.checkUser(req.body.userAddress);
    try {
        if (check == 0) {
            await exec('npx hardhat run scripts/transfer.js --network mumbai', {
                env: { USERWALLET: req.body.userAddress, EMAIL: req.body.email }, function(error, stdout, stderr) {
                    if (error !== null) {
                        console.log('exec error: ', error);
                    }
                }
            })
        }
        const id = await controller.findUser(req.body.userAddress);
        res.render("receipt", { myCss: myCss, contract: contract, id: id.id });
    } catch (err) {
        console.error(err);
        res.render("error", { myCss: myCss });
    }
});

app.listen(port, () => {
    console.log("App is up and running.");
})