let timer: number | NodeJS.Timeout | undefined;

export function lapTimer(content: { (): void; (): void }) {
  timer = setInterval(content, 10);
}

export function stopTimer() {
  if (timer) {
    clearInterval(timer);
  }
}
