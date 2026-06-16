import * as repo from '../repository/studentRepository.js'

export const addStudent = async ({id, name, password}) => {
    console.log(`addStudent called with: ${id}, ${name}, ${password}`);
    return repo.addStudent({id, name, password});
};

export const findStudent = async (id) => {
    console.log(`findStudent called with: ${id}`);
    // Convert id from string to number to match the type used in the repository
    let student = repo.findStudent(+id);
    if (student) {
        student = {...student};
        // student.password = undefined;
        delete student.password;
    }
    console.log(`findStudent returned: ${JSON.stringify(student)}`);
    return student;
};

export const deleteStudent = async (id) => {
    const student = repo.findStudent(+id);
    if (!student) {
        return false;
    }
    console.log(`deleteStudent called with: ${id}`);
    // Delete the student from the repository
    const success = repo.deleteStudent(+id);
    if (!success) {
        return false;
    }
    // Remove the password from the student object before returning
    delete student.password;
    return student;
};

export const updateStudent = async (id, data) => {
    console.log(`updateStudent called with: ${id}, ${JSON.stringify(data)}`);
    const student = repo.findById(+id);
    if (!student) {
        return false;
    }
    for (const key in data) {
        if (student.hasOwnProperty(key)) {
            student[key] = data[key];
        }
    }
    // Update the student in the repository
    const success = repo.update(+id, student);
    if (!success) {
        return false;
    }
    delete student.scores;
    return student;
};

export const addScore = async (id, exam, score) => {
    console.log(`addScore called with: ${id}, ${exam}, ${score}`);
    return repo.addScore(+id, exam, score);
};

export const findByName = async (name) => {
    console.log(`findByName called with: ${name}`);
    return repo.findByName(name);
};

export const countByNames = async (names) => {
    console.log(`countByNames called with: ${JSON.stringify(names)}`);
    return repo.countByNames(names);
};

export const findByMinScore = async (exam, minScore) => {
    console.log(`findByMinScore called with: ${exam}, ${minScore}`);
    return repo.findByMinScore(exam, minScore);
};
