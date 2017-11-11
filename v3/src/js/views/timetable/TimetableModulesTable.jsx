// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import type { ModuleWithColor, Semester } from 'types/modules';
import type { ColorIndex } from 'types/reducers';

import ColorPicker from 'views/components/ColorPicker';
import { Eye, EyeOff, Trash2 } from 'views/components/icons/index';
import { selectModuleColor } from 'actions/theme';
import { hideLessonInTimetable, showLessonInTimetable } from 'actions/settings';
import { getModuleSemExamDate, modulePagePath } from 'utils/modules';

import styles from './TimetableModulesTable.scss';
import timetableActionsStyles from './TimetableActions.scss';

type Props = {
  selectModuleColor: Function,
  hideLessonInTimetable: Function,
  showLessonInTimetable: Function,
  semester: Semester,
  modules: Array<ModuleWithColor>,
  onRemoveModule: Function,
  horizontalOrientation: boolean,
};

class TimetableModulesTable extends Component<Props> {
  renderColorPicker(module) {
    const label = `Change ${module.ModuleCode} timetable color`;

    return (
      <div className={classnames(styles.moduleActionColumn)}>
        <ColorPicker
          label={label}
          color={module.colorIndex}
          onChooseColor={(colorIndex: ColorIndex) => {
            this.props.selectModuleColor(module.ModuleCode, colorIndex);
          }}
        />
      </div>
    );
  }

  renderModuleActions(module) {
    const hideBtnLabel = `${module.hiddenInTimetable ? 'Show' : 'Hide'} ${module.ModuleCode}`;
    const removeBtnLabel = `Remove ${module.ModuleCode} from timetable`;

    return (
      <div className={styles.moduleActionButtons}>
        <div className="btn-group">
          <button
            type="button"
            className={classnames('btn btn-outline-secondary', styles.moduleAction)}
            title={removeBtnLabel}
            aria-label={removeBtnLabel}
            onClick={() => {
              if (window.confirm(`Are you sure you want to remove ${module.ModuleCode}?`)) {
                this.props.onRemoveModule(module.ModuleCode);
              }
            }}
          >
            <Trash2 className={timetableActionsStyles.actionIcon} />
          </button>
          <button
            type="button"
            className={classnames('btn btn-outline-secondary', styles.moduleAction)}
            title={hideBtnLabel}
            aria-label={hideBtnLabel}
            onClick={() => {
              if (module.hiddenInTimetable) {
                this.props.showLessonInTimetable(module.ModuleCode);
              } else {
                this.props.hideLessonInTimetable(module.ModuleCode);
              }
            }}
          >
            {module.hiddenInTimetable ? (
              <Eye className={timetableActionsStyles.actionIcon} />
            ) : (
              <EyeOff className={timetableActionsStyles.actionIcon} />
            )}
          </button>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.modules.length) {
      return (
        <div className="row">
          <div className="col-sm-12">
            <p className="text-sm-center">No modules added.</p>
          </div>
        </div>
      );
    }

    return (
      <div className={classnames(styles.modulesTable, 'row')}>
        {this.props.modules.map(module => (
          <div
            className={classnames(styles.modulesTableRow, 'col-sm-6', {
              'col-lg-4': this.props.horizontalOrientation,
              'col-md-12': !this.props.horizontalOrientation,
            })}
            key={module.ModuleCode}
          >
            <div className={styles.modulesTableRowInner}>
              {this.renderColorPicker(module)}

              <div className={classnames(styles.moduleActionColumn, styles.moduleDetailsColumn)}>
                {this.renderModuleActions(module)}

                <Link
                  href={modulePagePath(module.ModuleCode, module.ModuleTitle)}
                  to={modulePagePath(module.ModuleCode, module.ModuleTitle)}
                >
                  {module.ModuleCode} {module.ModuleTitle}
                </Link>

                <div>
                  <small>
                    Exam: {getModuleSemExamDate(module, this.props.semester)}
                    &nbsp;&middot;&nbsp;
                    {module.ModuleCredit} MCs
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(null, {
  selectModuleColor,
  hideLessonInTimetable,
  showLessonInTimetable,
})(TimetableModulesTable);
