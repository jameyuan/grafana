import React from 'react';

import SAMPLE from './sample-usage.svg';

export default () => (
  <div className="analysis-wrapper">
    <div className="">
      <div className="h1 mb2">Timeseries Usage</div>
      <p>
        Every unique key-value combination of a metric&apos;s label set creates a new timeseries. Each of those
        timeseries has its own storage needs. It is therefor advisable to keep an eye on the label space, e.g., labels
        with IDs, IP addresses, etc. For all metrics, we are retrieving the label space and then count the values for
        each label key. Those counts then inform the angle width of the segment in the chart&apos;s outer ring. For
        convenience the segments are grouped by metric name (middle ring) and metric name prefix (inner ring).
      </p>
      <div className="p3 center">
        <a href="#" className="empty-list-cta__button btn btn-xlarge btn-success">
          Start Analysis
        </a>
      </div>
    </div>
    <div className="">
      <img src={SAMPLE} alt="Sample usage" />
    </div>
  </div>
);
