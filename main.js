import { readFileSync, existsSync, mkdirSync, openSync, closeSync, exists } from 'fs';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const controller = new AbortController();
const procs = [];
const cfg_root = fileURLToPath(new URL('.', import.meta.url));

// Edit these to your preferences
const dst_root = '/srv/media';
const start_date = '20230205';

function updateChannelDb({ libName, chanName, channel }) {
  const downloadPath = `${dst_root}/${libName}/${chanName}`;

  if (!existsSync(downloadPath)) {
    mkdirSync(downloadPath, { recursive: true });
  }
  if (!existsSync(`${cfg_root}_archives`)) {
    mkdirSync(`${cfg_root}_archives`)
  }
  if (!existsSync(`${cfg_root}_logs`)) {
    mkdirSync(`${cfg_root}_logs`)
  }

  const out = openSync(`${cfg_root}_logs/${libName}-${chanName}.log.txt`, 'a');
  const err = openSync(`${cfg_root}_logs/${libName}-${chanName}.err.txt`, 'a');

  const args = [
    '--dateafter', start_date,
    '--break-on-reject',
    '--download-archive', `${cfg_root}_archives/${libName}-${chanName}-archive.txt`,
    '-ciw',
    '-P', downloadPath,
    `https://www.youtube.com/${channel}/videos`,
  ];

  const proc = spawn('yt-dlp', args, {
    signal: controller.signal,
    stdio: ['ignore', out, err],
  }, (error) => {
    closeSync(out);
    closeSync(err);
    if (error) throw error;
  });

  console.log('RUNNING: ', 'yt-dlp', args.join(' '));
  procs.push(proc);
}

const config = JSON.parse(readFileSync(`${cfg_root}channels.json`).toString());

Object.keys(config).forEach((key) => {
  const channels = config[key];

  channels.forEach((channel) => {
    updateChannelDb({
      libName: key,
      chanName: channel[0],
      channel: channel[1],
    });
  });
});

process.on('SIGINT', () => {
  controller.abort();
});