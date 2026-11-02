# Open Linux App — Deckboard Extension

Launch Linux applications, commands, files, folders, and URLs directly from Deckboard.

## Features

- Launch applications using their executable name or full path.
- Launch AppImages and executable scripts.
- Pass optional command-line arguments.
- Open files, folders, and URLs through `xdg-open`.
- Runs detached from Deckboard, so the application can remain open independently.
- Uses argument arrays and does not invoke a shell.
- Linux-only extension.

## Requirements

- Linux with a graphical desktop session.
- Deckboard with extension support.
- Node.js 18 or later and npm.
- `deckboard-kit-cli` installed and available in PATH.
- `xdg-open` (usually provided by `xdg-utils`) when using the xdg-open option.

Install the CLI if needed:

```bash
npm install --global --prefix "$HOME/.local" deckboard-kit-cli
```

Make sure `$HOME/.local/bin` is in your PATH.

## Installation and build

Clone the repository into a development directory:

```bash
git clone https://github.com/Riquer777/deckboard-openlinuxapp.git
cd deckboard-openlinuxapp
npm install
npm run check
npm run build
```

The generated extension package will be:

```text
dist/riquer777-openlinuxapp.asar
```

To install automatically into Deckboard's default Linux extension directory:

```bash
npm run install:deckboard
```

Or copy the package manually:

```bash
mkdir -p ~/deckboard/extensions
cp dist/riquer777-openlinuxapp.asar ~/deckboard/extensions/
```

Restart Deckboard after installation.

## Configuration

Add an **Open Linux App** button and configure its fields:

| Field | Description | Example |
| --- | --- | --- |
| Application, Command, File, Folder, or URL | Executable or target to open | `/usr/bin/steam` |
| Arguments (optional) | Command-line arguments | `-silent` |
| Open with xdg-open | Use the desktop's default handler instead of executing the target | Enabled for URLs, documents, and folders |

### Examples

Launch Steam:

- Target: `/usr/bin/steam`
- Arguments: `-silent`
- Open with xdg-open: disabled

Launch an AppImage:

- Target: `/home/user/Applications/MyApp.AppImage`
- Arguments: leave empty
- Open with xdg-open: disabled

Open a website:

- Target: `https://example.com`
- Open with xdg-open: enabled

Open a folder:

- Target: `/home/user/Downloads`
- Open with xdg-open: enabled

Arguments support quoted values, for example:

```text
--profile "Work Profile" --new-window
```

## Security and behavior

The extension does not use a shell. The target is passed directly to Node.js `spawn()`, and arguments are parsed into individual arguments. Shell operators, pipes, redirections, and command substitutions are not interpreted.

Only configure commands and paths you trust. The extension runs with the same permissions as the Deckboard process.

When **Open with xdg-open** is enabled, the extension runs `/usr/bin/xdg-open` with the target as a single argument. This option is intended for URLs, files, and folders, not executable commands.

## Development

Check JavaScript syntax:

```bash
npm run check
```

Build the ASAR package:

```bash
npm run build
```

## License

MIT License.
