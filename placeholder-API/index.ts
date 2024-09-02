import express from "express";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

const convertWidthAndHeight = function (widthOrHeight: string): number {
  return parseInt(widthOrHeight);
};

app.get("/images", async (req: any, res: any) => {
  const { imgName, width, height } = req.query;

  if (!imgName) {
    return res.status(400).send("error not there");
  }

  const imagePath = path.join(__dirname, "img", `${imgName}.jpg`);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).send("image not found");
  }

  try {
    let img = sharp(imagePath);

    if (width && height) {
      const intWidth = convertWidthAndHeight(width);
      const intHeight = convertWidthAndHeight(height);

      if (!isNaN(intWidth) && !isNaN(intHeight)) {
        img = img.resize(intWidth, intHeight);
      } else {
        return res.status(400).send("width and height not valid");
      }
    }

    const imgInMemory = await img.toBuffer();
    res.type("image/jpeg");
    res.send(imgInMemory);
  } catch (err) {
    console.log("error during processing", err);
    res.status(500).send("server error");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export { app, convertWidthAndHeight };
