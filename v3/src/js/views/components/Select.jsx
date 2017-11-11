// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';

import type { Node } from 'react';

import EscapeOutside from './EscapeOutside';
import styles from './Select.scss';

type Props = {
  label: string,
  value: string,
  placeholder: string,
  onInput: Function,
  children: Node,
};

type State = {
  isOpen: boolean,
};

let count = 0;

/**
 * Select presentational component
 *
 * For use in places like changing module colors
 */
class Select extends PureComponent<Props, State> {
  state: State = {
    isOpen: false,
  };

  onCloseSelect = () => {
    this.setState({ isOpen: false });
  };

  onInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    this.props.onInput(value);
  };

  onFocus = () => {
    this.setState({ isOpen: true });
  };

  onBlur = () => {
    // this.setState({ isOpen: false });
  };

  // eslint-disable-next-line no-plusplus
  selectId = `select-${count++}`;

  render() {
    return (
      <EscapeOutside onEscapeOutside={this.onCloseSelect} className={styles.container}>
        <input
          role="combobox"
          value={this.props.value}
          onInput={this.onInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className={classnames(styles.input, 'form-control')}
          placeholder={this.props.placeholder}
          title={this.props.label}
          aria-label={this.props.label}
          aria-haspopup="false"
          aria-autocomplete="list"
          aria-expanded={this.state.isOpen}
          aria-controls={this.selectId}
          type="text"
          dir="ltr"
          maxLength="64"
          autoComplete="off"
          spellCheck="false"
        />
        {this.state.isOpen && <ul className={styles.selectList} id={this.selectId}>{this.props.children}</ul>}
      </EscapeOutside>
    );
  }
}

export default Select;
