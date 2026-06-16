import Student from '../model/student.js'

const students = new Map()

// export const init = () => {
//     students.set(1, new Student(1, 'John', '123456'))
//     students.set(2, new Student(2, 'Jane', '123456'))
//     students.set(3, new Student(3, 'Bob', '123456'))
// }

export const addStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
        // throw new Error('Student already exists')
    }
    // key Students id, value Student object
    students.set(id, new Student(id, name, password))
    return true;
}

export const findStudent = id => students.get(id)

export const deleteStudent = id => {
    const student = students.get(id)
    students.delete(id)
    return student
}

export const updateStudent = (student) => {
    if (students.has(student.id)) {
        students.set(student.id, student)
        return student
    }
}

export const findByName = name => [...students.values()].filter(s => s.name.toLowerCase() === name.toLowerCase());

// return Array.from(students.values()).filter(student => student.name.toLowerCase() === name.toLowerCase())


export const countByNames = names => {
    console.log(Array.isArray(names));
    names = names.map(n => n.toLowerCase());
    return [...students.values()].filter(s => names.includes(s.name.toLowerCase())).length;
    // return Array.from(students.values()).filter(student => names.includes(student.name)).length
    // return Array.from(students.values()).filter(student => names.map(name => name.toLowerCase()).includes(student.name.toLowerCase())).length
}

export const findByMinScore = (exam, minScore) => [...students.values()].filter(s => s.scores[exam] >= minScore);
// return Array.from(students.values()).filter(student => student.scores[exam] >= minScore)