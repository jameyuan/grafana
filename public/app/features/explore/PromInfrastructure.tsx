import React, { PureComponent } from 'react';

function processLabels(labels: any[], field: string): string[] {
  const values = {};
  labels.forEach(l => {
    const { __name__, ...rest } = l;
    Object.keys(rest).forEach(key => {
      if (!values[key]) {
        values[key] = [];
      }
      if (values[key].indexOf(rest[key]) === -1) {
        values[key].push(rest[key]);
      }
    });
  });
  return values[field];
}

function getExpression(queryType: string, instance: string): string {
  switch (queryType) {
    case 'cpu':
      return `1 - avg(rate(node_cpu{instance="${instance}"}[1m]))`;
    case 'memory':
      return `1 -
  sum(node_memory_MemFree{instance="${instance}"}
    + node_memory_Cached{instance="${instance}"}
    + node_memory_Buffers{instance="${instance}"})
  /
  sum(node_memory_MemTotal{instance="${instance}"})`;
    case 'disk':
      return `node_filesystem_free{instance="${instance}",device=~"(sd|xvd).+"}`;
    default:
      break;
  }
  return '';
}

export default class PromInfrastructure extends PureComponent<any, any> {
  state = {
    instances: [],
  };

  componentDidMount() {
    this.loadData();
  }

  onClickInstance = (instance, queryType) => {
    const expression = getExpression(queryType, instance);
    const { onClickQuery } = this.props;
    if (expression && onClickQuery) {
      onClickQuery(expression);
    }
  };

  async loadData() {
    const url = '/api/v1/series?match[]=node_cpu';
    try {
      const res = await this.props.request(url);
      const body = await (res.data || res.json());
      const instances = processLabels(body.data, 'instance');
      if (instances) {
        this.setState({ instances });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { instances } = this.state;
    return (
      <div>
        <h1>Infrastructure</h1>
        <p>Probes your infrastructure based on installed exporters.</p>
        {instances &&
          instances.length > 0 && (
            <div>
              <h3>Nodes</h3>
              <div className="infrastructure-list">
                {instances.map(instance => (
                  <div className="infrastructure-item" key={instance}>
                    <div className="infrastructure-item__title">{instance}</div>
                    <div className="infrastructure-item__expressions">
                      <div>
                        <a className="link" onClick={() => this.onClickInstance(instance, 'cpu')}>
                          CPU
                        </a>
                      </div>
                      <div>
                        <a className="link" onClick={() => this.onClickInstance(instance, 'memory')}>
                          Memory
                        </a>
                      </div>
                      <div>
                        <a className="link" onClick={() => this.onClickInstance(instance, 'disk')}>
                          Disk
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  }
}
