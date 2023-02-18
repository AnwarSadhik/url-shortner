const Url = require("../models/urlModel");
const validUrl = require("valid-url");
const QRcode = require("qrcode");
const shrinkUrl = require("node-url-shortener");

exports.mainController = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json("please add a link");
  }

  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json("Invalid url");
  }
  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      res.status(200).json(url);
    } else {
      // const shortUrl = urlCode + ".shot.ly";
      shrinkUrl.short(longUrl, (err, shortUrl) => {
        // const qrCodeData = QRcode.toDataURL(shortUrl);
        QRcode.toDataURL(shortUrl, (err, qrCode) => {
          url = new Url({
            longUrl,
            shortUrl,
            qrCode,
          });
          url.save();
          res.status(201).json(url);
        });
      });

      // url.qrCode = qrCodeData;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};
