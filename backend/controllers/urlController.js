const validUrl = require("valid-url");
const short_id = require("shortid");
const Url = require("../models/urlModel");
const QRcode = require("qrcode");

exports.mainController = async (req, res) => {
  const { originalURL } = req.body;

  if (!originalURL) {
    return res.status(400).json("please add a link");
  }

  if (!validUrl.isUri(originalURL)) {
    return res.status(401).json("Invalid url");
  }

  const shortID = short_id.generate();
  try {
    let url = await Url.findOne({ originalURL });
    if (!url) {
      const QRCode = await QRcode.toDataURL(originalURL)
      url = new Url({ originalURL, shortID: shortID.toLowerCase(), qr: QRCode });
      await url.save();
    }
    res.status(201).json(url);
  } catch (err) {
    console.log(err);
  }
};
