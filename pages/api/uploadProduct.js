import { connectToDatabase } from "../../src/utils/mongodb";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/products/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).array("productImages", 5);

export const config = {
  api: {
    bodyParser: false, // Disabling Next.js's body parser to allow multer to work
  },
};

const uploadMiddleware = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (error) => {
      if (error) {
        return reject(new Error("Image uploading failed."));
      }
      resolve();
    });
  });
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await uploadMiddleware(req, res); // Use the middleware for multer

      const { title, description, price, category } = req.body;
      const images = req.files.map((file) => `/img/products/${file.filename}`);

      const product = {
        title,
        description,
        price: parseFloat(price),
        images,
        category,
      };

      const { db } = await connectToDatabase();
      const result = await db.collection("products").insertOne(product);
      console.log(result);
      res.status(201).send({ success: true, data: result });
    } catch (error) {
      res.status(400).send({ success: false, error: error.message });
    }
  } else {
    res.status(405).send({ error: "Method not allowed" });
  }
}
