// import express from "express";
// const Paytm = require("paytmchecksum");
// import PaytmChecksum from "./PaytmChecksum";
require("dotenv").config();

const formidable = require("formidable");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const PaytmChecksum = require("./PaytmChecksum");

const router = express.Router();
router.post("/", (req, res) => {
  const { amount, email } = req.body;
  const totalAmount = JSON.stringify(amount);
  let params = {};

  (params["MID"] = process.env.PAYTM_MID),
    (params["WEBSITE"] = process.env.PAYTM_WEBSITE),
    (params["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID),
    (params["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID),
    (params["ORDER_ID"] = uuidv4()),
    (params["CUST_ID"] = process.env.PAYTM_CUST_ID),
    (params["TXN_AMOUNT"] = totalAmount),
    (params["CALLBACK_URL"] = "http://localhost:5000/api/callback"),
    (params["EMAIL"] = email),
    (params["MOBILE_NO"] = "9876543210");
  /**
   * Generate checksum by parameters we have
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */
  let paytmChecksum = PaytmChecksum.generateSignature(
    params,
    process.env.PAYTM_MERCHANT_KEY
  );
  paytmChecksum
    .then(function (checksum) {
      let paytmParms = {
        ...params,
        CHECKSUMHASH: checksum,
      };
      res.status(200).json(paytmParms);
      console.log("generateSignature Returns: " + checksum);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
