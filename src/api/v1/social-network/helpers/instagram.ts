import { Page } from "puppeteer";
import { createCacheImage } from "../../files/helpers/file";
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
    const pPosts = postEdges.map(async (edge: any) => {
      const display_url = await createCacheImage(
        edge.node.display_url,
        edge.node.id
      ); //createe cache images

      return {
        display_url,
        body: edge.node.edge_media_to_caption.edges[0].node.text,
        id: edge.node.id,
      };
    });
    const posts = await Promise.all(pPosts);
    return posts;
  } catch (error) {
    throw error;
  }
};
