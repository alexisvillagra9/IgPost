import puppeteer from "puppeteer";

export const openBrowser = async () => {
  try {
    console.log("Opening the browser......");
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
    return browser;
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
};
