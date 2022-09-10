const chai = require('chai');
const { expect } = chai;

const statusCode = require('../helpers/statuscode');

describe('🕵️ Testing status codes', () => {
    it('Should be an object', () => expect(statusCode).to.be.an('object'));
    it('Should be an object that is not null', () => expect(statusCode).to.not.be.null);
    it('Should be an object that is not undefined', () => expect(statusCode).to.not.be.undefined);
    it('Should be an object that is not empty', () => expect(statusCode).to.not.be.empty);
    it('Should contain exactly 2 keys', () => expect(Object.keys(statusCode).length).to.be.equal(2));
    it('Should contain the defined keys', () => expect(statusCode).to.have.keys([ 'STATUS_OK', 'STATUS_NOT_FOUND' ]));
    it('Should contain exactly the defined properties and values', () => {
        expect(statusCode).to.have.property('STATUS_OK', 200)
            .and.to.be.a('number')
            .and.to.match(/\d+/g)
            .and.to.not.be.null.and.not.to.be.undefined;
        expect(statusCode).to.have.property('STATUS_NOT_FOUND', 404)
            .and.to.be.a('number')
            .and.to.match(/\d+/g)
            .and.to.not.be.null.and.not.to.be.undefined;
        expect(statusCode).to.deep.equal({ STATUS_OK: 200, STATUS_NOT_FOUND: 404 });
    });
});
