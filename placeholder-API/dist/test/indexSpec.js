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
const index_1 = __importDefault(require("../index"));
const imageRouter_1 = require("../routes/imageRouter");
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.default);
describe('Utility function tests', () => {
    it('should convert a string to a number', () => {
        expect((0, imageRouter_1.convertWidthAndHeight)('300')).toBe(300);
    });
});
describe('Test endpoint responses', () => {
    it('gets the API endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/img/api/images?imgName=fjord&width=200&height=200');
        expect(response.status).toBe(200);
    }));
});
describe('Image Processing Function Tests', () => {
    it('should process the image without throwing an error', () => __awaiter(void 0, void 0, void 0, function* () {
        const testWidth = '200';
        const testHeight = '200';
        let errorOccurred = false;
        try {
            yield (0, imageRouter_1.processImage)('fjord', testWidth, testHeight);
        }
        catch (error) {
            errorOccurred = true;
        }
        expect(errorOccurred).toBe(false);
    }));
});
