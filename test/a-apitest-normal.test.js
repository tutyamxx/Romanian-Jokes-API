const app = require("../app.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("🕵️ Testing normal API endpoint responses behaviour", () => {
    describe("🎯 GET default path of the API /api/", () => {
        it("Should return a message that it is working with a status code of OK (200)", (done) => {
            chai.request(app).get("/v1/").end((err, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("It's working 😃 ! Try /v1/romanianjokes or look here https://github.com/tutyamxx/Romanian-Jokes-API#usage");

                done();
            });
        });
    });

    describe("🎯 GET a random romanian joke on path /v1/romanianjokes", () => {
        it("Should return a random Romanian Joke with a status code of OK (200)", (done) => {
            chai.request(app).get("/v1/romanianjokes").end((err, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(3);
                expect(response.body).to.have.a.property("_id").and.to.be.a("number").and.to.match(/\d+/g);
                expect(response.body).to.have.a.property("joketype").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body).to.have.a.property("joke").and.to.be.a("string").and.to.have.length.above(0);

                done();
            });
        });
    });

    describe("🎯 GET current API version on path /v1/romanianjokes/version", () => {
        it("Should return a string with the API version with a status code of OK (200)", (done) => {
            chai.request(app).get("/v1/romanianjokes/version").end((err, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("version").and.to.be.a("string").and.to.have.length.above(0).and.to.match(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);

                done();
            });
        });
    });

    describe("🎯 GET all existing jokes on path /v1/romanianjokes/all", () => {
        it("Should return all the jokes with a status code of OK (200)", (done) => {
            chai.request(app).get("/v1/romanianjokes/all").end((err, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("array").and.to.have.length.above(0);
                expect(response.body.length).to.be.above(0);

                done();
            });
        });
    });

    describe("🎯 GET the number of jokes available on path /v1/romanianjokes/count", () => {
        it("Should return a number of current jokes with a status code of OK (200)", (done) => {
            chai.request(app).get("/v1/romanianjokes/count").end((err, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("jokes_available").and.to.be.a("number").and.to.be.above(0).and.to.match(/\d+/g);

                done();
            });
        });
    });

    describe("🎯 GET 10 random jokes on path /v1/romanianjokes/random_ten", () => {
        it("Should return random 10 jokes with a status code of OK (200)", (done) => {
            chai.request(app).get("/v1/romanianjokes/random_ten").end((err, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("array").and.to.have.length.above(0);
                expect(response.body).to.have.lengthOf(10);
                expect(response.body.length).to.be.above(0);

                done();
            });
        });
    });

    describe("🎯 GET all the joke categories on path /v1/romanianjokes/categories", () => {
        it("Should return a list of categories available with a status code of OK (200)", (done) => {
            chai.request(app).get("/v1/romanianjokes/categories").end((err, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("categories").and.to.be.a("array").and.to.have.length.above(0);

                done();
            });
        });
    });

    describe("🎯 GET a random joke with a random ID from path /v1/romanianjokes/id/:id", () => {
        it("Should search a joke by given ID and return it with a status code of OK (200)", (done) => {
            chai.request(app).get("/v1/romanianjokes/count").end((err, response) => {
                expect(response).to.have.status(200);
                expect(response.body.jokes_available).to.be.a("number").and.to.match(/\d+/g);

                chai.request(app).get(`/v1/romanianjokes/id/${parseInt(Math.floor(Math.random() * response.body.jokes_available) + 1)}`).end((err, response1) => {
                    expect(response1).to.have.status(200);
                    expect(response1.body).to.be.a("object");
                    expect(Object.keys(response.body).length).to.be.equal(1);
                    done();
                });
            });
        });

        it("Should return a status code of NOT FOUND (404) when joke ID does not exist", (done) => {
            chai.request(app).get("/v1/romanianjokes/id/9999999999999999999999999999").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal("This joke id specified is not in the database").to.not.be.empty;

                done();
            });
        });
    });

    describe("🎯 GET all the jokes with a specified category query from path /v1/romanianjokes/filter/:joketype", () => {
        it("Should filter jokes by a given category and return all the filtered jokes with a status code of OK (200)", (done) => {
            chai.request(app).get("/v1/romanianjokes/categories").end((err, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("categories").and.to.be.a("array").and.to.have.length.above(0);

                const getRandomFilterFromCategories = response.body.categories[Math.floor(Math.random() * response.body.categories.length)];

                chai.request(app).get(`/v1/romanianjokes/filter/${getRandomFilterFromCategories}`).end((err, response1) => {
                    expect(response1).to.have.status(200);
                    expect(response1.body).to.be.a("array").and.to.have.length.above(0);
                    expect(response1.body.length).to.be.above(0);

                    done();
                });
            });
        });

        it("Should return a status code of NOT FOUND (404) when joke type does not exist", (done) => {
            chai.request(app).get("/v1/romanianjokes/filter/somenonsensestring1234nonsens5435534").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal("This joke type could not be found in the database").to.not.be.empty;

                done();
            });
        });
    });

    describe("🎯 GET all the jokes filtered by a category from path /api/romanianjokes/filter/:joketype/random", () => {
        it("Should filter jokes by a given category and return a random joke with filter applied with a status code of OK (200)", (done) => {
            chai.request(app).get("/v1/romanianjokes/categories").end((err, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("categories").and.to.be.a("array").and.to.have.length.above(0);

                const getRandomFilterFromCategories = response.body.categories[Math.floor(Math.random() * response.body.categories.length)];

                chai.request(app).get(`/v1/romanianjokes/filter/${getRandomFilterFromCategories}/random`).end((err, response1) => {
                    expect(response1).to.have.status(200);
                    expect(response1.body).to.be.a("object");
                    expect(Object.keys(response1.body).length).to.be.equal(3);
                    expect(response1.body).to.have.a.property("_id").and.to.be.a("number").and.to.match(/\d+/g);
                    expect(response1.body).to.have.a.property("joketype").and.to.be.a("string").and.to.have.length.above(0);
                    expect(response1.body).to.have.a.property("joke").and.to.be.a("string").and.to.have.length.above(0);

                    done();
                });
            });
        });

        it("Should return a status code of NOT FOUND (404) when joke type does not exist", (done) => {
            chai.request(app).get("/v1/romanianjokes/filter/somenonsensestring1234nonsens5435534/random").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal("This joke type could not be found in the database").to.not.be.empty;

                done();
            });
        });
    });

    describe("🎯 GET a random non existing page using an invalid query or path from API path /api/ ", () => {
        it("Should return a status code of NOT FOUND (404) when there is a non existing page specified in the query", (done) => {
            chai.request(app).get("/v1/errorshouldreturn").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal("Sorry, can't find the page you are looking for 👀").to.not.be.empty;
            });

            chai.request(app).get("/v1/romanianjoke").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal("Sorry, can't find the page you are looking for 👀").to.not.be.empty;
            });

            chai.request(app).get("/v1/romanianjoke/countt").end((err, response) => {
                expect(response).to.have.status(404);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body.message).to.be.equal("Sorry, can't find the page you are looking for 👀").to.not.be.empty;
            });

            done();
        });
    });

    beforeEach(() => chai.request(app).close());
    afterEach(() => chai.request(app).close());
});
