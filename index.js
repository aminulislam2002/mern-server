const express = require("express");
const cors = require("cors");
const youtubeTags = require("youtube-tags");
var getYouTubeID = require("get-youtube-id");
var youtubeThumbnail = require("youtube-thumbnail");
var getYoutubeTitle = require("get-youtube-title");
let downloadImage = require("download-image");
const download = require("image-downloader");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Post a youtube video link and get title, thumbnail, tags
app.post("/youtubeVideoLink", async (req, res) => {
  const videoDetails = [];

  //   extract the video id form the video link
  const videoUrl = await req.body.videoUrl;
  const id = await getYouTubeID(videoUrl);

  //   get the title of the youtube video
  const videoTitle = getYoutubeTitle(id, function (err, videoTitle) {
    videoDetails.push({ title: videoTitle });
  });

  //   get the thumbnail of the youtube video
  const videoThumbnail = youtubeThumbnail(videoUrl);
  videoDetails.push({ thumbnail: videoThumbnail });

  //   get the tags of the youtube video
  const videoTags = await youtubeTags.getYoutubeTags(id);
  videoDetails.push({ tags: videoTags });

  res.send(videoDetails);
});

app.post("/youtubeVideoThumbnailDownload", (req, res) => {
  const image = req.body.image;
  console.log(image);

  options = {
    url: image,
    dest: "/path/to/dest/photo.jpg", // will be saved to /path/to/dest/photo.jpg
  };

  download
    .image(options)
    .then(({ filename }) => {
      console.log("Saved to", filename); // saved to /path/to/dest/photo.jpg
    })
    .catch((err) => console.error(err));
});

app.listen(port, () => {
  console.log(`MERN SERVER is running on PORT ${port}`);
});
