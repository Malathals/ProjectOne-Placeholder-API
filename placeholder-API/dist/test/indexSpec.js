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
const { app, convertWidthAndHeight } = require("../index");
const superTest = require("supertest");
const request = superTest(app);
describe("Utility function tests", () => {
    it("should convert a string to a number", () => {
        expect(convertWidthAndHeight("300")).toBe(300);
    });
});
describe("Test endpoint responses", () => {
    it("gets the API endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/images?imgName=fjord&width=200&height=200");
        expect(response.status).toBe(200);
    }));
});
