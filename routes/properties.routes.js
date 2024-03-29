const express = require("express");
const { isLoggedIn } = require("../middleware/route-guard");
const Property = require("../models/Property.model");
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const router = express.Router();

// Get all properties
router.get("/", async (req, res) => {
  try {
    const allProperties = await Property.find();
    console.log("All properties :", allProperties);
    res.render("properties/all", { hopper: allProperties, user: req.session.user || undefined});
  } catch (error) {
    console.log("Route to all properties", error);
  }
});

// Create a new property
router.get("/new", isLoggedIn, async (req, res, next) => {
  res.render("properties/new", { update: false, user:req.session.user });
});

// Get a specific property by ID
router.get("/:propertyId", async (req, res) => {
  const propertyFound = await Property.findById(req.params.propertyId).populate(
    "user"
  );
  console.log({ propertyFound });
  res.render("properties/one", { propertyFound, user:req.session.user });
});

router.post(
  "/new",
  fileUploader.single("property-cover-image"),
  async (req, res) => {
    const body = req.body;
    // console.log(body);
    console.log(req.session)
    console.log(req.file)
    // const owner = req.session.userId;

    await Property.create({
      ...body,
      description: body.description,
      user: req.session.user._id,
      imageUrl: req.file.path, // commented that out
    });

    res.redirect("/properties");
  }
);

// Update a specific property by ID
router.get("/:propertyId/update", async (req, res) => {
  const property = await Property.findById(req.params.propertyId);
  res.render("properties/new", { property, update: true, user: req.session.user });
});

router.post("/:propertyId/update", async (req, res) => {
  await Property.findByIdAndUpdate(req.params.propertyId, {
    ...req.body,
    description: req.body.description,
  });
  console.log(req.body)

  res.redirect(`/properties/${req.params.propertyId}`);
});

// Delete a specific property by ID
router.get("/:propertyId/delete", async (req, res) => {
  await Property.findByIdAndDelete(req.params.propertyId);

  res.redirect("/properties");
});

module.exports = router;
