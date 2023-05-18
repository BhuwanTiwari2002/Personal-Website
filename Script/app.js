/* The goal of the code below is the welcome screen, currently turning it off. Might uncomment it after I fix some code */

// let website_intro = document.querySelector('.website-intro');
// let website_intro_header = document.querySelector('.website-intro-header');
// let website_intro_logo = document.querySelectorAll('.website-intro-logo');

// window.addEventListener('DOMContentLoaded', () => {
//     setTimeout(() => {
//         website_intro_logo.forEach((span,idx) => { // idx means the index
//             setTimeout(() => {
//                 span.classList.add('active');
//             }, (idx +1) * 400)
//         });

//         setTimeout(() => {
//             website_intro_logo.forEach((span,idx) => { 
//                 setTimeout(() => {
//                     span.classList.remove('active');
//                     span.classList.add('fade')
//                 }, (idx + 1) * 50)
//             })
//         },2000);

//         setTimeout(() => {
//             website_intro.style.top = '-100vh';
//         },2300)
//     })
// });

// Photography Images
const track = document.querySelector(".photography-image-track");
const images = track.getElementsByClassName("photography-image");

/* Creating a function called handleOnDown, that takes an e as a parameter 
and then goes to the photography-image-track HTML element and then set the mouseDown to 
the e parameter's cilentX value */
const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
/* Creating a function called handleOnUp, it sets the mouseDownAt to 0 and then 
sends the prevPercentage from the dataset from the current track dataset  */
const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0" || imageClicked) return; // If there is no mouseDownAt, then don't do anything
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -2%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("photography-image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

// Variable to keep track of the currently clicked image
let currentImage = null;
let imageClicked = false;


// Variables to keep track of the mouse position
let startPos = null;
let endPos = null;

// Add a click event listener to each image element
for (const image of images) {
  image.addEventListener("mousedown", handleMouseDown);
  image.addEventListener("mouseup", handleMouseUp);
}

function handleMouseDown(event) {
  // Check if the user is pressing and scrolling
  if (event.buttons !== 1) {
    return;
  }
  
  // Save the initial cursor position
  startPos = {x: event.clientX, y: event.clientY};
}

function handleMouseUp(event) {
  // Save the end cursor position
  endPos = {x: event.clientX, y: event.clientY};

  // Check if the user scrolled (moved the mouse significantly while pressing the button)
  if (Math.abs(startPos.x - endPos.x) > 5 || Math.abs(startPos.y - endPos.y) > 5) {
    // User scrolled, ignore this event
    return;
  }

    // User clicked, handle the event
    imageClicked = true;
   handleImageClick.call(this, event);
}

function handleImageClick(event) {
  if (currentImage === this) {
    // Clicked the same image again, toggle back to normal size
    this.style.transform = "scale(1)";
    this.style.transition = "transform 0.5s, width 0.5s, height 0.5s, margin 0.5s"; // Smooth transition animation
    this.style.width = "35vmin";
    this.style.height = "42vmin";
    this.style.marginRight = "";  // Reset margin
    this.style.marginLeft = "";
  } else {
    if (currentImage) { // Check if currentImage is not null before trying to access its style property
      // Reset the scale, dimensions and margin of the previously clicked image
      currentImage.style.transform = "scale(1)";
      currentImage.style.width = "35vmin";
      currentImage.style.height = "42vmin";
      currentImage.style.marginRight = "";  // Reset margin
      currentImage.style.marginLeft = "";  // Reset margin
      currentImage.style.transition = "transform 0.5s, width 0.5s, height 0.5s, margin 0.5s"; // Smooth transition animation
    }

    // Increase the size of the clicked image and adjust the margin
    this.style.transform = "scale(1.5)";
    this.style.transition = "transform 0.5s, width 0.5s, height 0.5s, margin 0.5s"; // Smooth transition animation
    this.style.width = "50vmin";
    this.style.height = "42vmin";
    this.style.marginRight = "15vmin"; // Increase margin to prevent overlap
    this.style.marginLeft = "15vmin"; // Increase margin to prevent overlap

  }

  // Update the currently clicked image
  currentImage = (currentImage === this) ? null : this;
  imageClicked = false;
}


/* Intersection Observer is an API, it provides a mechanism to observe and respond to changes in the visiblity of an element on a web 
You can use this API to see what is in the users viewport and see when the user is entering or not entering the element relevate to the view
that the user has
*/

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) { // This means that the user sees the element 
        entry.target.classList.add('show-item');
        console.log("Im Here");
    } else {
      entry.target.classList.remove('show-item');
    }
  });
});


const projects = document.querySelectorAll('.hidden');
projects.forEach((element) => {observer.observe(element)}); // Passing all the elements to the function