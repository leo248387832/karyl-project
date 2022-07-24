export function matomoTrack(category: string, action: string, value: string) {
  try {
    // @ts-ignore
    window._paq.push(["trackEvent", category, action, value, 1]);
  } catch (_) {}
}
