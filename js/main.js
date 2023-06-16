let getImg = (link) => {
  let img = document.createElement("img");
  img.title = `${link}`;
  img.src = link;
  img.classList.add("img-fluid");
  // img.width = width;
  // img.height = height;
  return img;
};

async function getData() {
  let apiLink = "https://api.nasa.gov/planetary/apod";
  let apiKey = "lwybxbzSD8wb61dithRPyr0JBJYTMvex6rEjdf1W";
  try {
    let fResponse = await fetch(`${apiLink}?api_key=${apiKey}`);
    let toJson = fResponse.json();
    return toJson;
  } catch (error) {
    console.error(` i'm the Error ${error}`);
  } finally {
  }
}
let response = getData();

response
  .then((finalLength) => {
    return finalLength;
  })
  .then((use) => {
    if (use.media_type === "image") {
      let resized = getImg(use.url);
      return resized;
    }
  })
  .then((returned) => {
    let position = document.querySelector(".imageContainer");
    position.append(returned);
  });

response.then((data) => {
  let explain = document.querySelector(".explanation");
  explain.prepend(document.createTextNode(data.explanation));
  let date = document.querySelector(".Date");
  date.append(document.createTextNode(data.date));
  let tit = document.querySelector(".title");
  tit.append(document.createTextNode(data.title));
  let copyRights = document.querySelector(".copyRights");
  copyRights.append(
    document.createTextNode(`copyrights for ${data.copyright || "NASA"}`)
  );
});
