/* Created by Tivotal */

let input = document.querySelector("input");
let btn = document.querySelector("button");

btn.addEventListener("click", (e) => {
  //preventing form to submit
  e.preventDefault();

  //changing btn text
  btn.innerText = "Downloading File";

  //function to download file
  downloadFile(input.value);
});

function downloadFile(url) {
  //fetching file and returning it as blob
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      //creating temporary url of passed object
      let tempUrl = URL.createObjectURL(file);

      //creating new a tag
      let aTag = document.createElement("a");

      //passing temp url to a tag
      aTag.href = tempUrl;

      //passing file last name and extension as download value
      aTag.download = url.replace(/^.*[\\\/]/, "");

      //adding a tag into body
      document.body.appendChild(aTag);

      //clicking a tag will download the file
      aTag.click();

      //removing a tag once the file is downloaded
      aTag.remove();

      //removing temp url from the document

      URL.revokeObjectURL(tempUrl);

      //changing button text
      btn.innerText = "Download File";
    })
    .catch(() => {
      //catch method will cal when any error accurs

      //changing button text
      btn.innerText = "Download File";

      //making alert
      alert("Failed to download the file");
    });
}
