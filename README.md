# Selected Lines Reference

Copy the active workspace-relative file path and selected line range in this format:

```text
extensions/proto/Cargo.toml:6-13
```

For a single line:

```text
extensions/proto/Cargo.toml:6
```

## Usage

Select code in an editor and run:

```text
Selected Lines Reference: Copy Selected Lines Reference
```

Default shortcuts:

- macOS: `Ctrl+Shift+Alt+Cmd+C`
- Windows/Linux: `Ctrl+Shift+Alt+C`

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
