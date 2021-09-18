const fs = require('fs');
const ytdl = require('ytdl-core');
const auth = require('../../auth.json');
const ytSearch = require('youtube-search');

module.exports = {
    search: (query, callback) =>
    {
        ytSearch(query, {maxResults: 4, key: auth.youtube }, ((err, res) =>
        {
            for(let i = 0; i < res.length; i++)
            {
                if(res[i].kind === 'youtube#video')
                {
                    callback(err, res[i]);
                    return;
                }
            }
            
            callback(err, null);
        }));
    },

    downloadSong: (url, saveAs) =>
    {
        ytdl(url).pipe(fs.createWriteStream(saveAs));
    },

    idFromURL: (url) =>
    {
        return url.match(/(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/)([^\s&\?\/\#]+)/)[1];
    },

    videoInfo: (id, callback) =>
    {
        ytdl.getBasicInfo(`https://www.youtube.com/watch?v=${id}`).then(res =>
        {
            callback(res);
        });
    }
}