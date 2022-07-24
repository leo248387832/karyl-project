export function matomoTrack(
  category: string,
  action: string,
  name: string,
  value: string
) {
  try {
    // @ts-ignore
    window._paq.push(["trackEvent", category, action, name, value]);
  } catch (_) {}
}
