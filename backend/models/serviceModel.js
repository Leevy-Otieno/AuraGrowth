const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    serviceType: { type: String },
    serviceOuterDescription: { type: String },
    serviceCardHeading: { type: String },
    serviceCardPara: { type: String },
    serviceInnerHeading: { type: String },
    serviceInnerPara: { type: String },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;