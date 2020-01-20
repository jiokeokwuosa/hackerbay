import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Sinonchai from 'sinon-chai';
import app from '../index';

import JsonPatchController from '../controllers/jsonpatch.controller';
import JWTService from '../utils';

chai.should();
chai.use(Sinonchai);
chai.use(chaiHttp);

const myjson = {
  doc: {
    baz: 'qux',
    foo: 'bar'
  },
  patch: [
    { op: 'replace', path: '/baz', value: 'boo' }
  ]
};

const invalidJson = {
  doc: {
    baz: 'qux',
    foo: 'bar'
  },
  patch: [
    { path: '/baz', value: 'boo' }
  ]
};

describe('JsonPatch Endpoints', () => {
  describe('POST api/v1/jsonpatch', () => {
    it('should successfully patch a json when valid inputs are passed', (done) => {
      chai.request(app)
        .post('/api/v1/jsonpatch')
        .set('token', JWTService.generateToken({ username: 'johnson' }))
        .send(myjson)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          done();
        });
    });
    it('should not patch a json when invalid inputs are passed', (done) => {
      chai.request(app)
        .post('/api/v1/jsonpatch')
        .set('token', JWTService.generateToken({ username: 'johnson' }))
        .send(invalidJson)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('status').eql('400 Invalid Request');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should not patch a json when invalid token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/jsonpatch')
        .set('token', '77835eyguydeyryetduyewtyutwy')
        .send(invalidJson)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('status').eql('401 Unauthorized');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should not patch a json when token is not provided', (done) => {
      chai.request(app)
        .post('/api/v1/jsonpatch')
        .send(invalidJson)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('status').eql('401 unauthorized');
          res.body.should.have.property('error');
          done();
        });
    });
    it('should fake login server error', (done) => {
      const req = { body: {} };
      const res = {
        status() { },
        send() { }
      };

      sinon.stub(res, 'status').returnsThis();

      JsonPatchController.jsonPatch(req);
      done();
    });
    // it('should not login a user if he/she provides invalid credentials', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/auth/login')
    //     .send(invalidUser)
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.body.should.be.an('object');
    //       res.body.should.have.property('status').eql('400 Invalid Request');
    //       res.body.should.have.property('error');
    //       done();
    //     });
    // });
  });
});
