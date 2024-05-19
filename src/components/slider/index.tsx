import type { Dispatch, FC, SetStateAction } from 'react';
import Slider from '@mui/material/Slider';
import { useTheme } from '@mui/material';

const marks = [
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
interface SliderComponentI {
  threshold: number,
  setThreshold: Dispatch<SetStateAction<number>>;
  // threshold: number,
  // setThreshold: (value: number) => number;
}
// todo: check availability to use forwardRef
const SliderComponent: FC<SliderComponentI> = ({threshold = 0, setThreshold}) => {
  // // todo: we complete the use state inside slider component eg via forwardRef
  // const [value, setValue] = useState(valueProp);

  // const handleChange = (event: Event, newValue: number | Array<number>) => {
  // todo: search for correct slider event
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    // console.log(!event.target.value ? event : '');
    console.log(event.target.value, event);
    // console.log(event.target.value);
    setThreshold(
      typeof event?.target?.value === 'number'
        ? event.target.value as number
        : 0
    );
  };
  const theme = useTheme();

  return (
    // todo: verify does correct radius of shadow in .MuiSlider-thumb element
    <Slider
      min={1}
      max={100}
      size="small"
      color="secondary"
      sx={{
        // todo: padding from line to top (need to change from '0 13px' to '0 20px')
        padding: "0 20px"
      }}
      orientation="horizontal"
      value={threshold}
      onChange={handleChange}
      valueLabelDisplay="auto"
      marks={marks}
    />
  );
};

export default SliderComponent;
