import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config'
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URL);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB();
const db = mongoClient.db('studiospace');
const studiosCollection = db.collection('studios');



app.post('/add-studio', async (req, res) => {
  try {
    const data = req.body;

    const result = await studiosCollection.insertOne(data);

    res.status(201).json({
      success: true,
      message: "Studio added successfully",
      result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add studio"
    });
  }
});

app.get('/explore-studio', async (req, res) => {
    const result = await studiosCollection.find({}).toArray();
    res.send(result)
})





// https://localhost:8000

app.get('/', (req, res) => {
    res.send('server is running fine')
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})