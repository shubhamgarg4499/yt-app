const campaign = require("../models/Campaign.model");
const user = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorCLass");

async function createCampaign(req, res, next) {
    try {
        const campaign_profile = req?.user?._id
        const {
            type,
            video_url,
            time_required,
            subscriber_required = 0,
            views_required = 0,
            likes_required = 0,
            is_completed = false,
            amount_spent } = req?.body

        if (subscriber_required <= 0 && views_required <= 0 && likes_required <= 0) {
            return next(new ErrorHandler(400, "Please Tell us what you want for your video Subscribers/Likes/Views"))
        }
        if (!type || !video_url || !time_required || !amount_spent || amount_spent <= 0) {
            return next(new ErrorHandler(400, "Please must provide these fields! Type of Campaign, video_url, time_required, amount_spent"))
        }

        const User = await user.findById(campaign_profile)
        if (!User) {
            return next(new ErrorHandler(404, "User Not Found"))
        }

        if (User.current_Balance < amount_spent) {
            return next(new ErrorHandler(404, "Dont have enough Coins to Start A Campaign"))
        }

        const newCampaign = new campaign({
            campaign_profile,
            type,
            video_url,
            time_required,
            subscriber_required,
            views_required,
            likes_required,
            is_completed,
            amount_spent
        })
        await newCampaign.save()
        User.current_Balance -= amount_spent
        await User.save()
        res.status(200).json({ success: true, campaignsDetails: newCampaign })
    } catch (error) {
        const status = error?.status || 500; // Default to 500 if no status is provided
        const message = error?.message || "Internal Server Error";
        return next(new ErrorHandler(status, message));
    }
}

async function getAllCampaigns(req, res, next) {
    try {
        const _id = req?.user?._id
        const allCampaigns = await campaign.aggregate([{
            $match: {
                campaign_profile: mongoose.Types.ObjectId(_id)
            }
        }])
        res.status(200).json({ allCampaigns })
    } catch (error) {
        const status = error.status || 500
        const message = error.message || "Something went wrong while getting all your campaigns"
        return next(new ErrorHandler(status, message))
    }
}
module.exports = { createCampaign, getAllCampaigns }