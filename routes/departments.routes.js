const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getById);
router.post('/departments', DepartmentController.postDocument);
router.put('/departments/:id', DepartmentController.putDocument);
router.delete('/departments/:id', DepartmentController.deleteDocument);

module.exports = router;