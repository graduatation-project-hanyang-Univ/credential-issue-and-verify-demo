function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function convertUtcToTimestamp(str) {
  const date = new Date(str);

  const timestamp = date.getTime();

  return timestamp / 1000;
}

export { sleep, convertUtcToTimestamp };
