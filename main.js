
// Star Code
let globalCLientWidth = document.documentElement.clientWidth;
let globalClientHeight = document.documentElement.clientHeight;
console.log("width: " + globalCLientWidth);
console.log("height: " + globalClientHeight);

function generateRandomStarLocations(maxWidth, maxHeight, amount) {
  let starList = [];

  for (let i = 0; i < amount; i++) {
    let starPositionX = Math.floor(Math.random() * ((maxWidth) + 1))
    let starPositionY = Math.floor(Math.random() * ((maxHeight - (maxHeight * .1)) + 1))

    let star = {
      "x": starPositionX,
      "y": starPositionY
    }
    starList.push(star)
  }
  return starList;
}

const starContainer = document.querySelector(".star-group-svg");
const starAmount = globalCLientWidth > 1000 ? 200 : 100;

/* Lots of code and inspiration from https://www.satellytes.com/blog/twinkling-night-sky-with-shooting-stars-made-in-svg */
generateRandomStarLocations(globalCLientWidth, globalClientHeight, starAmount).forEach(starCordinates => {
  const starBox = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  const brightness = 1 * (Math.random()) + .5 // prevents low light stars like .1
  const delay = 100 + (Math.random() * 500);
  const duration = 3000 + (Math.random() * 4000);
  const radius = .5 + Math.random();

  star.classList.add("star");
  star.setAttribute("r", radius)
  starBox.setAttribute("transform", `translate(${starCordinates.x}, ${starCordinates.y})`);

  star.style.setProperty('--star-brightness', `${brightness}`);
  star.style.setProperty('--star-animation-delay', `${delay}ms`);
  star.style.setProperty('--star-animation-duration', `${duration}ms`);
  star.style.setProperty('--star-animation-glow-duration', `10000ms`);

  starBox.appendChild(star);
  starContainer.appendChild(starBox);
});


// Dragging Photos Code
const container = document.querySelector(".main-container");
var draggablePhotos = container.querySelectorAll("div.photo-card");

draggablePhotos.forEach(photo => {
  photo.addEventListener("mousedown", dragStart);
  photo.addEventListener("touchstart", dragStart)
});

function dragStart(event) {
  event.preventDefault();
  event.target.style.position = 'absolute';
  event.target.style.zIndex = 9999;

  let currentPosX = 0, currentPosY = 0, previousPosX = 0, previousPosY = 0;
  previousPosX = event.clientX;
  previousPosY = event.clientY;

  const targetObject = event.target

  if (event.type === "touchstart") {

    function onTouchMove(event) {
      event.preventDefault()
      checkForBoundaryBox(targetObject)

      currentPosX = previousPosX - event.touches[0].clientX;
      currentPosY = previousPosY - event.touches[0].clientY;

      previousPosX = event.touches[0].clientX;
      previousPosY = event.touches[0].clientY;

      targetObject.style.top = (targetObject.offsetTop - currentPosY) + 'px';
      targetObject.style.left = (targetObject.offsetLeft - currentPosX) + 'px';
    }

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', shutDownTemporaryEventListeners)

    function shutDownTemporaryEventListeners(event) {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', shutDownTemporaryEventListeners);
    }

  } else {

    function onMouseMove(event) {
      event.preventDefault()
      checkForBoundaryBox(targetObject)

      currentPosX = previousPosX - event.clientX;
      currentPosY = previousPosY - event.clientY;

      previousPosX = event.clientX;
      previousPosY = event.clientY;

      targetObject.style.top = (targetObject.offsetTop - currentPosY) + 'px';
      targetObject.style.left = (targetObject.offsetLeft - currentPosX) + 'px';
    }

    document.addEventListener('mouseup', shutDownTemporaryEventListeners);
    document.addEventListener('mousemove', onMouseMove);

    function shutDownTemporaryEventListeners(event) {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', shutDownTemporaryEventListeners);
    }
  }
};

function checkForBoundaryBox(targetObject) {
  
  // LEFT
  if (targetObject.offsetLeft < 0) {
    targetObject.style.left = targetObject.offsetLeft + 10 + 'px'
  }

  // RIGHT
  else if (targetObject.offsetLeft > globalCLientWidth - targetObject.clientWidth) {
    targetObject.style.left = targetObject.offsetLeft - 10 + 'px'
  }

  // TOP
  else if (targetObject.offsetTop < 0) {
    targetObject.style.top = targetObject.offsetTop + 10 + 'px'
  }

  // BOTTOM
  else if (targetObject.offsetTop > globalClientHeight) {
    targetObject.style.top = targetObject.offsetTop - 10 + 'px'
  }
}