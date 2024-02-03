const express = require("express");
const cors = require("cors");
const youtubeTags = require("youtube-tags");
var getYouTubeID = require("get-youtube-id");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Post video URL
app.post("/videoLink", async (req, res) => {
  //    1st ----- extract the video id form the video link
  const youtubeUrl = req.body.youtubeUrl;
  const id = getYouTubeID(youtubeUrl);
  //    console.log(id);

  //    2nd ----- get the tags of the youtube video
  const tags = await youtubeTags.getYoutubeTags(id);
  //   console.log(tags);

  //    3rd ----- send the tags to client site
  res.send(tags);
});

app.listen(port, () => {
  console.log(`MERN SERVER is running on PORT ${port}`);
});
