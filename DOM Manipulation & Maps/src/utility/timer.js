let timer;

export function lapTimer(content) {
  timer = setInterval(content, 10);
}

export function stopTimer() {
  if (timer) {
    clearInterval(timer);
  }
}
