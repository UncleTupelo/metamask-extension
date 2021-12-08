import React from 'react';

import { useGasFeeContext } from '../../../../../contexts/gasFee';
import I18nValue from '../../../../ui/i18n-value';
import { NetworkStabilityTooltip } from '../tooltips';

const GRADIENT_COLORS = [
  '#037DD6',
  '#1876C8',
  '#2D70BA',
  '#4369AB',
  '#57629E',
  '#6A5D92',
  '#805683',
  '#9A4D71',
  '#B44561',
  '#C54055',
];

const determineStatusInfo = (networkCongestion) => {
  const colorIndex = Math.round(networkCongestion * 10);
  const color = GRADIENT_COLORS[colorIndex];
  const sliderTickValue = colorIndex * 10;

  if (networkCongestion <= 0.33) {
    return {
      statusLabel: 'notBusy',
      tooltipLabel: 'lowLowercase',
      color,
      sliderTickValue,
    };
  } else if (networkCongestion > 0.66) {
    return {
      statusLabel: 'busy',
      tooltipLabel: 'highLowercase',
      color,
      sliderTickValue,
    };
  }
  return {
    statusLabel: 'stable',
    tooltipLabel: 'stableLowercase',
    color,
    sliderTickValue,
  };
};

const StatusSlider = () => {
  const { gasFeeEstimates } = useGasFeeContext();
  const statusInfo = determineStatusInfo(gasFeeEstimates.networkCongestion);

  return (
    <NetworkStabilityTooltip
      color={statusInfo.color}
      tooltipLabel={statusInfo.tooltipLabel}
    >
      <div className="status-slider">
        <div className="status-slider__arrow-container">
          <div
            className="status-slider__arrow-border"
            style={{
              marginLeft: `${statusInfo.sliderTickValue}%`,
            }}
          >
            <div
              className="status-slider__arrow"
              style={{
                borderTopColor: statusInfo.color,
              }}
            />
          </div>
        </div>
        <div className="status-slider__line" />
        <div
          className="status-slider__label"
          style={{ color: statusInfo.color }}
        >
          <I18nValue messageKey={statusInfo.statusLabel} />
        </div>
      </div>
    </NetworkStabilityTooltip>
  );
};

export default StatusSlider;
