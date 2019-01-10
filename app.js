const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

const fs = require('fs');

app.use(async (req, res) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  const html = fs.readFileSync('./template.html', 'utf-8');

  await page.setContent(html);
  const pdf = await page.pdf({
    format: 'A4',
    margin: {
      top: "20px",
      left: "20px",
      right: "20px",
      bottom: "20px"
    }
  });

  await browser.close();

  res.set('Content-Type', 'application/pdf');
  res.send(pdf);

  // res.send(html);
  // res.send("Hello, World");
});
const server = app.listen(process.env.PORT || 8080, err => {
  if (err) return console.error(err);
  const port = server.address().port;
  console.info(`App listening on port ${port}`);
});
