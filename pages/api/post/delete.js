import { connectToDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
  if (요청.method == 'POST'){
    try {
    console.log("api delete",요청.body );
    console.log("api delete",요청.body._id );
        const client = await connectToDB();  // Call the function to get the client
        const db = client.db('forum');
      let result = await db.collection('post').deleteOne({_id : new ObjectId(요청.body)});
      return 응답.status(200).json('삭제완료'); 
    } 
    catch (error) {
      응답.status(500)
    }
    
   // 만약에 result 결과가 이상하면 응답.status(500)
    //result 결과가 정상이면 응답.status(200)
  }
}