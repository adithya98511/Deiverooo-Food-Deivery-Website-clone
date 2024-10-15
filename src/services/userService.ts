import User from "../../src/models/userModel";
import { Op } from "sequelize";

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const createNewUser = async ({ email, password }: { email: string; password: string }) => {
  return await User.create({ email, password });
};

export const findUserByResetToken = async (token: string) => {
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error finding user by reset token.");
  }
};
