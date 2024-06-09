import Comment from "../models/comment.model.js";
import Property from "../models/property.model.js";
import Request from "../models/request.model.js";
import { errorHandler } from "../utils/error.js";

// פונקציה להוספת תגובה לנכס
export const addComment = async (req, res, next) => {
  const { propertyId, content, rating } = req.body;
  const userId = req.user.id;

  try {
    // בדיקת אם ההזמנה אושרה
    const approvedRequest = await Request.findOne({
      property: propertyId,
      sender: userId,
      status: "accepted",
    });

    if (!approvedRequest) {
      return next(
        errorHandler(403, "You can only comment after the request is accepted!")
      );
    }

    const newComment = new Comment({
      user: userId,
      property: propertyId,
      content,
      rating,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

// פונקציה להצגת תגובות לנכס
export const getComments = async (req, res, next) => {
  const { propertyId } = req.params;

  try {
    const comments = await Comment.find({ property: propertyId }).populate(
      "user",
      "username avatar"
    );
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
