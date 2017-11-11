// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { PrefixIndexStrategy } from 'js-search';

import type { ModuleSelectList } from 'types/reducers';

import { ModulesSearchIndex, ModulesTokenizer } from 'utils/modules-search';

type Props = {
  moduleList: ModuleSelectList,
  onChange: Function,
  placeholder: string,
};

class ModulesSelect extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return _.size(this.props.moduleList) !== _.size(nextProps.moduleList);
  }

  render() {
    return (
      null
    );
  }
}

export default ModulesSelect;
