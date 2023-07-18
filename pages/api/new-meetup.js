// /api/new-meetup
// POST/api/new-meetup
import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // body is basically the content to the request,the body of the request or basically the data
    // const { title, adress, description, image } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://Anant:This_IsAwesome@cluster0.grjntze.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    // insertOne is the method to insert one new document into the  collection
    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}
export default handler;
