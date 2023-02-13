## YT-DLC 
An easy to use tool for building your own YouTube library.

#### Dependencies
[yt-dlp](https://github.com/yt-dlp/yt-dlp)
and its [dependencies](https://github.com/yt-dlp/yt-dlp#dependencies)

#### Instructions
* `git clone https://github.com/tydanel/yt-dlc.git`
* `cd yt-dlc`
* `cp channels.example.json channels.json`
Modify `channels.json` to suit your needs,
you also might want to edit the `dst_root` and
`start_date` variables.

* Run `npm start` or `node main.js`



#### Use cases
Nice if you hace jellyfin server installed with the
(jellyfin-youtube-metadata-plugin)[https://github.com/ankenyr/jellyfin-youtube-metadata-plugin]