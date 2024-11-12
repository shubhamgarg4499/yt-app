const express = require("express");
const { createCampaign, getAllCampaigns } = require("../controllers/Campaign.controller");
const isAuth = require("../middleware/isAuthenticated.middleware");
const campaignRouter = express.Router();


campaignRouter.route('/createCampaign').post(isAuth, createCampaign)
campaignRouter.route('/getAllCampaigns').get(isAuth, getAllCampaigns)
module.exports = campaignRouter