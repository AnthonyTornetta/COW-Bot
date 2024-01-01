import fs from "fs";
import ytdl from "ytdl-core";
import auth from "../../auth.json" with { type: "json" };
import ytSearch from "youtube-search";

export default {
  search: (query, callback) => {
    ytSearch(query, { maxResults: 4, key: auth.youtube }, (err, res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].kind === "youtube#video") {
          callback(err, res[i]);
          return;
        }
      }

      callback(err, null);
    });
  },

  downloadSong: (url, saveAs) => {
    ytdl(url).pipe(fs.createWriteStream(saveAs));
  },

  idFromURL: (url) => {
    return url.match(
      /(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/)([^\s&\?\/\#]+)/
    )[1];
  },

  videoInfo: (url, callback) => {
    ytdl.getBasicInfo(url).then((res) => {
      callback(res);
    });
  },

  relatedVideos: (url, callback) => {
    ytdl.getBasicInfo(url).then((res) => {
      callback(res.related_videos);
    });
  },
};
