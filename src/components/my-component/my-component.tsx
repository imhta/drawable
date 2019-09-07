import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'drawable-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  componentDidRender(){
    var canvas : any = document.getElementById("drawable-canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(20, 20, 150, 100);
  }
  /**
   * width
   */
  @Prop() width: string;

  /**
   * height
   */
  @Prop() height: string;

  /**
   * The last name
   */
  // @Prop() last: string;

  // private getText(): string {
  //   return format(this.first, this.middle, this.last);
  // }

  render() {
    return <canvas id="drawable-canvas" width={this.width} height={this.height}></canvas>;
  }
}
