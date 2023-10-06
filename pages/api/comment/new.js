import { connectToDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
export default async function handler(요청, 응답) {
  let session = await getServerSession(요청, 응답, authOptions)
  console.log("new.js",session.user.email);
//   if(session){
//     요청.body.author = session.user.email
//   }
  console.log("new.js, 요청.body",요청.body);
  if (요청.method == 'POST'){
    요청.body = JSON.parse(요청.body)
    let 저장할거 = {
      content : 요청.body.comment,
      parent : new ObjectId(요청.body._id),
      author : session.user.email
    }
    const client = await connectToDB();  // Call the function to get the client
    const db = client.db('forum');
    let result = await db.collection('comment').insertOne(저장할거);
    응답.status(200).json('저장완료')
  }
} 