
let getImg = (link, width, height) => {
    let img = document.createElement("img");
    img.title = `${link}`;
    img.src = link;
    img.width = width;
    img.height = height;
    return img;
  };
  
  async function getData() {
    let apiLink = "https://api.nasa.gov/planetary/apod"; //
    let apiKey = "t9i0HnTfud3FPd4hDQVrKGcN3UpYuMRcXbcZ7uU9";
    try {
      let rr = await fetch(`${apiLink}?api_key=${apiKey}`);
      let ff = rr.json();
      return ff;
    } catch (error) {
      console.error(` i'm the Error ${error}`);
    } finally {
      console.log("continued");
    }
  }
  getData()
    .then((finalLength) => {
      console.log(finalLength);
      return finalLength;
    })
    .then((use) => {
      let resized = getImg(use.url, 350, 350);
      return resized;
    })
    .then((returned) => {
      let position = document.querySelector(".imageContainer");
      position.append(returned);
    });
  
  getData().then((data) => {
    let explain = document.querySelector(".explanation");
    explain.prepend(document.createTextNode(data.explanation));
    let date = document.querySelector(".Date");
    date.append(document.createTextNode(data.date));
    let tit = document.querySelector(".title");
    tit.append(document.createTextNode(data.title));
    let copyRights = document.querySelector(".copyRights");
    copyRights.append(
      document.createTextNode(`copyrights for ${data.copyright}`)
    );
  });
  