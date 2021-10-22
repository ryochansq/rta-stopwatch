import React, { VFC, useState, useEffect, useRef } from "react";
import { StopwatchResult } from "react-timer-hook";
import { Diff } from "./Diff";
import { formatTime } from "../utils/time";

type Props = {
  chart: Step[];
  setChart: React.Dispatch<React.SetStateAction<Step[]>>;
  stopwatch: StopwatchResult;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const Run: VFC<Props> = ({
  chart,
  setChart,
  stopwatch,
  currentIndex,
  setCurrentIndex,
}) => {
  const { seconds, minutes, hours, isRunning, start, pause, reset } = stopwatch;
  const onPushKeyRef = useRef(null);

  const timerText = formatTime(hours, minutes, seconds, true);

  onPushKeyRef.current = () => {
    if (currentIndex + 1 > chart.length) return;
    if (currentIndex === -1) {
      start();
      setCurrentIndex(0);
      return;
    }
    setChart((prev) =>
      prev.map((step, i) =>
        i === currentIndex ? { ...step, lap: timerText } : { ...step }
      )
    );
    if (currentIndex + 1 === chart.length) pause();
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === " ") onPushKeyRef.current();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleReset = () => {
    const ok = window.confirm("Are you sure you want to RESET?");
    if (!ok) return;
    reset(undefined, false);
    setCurrentIndex(-1);
    setChart((prev) =>
      prev.map((step) => ({ title: step.title, time: step.time }))
    );
  };

  const handleUpdate = () => {
    const ok = window.confirm("Are you sure you want to UPDATE RECORD?");
    if (!ok) return;
    setChart((prev) =>
      prev.map((step) => ({ title: step.title, time: step.lap }))
    );
  };

  return (
    <>
      {chart.map((step, index) => (
        <div
          key={index}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{step.title || "No Label"}</span>
          <Diff step={step} />
        </div>
      ))}
      <div
        style={{
          textAlign: "center",
          marginBottom: 16,
          fontSize: 36,
          color: isRunning ? "white" : "cyan",
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
