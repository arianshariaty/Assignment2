class PopupManger {
  constructor(
    xTranslate,
    yTranslate,
    windowWidth,
    windowHeight,
    typeArray,
    colorRange,
    popupTexts,
    font
  ) {
    this.clicked = 0;
    this.popups = [];
    this.xTranslate = xTranslate;
    this.yTranslate = yTranslate;
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.firstClick = false;
    this.time = 0;
    this.typeArray = typeArray;
    this.colorRange = colorRange;
    this.popupTexts = popupTexts;
    this.font = font;
  }

  addPopup(popup) {
    this.popups.push(popup);
  }

  removePopup(posx, posy) {
    for (let i = this.popups.length - 1; i >= 0; i--) {
      if (this.popups[i].isPointInShape(posx, posy)) {
        // console.log("popup window:", this.popups[i])
        if (this.popups[i].isPointInClose(posx, posy)) {
          this.popups[i].clicked++;
          this.popups[i].changeClosePos();
          if (this.popups[i].clicked >= this.popups[i].timeToRemove) {
            this.popups.splice(i, 1);
            this.firstClick = true;
          }
        }
        break;
      }
    }
  }

  isClickAllowed() {
    return this.popups.length == 0;
  }

  generatePopups(num) {
    for (let i = 0; i < num; i++) {
      let tmpType = random(this.typeArray);
      let tmpWidth = Math.floor(random(300, 500));
      let tmpHeight = Math.floor((tmpWidth / 5) * 3);
      let tmpColor = random(this.colorRange);
      let timeToRemove = Math.floor(random(1, 4));

      let tmpText = random(this.popupTexts);
      let tmpY;
      let tmpX;
      if (tmpType == 'rectangle') {
        tmpX = Math.floor(random(0, windowWidth - tmpWidth));
        tmpY = Math.floor(random(0, windowHeight - tmpHeight));
      } else if (tmpType == 'circle') {
        tmpX = Math.floor(random(tmpWidth / 2, windowWidth - tmpWidth / 2));
        tmpY = Math.floor(random(tmpWidth / 2, windowHeight - tmpWidth / 2));
      } else {
        tmpX = Math.floor(random(tmpWidth / 2, windowWidth - tmpWidth));
        tmpY = Math.floor(random(tmpWidth / 2, windowHeight - tmpHeight));
      }

      this.addPopup(
        new Popup(
          tmpX,
          tmpY,
          tmpWidth,
          tmpHeight,
          tmpColor,
          tmpType,
          timeToRemove,
          tmpText,
          this.font
        )
      );
    }
  }
  draw() {
    if (this.firstClick && this.popups.length < 30) {
      if (this.time >= 50) {
        this.generatePopups(1);
        this.time = 0;
      } else if (this.popups.length == 0) {
        this.generatePopups(1);
      }
      this.time++;
    }

    if (this.popups.length > 0 && !this.firstClick) {
      this.popups[this.popups.length - 1].draw(
        this.xTranslate,
        this.yTranslate
      );
    } else {
      for (let i = 0; i < this.popups.length; i++) {
        this.popups[i].draw(this.xTranslate, this.yTranslate);
      }
    }

    this.time = this.time % 100000000;
  }
}
