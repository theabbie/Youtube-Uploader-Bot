const axios = require("axios");
var rgag = require("random-gag");

(async function() {
  var gag = await rgag();
  while (gag.type=="Photo") gag = await rgag();
  var url = gag.images.image460sv.url;
  var title = gag.title;
  await axios("https://script.google.com/macros/s/AKfycbybvXgP3EsxrEdmMdwOrXB8adNCBP_8_PXDKyB8bv_fHyOJDFA/exec?url="+url+"&title="+title+"&desc="+title);
})();
