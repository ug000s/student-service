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
    return students.delete(id)
}

export const updateStudent = (id, student) => {
    return students.set(id, student)
    // return student
}

export const addScore = (id, exam, score) => {
    const student = students.get(id)
    if (!student) {
        return false
    }
    student.scores[exam] = score
    return student
}

export const findByName = name => {
    return Array.from(students.values()).filter(student => student.name.toLowerCase() === name.toLowerCase())
}

export const countByNames = names => {
    // return Array.from(students.values()).filter(student => names.includes(student.name)).length
    return Array.from(students.values()).filter(student => names.map(name => name.toLowerCase()).includes(student.name.toLowerCase())).length
}

export const findByMinScore = (exam, minScore) => {
    return Array.from(students.values()).filter(student => student.scores[exam] >= minScore)
}