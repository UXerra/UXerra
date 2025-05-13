import { databaseService } from '../services/database';
import { AppError } from '../utils/error.js';

async function initializeDatabase() {
  try {
    await databaseService.connect();

    // Create indexes for users collection
    await databaseService.db.collection('users').createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { stripeCustomerId: 1 }, unique: true, sparse: true },
    ]);

    // Create indexes for newsletter_subscribers collection
    await databaseService.db.collection('newsletter_subscribers').createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { status: 1 } },
    ]);

    // Create indexes for generated_content collection
    await databaseService.db.collection('generated_content').createIndexes([
      { key: { userId: 1 } },
      { key: { type: 1 } },
      { key: { createdAt: 1 } },
    ]);

    // Create indexes for branding_packages collection
    await databaseService.db.collection('branding_packages').createIndexes([
      { key: { userId: 1 } },
      { key: { style: 1 } },
      { key: { createdAt: 1 } },
    ]);

    // Create indexes for webhook_events collection
    await databaseService.db.collection('webhook_events').createIndexes([
      { key: { type: 1 } },
      { key: { provider: 1 } },
      { key: { status: 1 } },
      { key: { createdAt: 1 } },
    ]);

    // Create indexes for api_keys collection
    await databaseService.db.collection('api_keys').createIndexes([
      { key: { key: 1 }, unique: true },
      { key: { userId: 1 } },
      { key: { expiresAt: 1 } },
    ]);

    // Create indexes for audit_logs collection
    await databaseService.db.collection('audit_logs').createIndexes([
      { key: { userId: 1 } },
      { key: { action: 1 } },
      { key: { resource: 1, resourceId: 1 } },
      { key: { createdAt: 1 } },
    ]);

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw new AppError(500, 'Database initialization failed');
  } finally {
    await databaseService.disconnect();
  }
}

// Run initialization
initializeDatabase().catch((error) => {
  console.error('Database initialization failed:', error);
  process.exit(1);
}); 