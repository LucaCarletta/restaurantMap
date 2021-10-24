//Wartet bis Dom geladen ist
document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("submitbutton").onclick = () => {
        var src = document.getElementById("image");
        var prices = document.getElementsByName('preis');
        //Default Price Option
        var price = 1


        // Get Value from Radio Buttons
        for (let i of prices) {
            if (i.checked) {
                price = i.value
            }
        }

        //Erdstellt Bild Element
        var img = document.createElement("img");
        img.classList.add("img-fluid")

        //macht API Request mit spezifischem Preis Bekommt Blob zurück
        fetch(`http://localhost:5000?price=${price}`)
            .then(response => response.blob())
            .then(function (myBlob) {
                //Erstellt URL von einem Blob Element
                var objectURL = URL.createObjectURL(myBlob);
                img.src = objectURL;
                //fügt Bild dem Div hinzu
                src.hasChildNodes() ? src.replaceChild(img, src.childNodes[0]) : src.appendChild(img)
            })
            .catch(error => console.error(error))


    }
});
