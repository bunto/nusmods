// @flow
import React, { Component } from 'react';
import { Search, PrefixIndexStrategy } from 'js-search';
import Select from 'views/components/Select';

import { ModulesSearchIndex, ModulesTokenizer } from 'utils/modules-search';
import type { ModuleSelectList, ModuleSelectListItem } from 'types/reducers';

import styles from './ModulesSelect.scss';

type Props = {
  moduleList: ModuleSelectList,
  onChange: Function,
  placeholder: string,
};

type State = {
  value: string,
};

// Init search once
let searchEngine = new Search('value');
let previousModules = [];
function filterModules(value: string, modules: ModuleSelectList) {
  // Rebuild index as needed
  if (previousModules.length !== modules.length) {
    previousModules = modules;
    // rebuild index
    searchEngine = new Search('value');
    searchEngine.indexStrategy = new PrefixIndexStrategy();
    searchEngine.searchIndex = new ModulesSearchIndex();
    searchEngine.tokenizer = new ModulesTokenizer();
    searchEngine.addIndex('label');
    searchEngine.addDocuments(modules);
  }
  if (value === '') {
    return [];
  }
  return searchEngine.search(value);
}

class ModulesSelect extends Component<Props, State> {
  state: State = {
    value: '',
  };

  onInput = (value: string) => {
    this.setState({ value });
  };

  onSelect = (module: ModuleSelectListItem) => {
    this.setState({ value: '' });
    this.props.onChange(module);
  };

  render() {
    const { moduleList } = this.props;
    const filteredModules = filterModules(this.state.value, moduleList);
    const hasResults = filteredModules.length > 0;
    return (
      <Select
        label="Module Search"
        onInput={this.onInput}
        value={this.state.value}
        placeholder={this.props.placeholder}
      >
        {hasResults ? (
          filteredModules.map((module) => {
            return (
              <li key={module.value} className={styles.moduleItem}>
                {// eslint-disable-next-line
                <div
                  role="option"
                  aria-selected="false"
                  aria-label={module.label}
                  onClick={() => this.onSelect(module)}
                  onKeyPress={() => this.onSelect(module)}
                >
                  {module.label}
                </div>
                }
              </li>
            );
          })
        ) : (
          <li className={styles.defaultPanel}>
            Try CS1010 or Programming. Searching <strong>{moduleList.length}</strong> modules.
          </li>
        )}
      </Select>
    );
  }
}

export default ModulesSelect;
