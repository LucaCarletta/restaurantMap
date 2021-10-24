document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("submitbutton").onclick = () => {

        var img = document.createElement("img");
        img.classList.add("img-fluid")
        img.src = "bsp/Map.png";
        var src = document.getElementById("image");

        src.appendChild(img);
        console.log("Hello World")
    }
});
