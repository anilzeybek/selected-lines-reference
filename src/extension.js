const path = require("path");
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

      const config = vscode.workspace.getConfiguration("selectedLinesReference");
      const filePath = getDisplayPath(
        document.uri,
        config.get("pathStyle", "absolute")
      );
      const fileName = path.basename(document.uri.fsPath);
      const selection = editor.selection;
      const range = getSelectedLineRange(selection);
      const lineLabel =
        range.start === range.end
          ? `line ${range.start}`
          : `lines ${range.start}-${range.end}`;

      const includeFileNamePrefix = config.get("includeFileNamePrefix", true);
      const reference = includeFileNamePrefix
        ? `${fileName}: ${filePath} (${lineLabel})`
        : `${filePath} (${lineLabel})`;

      await vscode.env.clipboard.writeText(reference);
      vscode.window.setStatusBarMessage(`Copied: ${reference}`, 3500);
    }
  );

  context.subscriptions.push(disposable);
}

function getDisplayPath(uri, pathStyle) {
  if (pathStyle === "relative") {
    return vscode.workspace.asRelativePath(uri, false);
  }

  return uri.fsPath;
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
