export const loadFile = async (): Promise<string> => {
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const fileText = await file.text();
  dispatch(setFileHandle(fileHandle));
  return fileText;
};

export const saveFile = async (text: string): Promise<void> => {
  const currentHandle = fileHandle || (await window.showOpenFilePicker())[0];
  const writable = await currentHandle.createWritable();
  await writable.write(text);
  await writable.close();
};
