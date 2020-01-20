import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

const user = 'invalid request';

describe('Route Tests', () => {
  describe('POST api/v1/auth/invalid', () => {
    it('should successfully catch invalid routes', (done) => {
      chai.request(app)
        .post('/api/v1/auth/invalid')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
