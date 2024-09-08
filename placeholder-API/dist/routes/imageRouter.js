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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertWidthAndHeight = exports.processImage = void 0;
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
const processImage = (imgName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const imagePath = path_1.default.join(__dirname, '../img', `${imgName}.jpg`);
    if (!fs_1.default.existsSync(imagePath)) {
        throw new Error('Image not found');
    }
    let img = (0, sharp_1.default)(imagePath);
    if (width && height) {
        const intWidth = (0, exports.convertWidthAndHeight)(width);
        const intHeight = (0, exports.convertWidthAndHeight)(height);
        if (!isNaN(intWidth) && !isNaN(intHeight)) {
            img = img.resize(intWidth, intHeight);
        }
        else {
            throw new Error('Invalid width or height');
        }
    }
    return yield img.toBuffer();
});
exports.processImage = processImage;
const convertWidthAndHeight = (widthOrHeight) => {
    return parseInt(widthOrHeight);
};
exports.convertWidthAndHeight = convertWidthAndHeight;
router.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imgName = req.query.imgName;
    const width = req.query.width;
    const height = req.query.height;
    if (!imgName) {
        return res.status(400).send('Image name is required');
    }
    try {
        const imgInMemory = yield (0, exports.processImage)(imgName, width, height);
        res.status(200).type('image/jpeg').send(imgInMemory);
    }
    catch (err) {
        if (err instanceof Error) {
            console.log('Error during image processing', err.message);
            if (err.message === 'Image not found') {
                return res.status(404).send('Image not found');
            }
            else if (err.message === 'Invalid width or height') {
                return res.status(400).send('Width and height not valid');
            }
        }
        else {
            console.log('Unknown error during image processing', err);
        }
        res.status(500).send('Server error');
    }
}));
exports.default = router;
