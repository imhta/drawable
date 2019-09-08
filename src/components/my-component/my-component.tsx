import { Component, Prop, h, Element, State } from '@stencil/core';

@Component({
  tag: 'drawable-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

  @Prop() width: number;

  @Prop() height: number;

  @Prop() penWidth: number;
  @Element() el: HTMLElement;

  @State() drawing: boolean;

  @Prop() color: string;
  @Prop({ context: 'isServer' }) private isServer: boolean;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  lastPos: any;
  mousePos: any;
  oldWidth: number;
  oldColor: string;

  ionViewWillUpdate() {
    if (this.oldWidth && this.penWidth !== undefined) {
      this.context.lineWidth = this.penWidth;
    }

    if (this.oldColor && this.color !== undefined) {
      this.context.strokeStyle = this.color;
    }
  }

  componentDidLoad() {
    if (!this.isServer) {
      this.canvas = this.el.shadowRoot.querySelector('canvas');
      // this.canvas = this.canvasToWrite;
     //  console.log(this.canvas)
      this.context = this.canvas.getContext('2d');

      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.globalCompositeOperation = 'hard-light';
      this.context.globalAlpha = 1;

      this.context.strokeStyle = this.color;
      this.oldColor = this.color;
      this.context.lineWidth = this.penWidth;
      this.oldWidth = this.penWidth;


      console.log(this.color);
      console.log(this.penWidth);

      // setup for drawing
      this.setupMouseEvents();
      this.setupTouchEvents();

      this.renderCanvas();

    }
  }

  setupMouseEvents() {
    this.drawing = false;

    this.mousePos = { x: 0, y: 0 };
    this.lastPos = this.mousePos;

    // handle mouse events
    (this.canvas.addEventListener as any)("mousedown", (e) => {
      this.drawing = true;
      this.lastPos = this.getMousePos(this.canvas, e);
    }, { passive: true});

    (this.canvas.addEventListener as any)("mouseup", () => {
      this.drawing = false;
    }, { passive: true });

    (this.canvas.addEventListener as any)("mousemove", (e) => {
      this.mousePos = this.getMousePos(this.canvas, e);
    }, { passive: true });
  }

  setupTouchEvents() {
    (this.canvas.addEventListener as any)("touchstart", (e) => {
      this.mousePos = this.getTouchPos(this.canvas, e);
      const touch = e.touches[0];

      const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });

      this.canvas.dispatchEvent(mouseEvent);
    }, { passive: true});

    (this.canvas.addEventListener as any)("touchend", () => {
      const mouseEvent = new MouseEvent("mouseup", {});
      this.canvas.dispatchEvent(mouseEvent);
    }, { passive: true });

    (this.canvas.addEventListener as any)("touchmove", (e) => {
      const touch = e.touches[0];

      const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });

      this.canvas.dispatchEvent(mouseEvent);
    }, { passive: true });
  }

  getMousePos(canvasDom, mouseEvent) {
    const rect = canvasDom.getBoundingClientRect();

    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };
  }

  getTouchPos(canvasDom, touchEvent) {
    const rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  renderCanvas(): any {
    if (this.drawing) {
      this.context.beginPath();
      this.context.moveTo(this.lastPos.x, this.lastPos.y);
      this.context.lineTo(this.mousePos.x, this.mousePos.y);
      this.context.stroke();
      this.context.closePath();
      this.lastPos = this.mousePos;
    }

    requestAnimationFrame(() => this.renderCanvas());
  }
  render() {
    return <canvas id="drawable-canvas" width={this.width} height={this.height}></canvas>;
  }
}
