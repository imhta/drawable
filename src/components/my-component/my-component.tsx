import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'drawable-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

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
