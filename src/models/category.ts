import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../util/db"; // Adjust the import path as necessary

export interface ICategory extends Model<InferAttributes<ICategory>, InferCreationAttributes<ICategory>> {
  id: CreationOptional<number>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;

  categoryName: string;
}

// Define the Category model
const Category = sequelize.define<ICategory>("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

// Export the Category model
export default Category;
