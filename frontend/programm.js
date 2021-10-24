document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("submitbutton").onclick = () => {

        var img = document.createElement("img");

        img.src = "image.png";
        var src = document.getElementById("x");

        src.appendChild(img);
        console.log("Hello World")
    }
});
