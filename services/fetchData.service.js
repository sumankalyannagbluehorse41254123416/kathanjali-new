import axios from "axios";
import crypto from "crypto";

export async function fetchPageData({ host, ...rh }, pageSlug) {
  console.log("host", host);
  console.log("rh", rh);

  const baseurl =  process.env.CMS_BASE_URL || (process.env.NEXT_PUBLIC_CMS_BASE_URL);
  const timeStamp = Date.now();

  const key = process.env.CMS_API_KEY||(process.env.NEXT_PUBLIC_CMS_API_KEY);
  const secret = process.env.CMS_API_SECRET||(process.env.NEXT_PUBLIC_CMS_API_SECRET);

  const body = {
    timestamp: timeStamp,
  };

  const payload = Buffer.from(JSON.stringify(body)).toString();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const headers = {
    // ...rh, // include request headers if needed
    "X-AUTH-APIKEY": key,
    "X-AUTH-SIGNATURE": signature,
    "X-AUTH-TIMESTAMP": timeStamp.toString(),
    "Content-Type": "application/json",
    "x-host": host || "localhost:3000",
  };

  try {
    const response = await axios.get(
      `${baseurl}/page/fetch-single-page/${pageSlug}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
