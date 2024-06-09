import Request from "../models/request.model.js";
import Property from "../models/property.model.js";
import { errorHandler } from "../utils/error.js";

export const sendRequest = async (req, res, next) => {
  const { propertyId, recipientId, message, startDate, endDate } = req.body;
  const senderId = req.user.id;

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return next(errorHandler(404, "Property not found!"));
    }

    const newRequest = new Request({
      sender: senderId,
      recipient: recipientId,
      property: propertyId,
      message,
      startDate,
      endDate,
    });

    await newRequest.save();
    res.status(201).json("Request sent successfully!");
  } catch (error) {
    next(error);
  }
};

export const getRequest = async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("sender", "username email avatar")
      .populate("recipient", "username email avatar")
      .populate("property", "name address");

    if (!request) {
      return next(errorHandler(404, "Request not found!"));
    }

    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

export const updateRequest = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own requests!"));
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
      { new: true }
    );

    if (!updatedRequest) {
      return next(errorHandler(404, "Request not found!"));
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    next(error);
  }
};
export const getRequestsByUser = async (req, res, next) => {
  try {
    const requests = await Request.find({ sender: req.params.userId })
      .populate("property", "name address imageUrls")
      .populate("recipient", "username email");

    if (!requests) {
      return next(errorHandler(404, "No requests found for this user!"));
    }

    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};
export const deleteRequest = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own requests!"));
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json("Request has been deleted!");
  } catch (error) {
    next(error);
  }
};
