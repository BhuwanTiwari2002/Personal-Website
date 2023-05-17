const backgroundCursor = document.getElementById('background-mouse');

const timeout = setTimeout(backgroundHover(), 50000)
function backgroundHover() {
  document.body.onpointermove = event => {
    let clientX = event.x;
    let clientY = event.y;
    // This will snap it into the center of the object
    // backgroundCursor.style.left = clientX + "px";
    // backgroundCursor.style.top = clientY + "px";

    backgroundCursor.animate({
      left: clientX + "px",
      top: clientY + "px"
    }, {duration: 3000, fill: "forwards"}); // The fill forwards doesn't reset the property
  }
}
