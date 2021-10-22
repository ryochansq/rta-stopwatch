import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { Run } from "./Run";
import { Edit } from "./Edit";

export const Body = (): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [chart, setChart] = useState<Step[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const stopwatch = useStopwatch({
    autoStart: false,
  });
  const { isRunning } = stopwatch;

  const toggleIsEditing = () => setIsEditing((prev) => !prev);
  const editButtonText = isEditing ? "Save" : "Edit";

  return (
    <>
      {isEditing ? (
        <Edit chart={chart} setChart={setChart} />
      ) : (
        <Run
          chart={chart}
          setChart={setChart}
          stopwatch={stopwatch}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
      {!isRunning && (
        <button onClick={toggleIsEditing}>{editButtonText}</button>
      )}
    </>
  );
};
