const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');
const { name } = require('file-loader');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
	let httpServer = null;
	let pageObject = null;

	before((done) => {
		httpServer = app.listen(8888);
		done();
	});

	beforeEach(() => {
		pageObject = nightmare.goto(url);
	});

	after((done) => {
		httpServer.close();
		done();
	});

// This is where your code is going to go
    it('should contain a <h1> element for the page title', () => { 
        return pageObject
            .evaluate(() => document.querySelector('h1').innerText)
            .then(headerText => {
            expect(headerText).to.not.be.null;
            expect(headerText).to.equal('Mortgage Calculator');
            });
        });

    it('should contain <input> element named principle ', () => {
        return pageObject
            .evaluate(() => document.querySelector('input').name)
            .then(inputName => {
                expect(inputName).to.not.be.null;
                expect(inputName).to.equal('principal');
            });
        })
    
     it('should contain <button> element with id calculate ', () => {
          return pageObject
           .evaluate(() => document.querySelector('button').id)
           .then(buttonId => {
            expect(buttonId).to.not.be.null;
            expect(buttonId).to.equal('calculate');
          });
       })

       it('should contain <p> element with id output ', () => {
        return pageObject
         .evaluate(() => document.querySelector('p').id)
         .then(pId => {
          expect(pId).to.not.be.null;
          expect(pId).to.equal('output');
        });
     })

     it('should contain <option> element with value 12 ', () => {
            return pageObject
          .evaluate(() => document.querySelector('option').value)
        .then(optionValue => {
         expect(optionValue).to.not.be.null;
        expect(optionValue).to.equal('12');
            });
        })


 it('should correctly calculate mortgage', () =>
pageObject
.wait()
.type('input[name=principal]', 300000)
.type('input[name=interestRate]', 3.75)
.type('input[name=loanTerm]', 30)
.select('select[name=period]', 12)
.click('button#calculate')
.wait('#output')
.evaluate(() => document.querySelector('#output').innerText)
.then((outputText) => {
	expect(outputText).to.equal('$1389.35');
})
).timeout(6500);

it('should correctly calculate mortgage', () =>
pageObject
.wait()
.type('input[name=principal]', 100000)
.type('input[name=interestRate]', 5.5)
.type('input[name=loanTerm]', 30)
.select('select[name=period]', 12)
.click('button#calculate')
.wait('#output')
.evaluate(() => document.querySelector('#output').innerText)
.then((outputText) => {
	expect(outputText).to.equal('$567.79');
})
).timeout(6500);


it('should correctly calculate mortgage', () =>
pageObject
.wait()
.type('input[name=principal]', 750000)
.type('input[name=interestRate]', 3.1)
.type('input[name=loanTerm]', 30)
.select('select[name=period]', 12)
.click('button#calculate')
.wait('#output')
.evaluate(() => document.querySelector('#output').innerText)
.then((outputText) => {
	expect(outputText).to.equal('$3202.62');
})
).timeout(6500);

    })