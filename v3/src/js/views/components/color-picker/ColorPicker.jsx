// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import type { ColorIndex } from 'types/reducers';

import { NUM_DIFFERENT_COLORS } from 'reducers/theme';

import EscapeOutside from '../EscapeOutside';
import styles from './color-picker.scss';

type Props = {
  label: string,
  color: ColorIndex,
  onChooseColor: Function,
  onDismiss?: Function,
};

type State = {
  isOpen: boolean,
};

/**
 * ColorPicker presentational component
 *
 * For use in places like changing module colors
 */
class ColorPicker extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  onClosePicker = () => {
    this.setState({ isOpen: false });
  };

  onClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <EscapeOutside onEscapeOutside={this.onClosePicker}>
        <button
          title={this.props.label}
          aria-label={this.props.label}
          className={classnames(`color-${this.props.color}`, styles.moduleColor)}
          onClick={this.onClick}
        />
        {this.state.isOpen && (
          <div className={styles.palette}>
            {_.range(NUM_DIFFERENT_COLORS).map((index: ColorIndex) => {
              return (
                // Visually impair won't use this
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <span
                  className={classnames(styles.option, `color-${index}`)}
                  key={index}
                  onClick={() => {
                    this.props.onChooseColor(index);
                    this.onClosePicker();
                  }}
                />
              );
            })}
          </div>
        )}
      </EscapeOutside>
    );
  }
}

export default ColorPicker;
