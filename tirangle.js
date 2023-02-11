class Triangle {
  constructor(x1, y1, x2, y2, x3, y3, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.color = color;
  }

  translate(translateValue) {
    this.x1 += translateValue;
    this.y1 += translateValue;
    this.x2 += translateValue;
    this.y2 += translateValue;
    this.x3 += translateValue;
    this.y3 += translateValue;
  }
  draw() {
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }
}
