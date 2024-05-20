'use client';

import { type FC, useState, useRef, useEffect } from 'react';
import {
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Container,
  useTheme,
} from '@mui/material';
import SliderComponent from '@/components/slider';
import TableComponent from '@/components/table';
import {
  ConditionVariants,
  type ConditionVariantsValueT
} from '@/components/dice-game/types';
import type { TableRowI } from '@/components/table/types';

const DiceGame: FC = () => {
  const theme = useTheme();

  let { current: thresholdRef } = useRef<number | Array<number>>(50);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setThresholdRef = (value: number | Array<number>) =>
    thresholdRef = value as number;
  useEffect(() => {}, [thresholdRef]);
  // const [thresholdState, setThresholdState] =
  //   useState<number | Array<number>>(20);


  const [condition, setCondition] = useState<ConditionVariantsValueT>('greater');
  const [playGameResultState, setPlayGameResultState] = useState<number | null>(null);
  const [history, setHistory] =
    useState<Array<TableRowI>>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { current: playGameResultRef } = useRef(20);

  const playGame = () => {
    const rollResult = Math.floor(Math.random() * 100) + 1;
    const win = condition === 'greater'
      ? rollResult > Number(thresholdRef)
      : rollResult < Number(thresholdRef);

    setPlayGameResultState(rollResult);
    playGameResultRef = rollResult;

    setHistory(prevHistory => {
      const newHistory = [{
        time: new Date,
        guess: condition === ConditionVariants.GREATER
          ? 'Over'
          : 'Under'
        ,
        order: thresholdRef as number,
        result: rollResult,
        color: win
          ? 'success.dark'
          : 'error.dark'
        ,
        win
      }, ...prevHistory];
      return newHistory.slice(0, 10);
    });

    setThresholdRef(rollResult);
    // setThresholdState(rollResult);
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
        alignItems="center"
        flexDirection="column"
        height="100%"
        minWidth="100%"
      >
        <Box
          maxWidth={320}
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
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
          >
            <Typography variant="h1">{playGameResultState}</Typography>
          </Box>
          <FormControl component="fieldset">
            <RadioGroup
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "16px 0 32px 0"
              }}
              color="secondary"
              row
              value={condition}
              onChange={(e) => setCondition(e.target.value as ConditionVariantsValueT)}
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
            <SliderComponent
              thresholdFromParent={thresholdRef}
              setThresholdFromParent={setThresholdRef}
            />
            <Button
              sx={{ margin: "16px 0" }}
              variant="contained"
              color="secondary"
              onClick={playGame}
            >Play</Button>
          </FormControl>
        </Box>

        {playGameResultState !== null && <TableComponent rows={history} />}
      </Box>
    </Container>
  );
};

export default DiceGame;
