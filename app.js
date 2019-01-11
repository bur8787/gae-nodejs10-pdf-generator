const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

const ejs = require('ejs')
const fs = require('fs');

app.use(async (req, res) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  const template = fs.readFileSync('./template.html', 'utf-8');

  const data = {
    header: {
      title: "This is title.",
      date: new Date().toLocaleDateString()
    },
    table: {
      data1: "This is data1.",
      data2: "This is data1.",
      data3: "This is data1.",
    }
  }

  const html = ejs.render(template, data);

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
});
const server = app.listen(process.env.PORT || 8080, err => {
  if (err) return console.error(err);
  const port = server.address().port;
  console.info(`App listening on port ${port}`);
});
