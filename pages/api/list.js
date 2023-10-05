import { connectToDB } from "@/util/database"

export default async function handler(요청, 응답){
  const client = await connectToDB();  // Call the function to get the client
  const db = client.db('forum');
  let result = await db.collection('post').find().toArray()
  응답.status(200).json(result)
}