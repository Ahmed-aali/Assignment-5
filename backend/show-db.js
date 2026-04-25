const mysql = require('mysql2/promise');

async function showDatabase() {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '12345',
      database: 'school'
    });

    console.log('\n========== DATABASE INFORMATION ==========\n');

    // Show all tables
    const [tables] = await conn.query('SHOW TABLES');
    console.log('📋 TABLES IN DATABASE:');
    console.table(tables);

    // Student table structure
    const [studentStructure] = await conn.query('DESCRIBE student');
    console.log('\n📊 STUDENT TABLE STRUCTURE:');
    console.table(studentStructure);

    // Teacher table structure
    const [teacherStructure] = await conn.query('DESCRIBE teacher');
    console.log('\n📊 TEACHER TABLE STRUCTURE:');
    console.table(teacherStructure);

    // Student data
    const [studentData] = await conn.query('SELECT * FROM student');
    console.log('\n👥 STUDENT DATA:');
    if (studentData.length === 0) {
      console.log('(No students added yet)');
    } else {
      console.table(studentData);
    }

    // Teacher data
    const [teacherData] = await conn.query('SELECT * FROM teacher');
    console.log('\n👨‍🏫 TEACHER DATA:');
    if (teacherData.length === 0) {
      console.log('(No teachers added yet)');
    } else {
      console.table(teacherData);
    }

    await conn.end();
    console.log('\n=========================================\n');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

showDatabase();
