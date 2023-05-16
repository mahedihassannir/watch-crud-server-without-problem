const express = require('express');

const app = express()

const port = process.env.PORT || 5000

const cors = require("cors")

app.use(cors())

app.use(express.json())

require("dotenv").config()




// here is the config of mongodb


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.obla9o6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // here is the all apis


        const Db = client.db("usersIfo").collection("user")

        // here is the coursor of the api-name 
        app.get("/user", async (req, res) => {

            const cursor = Db.find()

            const result = await cursor.toArray()

            res.send(result)

        })

        // here is the post method starts


        app.post("/user", async (req, res) => {

            const body = req.body

            const result = await Db.insertOne(body)

            res.send(result)

        })

        // here is the post method ends

        // here is the delete method starts 

        app.delete("/user/:id", async (req, res) => {

            const id = req.params.id

            const query = { _id: new ObjectId(id) }

            const result = await Db.deleteOne(query)

            res.send(result)

        })
        // here is the detailes finding
        app.get("/user/:id", async (req, res) => {

            const id = req.params.id

            const query = { _id: new ObjectId(id) }

            const result = await Db.findOne(query)

            res.send(result)

        })


        // here is the delete method ends  

        // here is the all apis ends


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// here is the config of mongodb







// here is the main response 

app.get("/", (req, res) => {
    res.send("server is running")

})

// here is listing the server
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})
