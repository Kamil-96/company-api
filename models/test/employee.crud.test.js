const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Smith', department: 'IT' });
      await testEmpOne.save();
      
      const testEmpTwo = new Employee({ firstName: 'Tyrion', lastName: 'Lannister', department: 'Management' });
      await testEmpTwo.save();
    });

    after(async () => {
      await Employee.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({ lastName: 'Lannister' });
      expect(employee.lastName).to.be.equal('Lannister');
    });
  });

  describe('Creating data', () => {

    after(async () => {
      await Employee.deleteMany();
    });

    it('should insert new document with "insertOne" method', async () => {
      const employee = await new Employee({ firstName: 'Mike', lastName: 'Wilson', department: 'HR' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Smith', department: 'IT' });
      await testEmpOne.save();
      
      const testEmpTwo = new Employee({ firstName: 'Tyrion', lastName: 'Lannister', department: 'Management' });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'John'}, { $set: { department: 'HR' }});
      const employee = await Employee.findOne({ firstName: 'John' });
      expect(employee.department).to.be.equal('HR');
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Tyrion' });
      employee.firstName = 'Tywin';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: 'Tywin' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { department: 'Support' }});
      const employees = await Employee.find({ department: 'Support' });
      expect(employees.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Smith', department: 'IT' });
      await testEmpOne.save();
      
      const testEmpTwo = new Employee({ firstName: 'Tyrion', lastName: 'Lannister', department: 'Management' });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ lastName: 'Smith' });
      const removedEmployee = await Employee.findOne({ lastName: 'Smith' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ department: 'Management' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ department: 'Management' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });
  });
});