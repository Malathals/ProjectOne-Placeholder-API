import { error } from "console";
import { response } from "express";

const { app, convertWidthAndHeight } = require("../index");
const superTest = require("supertest");

const request = superTest(app);

describe("Utility function tests", () => {
  it("should convert a string to a number", () => {
    expect(convertWidthAndHeight("300")).toBe(300);
  });
});

describe("Test endpoint responses", () => {
  it("gets the API endpoint", async () => {
    const response = await request.get(
      "/images?imgName=fjord&width=200&height=200"
    );
    expect(response.status).toBe(200);
  });
});


// describe("Test endpoint responses", () => {
//     it("gets the API endpoint",  (done) => {
//        request.get(
//         "/images?imgName=fjord&width=200&height=200"
//       ).then((response) =>{
//         done()
//       expect(response.status).toBe(200);
//       }).catch(error =>{
//         done.fail(error)
//       })
//     })
// })
