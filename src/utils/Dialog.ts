import mdui from "mdui";

export function showDialog(title: string, content: string) {
  mdui.dialog({
    title: title,
    history: false,
    modal: true,
    content: content,
    buttons: [
      {
        text: "OK",
      },
    ],
  });
}

function showTOSDialog() {
  const content = "";
  mdui.dialog({
    title: "TOS",
    history: false,
    modal: true,
    content: content,
    buttons: [
      {
        text: "OK",
      },
    ],
  });
}
