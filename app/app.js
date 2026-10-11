const sampleData = {
  students: [
    { id: 1, matricula: 'E-2024-001', identificacion: '2024-001', nombre: 'Ana', apellido: 'García', fechaNacimiento: '2007-03-15', genero: 'F', correo: 'ana.garcia@email.com', telefono: '777-1001', telefonoEmergencia: '777-2001', direccion: 'Calle 10 #12', estado: true },
    { id: 2, matricula: 'E-2024-002', identificacion: '2024-002', nombre: 'Luis', apellido: 'Mendoza', fechaNacimiento: '2008-07-22', genero: 'M', correo: 'luis.mendoza@email.com', telefono: '777-1002', telefonoEmergencia: '', direccion: 'Avenida 5 #7', estado: true },
    { id: 3, matricula: 'E-2024-003', identificacion: '2024-003', nombre: 'Sofía', apellido: 'Pérez', fechaNacimiento: '2007-12-05', genero: 'F', correo: 'sofia.perez@email.com', telefono: '777-1003', telefonoEmergencia: '777-2003', direccion: 'Barrio Norte', estado: true },
  ],
  teachers: [
    { id: 1, identificacion: 'P-001', nombre: 'María', apellido: 'López', correo: 'maria.lopez@institucion.edu', telefono: '555-1111', especialidad: 'Matemáticas', activo: true },
    { id: 2, identificacion: 'P-002', nombre: 'Carlos', apellido: 'Ramírez', correo: 'carlos.ramirez@institucion.edu', telefono: '555-2222', especialidad: 'Programación', activo: true },
    { id: 3, identificacion: 'P-003', nombre: 'Fernanda', apellido: 'Sosa', correo: 'fernanda.sosa@institucion.edu', telefono: '555-3333', especialidad: 'Biología', activo: true }
  ],
  subjects: [
    { id: 1, codigo: 'MAT-101', nombre: 'Matemáticas I', descripcion: 'Fundamentos básicos de algebra y lógica matemática.', creditos: 4, ciclo: 'Primer semestre', profesorId: 1, cupo: 35 },
    { id: 2, codigo: 'PRO-201', nombre: 'Programación I', descripcion: 'Introducción a la lógica de programación.', creditos: 4, ciclo: 'Segundo semestre', profesorId: 2, cupo: 30 },
    { id: 3, codigo: 'BIO-110', nombre: 'Biología General', descripcion: 'Conceptos básicos de biología.', creditos: 3, ciclo: 'Primer semestre', profesorId: 3, cupo: 25 }
  ],
  inscriptions: [
    { id: 1, studentId: 1, subjectId: 1, estado: 'Activa', fecha: '2024-02-01', observaciones: 'Inscripción inicial' },
    { id: 2, studentId: 2, subjectId: 1, estado: 'Activa', fecha: '2024-02-03', observaciones: 'Estudiante nuevo' },
    { id: 3, studentId: 3, subjectId: 3, estado: 'Activa', fecha: '2024-02-04', observaciones: 'Curso recomendado' }
  ]
};

const state = {
  activeSection: 'dashboard'
};

const elements = {
  studentTableBody: document.getElementById('studentTableBody'),
  teacherTableBody: document.getElementById('teacherTableBody'),
  subjectTableBody: document.getElementById('subjectTableBody'),
  inscriptionTableBody: document.getElementById('inscriptionTableBody'),
  summaryRows: document.getElementById('summaryRows'),
  totalStudents: document.getElementById('totalStudents'),
  totalTeachers: document.getElementById('totalTeachers'),
  totalSubjects: document.getElementById('totalSubjects'),
  totalInscriptions: document.getElementById('totalInscriptions'),
  toast: document.getElementById('toast')
};

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add('show');
  setTimeout(() => elements.toast.classList.remove('show'), 2200);
}

