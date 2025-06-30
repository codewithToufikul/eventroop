const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const uri =
  `mongodb+srv://${databaseUser}:${databasePassword}@cluster0.ivo4yuq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
