const mongoose = require('mongoose');
const expect = require('chai').expect;
const Employee = require('../employee.model');

describe('Employee', () => {
  after(() => {
    mongoose.models = {};
  });

  it('should throw an error if no arg', () => {
    const emp = new Employee({});

    emp.validate(err => {
      expect(err).to.exist;
    });
  });

  it('should throw an error if not all args', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const emp = new Employee({ firstName, lastName});

    emp.validate(err => {
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw an error if args are not strings', () => {
    const firstName = {};
    const lastName = [];
    const department = {};
    const emp = new Employee({ firstName, lastName, department });

    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it('should not throw an error if args are correct', () => {
    const firstName = 'John';
    const lastName = 'Smith';
    const department = 'Management';
    const emp = new Employee({ firstName, lastName, department });

    emp.validate(err => {
      expect(err).to.not.exist;
    });
  });
});