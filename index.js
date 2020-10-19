const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
const util = require("util");
var url = require("url");
const save = util.promisify(fs.writeFile);

(async function() {
  var browser = await puppeteer.launch({args: ['--no-sandbox']});
  var page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36');
  try {
  while (true) {
  await page.goto("https://9gag.com/shuffle");
  
  var title = await page.evaluate(function() {
  	return document.querySelector("h1").innerText;
  });
  /*var desc = await page.evaluate(async function() {
    var data = await fetch("https://comment-cdn.9gag.com/v1/cacheable/comment-list.json?appId=a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b&url="+location.href+"&count=1000&order=score&origin=https:%2F%2F9gag.com").then(x=>x.json())
    return data.payload.comments.map(x=>x.mediaText).join(" ");
  });*/
  var url = await page.evaluate(function() {
  	return document.querySelector("video source")?document.querySelector("video source").src:false;
  });

  if (url) {
  	console.log(url,title);
    await axios("https://script.google.com/macros/s/AKfycbybvXgP3EsxrEdmMdwOrXB8adNCBP_8_PXDKyB8bv_fHyOJDFA/exec?url="+url+"&title="+title+"&desc="+title);
  	break;
  }
  }
  }
  catch (e) {
    console.log(e.message);
  }
  await browser.close();
})();
