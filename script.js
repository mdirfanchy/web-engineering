$(document).ready(function () {
  function clearFields(...fields) {
    fields.forEach(field => $(field).val(''));
  }

  // 🔁 Load students from localStorage
  function loadFromLocalStorage() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    $('#studentTable tbody').empty();
    students.forEach(student => {
      const newRow = `
        <tr data-id="${student.id}">
          <td>${student.name}</td>
          <td>${student.id}</td>
          <td>${student.marks}</td>
        </tr>
      `;
      $('#studentTable tbody').append(newRow);
    });
  }

  // 💾 Save students to localStorage
  function saveToLocalStorage() {
    const students = [];
    $('#studentTable tbody tr').each(function () {
      const name = $(this).find('td:eq(0)').text();
      const id = $(this).find('td:eq(1)').text();
      const marks = $(this).find('td:eq(2)').text();
      students.push({ name, id, marks });
    });
    localStorage.setItem('students', JSON.stringify(students));
  }

  // ➕ Add new student
  $('#addBtn').click(function () {
    const name = $('#name').val().trim();
    const id = $('#id').val().trim();
    const marks = $('#marks').val().trim();

    if (name && id && marks) {
      // Prevent duplicate ID
      if ($(`#studentTable tbody tr[data-id="${id}"]`).length > 0) {
        alert("Student with this ID already exists!");
        return;
      }

      const newRow = `
        <tr data-id="${id}">
          <td>${name}</td>
          <td>${id}</td>
          <td>${marks}</td>
        </tr>
      `;
      $('#studentTable tbody').append(newRow);
      saveToLocalStorage();
      clearFields('#name', '#id', '#marks');
    } else {
      alert('Please fill all fields!');
    }
  });

  // 🔍 Find student to modify
  $('#modifyBtn').click(function () {
    const searchId = $('#searchId').val().trim();
    const row = $(`#studentTable tbody tr[data-id="${searchId}"]`);

    if (row.length) {
      $('#editName').val(row.find('td:eq(0)').text());
      $('#editMarks').val(row.find('td:eq(2)').text());
      $('#popup').data('id', searchId).show();
    } else {
      alert('ID not found!');
    }
  });

  // 🔄 Update student info
  $('#updateBtn').click(function () {
    const updatedName = $('#editName').val().trim();
    const updatedMarks = $('#editMarks').val().trim();
    const id = $('#popup').data('id');

    const row = $(`#studentTable tbody tr[data-id="${id}"]`);
    if (row.length) {
      row.find('td:eq(0)').text(updatedName);
      row.find('td:eq(2)').text(updatedMarks);
      saveToLocalStorage(); // Save updates
    }

    $('#popup').hide();
  });

  // Load data on page load
  loadFromLocalStorage();
});
