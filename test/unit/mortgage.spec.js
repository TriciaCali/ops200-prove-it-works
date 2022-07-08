const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    let mortgage = null;
    beforeEach(() => {
         mortgage = new Mortgage(100000,5.5,30,12);
       
    })

    it('Should have a monthyPayment function', () => {
        expect(mortgage.monthlyPayment).to.exist;
    });

    it ('Should have a constructor', ()=> {
        expect(mortgage.constructor).to.exist
    })

    it ( 'Should calculate monthly mortgage correctly', () => {
        expect(mortgage.monthlyPayment()).to.equal('567.79')
    })

    it ('Should return message with mortgage payment', () => {
        expect(mortgage.paymentMessage(mortgage.monthlyPayment())).to.equal('Your monthly payment would be $567.79')
    })
 

});