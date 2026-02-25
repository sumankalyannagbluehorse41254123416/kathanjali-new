"use server";

// lib/fetchFormFields.js
import axios from "axios";
import crypto from "crypto";

export async function fetchFormFields({ host }, uid) {
  const baseurl =
    process.env.CMS_BASE_URL || process.env.NEXT_PUBLIC_CMS_BASE_URL;
  const timeStamp = Math.floor(Date.now());

  const key =
    process.env.CMS_API_KEY || process.env.NEXT_PUBLIC_CMS_API_KEY;
  const secret =
    process.env.CMS_API_SECRET || process.env.NEXT_PUBLIC_CMS_API_SECRET;

  const body = { timestamp: timeStamp };
  const payload = Buffer.from(JSON.stringify(body)).toString();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const headers = {
    "X-AUTH-APIKEY": key,
    "X-AUTH-SIGNATURE": signature,
    "X-AUTH-TIMESTAMP": timeStamp.toString(),
    "Content-Type": "application/json",
    "x-host": host || "localhost:3000",
  };

  try {
    const res = await axios.get(`${baseurl}/form/fields/${uid}`, { headers });
    return res.data;
  } catch (err) {
    console.error("Error fetching form fields:", err);
    return null;
  }
}
