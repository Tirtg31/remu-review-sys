export function queryBuilder(url, query) {
  var newUrl = url;
  if (
    query &&
    Object.keys(query).length > 0 &&
    Object.values(query).find((v) => v && v != "")
  ) {
    newUrl += "?";
    Object.keys(query).map((q, index) => {
      if (query[q]) {
        if (index > 0 && newUrl.charAt(newUrl.length - 1) != "?") {
          newUrl += "&" + q + "=" + query[q];
        } else {
          newUrl += q + "=" + query[q];
        }
      }
    });
  }
  return newUrl;
}
