function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  console.log("xhr",xhr)
  xhr.onload = function () {
    callback(this.responseText)
  };
  // xhr.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  // xhr.setHeader('Access-Control-Allow-Credentials', true);
  xhr.open("GET", url, true);
  xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
  xhr.send();
}

export function getUsefulContents(url, callback) {
  getJSON(
    url,
    data => callback(JSON.parse(data))
  );
}
