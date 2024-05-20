'use client';

import { type FC, useState, useRef } from 'react';
import {
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Container,
  Collapse,
  Alert,
  AlertTitle,
  useTheme,
  type AlertColor,
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
  const setThresholdRef = (value: number | Array<number>) =>
    thresholdRef = value;

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] =
    useState<AlertColor>('success');

  const [condition, setCondition] =
    useState<ConditionVariantsValueT>(ConditionVariants.OVER);
  const [playGameResultState, setPlayGameResultState] =
    useState<number | null>(null);
  const [history, setHistory] =
    useState<Array<TableRowI>>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { current: playGameResultRef } = useRef(20);

  const playGame = () => {
    const rollResult = Math.floor(Math.random() * 100) + 1;
    const isPredictOver = condition === ConditionVariants.OVER;
    const isPredictUnder = condition === ConditionVariants.UNDER;
    const win = isPredictOver
      ? rollResult > Number(thresholdRef)
      : isPredictUnder
        ? rollResult < Number(thresholdRef)
        : null
    ;

    setPlayGameResultState(rollResult);
    playGameResultRef = rollResult;

    setHistory(prevHistory => {
      const newHistory = [{
        time: new Date,
        guess: isPredictOver
          ? ConditionVariants.OVER
          : isPredictUnder
            ? ConditionVariants.UNDER
            : null
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

    setAlertTitle(win ? 'You won' : 'You lost');
    setAlertMessage(
      win
        ? ''
        : isPredictOver
          ? 'Number was smaller'
          : 'Number was higher'
    );
    setAlertSeverity(win ? 'success' : 'error');
    setAlertOpen(true);
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
          <Collapse in={alertOpen}>
            <Alert
              variant="filled"
              severity={alertSeverity}
              onClose={() => setAlertOpen(false)}
              sx={{
                position: 'absolute',
                top: 16,
                width: 600
              }}
            >
              <AlertTitle>{alertTitle}</AlertTitle>
              {alertMessage}
            </Alert>
          </Collapse>
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
                value={ConditionVariants.OVER}
                label={ConditionVariants.OVER}
              />
              <FormControlLabel
                control={RadioComponent}
                value={ConditionVariants.UNDER}
                label={ConditionVariants.UNDER}
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
