import Category from "../models/category.js";
import cloudinary from 'cloudinary'
import fs from "fs/promises";
const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
     return res.status(400).json({ message: "All fields are required" });
    }

    const categoryExist = await Category.findOne({ name });

    if (categoryExist) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      icon: {
        public_id: name,
        secure_url:
          "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
      },
    });

    if (!category){
        return res.status(400).json({ message: "Category create to failed ,  please try again" });
    }
  

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "shreejishoesandmansware",
          width: 250,
          height: 250,
        //   gravity: "faces",
          crop: "fill",
        });
        if (result) {
          category.icon.public_id = result.public_id;
          category.icon.secure_url = result.secure_url;

          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
         return res.status(400).json({
          message: error.message || "File not uploaded, please try again",
        });
      }
    }

    await category.save();
    res.status(201).json({
      success: true,
      message: "Cacategory create successfully",
      category,
    });
  } catch (error) {
   return res
      .status(500)
      .json({ message: error.message || "create category error!!" });
  }
};

export { createCategory };
