let timer: ReturnType<typeof setInterval>;

export function lapTimer(content: () => void) {
  timer = setInterval(content, 10);
}

export function stopTimer() {
  if (timer) {
    clearInterval(timer);
  }
}
