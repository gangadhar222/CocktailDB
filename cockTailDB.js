var mainDiv = document.getElementById("cocktail")
function getData() {
    var carouselDiv = document.getElementById("carouselDiv")
    carouselDiv.style.display = "none"
    var result = null;
    var start_char = document.getElementById("name").value
    if (start_char.length == 1) {
        var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + start_char
    }
    else {
        var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + start_char
    }
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url);
    xhr.send()
    xhr.onload = function () {
        if (xhr.status == 200) {
            result = xhr.response;
            createObj(result)
        }
        else {
            console.log("Error Code is:" + xhr.status);
        }
    }
}
// here im parsing the response
function createObj(json) {
    var obj1 = JSON.parse(json)
    displayDrinks(obj1)
}
// takes response and displays drinks depending on the input query entered
function displayDrinks(obj) {
    var arr = obj.drinks
    var len = obj.drinks.length
    while (mainDiv.firstChild) {
        mainDiv.removeChild(mainDiv.firstChild);
    }
    for (i = 0; i < len; i++) {
        var btn = document.createElement('button')
        btn.textContent = "Show Ingredients"
        btn.setAttribute("id", arr[i].idDrink)
        btn.setAttribute("data-toggle", "modal")
        btn.setAttribute("data-target", "#exampleModalScrollable")
        btn.setAttribute("class", "btn btn-success")
        btn.addEventListener('click', showIngredients)
        var link = arr[i].strDrinkThumb
        var name = arr[i].strDrink
        var parDiv = document.createElement('div')
        parDiv.setAttribute("class", "card")
        parDiv.setAttribute("style", "width: 18rem")
        var img = document.createElement("img")
        img.setAttribute("src", link)
        img.setAttribute("class", "img-fluid")
        var childDiv = document.createElement('div')
        childDiv.setAttribute("class", "card-body")
        var h5 = document.createElement('h5')
        h5.setAttribute("class", "center-text")
        h5.innerHTML = name
        childDiv.append(h5, btn)
        parDiv.append(img, childDiv)
        parDiv.setAttribute("class", "col-12 col-md-6 col-lg-4")
        parDiv.setAttribute("name", "cockTails")
        mainDiv.append(parDiv)
    }
    var modalDiv = document.createElement("div")
    function showIngredients(event) {
        modalDiv.innerHTML = ''
        var button = event.target
        var id = button.id
        var arr = obj.drinks
        var len = obj.drinks.length
        var body = document.querySelector("body")
        for (var i = 0; i < len; i++) {
            if (id === arr[i].idDrink) {
                var div1 = document.createElement("div")
                var div2 = document.createElement("div")
                var div3 = document.createElement("div")
                var div4 = document.createElement("div")
                var div5 = document.createElement("div")
                var div6 = document.createElement("div")
                var h5 = document.createElement("h5")
                var b1 = document.createElement("button")
                var b2 = document.createElement("button")
                b2.textContent = "close"
                var span1 = document.createElement("span")
                div1.setAttribute("class", "modal fade")
                div1.setAttribute("id", "exampleModalScrollable")
                div1.setAttribute("tabindex", "-1")
                div1.setAttribute("role", "dialog")
                div1.setAttribute("aria-labelledby", "exampleModalScrollable")
                div1.setAttribute("aria-hidden", "true")
                div2.setAttribute("class", "modal-dialog modal-dialog-scrollable")
                div2.setAttribute("role", "document")
                div3.setAttribute("class", "modal-content")
                div4.setAttribute("class", "modal-header")
                div5.setAttribute("class", "modal-body")
                div6.setAttribute("class", "modal-footer")
                h5.setAttribute("class", "modal-title")
                h5.setAttribute("id", "exampleModalScrollableTitle")
                h5.textContent = "Ingredients"
                span1.setAttribute("aria-hidden", "true")
                b1.setAttribute("type", "button")
                b1.setAttribute("class", "close")
                b1.setAttribute("data-dismiss", "modal")
                b1.setAttribute("aria-label", "Close")
                b2.setAttribute("class", "btn btn-secondary")
                b2.setAttribute("data-dismiss", "modal")
                b2.setAttribute("type", "button")
                var h31 = document.createElement("h3")
                var h32 = document.createElement("h3")
                var h33 = document.createElement("h3")
                var h34 = document.createElement("h3")
                h31.textContent = arr[i].strIngredient1
                h32.textContent = arr[i].strIngredient2
                h33.textContent = arr[i].strIngredient3
                h34.textContent = arr[i].strIngredient4
                div5.append(h31, h32, h33, h34)
                b1.append(span1)
                div4.append(h5, b1)
                div6.append(b2)
                div3.append(div4, div5, div6)
                div2.append(div3)
                div1.append(div2)
                modalDiv.append(div1)
                body.append(modalDiv)
            }
        }
    }
}



// gets image from the api
function carousel(img) {
    var win = new XMLHttpRequest()
    win.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/random.php')
    win.send()
    win.onload = function () {
        var res = JSON.parse(win.response)
        img.setAttribute('height', 600);
        img.setAttribute('src', res['drinks'][0]['strDrinkThumb'])
    }
}

// helps in making carousel images
function getImg() {
    var img1 = document.getElementById('img1')
    var img2 = document.getElementById('img2')
    var img3 = document.getElementById('img3')
    img1.setAttribute('src', carousel(img1))
    img2.setAttribute('src', carousel(img2))
    img3.setAttribute('src', carousel(img3))
}
getImg()