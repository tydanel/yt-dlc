import { readFileSync, existsSync, mkdirSync, openSync, closeSync, exists } from 'fs';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

// const abort_controllers = [];
const procs = [];
const cfg_root = fileURLToPath(new URL('.', import.meta.url));

// Edit these to your preferences
const dst_root = '/srv/media';
// const start_date = '20230205';

function updateChannelDb({ lib_name, chan_name, channel, start_date }) {
  const downloadPath = `${dst_root}/${lib_name}/${chan_name}`;

  if (!existsSync(downloadPath)) {
    mkdirSync(downloadPath, { recursive: true });
  }
  if (!existsSync(`${cfg_root}_archives`)) {
    mkdirSync(`${cfg_root}_archives`)
  }
  if (!existsSync(`${cfg_root}_logs`)) {
    mkdirSync(`${cfg_root}_logs`)
  }

  const out = openSync(`${cfg_root}_logs/${lib_name}-${chan_name}.log.txt`, 'a');
  const err = openSync(`${cfg_root}_logs/${lib_name}-${chan_name}.err.txt`, 'a');

  const args = [
    '--dateafter', start_date,
    '--break-on-reject',
    '--download-archive', `${cfg_root}_archives/${lib_name}-${chan_name}-archive.txt`,
    '-ciw',
    '-P', downloadPath,
    `https://www.youtube.com/${channel}/videos`,
  ];
  const controller = new AbortController();

  const proc = spawn('yt-dlp', args, {
    signal: controller.signal,
    stdio: ['ignore', out, err],
  });
  
  proc.on('error', (error) => {
    closeSync(out);
    closeSync(err);
    if (error && error.code !== 'ABORT_ERR') throw error;
  });

  proc.on('exit', () => {
    closeSync(out);
    closeSync(err);
  });

  console.log('RUNNING: ', 'yt-dlp', args.join(' '));
  procs.push([proc, controller]);
}

const config = JSON.parse(readFileSync(`${cfg_root}channels.json`).toString());


Object.keys(config).forEach((key) => {
  const channels = config[key];

  channels.forEach((channel) => {
    updateChannelDb({
      lib_name: key,
      chan_name: channel[0],
      channel: channel[1],
      start_date: channel[2] || '20230205'
    });
  });
});

process.on('SIGINT', () => {
  for ( const [proc, controller] of procs )
  {
    console.log('Exiting' + proc.pid);
    controller.abort();
  }
  console.log('....');
});
