class Popup {
  constructor(x, y, w, h, color, type, timeToRemove, text, font) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.type = type;
    this.closeW = 10;
    this.closeGap = 10;
    this.closeX = this.x;
    this.closeY = this.y;
    this.clicked = 0;
    this.timeToRemove = timeToRemove;
    this.text = text;
    this.font = font;

    this.textX = this.x;
    this.textY = this.y;
    if (this.type == 'rectangle') {
      this.closeX = this.x + this.w - this.closeW - this.closeGap;
      this.closeY = this.y + this.closeGap;
      this.textX = this.x + this.w / 2;
      this.textY = this.y + this.h / 2;
    } else if (this.type == 'circle') {
      this.closeX = this.x;
      this.closeY = this.y - this.w / 2 + this.closeGap;
      this.textX = this.x;
      this.textY = this.y;
    } else if (this.type == 'triangle') {
      this.closeX = this.x + this.w / 2 - this.closeW / 2;
      this.closeY = this.y + this.closeGap;
      this.textX = this.x + this.w / 2;
      this.textY = this.y + this.h / 4;
    }
  }

  changeColor(newColor) {
    this.color = newColor;
  }

  isPointInShape(x, y) {
    if (this.type == 'rectangle') {
      return (
        x >= this.x &&
        x <= this.x + this.w &&
        y >= this.y &&
        y <= this.y + this.h
      );
    }
    if (this.type == 'circle') {
      return (
        x >= this.x - this.w / 2 &&
        x <= this.x + this.w / 2 &&
        y >= this.y - this.w / 2 &&
        y <= this.y + this.w / 2
      );
    }
    if (this.type == 'triangle') {
      return (
        x >= this.x + this.w / 2 - this.closeW / 2 &&
        x <= this.x + this.w / 2 + this.closeW / 2 &&
        y >= this.y &&
        y <= this.y + this.h
      );
    }
    return false;
  }

  isPointInClose(x, y) {
    return (
      x >= this.closeX &&
      x <= this.closeX + this.closeW &&
      y >= this.closeY &&
      y <= this.closeY + this.closeW
    );
  }

  changeClosePos() {
    if (this.type == 'rectangle') {
      this.closeX = random(this.closeGap, this.w - this.closeGap) + this.x;
      this.closeY = random(this.closeGap, this.h - this.closeGap) + this.y;
    } else if (this.type == 'circle') {
      this.closeY =
        random(
          -this.w / 2 + this.closeGap,
          this.w / 2 - this.closeW - this.closeGap
        ) + this.y;
    } else if (this.type == 'triangle') {
      this.closeY =
        random(this.closeGap, this.h - this.closeW - this.closeGap) + this.y;
    }
  }

  draw(xTranslate, yTranslate) {
    textFont(this.font);
    if (this.type == 'rectangle') {
      fill(this.color[0], this.color[1], this.color[2], 255);
      rect(this.x - xTranslate, this.y - yTranslate, this.w, this.h);

      // stroke(0);
      fill(0);
      rect(
        this.closeX - xTranslate,
        this.closeY - yTranslate,
        this.closeW,
        this.closeW
      );
      // line(this.closeX - xTranslate, this.closeY - yTranslate, this.closeX + this.closeW - xTranslate, this.closeY + this.closeW - yTranslate)
      // line(this.closeX - xTranslate + this.closeW, this.closeY - yTranslate, this.closeX - xTranslate, this.closeY + this.closeW - yTranslate)
      noStroke();
      textAlign(CENTER);
      textSize(((this.w * 80) / 100) * (1 / this.text.length) * 1.5);
      text(this.text, this.textX - xTranslate, this.textY - yTranslate);
    } else if (this.type == 'circle') {
      fill(this.color[0], this.color[1], this.color[2], 255);
      ellipse(this.x - xTranslate, this.y - yTranslate, this.w, this.w, 100);

      // stroke(0);
      fill(0);
      rect(
        this.closeX - xTranslate,
        this.closeY - yTranslate,
        this.closeW,
        this.closeW
      );
      // line(this.closeX - xTranslate, this.closeY - yTranslate, this.closeX + this.closeW - xTranslate, this.closeY + this.closeW - yTranslate)
      // line(this.closeX - xTranslate + this.closeW, this.closeY - yTranslate, this.closeX - xTranslate, this.closeY + this.closeW - yTranslate)
      noStroke();
      textAlign(CENTER);
      textSize(((this.w * 80) / 100) * (1 / this.text.length) * 1.5);
      text(this.text, this.textX - xTranslate, this.textY - yTranslate);
    } else if (this.type == 'triangle') {
      fill(this.color[0], this.color[1], this.color[2], 255);
      let newX = this.x - xTranslate;
      let newY = this.y - yTranslate;
      triangle(
        newX,
        newY,
        newX + this.w,
        newY,
        newX + this.w / 2,
        newY + this.h
      );

      // stroke(0);
      fill(0);
      rect(
        this.closeX - xTranslate,
        this.closeY - yTranslate,
        this.closeW,
        this.closeW
      );
      // line(this.closeX - xTranslate, this.closeY - yTranslate, this.closeX + this.closeW - xTranslate, this.closeY + this.closeW - yTranslate)
      // line(this.closeX - xTranslate + this.closeW, this.closeY - yTranslate, this.closeX - xTranslate, this.closeY + this.closeW - yTranslate)
      noStroke();
      textAlign(CENTER);
      textSize(((this.w * 80) / 100) * (1 / this.text.length) * 1.5);
      text(this.text, this.textX - xTranslate, this.textY - yTranslate);
    }
  }
}
