const express = require("express");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.get("/images", async (req: any, res: any) => {
    const { imgName, width, height } = req.query;
    console.log(width);

    if (!imgName) {
        console.log(imgName);
        return res.status(400).send("error not theere");
    }
    const imagePath = path.join(__dirname, "img", `${imgName}.jpg`);

    if (!fs.existsSync(imagePath)) {
        return res.status(404).send("image not found");
    }

    try {
        let img = sharp(imagePath);

        if (width && height) {
            const intWidht = parseInt(width);
            const intHeight = parseInt(height);
            console.log(width);

            if (!isNaN(intWidht) && !isNaN(intHeight)) {
               img= img.resize(intWidht, intHeight);
            } else {
                return res.status(404).send("width and height not valid");
            }
        }

        const imgInMemory = await img.toBuffer();
        res.type("image/jpeg");
        res.send(imgInMemory);
    } catch (err) {
        console.log("error during proccessing", err);
        res.status(500).send("server error");
    }
});

app.listen(port, () => {
    console.log(`i can hear any thing from port number ${port}`);
});
