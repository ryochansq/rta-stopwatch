import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Run } from './Run';
import { Edit } from './Edit';

export const Body = (): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const stopwatch = useStopwatch({
    autoStart: false,
  });
  const { isRunning } = stopwatch;

  const toggleIsEditing = () => setIsEditing((prev) => !prev);
  const editButtonText = isEditing ? 'Return to Run' : 'Edit';

  // TODO: ファイルから読み込む！！

  return (
    <>
      {isEditing ? <Edit /> : <Run stopwatch={stopwatch} />}
      {!isRunning && <button onClick={toggleIsEditing}>{editButtonText}</button>}
    </>
  );
};
