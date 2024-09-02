"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;
app.get("/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const intWidht = convertWidthAndHeight(width);
            const intHeight = convertWidthAndHeight(height);
            console.log(width);
            if (!isNaN(intWidht) && !isNaN(intHeight)) {
                img = img.resize(intWidht, intHeight);
            }
            else {
                return res.status(404).send("width and height not valid");
            }
        }
        const imgInMemory = yield img.toBuffer();
        res.type("image/jpeg");
        res.send(imgInMemory);
    }
    catch (err) {
        console.log("error during proccessing", err);
        res.status(500).send("server error");
    }
}));
const convertWidthAndHeight = function (widthOrHeigth) {
    return parseInt(widthOrHeigth);
};
app.listen(port, () => {
    console.log(`i can hear any thing from port number ${port}`);
});
exports.default = convertWidthAndHeight;
