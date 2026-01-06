let mainColor = localStorage.getItem("color-option")
let mainBackground = localStorage.getItem("background-option")
let backImg = localStorage.getItem("img-back")
let img = document.querySelectorAll("img")
let getRandomNumber = true
let randomNum;
let page = document.querySelector(".landing-page")
let box = document.querySelector(".settings-box")
let gear = document.querySelector(".settings-box .gear i")
let span = document.querySelectorAll(".random-background span")
let randomwall = localStorage.getItem("random-option")
let li = document.querySelectorAll(".colors-list li")
let imgArrays = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let backgroundOption = true
let backgroundInterval;

if(mainColor !== null){
    document.documentElement.style.setProperty('--main-color', mainColor)
    document.querySelectorAll(".colors-list li").forEach(a => {
        a.classList.remove("active")

        if(a.dataset.color === mainColor){
            a.classList.add("active")
        }
    })
}


li.forEach(e => {
    e.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        box.style.setProperty("background-color", e.target.dataset.color);
        document.querySelector(".settings-box .gear").style.setProperty('background-color', "#FFF")
        gear.style.setProperty('color', e.target.dataset.color)
        localStorage.setItem("color-option", e.target.dataset.color)
        // remove active class for all lis
       activecls(e)
    })
})
if (mainBackground !== null) {
    backgroundOption = false;
    page.style.backgroundImage = `url("Images/${mainBackground}")`;
    activeImg(mainBackground)
}

if (randomwall === "yes") {
    backgroundOption = true
    span.forEach(s => {
        s.classList.remove("active");
        if (s.dataset.background === "yes") s.classList.add("active");
    });
    randomizeBack(); // line 105 Function that enable the feature of getting random background at the landing page
} else if (randomwall === "no") {
    span.forEach(s => {
        s.classList.remove("active");
        if (s.dataset.background === "no") s.classList.add("active");
    });
}

span.forEach(e => {
    e.addEventListener("click", (e) => {
        // Remove active class from both spans
        activecls(e)    // Add active to clicked one
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            getRandomNumber = true;
            localStorage.setItem("random-option", "yes");
            randomizeBack();
        } else {
            backgroundOption = false;
            getRandomNumber = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("random-option", "no");
        }
    });
});

function activeImg(ImgeName){
    img.forEach(e => {
        if(e.dataset.bg === ImgeName){
            e.classList.add("active")
        } else{
            e.classList.remove("active")
        }

    })
    localStorage.setItem("img-Active", ImgeName)
}
img.forEach(e => {
    e.addEventListener("click", (a) => {
        if(backgroundOption === false){
            const imgName = e.dataset.bg
            page.style.backgroundImage = `url("../Images/${imgName}")`
            activeImg(imgName)
        }
    })
})

// function to disable or enable the feature of getting random background at the landing page
function randomizeBack(){
        if(backgroundOption === true){
                backgroundInterval = setInterval(() => {

                    function randomNums(){ // getting random numbers to loop in the array through to target the images and frequently changes
                        if(getRandomNumber === true){
                            randomNum = Math.floor(Math.random() * imgArrays.length)
                            const currentImage = imgArrays[randomNum];
                            page.style.backgroundImage = `url("Images/${currentImage}")`;
                            localStorage.setItem("background-option", currentImage);
                            activeImg(currentImage) //Active class to Image
                        } else{
                            clearInterval(backgroundInterval)

                        }
                    }
                    randomNums()
                    page.style.backgroundImage = `url("Images/${imgArrays[randomNum]}")`
                }, 1000)
        }
}

    gear.onclick = function(){
        box.classList.toggle("open")
        this.classList.toggle("fa-spin")
    }


    let ourSkills = document.querySelector(".skills");

    window.onscroll = function () {
        // Skills Offset Top
        let skillsOffsetTop = ourSkills.offsetTop;
    
        // Skills Offset Height
        let skillsOffsetHeight = ourSkills.offsetHeight;
    
        // Window Inner Height
        let windowHeight = window.innerHeight;
    
        // Window Scroll Top
        let windowScrollTop = window.pageYOffset;
    
        // Condition to check if .skills section is in the viewport
        if (windowScrollTop > (skillsOffsetTop + skillsOffsetHeight - windowHeight - 30)) {
            document.querySelectorAll(".skills-box .skill-progress span").forEach(skill => {
                skill.style.width = skill.dataset.progress
            })
        }
    };


    // create PopUp with images

    let ourGallery = document.querySelectorAll(".gallery img")
    let Gallery = document.querySelector(".gallery")


