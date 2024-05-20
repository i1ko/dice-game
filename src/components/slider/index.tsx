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
  // setThreshold: Dispatch<SetStateAction<number | Array<number>>>;
  // threshold: number,
  setThresholdFromParent: (value: number | Array<number>) => number;
}
// todo: check availability to use forwardRef
const SliderComponent: FC<SliderComponentPropsI> = ({
  thresholdFromParent = 50,
  setThresholdFromParent
}) => {
// const SliderComponent: FC<SliderComponentPropsI> = () => {
  // // todo: we complete the use state inside slider component eg via forwardRef
  // const [value, setValue] = useState(valueProp);
  const [threshold, setThreshold] =
    useState<number | Array<number>>(thresholdFromParent);

  // todo: search for correct slider event
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleChange = (event: any) => {
  const handleChange = (event: Event, newValue: number | Array<number>) => {
    setThreshold(newValue as number);
    setThresholdFromParent(newValue as number);
      // typeof event?.target?.value === 'number'
      //   ? event.target.value as number
      //   : 0
  };

  return (
    // todo: verify does correct radius of shadow in .MuiSlider-thumb element
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
