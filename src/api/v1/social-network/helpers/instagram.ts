import { Page } from "puppeteer";
import { getPostByHashtagService } from "../services/instagram";
import { openBrowser } from "./browser";

export const login = async (page: Page) => {
  try {
    // Go to instagram and wait to load page
    await page.goto("https://www.instagram.com/?hl=es");
    await page.waitForSelector('input[name="username"]');

    // Get and Set username and password fields
    await page.type('input[name="username"]', "ivillagra9");
    await page.type('input[name="password"]', "sooft123456");

    // Submit
    await page.click('button[type="submit"]');
    await page.waitForSelector('input[placeholder="Buscar"]');
  } catch (error) {
    console.log(error);
  }
};

export const scrap = async () => {
  try {
    const hashtag = "vacantestemporales";
    const browser = await openBrowser();
    if (!browser) return; // Not redirect

    // Open and Get Browser
    const page = await browser.newPage();

    // Login IG
    await login(page);

    await page.goto(`https://www.instagram.com/explore/tags/${hashtag}/?hl=es`);

    //
  } catch (error) {
    console.log(error);
  }
};

export const getPostByHashtagHelper = async (hashtag: string) => {
  try {
    const rawPost = await getPostByHashtagService(hashtag);
    const postEdges: any[] =
      rawPost.graphql.hashtag.edge_hashtag_to_media.edges;
    const post = postEdges.map((edge: any) => {
      return {
        display_url: edge.node.display_url,
        body: edge.node.edge_media_to_caption.edges[0].node.text,
      };
    });
    return post;
  } catch (error) {
    throw error;
  }
};
