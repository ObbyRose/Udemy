import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/places", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile("./data/places.json");

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get("/user-places", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-places.json");

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put("/user-places", async (req, res) => {
  try {
    const { placeId } = req.body;

    if (!placeId) {
      return res.status(400).json({ message: "Invalid request: placeId is required" });
    }

    const fileContent = await fs.readFile("./data/places.json");
    const placesData = JSON.parse(fileContent);

    const place = placesData.find((p) => p.id === placeId);

    if (!place) {
      return res.status(404).json({ message: `Place with ID ${placeId} not found` });
    }

    const userPlacesFileContent = await fs.readFile("./data/user-places.json");
    let userPlacesData = JSON.parse(userPlacesFileContent);

    if (!Array.isArray(userPlacesData)) {
      userPlacesData = [];
    }

    if (!userPlacesData.some((p) => p?.id === place.id)) {
      userPlacesData.push(place);
    }

    await fs.writeFile("./data/user-places.json", JSON.stringify(userPlacesData, null, 2));

    res.status(200).json({ userPlaces: userPlacesData });
  } catch (error) {
    console.error("Error processing PUT request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.delete("/user-places/:id", async (req, res) => {
  const placeId = req.params.id;

  const userPlacesFileContent = await fs.readFile("./data/user-places.json");
  const userPlacesData = JSON.parse(userPlacesFileContent);

  const placeIndex = userPlacesData.findIndex((place) => place.id === placeId);

  let updatedUserPlaces = userPlacesData;

  if (placeIndex >= 0) {
    updatedUserPlaces.splice(placeIndex, 1);
  }

  await fs.writeFile(
    "./data/user-places.json",
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({ userPlaces: updatedUserPlaces });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
