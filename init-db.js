const mysql = require('mysql2/promise');

async function initializeDatabase() {
  try {
    // First, connect without specifying a database to create it
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '12345'
    });

    console.log('Connected to MySQL');

    // Create database
    await connection.query('CREATE DATABASE IF NOT EXISTS school');
    console.log('Database "school" created or already exists');

    // Change to the school database
    await connection.query('USE school');

    // Create student table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS student (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        roll_number VARCHAR(50),
        class VARCHAR(50)
      )
    `);
    console.log('Table "student" created or already exists');

    // Create teacher table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS teacher (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        subject VARCHAR(100),
        class VARCHAR(50)
      )
    `);
    console.log('Table "teacher" created or already exists');

    await connection.end();
    console.log('Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error.message);
    process.exit(1);
  }
}

initializeDatabase();
