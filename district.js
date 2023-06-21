const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
    districtName: String,
    years: [String],
    fteCounts: [Number],
    enrollmentCounts: [Number]
})

const District = mongoose.model('District', DistrictSchema);

module.exports = District;