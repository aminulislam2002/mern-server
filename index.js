const express = require("express");
const cors = require("cors");
const youtubeTags = require("youtube-tags");
var getYouTubeID = require("get-youtube-id");
var youtubeThumbnail = require("youtube-thumbnail");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Post video URL for youtube tags
app.post("/videoLinkForYoutubeTags", async (req, res) => {
  //    1st ----- get the video url from client site
  const videoUrl = req.body.videoUrl;
  //    2nd ----- extract the video id form the video link
  const id = getYouTubeID(videoUrl);

  //    3rd ----- get the tags of the youtube video
  const tags = await youtubeTags.getYoutubeTags(id);

  //    4th ----- send the tags to client site
  res.send(tags);
});

// Post video URL for youtube thumbnail
app.post("/videoLinkForYoutubeThumbnail", (req, res) => {
  //    1st ----- get the video url from client site
  const videoUrl = req.body.videoUrl;

  //    2nd ----- get the thumbnail of the youtube video
  const thumbnail = youtubeThumbnail(videoUrl);

  //    3rd ----- send the thumbnail to client site
  res.send(thumbnail);
});

app.listen(port, () => {
  console.log(`MERN SERVER is running on PORT ${port}`);
});
