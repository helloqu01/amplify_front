import { ObjectId } from "mongodb";
import { connectToDB } from "@/util/database.js";
import { notFound } from "next/navigation"
import Comment from './Comment.js'

export default async function Detail(props) {
    console.log(props)
  try {
    const client = await connectToDB();  // Call the function to get the client
    const db = client.db('forum');
    let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)});
    console.log(result);
  if (result == null) {
    return notFound()
  } else {
    return (
      <div>
        <h4>상세페이지임</h4>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
        <Comment _id={ result._id.toString() }/> 
      </div>
    );
  }
   
  } catch (error) {
    console.error("Error:", error);
    return <div>Error occurred.</div>;
  }
}
