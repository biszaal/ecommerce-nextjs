import { connectToDatabase } from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // POST method - For adding a new product to the cart
  if (req.method === "POST") {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).send("User ID and Product ID are required");
    }

    const userObjectId = new ObjectId(userId);
    const user = await db.collection("users").findOne({ _id: userObjectId });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const existingCartItem =
      user.cart && user.cart.find((item) => item.cartID === productId);

    if (existingCartItem) {
      await db.collection("users").updateOne(
        { _id: userObjectId, "cart.cartID": productId },
        {
          $inc: { "cart.$.quantity": 1 },
        }
      );
    } else {
      const cartItem = { cartID: productId, quantity: 1 };
      await db.collection("users").updateOne(
        { _id: userObjectId },
        {
          $push: { cart: cartItem, quantity },
        }
      );
    }
    return res.status(200).send("Product added or updated in cart");
  }

  // GET method - For fetching the cart items for a user
  if (req.method === "GET") {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).send("User ID is required");
    }

    const userObjectId = new ObjectId(userId);
    const user = await db.collection("users").findOne({ _id: userObjectId });

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(user.cart || []);
  }

  // PUT method - For updating the cart based on actions (increase, decrease, remove)
  if (req.method === "PUT") {
    const { userId, productId, action } = req.body;

    if (!userId || !productId || !action) {
      return res
        .status(400)
        .send("User ID, Product ID, and action are required");
    }

    const userObjectId = new ObjectId(userId);
    const user = await db.collection("users").findOne({ _id: userObjectId });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const existingCartItem =
      user.cart && user.cart.find((item) => item.cartID === productId);

    if (existingCartItem) {
      switch (action) {
        case "increase":
          await db.collection("users").updateOne(
            { _id: userObjectId, "cart.cartID": productId },
            {
              $inc: { "cart.$.quantity": 1 },
            }
          );
          break;
        case "decrease":
          if (existingCartItem.quantity > 1) {
            await db.collection("users").updateOne(
              { _id: userObjectId, "cart.cartID": productId },
              {
                $inc: { "cart.$.quantity": -1 },
              }
            );
          } else {
            await db.collection("users").updateOne(
              { _id: userObjectId },
              {
                $pull: { cart: { cartID: productId } },
              }
            );
          }
          break;
        case "remove":
          await db.collection("users").updateOne(
            { _id: userObjectId },
            {
              $pull: { cart: { cartID: productId } },
            }
          );
          break;
        default:
          return res.status(400).send("Invalid action");
      }

      return res.status(200).send("Cart updated successfully");
    } else {
      if (action === "increase") {
        const cartItem = { cartID: productId, quantity: 1 };
        await db.collection("users").updateOne(
          { _id: userObjectId },
          {
            $push: { cart: cartItem },
          }
        );
        return res.status(200).send("Product added to cart");
      } else {
        return res.status(404).send("Product not found in cart");
      }
    }
  }

  return res.status(405).send("Method not allowed");
}
