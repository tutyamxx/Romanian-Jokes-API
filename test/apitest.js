const app = require("../app.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("Testing API Endpoint Responses:", () =>
{
    describe("GET /api/", () =>
    {
        it("Should return a message that it is working with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("It's working 😃 ! Try /api/romanianjokes or look here https://github.com/tutyamxx/Romanian-Jokes-API#usage");
                
                done();
            });
        });
    });

    describe("GET /api/romanianjokes", () =>
    {
        it("Should return a random Romanian Joke with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/romanianjokes").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(3);
                expect(response.body).to.have.a.property("id").and.to.be.a("number").and.to.match(/\d+/g);
                expect(response.body).to.have.a.property("joketype").and.to.be.a("string").and.to.have.length.above(0);
                expect(response.body).to.have.a.property("joke").and.to.be.a("string").and.to.have.length.above(0);

                done();
            });
        });
    });

    describe("GET /api/romanianjokes/version", () =>
    {
        it("Should return a string with the API version with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/romanianjokes/version").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("version").and.to.be.a("string").and.to.have.length.above(0).and.to.match(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);

                done();
            });
        });
    });

    describe("GET /api/romanianjokes/all", () =>
    {
        it("Should return all the jokes with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/romanianjokes/all").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("array").and.to.have.length.above(0);
                expect(response.body.length).to.be.above(0);

                done();
            });
        });
    });

    describe("GET /api/romanianjokes/count", () =>
    {
        it("Should return a number of current jokes with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/romanianjokes/count").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("jokes_available").and.to.be.a("number").and.to.be.above(0).and.to.match(/\d+/g);

                done();
            });
        });
    });

    describe("GET /api/romanianjokes/random_ten", () =>
    {
        it("Should return random 10 jokes with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/romanianjokes/random_ten").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("array").and.to.have.length.above(0);
                expect(response.body).to.have.lengthOf(10);
                expect(response.body.length).to.be.above(0);

                done();
            });
        });
    });

    describe("GET /api/romanianjokes/categories", () =>
    {
        it("Should return a list of categories available with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/romanianjokes/categories").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("categories").and.to.be.a("array").and.to.have.length.above(0);
                
                done();
            });
        });
    });

    describe("GET /api/romanianjokes/:id", () =>
    {
        it("Should search a joke by given ID and return it with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/romanianjokes/count").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body.jokes_available).to.be.a("number").and.to.match(/\d+/g);

                chai.request(app).get("/api/romanianjokes/" + parseInt(Math.floor(Math.random() * response.body.jokes_available) + 1)).end((err, response1) =>
                {
                    expect(response1).to.have.status(200);
                    expect(response1.body).to.be.a("array").and.to.have.length.above(0);
                    expect(response1.body.length).to.be.equal(1);

                    done();
                });
            });
        });
    });

    describe("GET /api/romanianjokes/filter/:joketype", () =>
    {
        it("Should filter jokes by a given category and return all the filtered jokes with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/romanianjokes/categories").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("categories").and.to.be.a("array").and.to.have.length.above(0);

                const GetRandomFilterFromCategories = response.body.categories[Math.floor(Math.random() * response.body.categories.length)];

                chai.request(app).get("/api/romanianjokes/filter/" + GetRandomFilterFromCategories).end((err, response1) =>
                {
                    expect(response1).to.have.status(200);
                    expect(response1.body).to.be.a("array").and.to.have.length.above(0);
                    expect(response1.body.length).to.be.above(0);

                    done();
                });
            });
        });
    });

    describe("GET /api/romanianjokes/filter/:joketype/random", () =>
    {
        it("Should filter jokes by a given category and return a random joke with filter applied with a status code of OK (200)", (done) =>
        {
            chai.request(app).get("/api/romanianjokes/categories").end((err, response) =>
            {
                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(Object.keys(response.body).length).to.be.equal(1);
                expect(response.body).to.have.a.property("categories").and.to.be.a("array").and.to.have.length.above(0);

                const GetRandomFilterFromCategories = response.body.categories[Math.floor(Math.random() * response.body.categories.length)];

                chai.request(app).get("/api/romanianjokes/filter/" + GetRandomFilterFromCategories + "/random").end((err, response1) =>
                {
                    expect(response1).to.have.status(200);
                    expect(response1.body).to.be.a("object");
                    expect(Object.keys(response1.body).length).to.be.equal(3);
                    expect(response1.body).to.have.a.property("id").and.to.be.a("number").and.to.match(/\d+/g);
                    expect(response1.body).to.have.a.property("joketype").and.to.be.a("string").and.to.have.length.above(0);
                    expect(response1.body).to.have.a.property("joke").and.to.be.a("string").and.to.have.length.above(0);

                    done();
                });
            });
        });
    });

    after(() => chai.request(app).close());
});