const expect = require("chai").expect;
const request = require("request");

describe("Testing API Endpoint Responses:", () =>
{
    describe("GET /api/", () =>
    {
        it("Should return a message that it is working with a status code of OK (200)", (done) =>
        {
            request("http://localhost:3000/api/", (error, response, body) =>
            {
                const ParseBody = JSON.parse(body);

                expect(response.statusCode).to.be.equal(200);
                expect(ParseBody).to.be.a("object");
                expect(ParseBody).to.have.a.property("message").to.be.equal("It's working 😃 ! Try /api/romanianjokes or look here https://github.com/tutyamxx/Romanian-Jokes-API#usage");
                done();
            });
        });
    });

    describe("GET /api/romanianjokes", () =>
    {
        it("Should return a random Romanian Joke with a status code of OK (200)", (done) =>
        {
            request("http://localhost:3000/api/romanianjokes", (error, response, body) =>
            {
                const ParseBody = JSON.parse(body);

                expect(response.statusCode).to.be.equal(200);
                expect(ParseBody).to.be.a("object");
                expect(ParseBody).to.have.a.property("id").to.be.a("number").to.be.above(0);
                expect(ParseBody).to.have.a.property("joketype").to.be.a("string");
                expect(ParseBody).to.have.a.property("joke").to.be.a("string");
                done();
            });
        });
    });

    describe("GET /api/romanianjokes/all", () =>
    {
        it("Should return all the jokes with a status code of OK (200)", (done) =>
        {
            request("http://localhost:3000/api/romanianjokes/all", (error, response, body) =>
            {
                const ParseBody = JSON.parse(body);

                expect(response.statusCode).to.be.equal(200);
                expect(ParseBody).to.be.a("array");
                done();
            });
        });
    });

    describe("GET /api/romanianjokes/count", () =>
    {
        it("Should return a number of current jokes with a status code of OK (200)", (done) =>
        {
            request("http://localhost:3000/api/romanianjokes/count", (error, response, body) =>
            {
                const ParseBody = JSON.parse(body);

                expect(response.statusCode).to.be.equal(200);
                expect(ParseBody).to.be.a("object");
                expect(ParseBody).to.have.a.property("jokes_available").to.be.a("number").to.be.above(0);

                done();
            });
        });
    });

    describe("GET /api/romanianjokes/random_ten", () =>
    {
        it("Should return random 10 jokes with a status code of OK (200)", (done) =>
        {
            request("http://localhost:3000/api/romanianjokes/random_ten", (error, response, body) =>
            {
                const ParseBody = JSON.parse(body);

                expect(response.statusCode).to.be.equal(200);
                expect(ParseBody).to.be.a("array");
                expect(ParseBody).to.be.to.have.lengthOf(10);
                done();
            });
        });
    });

    describe("GET /api/romanianjokes/categories", () =>
    {
        it("Should return a list of categories available with a status code of OK (200)", (done) =>
        {
            request("http://localhost:3000/api/romanianjokes/categories", (error, response, body) =>
            {
                const ParseBody = JSON.parse(body);

                expect(response.statusCode).to.be.equal(200);
                expect(ParseBody).to.be.a("object");
                expect(ParseBody).to.have.a.property("categories").to.be.a("array");
                done();
            });
        });
    });

    describe("GET /api/romanianjokes/:id", () =>
    {
        it("Should search a joke by given ID and return it with a status code of OK (200)", (done) =>
        {
            request("http://localhost:3000/api/romanianjokes/count", (error, response, body) =>
            {
                const ParseBody = JSON.parse(body);

                request("http://localhost:3000/api/romanianjokes/" + parseInt(Math.floor(Math.random() * ParseBody.jokes_available) + 1), (error, response, body1) =>
                {
                    const ParseBody1 = JSON.parse(body1);

                    expect(response.statusCode).to.be.equal(200);
                    expect(ParseBody.jokes_available).to.be.a("number").to.be.above(0);
                    expect(ParseBody1).to.be.a("array");
                    done();
                });
            });
        });
    });

    describe("GET /api/romanianjokes/filter/:joketype", () =>
    {
        it("Should filter jokes by a given category and return all the filtered jokes with a status code of OK (200)", (done) =>
        {
            request("http://localhost:3000/api/romanianjokes/categories", (error, response, body) =>
            {
                const ParseBody = JSON.parse(response.body);
                const GetRandomFilterFromCategories = ParseBody.categories[Math.floor(Math.random() * ParseBody.categories.length)];

                request("http://localhost:3000/api/romanianjokes/filter/" + GetRandomFilterFromCategories, (error, response, body) =>
                {
                    const ParseBody1 = JSON.parse(response.body);

                    expect(ParseBody1).to.be.a("array");
                    done();
                });
            });
        });
    });

    describe("GET /api/romanianjokes/filter/:joketype/random", () =>
    {
        it("Should filter jokes by a given category and return a random joke with filter applied with a status code of OK (200)", (done) =>
        {
            request("http://localhost:3000/api/romanianjokes/categories", (error, response, body) =>
            {
                const ParseBody = JSON.parse(response.body);
                const GetRandomFilterFromCategories = ParseBody.categories[Math.floor(Math.random() * ParseBody.categories.length)];

                request("http://localhost:3000/api/romanianjokes/filter/" + GetRandomFilterFromCategories + "/random", (error, response, body) =>
                {
                    const ParseBody1 = JSON.parse(response.body);

                    expect(response.statusCode).to.be.equal(200);
                    expect(ParseBody1).to.deep.be.a("object");
                    expect(ParseBody1).to.have.a.property("id").to.be.a("number").to.be.above(0);
                    expect(ParseBody1).to.have.a.property("joketype").to.be.a("string");
                    expect(ParseBody1).to.have.a.property("joke").to.be.a("string");
                    done();
                });
            });
        });
    });
});