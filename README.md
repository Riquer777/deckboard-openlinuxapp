# Open Linux App — Deckboard Extension

Launch Linux applications and open URLs, files, or folders directly from Deckboard.

## Features

- Launch applications using their executable name or full path.
- Launch AppImages and executable scripts.
- Pass optional command-line arguments.
- Open URLs, files, and folders through `xdg-open`.
- Two separate actions; no checkbox or toggle mixed with text fields.
- Runs detached from Deckboard.
- Uses argument arrays and does not invoke a shell.
- Linux-only extension.

## Requirements

- Linux with a graphical desktop session.
- Deckboard with extension support.
- Node.js 18 or later and npm.
- `deckboard-kit-cli` installed and available in PATH.
- `xdg-open` (usually provided by `xdg-utils`) for the open-link/file/folder action.

Install the CLI if needed:

```bash
npm install --global --prefix "$HOME/.local" deckboard-kit-cli
```

Make sure `$HOME/.local/bin` is in your PATH.

## Installation and build

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

Or copy the package manually to Deckboard's extensions directory, then restart Deckboard.

## Actions

### Run Linux Application

The application folder and executable are separate fields. Set the folder to the directory containing the application's resources/dependencies, and set the executable field to the actual binary. The folder field is optional; if left empty, Deckboard's current working directory is inherited.

- **Application folder (working directory):** directory the application expects as its current folder, for example `/opt/MyApp` or `/home/user/Games/MyGame`. This is passed as the process working directory (`cwd`).
- **Executable path:** full path to the executable, for example `/opt/MyApp/my-app` or `/usr/bin/steam`.
- **Arguments (optional):** for example `-silent` or `--profile "Work Profile"`.

### Open Link, File, or Folder

- **URL or file/folder path:** for example `https://example.com` or `/home/user/Downloads`.
- This action always uses `/usr/bin/xdg-open`.

## Security and behavior

The extension does not use a shell. The executable and its arguments are passed directly to Node.js `spawn()`. Shell operators, pipes, redirections, and command substitutions are not interpreted.

Only configure commands and paths you trust. The extension runs with the same permissions as the Deckboard process.

## Development

```bash
npm run check
npm run build
```

## License

MIT License.
