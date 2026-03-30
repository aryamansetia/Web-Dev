import React, { useState } from "react";
import StudentCard from "./components/StudentCard";
import "./App.css";

function App() {
  // Initial sample data rendered when the page first loads.
  const initialStudents = [
    {
      name: "Aryaman Setia",
      regNo: "24BDS0009",
      department: "Computer Science",
      cgpa: 9.18
    },
    {
      name: "Sandarbh Gupta",
      regNo: "24BIT0506",
      department: "Information Technology",
      cgpa: 8.80
    }
  ];

  // Student cards list is managed in state so new cards can be added.
  const [students, setStudents] = useState(initialStudents);
  const [editingRegNo, setEditingRegNo] = useState(null);

  // Controlled form state for the Add Student form.
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    department: "",
    cgpa: ""
  });
  const [formError, setFormError] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function resetForm() {
    setFormData({
      name: "",
      regNo: "",
      department: "",
      cgpa: ""
    });
    setFormError("");
    setEditingRegNo(null);
  }

  function handleEditStudent(regNo) {
    const studentToEdit = students.find((student) => student.regNo === regNo);

    if (!studentToEdit) {
      return;
    }

    setFormData({
      name: studentToEdit.name,
      regNo: studentToEdit.regNo,
      department: studentToEdit.department,
      cgpa: studentToEdit.cgpa.toString()
    });
    setFormError("");
    setEditingRegNo(regNo);
  }

  function handleDeleteStudent(regNo) {
    const shouldDelete = window.confirm("Are you sure you want to delete this student card?");

    if (!shouldDelete) {
      return;
    }

    setStudents((previous) => previous.filter((student) => student.regNo !== regNo));

    if (editingRegNo === regNo) {
      resetForm();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedRegNo = formData.regNo.trim();
    const trimmedDepartment = formData.department.trim();
    const parsedCgpa = Number(formData.cgpa);

    if (!trimmedName || !trimmedRegNo || !trimmedDepartment || !formData.cgpa) {
      setFormError("Please fill in all fields before submitting.");
      return;
    }

    if (Number.isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
      setFormError("CGPA must be a number between 0.00 and 10.00.");
      return;
    }

    const isDuplicateRegNo = students.some(
      (student) =>
        student.regNo.toLowerCase() === trimmedRegNo.toLowerCase() &&
        student.regNo.toLowerCase() !== String(editingRegNo ?? "").toLowerCase()
    );

    if (isDuplicateRegNo) {
      setFormError("Registration number already exists. Please enter a unique value.");
      return;
    }

    if (editingRegNo) {
      setStudents((previous) =>
        previous.map((student) =>
          student.regNo === editingRegNo
            ? {
                name: trimmedName,
                regNo: trimmedRegNo,
                department: trimmedDepartment,
                cgpa: parsedCgpa
              }
            : student
        )
      );
    } else {
      setStudents((previous) => [
        ...previous,
        {
          name: trimmedName,
          regNo: trimmedRegNo,
          department: trimmedDepartment,
          cgpa: parsedCgpa
        }
      ]);
    }

    resetForm();
  }

  return (
    <main className="app-shell">
      <section className="card-section" aria-label="Student profile cards">
        <h1 className="card-section__title">Student Profile Cards</h1>
        <p className="card-section__subtitle">
          Web Programming Assignment 4
        </p>

        <form className="student-form" onSubmit={handleSubmit} noValidate>
          <h2 className="student-form__title">
            {editingRegNo ? "Edit Student" : "Add a New Student"}
          </h2>
          <p className="student-form__subtitle">
            {editingRegNo
              ? "Update details and save changes to the selected student card."
              : "Enter details below to generate a new student profile card."}
          </p>

          <div className="student-form__grid">
            <label className="student-form__field" htmlFor="name">
              <span>Full Name</span>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Aryaman Setia"
              />
            </label>

            <label className="student-form__field" htmlFor="regNo">
              <span>Registration Number</span>
              <input
                id="regNo"
                name="regNo"
                type="text"
                value={formData.regNo}
                onChange={handleInputChange}
                placeholder="e.g., 24BDS0009"
              />
            </label>

            <label className="student-form__field" htmlFor="department">
              <span>Department</span>
              <input
                id="department"
                name="department"
                type="text"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science"
              />
            </label>

            <label className="student-form__field" htmlFor="cgpa">
              <span>CGPA</span>
              <input
                id="cgpa"
                name="cgpa"
                type="number"
                min="0"
                max="10"
                step="0.01"
                value={formData.cgpa}
                onChange={handleInputChange}
                placeholder="e.g., 9.18"
              />
            </label>
          </div>

          {formError ? (
            <p className="student-form__error" role="alert">
              {formError}
            </p>
          ) : null}

          <div className="student-form__actions">
            <button type="submit" className="student-form__button">
              {editingRegNo ? "Save Changes" : "Add Student Card"}
            </button>

            {editingRegNo ? (
              <button
                type="button"
                className="student-form__button student-form__button--secondary"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            ) : null}
          </div>
        </form>

        <div className="card-grid">
          {/* Render one StudentCard per student object. */}
          {students.map((student) => (
            <StudentCard
              key={student.regNo}
              name={student.name}
              regNo={student.regNo}
              department={student.department}
              cgpa={student.cgpa}
              onEdit={() => handleEditStudent(student.regNo)}
              onDelete={() => handleDeleteStudent(student.regNo)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
