import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../src/utils/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await handleGetRequest(req, res);
  } else if (req.method === "POST") {
    await handlePostRequest(req, res);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

async function handleGetRequest(req, res) {
  try {
    const { email, password } = req.query;

    console.log("USER IS", email);

    const { db } = await connectToDatabase();
    const collection = db.collection("users");

    const user = await collection.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      status: "success",
      data: {
        token,
        user: { id: user._id, email: user.email },
      },
    });
  } catch (error) {
    console.error("Error occurred in the login API:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
}

async function handlePostRequest(req, res) {
  try {
    const { email, password } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection("users");

    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ status: "error", message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await collection.insertOne({
      email,
      password: hashedPassword,
    });

    if (!result || !result.ops || result.ops.length === 0) {
      throw new Error("Failed to create user.");
    }

    const user = result.ops[0];

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      status: "success",
      data: {
        token,
        user: { id: user._id, email: user.email },
      },
    });
  } catch (error) {
    console.error("Error occurred in the register API:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
}
