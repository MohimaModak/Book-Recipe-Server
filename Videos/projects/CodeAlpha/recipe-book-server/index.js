const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Recipe Book");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ggrxkpr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const recipeDatabase = client.db("RecipeDB");
    const recipeCollection = recipeDatabase.collection("addRecipe");

    const countryDatabase = client.db("RecipeDB");
    const countryCollection = countryDatabase.collection("countryWiseFood");

    const cntryFdKdsDatabase = client.db("RecipeDB");
    const countryFoodKidsCollection =
      cntryFdKdsDatabase.collection("countryFoodKids");

    const timeTableDatabase = client.db("RecipeDB");
    const timeTableCollection = timeTableDatabase.collection("timeTable");

    const hourFoodDateBase = client.db("RecipeDB");
    const hourlyFoodCollection = hourFoodDateBase.collection("hourWiseFood");

    const typeOfFoodDatabase = client.db("RecipeDB");
    const typeOfFoodCollection = typeOfFoodDatabase.collection("typeOfFoods");

    const foodAppsDatabase = client.db("RecipeDB");
    const foodAppsCollection = foodAppsDatabase.collection("foodApps");

    const appFoodsDatabase = client.db("RecipeDB");
    const appFoodsCollection = appFoodsDatabase.collection("appFoods");

    const appsFoodOrderDatabase = client.db("RecipeDB");
    const appsFoodOrderCollection =
      appsFoodOrderDatabase.collection("appsFoodOrder");

    app.post("/addRecipe", async (req, res) => {
      const addRecipe = req.body;
      const result = await recipeCollection.insertOne(addRecipe);
      res.send(result);
    });

    app.get("/addRecipe", async (req, res) => {
      const allAddedRecipe = recipeCollection.find();
      const result = await allAddedRecipe.toArray();
      res.send(result);
      console.log(result);
    });

    app.get("/countryWiseFood", async (req, res) => {
      const countryFoodCollection = countryCollection.find();
      const result = await countryFoodCollection.toArray();
      res.send(result);
    });

    app.delete("/addRecipe/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const deleteRecipe = await recipeCollection.deleteOne(query);
      console.log(deleteRecipe);
      res.send(deleteRecipe);
    });

    app.get("/edit/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const editRecipe = await recipeCollection.findOne(query);
      res.send(editRecipe);
    });

    app.put("/edit/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upset: true };
      const editRecipe = req.body;
      const category = {
        $set: {
          name: editRecipe.name,
          duration: editRecipe.duration,
          ingredients: editRecipe.ingredients,
          instructions: editRecipe.instructions,
          photo: editRecipe.photo,
        },
      };
      const result = await recipeCollection.updateOne(
        filter,
        category,
        options
      );
      console.log(result);
      res.send(result);
    });

    app.get("/countryFoodKid", async (req, res) => {
      const countryKidFood = countryFoodKidsCollection.find();
      const result = await countryKidFood.toArray();
      res.send(result);
    });

    app.get("/countryFoodKid/:country", async (req, res) => {
      const country = req.params.country;
      const query = { country: country };
      const result = await countryFoodKidsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const detailsRecipe = await countryFoodKidsCollection.findOne(query);
      res.send(detailsRecipe);
    });

    app.get("/hourWiseFood", async (req, res) => {
      const hourlyFood = hourlyFoodCollection.find();
      const result = await hourlyFood.toArray();
      res.send(result);
    });

    app.get("/hourDetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await hourlyFoodCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/hourWiseFood/:Hour", async (req, res) => {
      const Hour = req.params.Hour;
      const query = { Hour: Hour };
      const result = await hourlyFoodCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/timeTable", async (req, res) => {
      const foodTimeTable = timeTableCollection.find();
      const result = await foodTimeTable.toArray();
      res.send(result);
    });

    app.get("/typeOfFood", async (req, res) => {
      const typeOfFood = typeOfFoodCollection.find();
      const result = await typeOfFood.toArray();
      res.send(result);
    });

    app.get("/typeOfFood/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await typeOfFoodCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/foodApps", async (req, res) => {
      const foodApps = foodAppsCollection.find();
      const result = await foodApps.toArray();
      res.send(result);
    });

    app.get("/appFoods", async (req, res) => {
      const allOfFoods = appFoodsCollection.find();
      const result = await allOfFoods.toArray();
      res.send(result);
    });

    app.get("/SpecificAppFoods/:appName", async (req, res) => {
      const appName = req.params.appName;
      const query = { appName: appName };
      const result = await appFoodsCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/appFoodsOrder", async (req, res) => {
      const order = req.body;
      const result = await appsFoodOrderCollection.insertOne(order);
      res.send(result);
    });

    app.get("/appFoodsOrder", async (req, res) => {
      const orderedFood = appsFoodOrderCollection.find();
      const result = await orderedFood.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // Commenting out the following line so that the client stays connected for the lifetime of the application
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Recipe Book: ${port}`);
});
