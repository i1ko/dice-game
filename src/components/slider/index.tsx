import { type FC, useState } from 'react';
import Slider from '@mui/material/Slider';
import type { Mark } from '@mui/base/useSlider';

const marks: Array<Mark> = [
  {
    value: 1,
    label: 0,
  },
  {
    value: 16,
  },
  {
    value: 33,
  },
  {
    value: 50,
  },
  {
    value: 67,
  },
  {
    value: 84,
  },
  {
    value: 100,
    label: 100,
  }
];
interface SliderComponentPropsI {
  thresholdFromParent: number | Array<number>,
  setThresholdFromParent: (value: number | Array<number>) => number | Array<number>;
}

const SliderComponent: FC<SliderComponentPropsI> = ({
  thresholdFromParent,
  setThresholdFromParent
}) => {
  const [threshold, setThreshold] =
    useState<number | Array<number>>(thresholdFromParent ?? 50);

  const handleChange = (event: Event, newValue: number | Array<number>) => {
    setThreshold(newValue as number);
    setThresholdFromParent(newValue as number);
  };
  return (
    // todo: verify does default radius correct of shadow in .MuiSlider-thumb element
    <Slider
      min={1}
      max={100}
      size="small"
      color="secondary"
      orientation="horizontal"
      value={threshold}
      onChange={handleChange}
      valueLabelDisplay="auto"
      marks={marks}
    />
  );
};

export default SliderComponent;
