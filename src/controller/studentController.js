// import { addStudent as addStudentService } from '../service/studentService.js';
import * as service from '../service/studentService.js';

export const addStudent = async (req, res) => {
    console.log(`addStudent called with: ${JSON.stringify(req.body)}`);
    const success = await service.addStudent(req.body);
    if (!success) {
        return res.status(409).send({
            "timestamp": new Date().toISOString(),
            "status": 409,
            "error": "Conflict",
            "message": "Student with id " + req.body.id + " already exists",
            "path": "/student"
        });
    }
    return res.status(204).send();
};

export const findStudent = async (req, res) => {
    console.log(`findStudent called with: ${JSON.stringify(req.params)}`);
    const student = await service.findStudent(req.params.id);
    if (!student) {
        return res.status(404).send({
            "timestamp": new Date().toISOString(),
            "status": 404,
            "error": "Not Found",
            "message": `Student with id ${req.params.id} not found`,
            "path": req.path
        });
    }
    // res.json default status is 200
    return res.json(student);
};

export const deleteStudent = async (req, res) => {
    console.log(`deleteStudent called with: ${JSON.stringify(req.params)}`);
    const student = await service.deleteStudent(req.params.id);
    if (!student) {
        return res.status(404).send({
            "timestamp": new Date().toISOString(),
            "status": 404,
            "error": "Not Found",
            "message": `Student with id ${req.params.id} not found`,
            "path": req.path
        });
    }
    return res.json(student);
};

export const updateStudent = async (req, res) => {
    console.log(`updateStudent called with: ${JSON.stringify(req.params)} ${JSON.stringify(req.body)}`);
    const student = await service.updateStudent(req.params.id, req.body);
    if (!student) {
        return res.status(404).send({
            "timestamp": new Date().toISOString(),
            "status": 404,
            "error": "Not Found",
            "message": `Student with id ${req.params.id} not found`,
            "path": req.path
        });
    }
    return res.json(student);
};

export const addScore = async (req, res) => {
    console.log(`addScore called with: ${JSON.stringify(req.params)} ${JSON.stringify(req.body)}`);
    const student = await service.addScore(req.params.id, req.body.examName, req.body.score);
    if (!student) {
        return res.status(404).send({
            "timestamp": new Date().toISOString(),
            "status": 404,
            "error": "Not Found",
            "message": `Student with id ${req.params.id} not found`,
            "path": req.path
        });
    }
    return res.status(204).send();
};

export const findByName = async (req, res) => {
    console.log(`findByName called with: ${JSON.stringify(req.params)}`);
    const students = await service.findByName(req.params.name);
    // if (!students) {
    //     return res.status(404).send();
    // }
    return res.json(students);
};

export const countByNames = async (req, res) => {
    console.log(`countByNames called with: ${JSON.stringify(req.query)}`);
    const count = await service.countByNames(req.query.names);
    return res.json(count);
};

export const findByMinScore = async (req, res) => {
    console.log(`findByMinScore called with: ${JSON.stringify(req.params)}`);
    const students = await service.findByMinScore(req.params.exam, req.params.minScore);
    return res.json(students);
};