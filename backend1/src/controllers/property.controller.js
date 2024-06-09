import Property from "../models/property.model.js";
import { errorHandler } from "../utils/error.js";

export const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return next(errorHandler(404, "Property not found!"));
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

export const getProperties = async (req, res, next) => {
  try {
    const {
      limit = 9,
      startIndex = 0,
      offer = "false",
      furnished = "false",
      parking = "false",
      type = "all",
      searchTerm = "",
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const queryFilter = {
      offer: { $in: offer !== "false" ? [true] : [true, false] },
      furnished: { $in: furnished !== "false" ? [true] : [true, false] },
      parking: { $in: parking !== "false" ? [true] : [true, false] },
      type: {
        $in:
          type !== "all"
            ? [type]
            : ["Apartment", "Standalone Property", "Guest House"],
      },
      name: { $regex: searchTerm, $options: "i" },
    };

    const properties = await Property.find(queryFilter)
      .sort({ [sort]: order })
      .limit(Number(limit))
      .skip(Number(startIndex));

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (req, res, next) => {
  const {
    Id,
    Area,
    HouseType,
    City,
    Street,
    HouseNumber,
    NumberOfRooms,
    NumberOfBeds,
    Balcony,
    Disability,
    Elevator,
    Furnished,
    Parking,
    AirCondition,
    SecureSpace,
    ImageURLs,
    Popularity
  } = req.body;

  const newProperty = new Property({
    Id,
    Area,
    HouseType,
    City,
    Street,
    HouseNumber,
    NumberOfRooms,
    NumberOfBeds,
    Balcony,
    Disability,
    Elevator,
    Furnished,
    Parking,
    AirCondition,
    SecureSpace,
    ImageURLs,
    Popularity
  });

  try {
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    next(error);
  }
};
