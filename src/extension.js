const vscode = require("vscode");

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "selectedLinesReference.copy",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showWarningMessage("No active editor.");
        return;
      }

      const document = editor.document;

      if (document.uri.scheme !== "file") {
        vscode.window.showWarningMessage("Only local files are supported.");
        return;
      }

      const filePath = vscode.workspace.asRelativePath(document.uri, false);
      const selection = editor.selection;
      const range = getSelectedLineRange(selection);
      const lineReference =
        range.start === range.end
          ? `${range.start}`
          : `${range.start}-${range.end}`;
      const reference = `${filePath}:${lineReference}`;

      await vscode.env.clipboard.writeText(reference);
      vscode.window.setStatusBarMessage(`Copied: ${reference}`, 3500);
    }
  );

  context.subscriptions.push(disposable);
}

function getSelectedLineRange(selection) {
  let start = selection.start.line + 1;
  let end = selection.end.line + 1;

  if (!selection.isEmpty && selection.end.character === 0) {
    end -= 1;
  }

  if (end < start) {
    end = start;
  }

  return { start, end };
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
