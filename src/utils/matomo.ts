export function matomoTrack(name: string, action: string, value: string) {
  try {
    // @ts-ignore
    window._paq.push([
      "trackContentImpression",
      `${name}/${action}`,
      value,
      "https://tool.example.com",
    ]);
  } catch (_) {}
}
