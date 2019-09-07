import { Component, h } from '@stencil/core';

@Component({
  tag: 'drawable-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  // @Prop() first: string;

  /**
   * The middle name
   */
  // @Prop() middle: string;

  /**
   * The last name
   */
  // @Prop() last: string;

  // private getText(): string {
  //   return format(this.first, this.middle, this.last);
  // }

  render() {
    return <h1>Hello, World!</h1>;
  }
}
