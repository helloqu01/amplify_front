import { connectToDB } from "@/util/database.js"
import Link from "next/link";
import DetailLink from "./DetailLink";
import Listitem from "./ListItem";

export const dynamic = 'force-dynamic' 
//페이지 캐싱으로 다이나믹 부하를 막을 수 있다. 페이지 완성본을 잠깐 저장해주고 재사용한다는 말이다.

export default async function List() {
    const client = await connectToDB();  // Call the function to get the client
    const db = client.db('forum');
    let result = await db.collection('post').find().toArray();

  return (
    <div className="list-bg">
        <Listitem result={result} />
      {/* {result.map((item, i) => ( // Use item and i as parameters
        <div className="list-item" key={i}>
           <Link href={'/detail/' + result[i]._id}><h4>{item.title}</h4></Link>
           <Link href={'/edit/' + result[i]._id} className="list-btn">✏️</Link>
           <DetailLink/>
          <p>1월 1일</p>
        </div>
      ))} */}
    </div>
  );
}
