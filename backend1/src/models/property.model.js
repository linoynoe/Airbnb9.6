import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      required: true,
    },
    Area: {
      type: String,
      required: true,
    },
    HouseType: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    Street: {
      type: String,
      required: true,
    },
    HouseNumber: {
      type: Number,
      required: true,
    },
    NumberOfRooms: {
      type: Number,
      required: true,
    },
    NumberOfBeds: {
      type: Number,
      required: true,
    }, 
    Balcony: {
      type: Boolean,
      required: true,
    },
    Disability: {
      type: Boolean,
      required: true,
    },
    Elevator: {
      type: Boolean,
      required: true,
    },
    Furnished: {
      type: Boolean,
      required: true,
    },
    Parking: {
      type: Boolean,
      required: true,
    },
    AirCondition: {
      type: Boolean,
      required: true,
    },
    SecureSpace: {
      type: Boolean,
      required: true,
    },
    ImageURLs: {
      type: Array,
      required: true,
    },
    Popularity: {
      type: Number, // Adding popularity field
      default: 0,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
