const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "houssemesprit",
  api_key: 968613837421624,
  api_secret: "1HprfFUyEPSs4iNdn3Rb1t0kWY8" ,
});

module.exports = cloudinary;