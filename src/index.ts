import dotenv from 'dotenv';
import app from './app';
import { db } from './db/drizzle';
import { sql } from 'drizzle-orm';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 http://localhost:${PORT}`);
});

// Database connection test
async function testDbConnection() {
    try {
        await db.execute(sql`SELECT 1`);
        console.log('✅ Database connection successful');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
}

testDbConnection();

// Handle shutdown gracefully
process.on('SIGINT', () => {
    server.close(() => {
        console.log('👋 Server closed');
        process.exit(0);
    });
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});