function renderStats() {
  elements.totalStudents.textContent = sampleData.students.length;
  elements.totalTeachers.textContent = sampleData.teachers.length;
  elements.totalSubjects.textContent = sampleData.subjects.length;
  elements.totalInscriptions.textContent = sampleData.inscriptions.length;

  elements.summaryRows.innerHTML = sampleData.subjects.map((subject) => {
    const teacher = sampleData.teachers.find((t) => t.id === subject.profesorId);
    const count = sampleData.inscriptions.filter((i) => i.subjectId === subject.id).length;
    return `
      <tr>
        <td>${subject.nombre}</td>
        <td>${teacher ? `${teacher.nombre} ${teacher.apellido}` : 'Sin asignar'}</td>
        <td>${count}</td>
        <td><span class="status-tag">Activo</span></td>
      </tr>
    `;
  }).join('');
}

function getAge(dateString) {
  const birth = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function renderStudents() {
  const searchValue = document.getElementById('studentSearch')?.value.toLowerCase() || '';
  const filtered = sampleData.students.filter((student) => {
    const text = `${student.matricula} ${student.nombre} ${student.apellido} ${student.identificacion}`.toLowerCase();
    return text.includes(searchValue);
  });

  elements.studentTableBody.innerHTML = filtered.map((student) => `
    <tr>
      <td>${student.matricula}</td>
      <td>${student.nombre} ${student.apellido}</td>
      <td>${student.identificacion}</td>
      <td>${student.correo}</td>
      <td>${getAge(student.fechaNacimiento)}</td>
      <td>
        <div class="action-buttons">
          <button class="icon-btn edit" data-edit-student="${student.id}">Editar</button>
          <button class="icon-btn delete" data-delete-student="${student.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderTeachers() {
  const searchValue = document.getElementById('teacherSearch')?.value.toLowerCase() || '';
  const filtered = sampleData.teachers.filter((teacher) => {
    const text = `${teacher.identificacion} ${teacher.nombre} ${teacher.apellido} ${teacher.especialidad}`.toLowerCase();
    return text.includes(searchValue);
  });

  elements.teacherTableBody.innerHTML = filtered.map((teacher) => `
    <tr>
      <td>${teacher.nombre} ${teacher.apellido}</td>
      <td>${teacher.identificacion}</td>
      <td>${teacher.correo}</td>
      <td>${teacher.especialidad || 'Sin especialidad'}</td>
      <td>
        <div class="action-buttons">
          <button class="icon-btn edit" data-edit-teacher="${teacher.id}">Editar</button>
          <button class="icon-btn delete" data-delete-teacher="${teacher.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderSubjects() {
  const searchValue = document.getElementById('subjectSearch')?.value.toLowerCase() || '';
  const filtered = sampleData.subjects.filter((subject) => {
    const text = `${subject.codigo} ${subject.nombre} ${subject.descripcion}`.toLowerCase();
    return text.includes(searchValue);
  });

  elements.subjectTableBody.innerHTML = filtered.map((subject) => {
    const teacher = sampleData.teachers.find((t) => t.id === subject.profesorId);
    return `
      <tr>
        <td>${subject.codigo}</td>
        <td>${subject.nombre}</td>
        <td>${subject.creditos}</td>
        <td>${teacher ? `${teacher.nombre} ${teacher.apellido}` : 'Sin profesor'}</td>
        <td>
          <div class="action-buttons">
            <button class="icon-btn edit" data-edit-subject="${subject.id}">Editar</button>
            <button class="icon-btn delete" data-delete-subject="${subject.id}">Eliminar</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderInscriptions() {
  elements.inscriptionTableBody.innerHTML = sampleData.inscriptions.map((inscription) => {
    const student = sampleData.students.find((s) => s.id === inscription.studentId);
    const subject = sampleData.subjects.find((s) => s.id === inscription.subjectId);
    return `
      <tr>
        <td>${student ? `${student.nombre} ${student.apellido}` : 'Sin estudiante'}</td>
        <td>${subject ? subject.nombre : 'Sin asignatura'}</td>
        <td>${inscription.estado}</td>
        <td>${inscription.fecha}</td>
        <td>
          <div class="action-buttons">
            <button class="icon-btn edit" data-edit-inscription="${inscription.id}">Editar</button>
            <button class="icon-btn delete" data-delete-inscription="${inscription.id}">Eliminar</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function populateTeacherSelect() {
  const teacherSelect = document.getElementById('subjectProfesor');
  teacherSelect.innerHTML = '<option value="">Seleccionar profesor</option>' +
    sampleData.teachers.map((teacher) => `<option value="${teacher.id}">${teacher.nombre} ${teacher.apellido}</option>`).join('');

  const studentSelect = document.getElementById('inscriptionStudent');
  studentSelect.innerHTML = '<option value="">Seleccionar estudiante</option>' +
    sampleData.students.map((student) => `<option value="${student.id}">${student.nombre} ${student.apellido}</option>`).join('');

  const subjectSelect = document.getElementById('inscriptionSubject');
  subjectSelect.innerHTML = '<option value="">Seleccionar asignatura</option>' +
    sampleData.subjects.map((subject) => `<option value="${subject.id}">${subject.nombre}</option>`).join('');
}

function setSection(sectionId) {
  state.activeSection = sectionId;
  document.querySelectorAll('.menu-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.section === sectionId);
  });
  document.querySelectorAll('.panel').forEach((panel) => {
    panel.classList.toggle('active-panel', panel.id === sectionId);
  });
}

function resetStudentForm() {
  document.getElementById('studentForm').reset();
  document.getElementById('studentId').value = '';
}

function resetTeacherForm() {
  document.getElementById('teacherForm').reset();
  document.getElementById('teacherId').value = '';
}

function resetSubjectForm() {
  document.getElementById('subjectForm').reset();
  document.getElementById('subjectId').value = '';
}

function resetInscriptionForm() {
  document.getElementById('inscriptionForm').reset();
  document.getElementById('inscriptionId').value = '';
}

function bindEvents() {
  document.querySelectorAll('.menu-item').forEach((button) => {
    button.addEventListener('click', () => setSection(button.dataset.section));
  });

  document.getElementById('studentSearch').addEventListener('input', renderStudents);
  document.getElementById('teacherSearch').addEventListener('input', renderTeachers);
  document.getElementById('subjectSearch').addEventListener('input', renderSubjects);

  document.getElementById('studentForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(document.getElementById('studentId').value || 0);
    const student = {
      id: id || sampleData.students.length ? Math.max(...sampleData.students.map((s) => s.id), 0) + 1 : 1,
      matricula: document.getElementById('studentMatricula').value.trim(),
      identificacion: document.getElementById('studentIdentificacion').value.trim(),
      nombre: document.getElementById('studentNombre').value.trim(),
      apellido: document.getElementById('studentApellido').value.trim(),
      fechaNacimiento: document.getElementById('studentNacimiento').value,
      genero: document.getElementById('studentGenero').value,
      correo: document.getElementById('studentCorreo').value.trim(),
      telefono: document.getElementById('studentTelefono').value.trim(),
      telefonoEmergencia: document.getElementById('studentTelefonoEmergencia').value.trim(),
      direccion: document.getElementById('studentDireccion').value.trim(),
      estado: true
    };

    if (id) {
      const index = sampleData.students.findIndex((s) => s.id === id);
      sampleData.students[index] = { ...sampleData.students[index], ...student };
      showToast('Estudiante actualizado');
    } else {
      sampleData.students.push(student);
      showToast('Estudiante registrado');
    }

    resetStudentForm();
    renderAll();
  });

  document.getElementById('teacherForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(document.getElementById('teacherId').value || 0);
    const teacher = {
      id: id || sampleData.teachers.length ? Math.max(...sampleData.teachers.map((t) => t.id), 0) + 1 : 1,
      identificacion: document.getElementById('teacherIdentificacion').value.trim(),
      nombre: document.getElementById('teacherNombre').value.trim(),
      apellido: document.getElementById('teacherApellido').value.trim(),
      correo: document.getElementById('teacherCorreo').value.trim(),
      telefono: document.getElementById('teacherTelefono').value.trim(),
      especialidad: document.getElementById('teacherEspecialidad').value.trim(),
      activo: true
    };

    if (id) {
      const index = sampleData.teachers.findIndex((t) => t.id === id);
      sampleData.teachers[index] = { ...sampleData.teachers[index], ...teacher };
      showToast('Profesor actualizado');
    } else {
      sampleData.teachers.push(teacher);
      showToast('Profesor registrado');
    }

    resetTeacherForm();
    renderAll();
  });

  document.getElementById('subjectForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(document.getElementById('subjectId').value || 0);
    const subject = {
      id: id || sampleData.subjects.length ? Math.max(...sampleData.subjects.map((s) => s.id), 0) + 1 : 1,
      codigo: document.getElementById('subjectCodigo').value.trim(),
      nombre: document.getElementById('subjectNombre').value.trim(),
      descripcion: document.getElementById('subjectDescripcion').value.trim(),
      creditos: Number(document.getElementById('subjectCreditos').value),
      ciclo: document.getElementById('subjectCiclo').value.trim(),
      profesorId: Number(document.getElementById('subjectProfesor').value),
      cupo: Number(document.getElementById('subjectCupo').value)
    };

    if (id) {
      const index = sampleData.subjects.findIndex((s) => s.id === id);
      sampleData.subjects[index] = { ...sampleData.subjects[index], ...subject };
      showToast('Asignatura actualizada');
    } else {
      sampleData.subjects.push(subject);
      showToast('Asignatura registrada');
    }

    resetSubjectForm();
    renderAll();
  });

  document.getElementById('inscriptionForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = Number(document.getElementById('inscriptionId').value || 0);
    const inscription = {
      id: id || sampleData.inscriptions.length ? Math.max(...sampleData.inscriptions.map((i) => i.id), 0) + 1 : 1,
      studentId: Number(document.getElementById('inscriptionStudent').value),
      subjectId: Number(document.getElementById('inscriptionSubject').value),
      estado: document.getElementById('inscriptionEstado').value,
      fecha: document.getElementById('inscriptionFecha').value,
      observaciones: document.getElementById('inscriptionObservaciones').value.trim()
    };

    if (id) {
      const index = sampleData.inscriptions.findIndex((i) => i.id === id);
      sampleData.inscriptions[index] = { ...sampleData.inscriptions[index], ...inscription };
      showToast('Inscripción actualizada');
    } else {
      sampleData.inscriptions.push(inscription);
      showToast('Inscripción registrada');
    }

    resetInscriptionForm();
    renderAll();
  });

  document.getElementById('cancelStudentForm').addEventListener('click', resetStudentForm);
  document.getElementById('cancelTeacherForm').addEventListener('click', resetTeacherForm);
  document.getElementById('cancelSubjectForm').addEventListener('click', resetSubjectForm);
  document.getElementById('cancelInscriptionForm').addEventListener('click', resetInscriptionForm);

  document.getElementById('newStudentBtn').addEventListener('click', () => {
    setSection('students');
    resetStudentForm();
  });

  document.addEventListener('click', (event) => {
    const studentId = event.target.dataset.editStudent;
    if (studentId) {
      const student = sampleData.students.find((s) => s.id === Number(studentId));
      if (!student) return;
      document.getElementById('studentId').value = student.id;
      document.getElementById('studentMatricula').value = student.matricula;
      document.getElementById('studentIdentificacion').value = student.identificacion;
      document.getElementById('studentNombre').value = student.nombre;
      document.getElementById('studentApellido').value = student.apellido;
      document.getElementById('studentNacimiento').value = student.fechaNacimiento;
      document.getElementById('studentGenero').value = student.genero;
      document.getElementById('studentCorreo').value = student.correo;
      document.getElementById('studentTelefono').value = student.telefono;
      document.getElementById('studentTelefonoEmergencia').value = student.telefonoEmergencia;
      document.getElementById('studentDireccion').value = student.direccion;
      setSection('students');
      return;
    }

    const teacherId = event.target.dataset.editTeacher;
    if (teacherId) {
      const teacher = sampleData.teachers.find((t) => t.id === Number(teacherId));
      if (!teacher) return;
      document.getElementById('teacherId').value = teacher.id;
      document.getElementById('teacherIdentificacion').value = teacher.identificacion;
      document.getElementById('teacherNombre').value = teacher.nombre;
      document.getElementById('teacherApellido').value = teacher.apellido;
      document.getElementById('teacherCorreo').value = teacher.correo;
      document.getElementById('teacherTelefono').value = teacher.telefono;
      document.getElementById('teacherEspecialidad').value = teacher.especialidad;
      setSection('teachers');
      return;
    }

    const subjectId = event.target.dataset.editSubject;
    if (subjectId) {
      const subject = sampleData.subjects.find((s) => s.id === Number(subjectId));
      if (!subject) return;
      document.getElementById('subjectId').value = subject.id;
      document.getElementById('subjectCodigo').value = subject.codigo;
      document.getElementById('subjectNombre').value = subject.nombre;
      document.getElementById('subjectDescripcion').value = subject.descripcion;
      document.getElementById('subjectCreditos').value = subject.creditos;
      document.getElementById('subjectCiclo').value = subject.ciclo;
      document.getElementById('subjectProfesor').value = subject.profesorId;
      document.getElementById('subjectCupo').value = subject.cupo;
      setSection('subjects');
      return;
    }

    const inscriptionId = event.target.dataset.editInscription;
    if (inscriptionId) {
      const inscription = sampleData.inscriptions.find((i) => i.id === Number(inscriptionId));
      if (!inscription) return;
      document.getElementById('inscriptionId').value = inscription.id;
      document.getElementById('inscriptionStudent').value = inscription.studentId;
      document.getElementById('inscriptionSubject').value = inscription.subjectId;
      document.getElementById('inscriptionEstado').value = inscription.estado;
      document.getElementById('inscriptionFecha').value = inscription.fecha;
      document.getElementById('inscriptionObservaciones').value = inscription.observaciones;
      setSection('inscriptions');
      return;
    }

    const deleteStudentId = event.target.dataset.deleteStudent;
    if (deleteStudentId) {
      const confirmed = window.confirm('¿Desea eliminar este estudiante?');
      if (!confirmed) return;
      sampleData.students = sampleData.students.filter((s) => s.id !== Number(deleteStudentId));
      showToast('Estudiante eliminado');
      renderAll();
      return;
    }

    const deleteTeacherId = event.target.dataset.deleteTeacher;
    if (deleteTeacherId) {
      const confirmed = window.confirm('¿Desea eliminar este profesor?');
      if (!confirmed) return;
      sampleData.teachers = sampleData.teachers.filter((t) => t.id !== Number(deleteTeacherId));
      showToast('Profesor eliminado');
      renderAll();
      return;
    }

    const deleteSubjectId = event.target.dataset.deleteSubject;
    if (deleteSubjectId) {
      const confirmed = window.confirm('¿Desea eliminar esta asignatura?');
      if (!confirmed) return;
      sampleData.subjects = sampleData.subjects.filter((s) => s.id !== Number(deleteSubjectId));
      showToast('Asignatura eliminada');
      renderAll();
      return;
    }

    const deleteInscriptionId = event.target.dataset.deleteInscription;
    if (deleteInscriptionId) {
      const confirmed = window.confirm('¿Desea eliminar esta inscripción?');
      if (!confirmed) return;
      sampleData.inscriptions = sampleData.inscriptions.filter((i) => i.id !== Number(deleteInscriptionId));
      showToast('Inscripción eliminada');
      renderAll();
      return;
    }
  });
}

function renderAll() {
  renderStats();
  renderStudents();
  renderTeachers();
  renderSubjects();
  renderInscriptions();
  populateTeacherSelect();
}

bindEvents();
renderAll();
setSection('dashboard');
