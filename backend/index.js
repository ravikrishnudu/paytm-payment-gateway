// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import paymentRoute from "./PaymentRoute";
// dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const paymentRoute = require("./PaymentRoute");

const app = express();

const port = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use("/api", paymentRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
