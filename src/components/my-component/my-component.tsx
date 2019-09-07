import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
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
    return <div>Hello, World!</div>;
  }
}
