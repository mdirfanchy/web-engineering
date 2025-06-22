$(document).ready(function () {
    
    function clearFields(...fields) {
      fields.forEach(field => $(field).val(''));
    }
  
    
    $('#addBtn').click(function () {
      const name = $('#name').val().trim();
      const id = $('#id').val().trim();
      const marks = $('#marks').val().trim();
  
      if (name && id && marks) {
        const newRow = `
          <tr data-id="${id}">
            <td>${name}</td>
            <td>${id}</td>
            <td>${marks}</td>
          </tr>
        `;
        $('#studentTable tbody').append(newRow);
        clearFields('#name', '#id', '#marks');
      } else {
        alert('Please fill all fields!');
      }
    });
  
    
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
  
    
    $('#updateBtn').click(function () {
      const updatedName = $('#editName').val().trim();
      const updatedMarks = $('#editMarks').val().trim();
      const id = $('#popup').data('id');
  
      const row = $(`#studentTable tbody tr[data-id="${id}"]`);
      if (row.length) {
        row.find('td:eq(0)').text(updatedName);
        row.find('td:eq(2)').text(updatedMarks);
      }
  
      $('#popup').hide();
    });
  });
  