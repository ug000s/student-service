import * as repo from '../repository/studentRepository.js'

export const addStudent = async ({id, name, password}) => {
    // console.log(`addStudent called with: ${id}, ${name}, ${password}`);
    return repo.addStudent({id, name, password});
};

export const findStudent = async (id) => {
    // console.log(`findStudent called with: ${id}`);
    // Convert id from string to number to match the type used in the repository
    let student = repo.findStudent(+id);
    if (student) {
        student = {...student};
        // student.password = undefined;
        delete student.password;
    }
    // console.log(`findStudent returned: ${JSON.stringify(student)}`);
    return student;
};

export const deleteStudent = async (id) => {
    // console.log(`deleteStudent called with: ${id}`);
    let student = repo.deleteStudent(+id);
    if (student) {
        student.password = undefined;
    }
    return student;
};

export const updateStudent = async (id, data) => {
    // console.log(`updateStudent called with: ${id}, ${JSON.stringify(data)}`);
    let student = repo.findStudent(+id);
    if (student) {
        // copy of student object to avoid modifying the original and update student Object with new data
        student = {...student, ...data};
        // copy of student object to avoid modifying the original
        student = {...repo.updateStudent(student)};
        // delete student.scores to avoid returning it in the response
        student.scores = undefined;
    }
    return student;
};

export const addScore = async (id, exam, score) => {
    // console.log(`addScore called with: ${id}, ${exam}, ${score}`);
    const student = repo.findStudent(+id);
    if (student) {
        student.scores[exam] = score;
        repo.updateStudent(student);
    }
    return student;
};

export const findByName = async (name) => repo.findByName(name).map(s => ({...s, password: undefined}));

export const countByNames = async (names) => {
    // console.log(`countByNames called with: ${JSON.stringify(names)}`);
    // Ensure names is always an array not a string when only 1 name is passed
    names = Array.isArray(names) ? names : [names];
    return repo.countByNames(names);
};

export const findByMinScore = async (exam, minScore) => repo.findByMinScore(exam, minScore).map(s => ({...s, password: undefined}));
