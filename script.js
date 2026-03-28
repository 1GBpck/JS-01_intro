// Исходные данные
let students = [
  { surname: 'Иванов', name: 'Иван', patronymic: 'Иванович', birthDate: new Date('2000-05-15'), startYear: 2019, faculty: 'Информационные технологии' },
  { surname: 'Петрова', name: 'Мария', patronymic: 'Сергеевна', birthDate: new Date('2001-12-03'), startYear: 2020, faculty: 'Экономика' },
  { surname: 'Сидоров', name: 'Алексей', patronymic: 'Дмитриевич', birthDate: new Date('1999-08-22'), startYear: 2018, faculty: 'Юридический' },
  { surname: 'Козлова', name: 'Екатерина', patronymic: 'Андреевна', birthDate: new Date('2002-03-10'), startYear: 2021, faculty: 'Медицинский' },
  { surname: 'Смирнов', name: 'Дмитрий', patronymic: 'Владимирович', birthDate: new Date('2000-11-30'), startYear: 2019, faculty: 'Инженерный' }
];

let sortConfig = { field: null, direction: 'asc' };

// Вспомогательные функции
const getFullName = s => `${s.surname} ${s.name} ${s.patronymic}`;

const formatDate = d => `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;

const calculateAge = birthDate => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

const formatEducation = startYear => {
  const endYear = startYear + 4;
  const now = new Date();
  if (now.getMonth() >= 8 && now.getFullYear() >= endYear) return `${startYear}-${endYear} (закончил)`;
  let course = now.getFullYear() - startYear + (now.getMonth() < 8 ? 0 : 1);
  if (course < 1) course = 1;
  if (course > 4) return `${startYear}-${endYear} (закончил)`;
  const word = course === 1 ? 'курс' : (course <= 4 ? 'курса' : 'курсов');
  return `${startYear}-${endYear} (${course} ${word})`;
};

// Отрисовка
const createRow = student => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><strong>${getFullName(student)}</strong></td>
    <td>${student.faculty}</td>
    <td>${formatDate(student.birthDate)} (${calculateAge(student.birthDate)} лет)</td>
    <td>${formatEducation(student.startYear)}</td>
  `;
  return tr;
};

const renderTable = list => {
  const tbody = document.getElementById('studentsTableBody');
  const empty = document.getElementById('noStudents');
  tbody.innerHTML = '';
  if (!list.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  list.forEach(s => tbody.appendChild(createRow(s)));
};

// Фильтрация
const applyFilters = () => {
  const fio = document.getElementById('filterFullName').value.trim().toLowerCase();
  const fac = document.getElementById('filterFaculty').value.trim().toLowerCase();
  const start = document.getElementById('filterStartYear').value.trim();
  const end = document.getElementById('filterEndYear').value.trim();
  
  return students.filter(s => {
    if (fio && !getFullName(s).toLowerCase().includes(fio)) return false;
    if (fac && !s.faculty.toLowerCase().includes(fac)) return false;
    if (start && s.startYear !== +start) return false;
    if (end && s.startYear + 4 !== +end) return false;
    return true;
  });
};

// Сортировка
const sortStudents = (list, field, dir) => [...list].sort((a, b) => {
  const vals = {
    fullName: [getFullName(a), getFullName(b)],
    faculty: [a.faculty, b.faculty],
    birthDate: [a.birthDate.getTime(), b.birthDate.getTime()],
    startYear: [a.startYear, b.startYear]
  };
  let [va, vb] = vals[field] || [0, 0];
  if (typeof va === 'string') [va, vb] = [va.toLowerCase(), vb.toLowerCase()];
  if (va < vb) return dir === 'asc' ? -1 : 1;
  if (va > vb) return dir === 'asc' ? 1 : -1;
  return 0;
});

const updateSortIndicators = () => {
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.classList.remove('asc', 'desc');
    if (th.dataset.sort === sortConfig.field) th.classList.add(sortConfig.direction);
  });
};

// Валидация
const validate = () => {
  const errors = [];
  const today = new Date();
  const [surname, name, patronymic, faculty] = ['surname','name','patronymic','faculty'].map(id => document.getElementById(id).value.trim());
  const birthDate = document.getElementById('birthDate').valueAsDate;
  const startYear = document.getElementById('startYear').value.trim();
  
  [surname, name, patronymic, faculty].forEach((v, i) => {
    if (!v) errors.push(['Фамилия','Имя','Отчество','Факультет'][i] + ' обязательн' + (i === 3 ? 'о' : 'а'));
  });
  if (!birthDate) errors.push('Дата рождения обязательна');
  else if (birthDate < new Date('1900-01-01')) errors.push('Дата рождения не ранее 01.01.1900');
  else if (birthDate > today) errors.push('Дата рождения не в будущем');
  if (!startYear) errors.push('Год начала обучения обязателен');
  else {
    const y = +startYear;
    if (isNaN(y)) errors.push('Год начала должен быть числом');
    else if (y < 2000) errors.push('Год начала не ранее 2000');
    else if (y > today.getFullYear()) errors.push('Год начала не больше текущего');
  }
  return { ok: !errors.length, errors };
};

const showError = msg => {
  const el = document.getElementById('formErrors');
  if (msg) { el.textContent = msg; el.classList.remove('hidden'); }
  else el.classList.add('hidden');
};

const clearForm = () => { document.getElementById('studentForm').reset(); showError(''); };

const showToast = () => {
  const t = document.getElementById('toast');
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2500);
};

// Обработчики
const handleAdd = e => {
  e.preventDefault();
  const v = validate();
  if (!v.ok) { showError(v.errors.join('; ')); return; }
  students.push({
    surname: document.getElementById('surname').value.trim(),
    name: document.getElementById('name').value.trim(),
    patronymic: document.getElementById('patronymic').value.trim(),
    birthDate: document.getElementById('birthDate').valueAsDate,
    startYear: +document.getElementById('startYear').value.trim(),
    faculty: document.getElementById('faculty').value.trim()
  });
  clearForm();
  refresh();
  showToast();
};

const handleFilter = () => refresh();

const handleSort = e => {
  const th = e.target.closest('th[data-sort]');
  if (!th) return;
  const field = th.dataset.sort;
  if (sortConfig.field === field) sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
  else { sortConfig.field = field; sortConfig.direction = 'asc'; }
  updateSortIndicators();
  refresh();
};

const clearFilters = () => {
  ['filterFullName','filterFaculty','filterStartYear','filterEndYear'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  refresh();
};

const refresh = () => {
  let list = applyFilters();
  if (sortConfig.field) list = sortStudents(list, sortConfig.field, sortConfig.direction);
  renderTable(list);
  document.getElementById('count').textContent = students.length;
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('studentForm').addEventListener('submit', handleAdd);
  ['filterFullName','filterFaculty','filterStartYear','filterEndYear'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', handleFilter);
  });
  document.querySelectorAll('th[data-sort]').forEach(th => th.addEventListener('click', handleSort));
  document.getElementById('clearFilters')?.addEventListener('click', clearFilters);
  refresh();
});