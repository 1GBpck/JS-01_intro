const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3001;
const DB_FILE = './students-db.json';

// Инициализация базы данных
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

const sendJson = (res, statusCode, data) => {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
};

const getStudents = () => {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
};

const saveStudents = (students) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(students, null, 2));
};

const server = http.createServer((req, res) => {
    // preflight CORS
    if (req.method === 'OPTIONS') {
        sendJson(res, 200, {});
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // GET /api/students
    if (req.method === 'GET' && pathname === '/api/students') {
        const students = getStudents();
        sendJson(res, 200, students);
        return;
    }

    // POST /api/students
    if (req.method === 'POST' && pathname === '/api/students') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const newStudent = JSON.parse(body);
                const students = getStudents();
                newStudent.id = Date.now().toString();
                newStudent.birthDate = newStudent.birthDate; // сохраняем строкой
                students.push(newStudent);
                saveStudents(students);
                sendJson(res, 201, newStudent);
            } catch (err) {
                sendJson(res, 400, { error: 'Invalid data' });
            }
        });
        return;
    }

    // DELETE /api/students/:id
    if (req.method === 'DELETE' && pathname.startsWith('/api/students/')) {
        const id = pathname.split('/')[3];
        let students = getStudents();
        const filtered = students.filter(s => s.id !== id);
        if (filtered.length === students.length) {
            sendJson(res, 404, { error: 'Student not found' });
            return;
        }
        saveStudents(filtered);
        sendJson(res, 200, { success: true });
        return;
    }

    sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
    console.log(`✅ Сервер студентов запущен на http://localhost:${PORT}`);
    console.log(`   GET    /api/students - получить всех студентов`);
    console.log(`   POST   /api/students - добавить студента`);
    console.log(`   DELETE /api/students/{id} - удалить студента`);
});