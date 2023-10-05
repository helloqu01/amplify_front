import { ObjectId } from "mongodb";
import { connectToDB } from "@/util/database.js"

export default async function Edit(props) {
    const client = await connectToDB();  // Call the function to get the client
    const db = client.db('forum');
    let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)});
  return (
    <div className="write">
       <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={result.title}/>
        <input name="content" defaultValue={result.content}/>
        <input name="_id"  readOnly defaultValue={result._id.toString()}/>
        <button type="submit">전송</button>
        </form>
    </div>
  )
} 