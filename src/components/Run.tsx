import React, { VFC, useEffect, useRef } from 'react';
import { StopwatchResult } from 'react-timer-hook';
import { useDispatch } from 'react-redux';
import { useSelector } from '../store';
import { increment, resetLap, updateAndReset } from '../store/timerSlice';
import { Diff } from './Diff';
import { timeToText } from '../utils/time';
import { getBestRecord, getPossibleBest } from '../utils/chart';

type Props = {
  stopwatch: StopwatchResult;
};

export const Run: VFC<Props> = ({ stopwatch }) => {
  const titles = useSelector((state) => state.timer.titles);
  const records = useSelector((state) => state.timer.records);
  const laps = useSelector((state) => state.timer.laps);
  const currentIndex = useSelector((state) => state.timer.index);
  const dispatch = useDispatch();
  const { seconds, minutes, hours, isRunning, start, pause, reset } = stopwatch;
  const incrementSegmentRef = useRef(null);

  const currentTime = { hours, minutes, seconds };
  const timerText = timeToText(currentTime);
  const bestRecord = getBestRecord(records);
  const possibleBest = getPossibleBest(records);

  const columnStyle = (isCurrent: boolean) => ({
    padding: '1px 3px',
    backgroundColor: isCurrent ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0,0,0,0)',
  });

  incrementSegmentRef.current = () => {
    dispatch(increment(currentTime));
    if (currentIndex === -1) start();
    else if (currentIndex + 1 === titles.length) pause();
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === ' ') incrementSegmentRef.current();
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const handleReset = () => {
    const ok = window.confirm('Are you sure you want to RESET?');
    if (!ok) return;
    reset(undefined, false);
    dispatch(resetLap());
  };

  const handleUpdate = () => {
    if (currentIndex === -1) return;
    const ok = window.confirm('Are you sure you want to UPDATE RECORD?');
    if (!ok) return;
    reset(undefined, false);
    dispatch(updateAndReset());
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ paddingLeft: 3 }}>Label</div>
          {titles.map((title, index) => (
            <div key={index} style={columnStyle(index === currentIndex)}>
              <span>{title || 'No Label'}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ paddingRight: 3 }}>Best</div>
          {bestRecord.map((time, index) => (
            <div key={index} style={columnStyle(index === currentIndex)}>
              {(() => (index < currentIndex ? <Diff key={index} prevTime={time} newTime={laps[index]} /> : <span> {timeToText(time)} </span>))()}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ paddingRight: 3 }}>Possible</div>
          {possibleBest.map((time, index) => (
            <div key={index} style={columnStyle(index === currentIndex)}>
              {(() => (index < currentIndex ? <Diff key={index} prevTime={time} newTime={laps[index]} /> : <span> {timeToText(time)} </span>))()}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          textAlign: 'center',
          marginBottom: 16,
          fontSize: 36,
          color: isRunning ? 'white' : 'cyan',
        }}
      >
        <span>{timerText}</span>
      </div>
      {!isRunning && (
        <>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleUpdate}>Update Record</button>
        </>
      )}
    </>
  );
};
