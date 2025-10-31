#!/usr/bin/env node

import { getCitizensDb } from '../lib/database.js';

async function checkHealth() {
  try {
    const citizensDb = getCitizensDb();
    await citizensDb.$queryRaw`SELECT 1`;
    console.log('✅ Database health check passed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database health check failed:', error);
    process.exit(1);
  }
}

checkHealth();
