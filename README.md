# Selected Lines Reference

Copy the active file path and selected line range in this format:

```text
example.py: /path/to/workspace/src/example.py (lines 1537-1550)
```

For a single line:

```text
example.py: /path/to/workspace/src/example.py (line 1537)
```

## Usage

Select code in an editor and run:

```text
Selected Lines Reference: Copy Selected Lines Reference
```

Default shortcuts:

- macOS: `Cmd+Alt+C`
- Windows/Linux: `Ctrl+Alt+C`

## Settings

```json
{
  "selectedLinesReference.pathStyle": "absolute",
  "selectedLinesReference.includeFileNamePrefix": true
}
```

Set `selectedLinesReference.pathStyle` to `relative` if you prefer workspace-relative paths.

## Development

Open this folder in VS Code and press `F5` to launch an Extension Development Host.

## Packaging

Install dependencies:

```bash
npm install
```

Create a `.vsix` package:

```bash
npm run package
```

Publish to the Marketplace:

```bash
npm run publish
```
