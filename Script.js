let popupManager;

let backgroundRectWidth = 600;
let backgroundRectHeight = 400;

let popupWidth = 500;
let popupHeight = 300;

let backgroundText = 'Click Here';
let regular;
let popupFont;

let backgroundButtonX = 0;
let backgroundButtonY = 100;
let backgroundWidth = 290;
let backgroundHeight = 50;

let types = ['rectangle', 'circle', 'triangle'];

let popupTexts = [
  'Win a thousand-dollar gift card. Click!',
  'Congratulations!Take your chance to get a $500 gift card!',
  'Virus has been detected!',
  'Wait 5 seconds',
  'this is not an ad. This is a survey',
];

function preload() {
  regular = loadFont('Fontspring-DEMO-aktifoa-semibold.otf');
  popupFont = loadFont('Comic Sans MS Bold.ttf');
}

//  255, 105, 0

let colorRange = [
  [255, 0, 0],
  [255, 244, 0],
  [0, 255, 236],
  [150, 255, 0],
  [246, 0, 149],
  [255, 105, 0],
];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  popupManager = new PopupManger(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth,
    windowHeight,
    types,
    colorRange,
    popupTexts,
    popupFont
  );
}

function draw() {
  background(100);

  drawBackgroundElements();
  popupManager.draw();
}

function drawBackgroundElements() {
  //Back
  fill(100, 150, 200);
  rect(
    -backgroundRectWidth / 2,
    -backgroundRectHeight / 2,
    backgroundRectWidth,
    backgroundRectHeight
  );
  noStroke();

  //Button
  push();
  fill(100, 200, 250);
  rectMode(CENTER);
  noStroke();
  rect(backgroundButtonX, backgroundButtonY, backgroundWidth, backgroundHeight);
  // corner
  pop();

  //3D Shape
  if (popupManager.isClickAllowed()) {
    push();
    fill(250);
    rotateX(frameCount * 0.02);
    rotateY(frameCount * 0.02);
    box(70);
    pop();
  }

  //Text "Click Here"
  textFont(regular);
  fill(250);
  textAlign(CENTER);
  textSize(20);
  if (popupManager.isClickAllowed()) {
    text('Click Here to Win 100 Bucks', 0, 108);
  } else {
    text('Close popups first', 0, 108);
  }
}

function mouseClicked() {
  if (
    isInBackgroundButton(
      mouseX,
      mouseY,
      backgroundButtonX,
      backgroundButtonY,
      backgroundWidth,
      backgroundHeight
    ) &&
    popupManager.isClickAllowed()
  ) {
    popupManager.generatePopups(1);
    return;
  }
  popupManager.removePopup(mouseX, mouseY);

  //popupManager.addPopup(new Popup(mouseX, mouseY, popupWidth, popupHeight, [255, 0, 0]));
}

function isInBackgroundButton(
  x,
  y,
  buttonX,
  buttonY,
  buttonWidth,
  buttonHeight
) {
  return (
    y >= windowHeight / 2 + buttonY - buttonHeight / 2 &&
    y <= windowHeight / 2 + buttonY + buttonHeight / 2 &&
    x >= windowWidth / 2 + buttonX - buttonWidth / 2 &&
    x <= windowWidth / 2 + buttonX + buttonWidth / 2
  );
}
