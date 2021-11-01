import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useDispatch } from 'react-redux';
import { setChart } from '../store/timerSlice';
import { Run } from './Run';
import { Edit } from './Edit';
import { textToChart } from '../utils/chart';
import { loadFile } from '../utils/file';

export const Body = (): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const stopwatch = useStopwatch({
    autoStart: false,
  });
  const { isRunning } = stopwatch;
  const dispatch = useDispatch();

  const toggleIsEditing = () => setIsEditing((prev) => !prev);
  const editButtonText = isEditing ? 'Return to Run' : 'Edit';

  const handleFile = async () => {
    const text = await loadFile();
    const chart = textToChart(text);
    dispatch(setChart(chart));
  };

  return (
    <>
      {isEditing ? <Edit /> : <Run stopwatch={stopwatch} />}
      {!isRunning && <button onClick={toggleIsEditing}>{editButtonText}</button>}
      {!isRunning && <button onClick={handleFile}>File</button>}
    </>
  );
};
