import { connectToDB } from "/util/database.js"

export default async function Home() {
  try {
    const client = await connectToDB();  // Call the function to get the client
    const db = client.db('forum');
    const result = await db.collection('post').find().toArray();
    
    // Close the client when done using it
    await client.close();

    return (
      <main>
        {result[0].title}
      </main>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error occurred.</div>;
  }
}
