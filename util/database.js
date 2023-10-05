// Import necessary modules
import { MongoClient, ServerApiVersion } from 'mongodb';

// MongoDB connection URL and options
const uri = "mongodb+srv://root:00000000@cluster0.5atbwn9.mongodb.net/?retryWrites=true&w=majority";
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useNewUrlParser: true
};

// Function to connect to MongoDB and return the client
async function connectToDB() {
  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    console.log("Connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export { connectToDB };
