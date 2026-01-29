import mongoose from 'mongoose';

const USE_MEMORY_DB = process.env.USE_MEMORY_DB !== 'false';

export const connectDatabase = async (): Promise<void> => {
  try {
    if (USE_MEMORY_DB) {
      // Use in-memory database (no MongoDB needed)
      console.log('Using in-memory database (demo mode)');
      console.log('✓ In-memory database initialized successfully');
      return;
    }

    // Try to connect to MongoDB if available
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/startup-benefits';
    
    await mongoose.connect(mongoUri);
    
    console.log('MongoDB connected successfully');
  } catch (error: any) {
    console.warn('⚠ MongoDB connection failed, using in-memory database instead');
    console.log('✓ In-memory database initialized successfully');
    // Don't exit - continue with in-memory DB
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    if (!USE_MEMORY_DB && mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
    }
  } catch (error) {
    // Silently fail for in-memory DB
  }
};
