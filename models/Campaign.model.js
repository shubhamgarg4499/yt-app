const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    campaign_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Subscribers', "Likes", 'Views']
    },
    video_url: {
        type: String,
        required: true
    },
    time_required: {
        type: Number,
        required: true,
    },
    subscriber_required: {
        type: Number,
    },
    views_required: {
        type: Number,
    },
    likes_required: {
        type: Number,
    },
    is_completed: {
        type: Boolean,
        default: false
    },
    amount_spent: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const campaign = mongoose.model("campaign", campaignSchema)

module.exports = campaign