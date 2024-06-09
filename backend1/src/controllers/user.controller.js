import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// פונקציה לעדכון פרטי המשתמש
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const {
    username,
    email,
    familySize,
    preferredArea,
    rooms,
    children,
    adults,
    babies,
    pet,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        familySize,
        preferredArea,
        rooms,
        children,
        adults,
        babies,
        pet,
      },
      { new: true }
    );

    if (!updatedUser) return next(errorHandler(404, "User not found!"));

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// פונקציה למחיקת משתמש
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) return next(errorHandler(404, "User not found!"));

    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};
