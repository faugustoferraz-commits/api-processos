import express from "express";
import { chromium } from "playwright";

const app = express();
app.use(express.json());

app.post("/buscar", async (req, res) => {
  try {
    const { link } = req.body;

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(link, { waitUntil: "networkidle" });

    const resultado = await page.content();

    await browser.close();
    res.json({ ok: true, html: resultado });

  } catch (e) {
    res.json({ ok: false, erro: e.message });
  }
});

app.listen(process.env.PORT || 3000);

