import { connectToDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await connectToDB();  // Call the function to get the client
    const db = client.db('forum');
  try {
    let result = await db.collection('comment').find({ parent : new ObjectId(req.query.id) }).toArray()
    res.status(200).json(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
