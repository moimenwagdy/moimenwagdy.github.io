let getImg = (link) => {
  let img = document.createElement("img");
  img.title = `${link}`;
  img.src = link;
  img.classList.add("img-fluid");
  return img;
};

let getVideo = (link) => {
  let newLink = link.replace("watch?v=", "embed/");
  let regEx =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  let vidId = newLink.match(regEx)[1];
  let vid = document.querySelector(".vid-loc");
  vid.src = `https://www.youtube.com/embed/${vidId}`;
  vid.title = "YouTube video player";

  return vid;
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
let position = document.querySelector(".imageContainer");
let hideToogle = document.querySelector(".hideToggle");
let imgcont = document.querySelector(".removableImgCont");
let vidcont = document.querySelector(".vidContainer");
let myImg = document.querySelector(".img-big");

response.then((use) => {
  if (use.media_type === "image") {
    vidcont.style.cssText = "display:none !important";
    let myImage = getImg(use.url);
    position.append(myImage);
  }
  if (use.media_type === "video") {
    imgcont.style.cssText = "display:none !important; ";
    return getVideo(use.url);
  }

  position.addEventListener("click", () => {
    hideToogle.classList.toggle("d-flex");
    hideToogle.classList.toggle("d-none");
    myImg.src = use.url;
  });
});
hideToogle.addEventListener("click", () => {
  hideToogle.classList.toggle("d-flex");
  hideToogle.classList.toggle("d-none");
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
