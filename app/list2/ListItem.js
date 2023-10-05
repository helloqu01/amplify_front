'use client'
import Link from "next/link";

//  /*Ajax*/
export default async function ListItem({ result }) {
  return (
    <div>
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <Link href={'/detail/' + result[i]._id}>{result[i].title}</Link>
          <Link href={'/edit/' + result[i]._id} className="list-btn">✏️</Link>
        
          {/* <button className="list-btn" onClick={(e) => {
            fetch('/api/post/delete', { method: 'POST', body: result[i]._id }).then(()=>{
                e.target.parentElement.style.opacity = 0;
                setTimeout(()=>{
                e.target.parentElement.style.display = 'none';
                }, 1000)
            })
            }}>🗑️</button>  */}
            <button className="list-btn" onClick={(e) => {
            fetch('/api/post/delete', { method: 'POST', body: result[i]._id }).then((r)=>{
              if(r.status == 200) {
                window.location.reload();
              } else {
                //서버가 에러코드전송시 실행할코드
              }
            })
            .then((result)=>{ 
              //성공시 실행할코드
            }).catch((error)=>{
              //인터넷문제 등으로 실패시 실행할코드
              console.log(error)
            })
            }}>🗑️</button> 
          <p>{result[i]._id}</p>
        </div>
      ))}
    </div>
  );
}