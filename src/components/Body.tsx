import React, { useState, useEffect, useRef } from "react";
import { useStopwatch } from "react-timer-hook";
import Store from "electron-store";
import { Diff } from "./Diff";

const store = new Store<Step[]>();

const pad2 = (n: number) => n.toString().padStart(2, "0");
const formatTime = (h: number, m: number, s: number) =>
  `${pad2(h)}:${pad2(m)}:${pad2(s)}`;

export const Body = (): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [chart, setChart] = useState<Step[]>(store.get("chart") || [{}]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({
      autoStart: false,
    });
  const onPushKeyRef = useRef(null);

  useEffect(
    () =>
      store.set(
        "chart",
        chart.map((step) => ({ title: step.title, time: step.time }))
      ),
    [chart]
  );

  const handleChangeTitle = (title: string, index: number) => {
    setChart((prev) =>
      prev.map((step, i) => (i === index ? { ...step, title } : { ...step }))
    );
  };

  const handleChangeTime = (time: string, index: number) => {
    setChart((prev) =>
      prev.map((step, i) => (i === index ? { ...step, time } : { ...step }))
    );
  };

  const textEditButton = isEditing ? "Save" : "Edit Chart";
  const toggleIsEditing = () => setIsEditing((prev) => !prev);

  const timerText = (() => formatTime(hours, minutes, seconds))();

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
    window.addEventListener("keydown", (event) => {
      if (event.key === " ") onPushKeyRef.current();
    });
  }, []);

  const addStep = () => setChart([...chart, {}]);
  const deleteStep = (index: number) =>
    setChart((prev) => prev.filter((_, idx) => idx !== index));

  const handleReset = () => {
    const ok = window.confirm("Are you sure you want to RESET?");
    if (!ok) return;
    reset(undefined, false);
    setCurrentIndex(-1);
    setChart((prev) =>
      prev.map((step) => ({ title: step.title, time: step.time }))
    );
  };

  const handleSave = () => {
    const ok = window.confirm("Are you sure you want to SAVE RECORD?");
    if (!ok) return;
    setChart((prev) =>
      prev.map((step) => ({ title: step.title, time: step.lap }))
    );
  };

  return (
    <>
      {chart.map((step, index) =>
        isEditing ? (
          <div key={index}>
            <input
              placeholder="Title"
              value={step.title || ""}
              onChange={(e) => handleChangeTitle(e.target.value, index)}
            />
            <input
              type="time"
              step="1"
              value={step.time}
              onChange={(e) => handleChangeTime(e.target.value, index)}
            />
            <button onClick={() => deleteStep(index)}>Del</button>
          </div>
        ) : (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>{step.title || "No Label"}</span>
            <Diff step={step} />
          </div>
        )
      )}
      {isEditing && <button onClick={addStep}>Add</button>}
      {!isEditing && (
        <div
          style={{
            textAlign: "center",
            fontSize: 36,
            color: isRunning ? "white" : "cyan",
          }}
        >
          <span>{timerText}</span>
        </div>
      )}
      {!isRunning && (
        <button onClick={toggleIsEditing}>{textEditButton}</button>
      )}
      {!isRunning && !isEditing && (
        <>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleSave}>Save Record</button>
        </>
      )}
    </>
  );
};
