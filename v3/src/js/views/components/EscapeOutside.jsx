// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

const ESCAPE_KEYCODE = 27;

type Props = {
  className?: string,
  onEscapeOutside: Function,
  children: Node,
};

class EscapeOutside extends Component<Props> {
  container: ?HTMLDivElement;
  isTouch: boolean;

  constructor() {
    super();
    this.isTouch = false;
  }

  componentDidMount() {
    this.toggleListeners(true);
  }

  componentWillUnmount() {
    this.toggleListeners(false);
  }

  onEscape = (event: KeyboardEvent) => {
    if (event.keyCode === ESCAPE_KEYCODE) {
      this.props.onEscapeOutside();
    }
  };

  onClickOutside = (e: Event) => {
    if (e.type === 'touchend') this.isTouch = true;
    if (e.type === 'click' && this.isTouch) return;
    if (this.container && !this.container.contains(e.target)) {
      this.props.onEscapeOutside();
    }
  };

  toggleListeners(add: boolean) {
    const func = add ? document.addEventListener : document.removeEventListener;
    func('keydown', this.onEscape);
    func('touchend', this.onClickOutside, { capture: true, passive: true });
    func('click', this.onClickOutside, true);
  }

  getContainer = (ref: ?HTMLDivElement) => {
    this.container = ref;
  };

  render() {
    return <div className={this.props.className} ref={this.getContainer}>{this.props.children}</div>;
  }
}

export default EscapeOutside;
