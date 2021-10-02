const app = require("../app.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("🕵️ Testing method that is not allowed: POST -> for all endpoint behaviour responses", () => {
    describe("🎯 Try to use the POST method", () => {
        it("Should return and error with a status code of NOT FOUND (404) on all endpoints", (done) => {
            const errorMessage = "Sorry, can't find the page you are looking for 👀";

            chai.request(app).post("/v1/").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal(errorMessage).to.not.be.empty;
            });

            chai.request(app).post("/v1/romanianjokes").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal(errorMessage).to.not.be.empty;
            });

            chai.request(app).post("/v1/romanianjokes/version").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal(errorMessage).to.not.be.empty;
            });

            chai.request(app).post("/v1/romanianjokes/all").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal(errorMessage).to.not.be.empty;
            });

            chai.request(app).post("/v1/romanianjokes/count").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal(errorMessage).to.not.be.empty;
            });

            chai.request(app).post("/v1/romanianjokes/random_ten").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal(errorMessage).to.not.be.empty;
            });

            chai.request(app).post("/v1/romanianjokes/categories").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal(errorMessage).to.not.be.empty;
            });

            chai.request(app).post("/v1/romanianjokes/id/123").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal(errorMessage).to.not.be.empty;
            });

            chai.request(app).post("/v1/romanianjokes/filter").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal(errorMessage).to.not.be.empty;
            });

            chai.request(app).post("/v1/romanianjokes/filter/blonde").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal(errorMessage).to.not.be.empty;
            });

            chai.request(app).post("/v1/romanianjokes/filter/blonde/random").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal(errorMessage).to.not.be.empty;
            });

            done();
        });
    });

    beforeEach(() => chai.request(app).close());
    afterEach(() => chai.request(app).close());
});
