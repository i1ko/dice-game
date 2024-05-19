'use client';

import { type FC, useState, useRef, useEffect } from 'react';
import {
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  useTheme,
} from '@mui/material';
import SliderComponent from '@/components/slider';

type ConditionT = 'greater' | 'smaller';

const DiceGame: FC = () => {
  let { current: thresholdRef } = useRef<number>(50);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setThresholdRef = (value: number) => thresholdRef = value;
  useEffect(() => {}, [thresholdRef]);
  const [thresholdState, setThresholdState] = useState<number>(20);


  const [condition, setCondition] = useState<ConditionT>('greater');
  const [playGameResultState, setPlayGameResultState] = useState<number | null>(null);
  const [history, setHistory] =
    useState<Array<{ result: number, win: boolean }>>([]);
  const theme = useTheme();
  let { current: playGameResultRef } = useRef(20);

  const playGame = () => {
    const rollResult = Math.floor(Math.random() * 100) + 1;
    const win = condition === 'greater'
      ? rollResult > thresholdState
      : rollResult < thresholdState;

    setPlayGameResultState(rollResult);
    playGameResultRef = rollResult;

    setHistory(prevHistory => {
      const newHistory = [{ result: rollResult, win }, ...prevHistory];
      return newHistory.slice(0, 10);
    });

    setThresholdState(rollResult);
  };

  const RadioComponent = <Radio color="secondary" />;
  return (
    <Container sx={{
      paddingTop: "113px"
    }}>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        alignContent="center"
        flexDirection="column"
        height="100%"
        minWidth="100%"
      >
        <Box
          sx={{
            // todo: double-check about (I guess it possible) do it in more pretty way
            backgroundColor: 'action.hover',
            fontFamily: 'roboto'
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontFamily="-moz-initial"
          fontSize={96}
          borderRadius={theme.shape.borderRadius}
          height={200}
          width={320}
        >{playGameResultRef}</Box>
        <FormControl component="fieldset">
          <RadioGroup
            color="secondary"

            row
            value={condition}
            onChange={(e) => setCondition(e.target.value as ConditionT)}
          >
            <FormControlLabel
              control={RadioComponent}
              // todo: we can use constant for value
              value="greater"
              label="Greater"
            />
            <FormControlLabel
              control={RadioComponent}
              // todo: we can use constant for value
              value="less"
              label="Less"
            />
          </RadioGroup>
          {/*<SliderComponent*/}
          {/*  thresholdState={thresholdState}*/}
          {/*  setThreshold={setThreshold}*/}
          {/*/>*/}
          <SliderComponent
            threshold={thresholdRef}
            setThreshold={setThresholdState}
          />
          <TextField
            label="Threshold"
            type="number"
            value={thresholdRef}
            onChange={(e) => setThresholdState(Number(e.target.value))}
          />
          <Button variant="contained" color="secondary" onClick={playGame}>Play</Button>
        </FormControl>

        {playGameResultState !== null && (
          <Typography variant="h6">
            {`Result: ${playGameResultState} - ${history[0].win ? 'You win!' : 'You lose!'}`}
          </Typography>
        )}

        <List>
          {history.map((item) => (
            <ListItem key={`${item.win}${item.result}`}>
              <ListItemText
                primary={`Result: ${item.result} - ${item.win ? 'Win' : 'Lose'}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default DiceGame;
