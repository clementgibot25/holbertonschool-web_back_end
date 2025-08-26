export default function updateStudentGradeByCity(students, city, newGrades) {
    const studentsInCity = students.filter((student) => student.location === city);
    const updatedStudents = studentsInCity.map((student) => {
      const gradeObj = newGrades.find((g) => g.studentId === student.id);
      return {
        ...student,
        grade: gradeObj ? gradeObj.grade : 'N/A',
      };
    });
    return updatedStudents;
  }