ourGallery.forEach(img => {
    img.addEventListener("click", (eveny) => {
        // Create overlay Element
        let overlay = document.createElement("div")
        overlay.className = 'overlay-pop'
        document.body.appendChild(overlay)
        let closeBtn = document.createElement("span")
                let btnText = document.createTextNode("X")
                closeBtn.appendChild(btnText)
                closeBtn.className = 'close-button';
                //create poppup box
                let boxPopup = document.createElement("div")
                boxPopup.appendChild(closeBtn)
                boxPopup.className = 'pop-box'
                // img Text 
                if(img.alt !== null){
                    // creat Heading
                    let imgHeading = document.createElement("h2")
                    let altImg = document.createTextNode(img.alt)
                    imgHeading.appendChild(altImg)
                    boxPopup.appendChild(imgHeading)
                }
                //creat popup Image
                let imgPopup = document.createElement("img")
                imgPopup.src = img.src
                boxPopup.appendChild(imgPopup)
                document.body.appendChild(boxPopup)
                closeBtn.onclick = function (){
                    overlay.remove()
                    boxPopup.remove()
                }
            
    })
})
let links = document.querySelectorAll(".links a")
let bullets = document.querySelectorAll(".nav-bullets .bullets")

// select all bullets
function scrolltoView(element){
    element.forEach(ele => {
        ele.addEventListener("click", (a) => {
            a.preventDefault()
            document.querySelector('.' + a.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

scrolltoView(bullets)
scrolltoView(links)

// HAndle function active clasll


function activecls(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(e =>{
        e.classList.remove("active")
    })
    ev.target.classList.add("active")
}

// show and Hide bullets

let bulletSpan = document.querySelectorAll(".bullets-option span")
let bulletContainer = document.querySelector(".nav-bullets")
let bulletStorage = localStorage.getItem("bullet-being")

if(bulletStorage !== null){
    bulletSpan.forEach(span => {
        span.classList.remove("active")
    })
    if(bulletStorage === 'block'){
        document.querySelector(".bullets-option .yes").classList.add("active")
        bulletContainer.style.display = 'block'
    }else{
        document.querySelector(".bullets-option .no").classList.add("active")
        bulletContainer.style.display = 'none'
    }
}
bulletSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.background === 'yes'){
            bulletContainer.style.display = 'block'
            localStorage.setItem("bullet-being", 'block')
        } else{
            bulletContainer.style.display = 'none'
            localStorage.setItem("bullet-being", 'none')

        }
        activecls(e)
    })
})

// Reset the whole settings

let reset = document.querySelector(".reset")


reset.onclick = function (){
    localStorage.clear()
    window.location.reload()
}


// Toggele Area
let toggleBtn = document.querySelector(".toggle-menu")
let toggleLinks = document.querySelector(".links")

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active")
    toggleLinks.classList.toggle("open")

}

document.addEventListener("click", (e) => {
    if(e.target !== toggleBtn && e.target !== toggleLinks){
        // check if there is a class open

        if(toggleLinks.classList.contains("open")){
    toggleBtn.classList.toggle("menu-active")
    toggleLinks.classList.toggle("open")

        }
    }
})

//stop propagation on the menu

toggleLinks.onclick = function (e){
    e.stopPropagation();
}