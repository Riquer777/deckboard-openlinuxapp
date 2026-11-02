const { spawn } = require('node:child_process');
const { Extension, InputTypes, Platforms, log } = require('deckboard-kit');

function parseArguments(value = '') {
  const args = [];
  let current = '';
  let quote = null;
  let escaped = false;

  for (const character of String(value)) {
    if (escaped) {
      current += character;
      escaped = false;
      continue;
    }

    if (character === '\\' && quote !== "'") {
      escaped = true;
      continue;
    }

    if (quote) {
      if (character === quote) quote = null;
      else current += character;
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }

    if (/\s/.test(character)) {
      if (current.length) {
        args.push(current);
        current = '';
      }
      continue;
    }

    current += character;
  }

  if (escaped) current += '\\';
  if (quote) throw new Error('Unclosed quote in arguments.');
  if (current.length) args.push(current);

  return args;
}

function launchDetached(command, args, label) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const child = spawn(command, args, {
      detached: true,
      stdio: 'ignore',
      shell: false
    });

    child.once('error', error => {
      if (settled) return;
      settled = true;
      reject(error);
    });

    child.once('spawn', () => {
      if (settled) return;
      settled = true;
      child.unref();
      log.info('Launched:', label);
      resolve();
    });
  });
}

class OpenLinuxAppExtension extends Extension {
  constructor() {
    super();
    this.name = 'Open Linux App';
    this.platforms = [Platforms.linux];
    this.inputs = [
      {
        label: 'Open Linux App',
        value: 'open-linux-app',
        icon: 'rocket',
        fontIcon: 'fas',
        color: '#2980b9',
        input: [
          {
            label: 'Application, Command, File, Folder, or URL',
            ref: 'target',
            type: InputTypes.text
          },
          {
            label: 'Arguments (optional)',
            ref: 'arguments',
            type: InputTypes.text
          },
          {
            label: 'Open with xdg-open',
            ref: 'useXdgOpen',
            type: InputTypes.checkbox,
            default: false
          }
        ]
      }
    ];
  }

  async execute(action, { target, arguments: argumentString = '', useXdgOpen = false } = {}) {
    if (action !== 'open-linux-app') return;

    const requestedTarget = String(target || '').trim();
    if (!requestedTarget) {
      log.warn('No application or target was specified.');
      return;
    }

    try {
      if (useXdgOpen) {
        await launchDetached('/usr/bin/xdg-open', [requestedTarget], requestedTarget);
        return;
      }

      const args = parseArguments(argumentString);
      await launchDetached(requestedTarget, args, requestedTarget);
    } catch (error) {
      const reason = String(error?.message || error);
      log.error('Failed to launch target:', requestedTarget, reason);
    }
  }
}

module.exports = new OpenLinuxAppExtension();
