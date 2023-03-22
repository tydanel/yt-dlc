# YT-DLC 

An easy-to-use tool for building your own YouTube library.

<<<<<<< HEAD
## Dependencies
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) and its [dependencies](https://github.com/yt-dlp/yt-dlp#dependencies)
=======
#### Instructions
* Always make sure you are using the latest `yt-dlp`
* `git clone https://github.com/tydanel/yt-dlc.git`
* `cd yt-dlc`
* `cp channels.example.json channels.json`
Modify `channels.json` to suit your needs, you also might want to edit the `dst_root` in the script
* Run `npm start` or `node main.js`
>>>>>>> f45cfeb (Added TODO's)

## Instructions
1. `git clone https://github.com/tydanel/yt-dlc.git`
2. `cd yt-dlc`
3. `cp channels.example.json channels.json`
4. Modify `channels.json` to suit your needs. You may also want to edit the `dst_root` in the script.
5. Run `npm start` or `node main.js`

## Configuration
The top-level keys in the `channels.json` file allow you to separate downloaded videos by user. A folder will be created with the same name. Its value must be an array of 3-element arrays:
- The first element is the name. You can make this whatever you want. A folder will be created with the same name as this element.
- The second element is the YouTube channel tag, e.g., `@LinusTechTips`.
- The last element is the start date. The script will download all videos after this date. Date format is `YYYYMMDD`.

<<<<<<< HEAD
## Use cases
Useful if you have a Jellyfin server with [jellyfin-youtube-metadata-plugin](https://github.com/ankenyr/jellyfin-youtube-metadata-plugin) installed. Simply add all the folders output by this script to your library.
=======
#### Configuration
The top level keys in the `channels.json` file allow you to seporate downloaded videos by user, a folder will be created with the same name.
Its value must be an array, of 3 element arrays, first element is the name, you can make this whatever you want, a folder will be created with the same name as this element, second element is the youtube channel tag eg. `@LinusTechTips` lastly its the start date, the script will download all videos after this date. Date format is as follows `YYYYMMDD`.

#### Use cases
Nice if you have a jellyfin server with
[jellyfin-youtube-metadata-plugin](https://github.com/ankenyr/jellyfin-youtube-metadata-plugin)
installed just add all the folders output by this script to your library.



##### TODO
* Download batch size
* Bandwidth limiting
>>>>>>> f45cfeb (Added TODO's)
