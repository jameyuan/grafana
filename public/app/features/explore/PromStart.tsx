import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PromCheatSheet from './PromCheatSheet';
import PromInfrastructure from './PromInfrastructure';
import PromUsage from './PromUsage';

const TAB_MENU_ITEMS = [
  {
    text: 'Start',
    id: 'start',
    icon: 'fa fa-rocket',
  },
  {
    text: 'Infrastructure',
    id: 'infra',
    icon: 'fa fa-server',
  },
  {
    text: 'Analysis',
    id: 'analysis',
    icon: 'fa fa-pie-chart',
  },
];

export default class PromStart extends PureComponent<any, { active: string }> {
  state = {
    active: 'start',
  };

  onClickTab = active => {
    this.setState({ active });
  };

  render() {
    const { active } = this.state;
    const customCss = '';

    return (
      <div style={{ margin: '45px 0', border: '1px solid #ddd', borderRadius: 5 }}>
        <div className="page-header-canvas">
          <div className="page-container">
            <div className="page-header">
              <nav>
                <ul className={`gf-tabs ${customCss}`}>
                  {TAB_MENU_ITEMS.map((tab, idx) => {
                    const tabClasses = classNames({
                      'gf-tabs-link': true,
                      active: tab.id === active,
                    });

                    return (
                      <li className="gf-tabs-item" key={tab.id}>
                        <a className={tabClasses} onClick={() => this.onClickTab(tab.id)}>
                          <i className={tab.icon} />
                          {tab.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="page-container page-body">
          {active === 'start' && <PromCheatSheet onClickQuery={this.props.onClickQuery} />}
          {active === 'infra' && (
            <PromInfrastructure request={this.props.request} onClickQuery={this.props.onClickQuery} />
          )}
          {active === 'analysis' && <PromUsage />}
        </div>
      </div>
    );
  }
}
