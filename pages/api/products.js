import { connectToDatabase } from "../../src/utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { id } = req.query;

  const { db } = await connectToDatabase();

  let products = null;
  const productId = new ObjectId(id);

  if (id) {
    products = await db.collection("products").findOne({ _id: productId });
    console.log("ID", products);
  } else {
    products = await db.collection("products").find({}).toArray();
  }

  res.status(200).json(products);
}
