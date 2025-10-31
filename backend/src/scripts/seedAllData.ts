import { getCitizensDb, getBayBankDb, getOasisBankDb, getZenBankDb, getArcBankDb, getNexBankDb } from '../lib/database.js';
import bcrypt from 'bcryptjs';

const seedCitizens = async () => {
  const db = getCitizensDb();
  
  // Clear existing data
  await db.citizen.deleteMany();
  
  // Seed citizens
  const citizens = [
    {
    nni: '2001123456',
    given_name: 'Mohamed',
    family_name: 'Ahmed',
    full_name: 'Mohamed Ahmed',
    gender: 'Male',
    birthdate: new Date('1990-05-15'),
    place_of_birth: 'Nouakchott',
    phone_number: '+22212345678'
  },
  {
    nni: '2001987654', 
    given_name: 'Aisha',
    family_name: 'Mohamed',
    full_name: 'Aisha Mohamed',
    gender: 'Female',
    birthdate: new Date('1985-12-20'),
    place_of_birth: 'Nouadhibou',
    phone_number: '+22287654321'
  },
  {
    nni: '2001567890',
    given_name: 'Ahmed',
    family_name: 'Mahmoud',
    full_name: 'Ahmed Mahmoud',
    gender: 'Male', 
    birthdate: new Date('1988-08-12'),
    place_of_birth: 'Nouakchott',
    phone_number: '+22256789012'
  },
  {
    nni: '2001345678',
    given_name: 'Fatima',
    family_name: 'Ali',
    full_name: 'Fatima Ali',
    gender: 'Female',
    birthdate: new Date('1992-03-25'),
    place_of_birth: 'Nouakchott',
    phone_number: '+22234567890'
  },
  {
    nni: '2001789012',
    given_name: 'Ibrahim',
    family_name: 'Sidi',
    full_name: 'Ibrahim Sidi',
    gender: 'Male',
    birthdate: new Date('1987-11-08'),
    place_of_birth: 'Nouadhibou',
    phone_number: '+22278901234'
  },
  {
    nni: '2001456789',
    given_name: 'Khadijetou',
    family_name: 'Moustapha',
    full_name: 'Khadijetou Moustapha',
    gender: 'Female',
    birthdate: new Date('1995-07-30'),
    place_of_birth: 'Nouakchott',
    phone_number: '+22245678901'
  },
  {
    nni: '2001678901',
    given_name: 'Cheikh',
    family_name: 'Taleb',
    full_name: 'Cheikh Taleb',
    gender: 'Male',
    birthdate: new Date('1983-02-14'),
    place_of_birth: 'Nouadhibou',
    phone_number: '+22267890123'
  },
  {
    nni: '2001890123',
    given_name: 'Mariem',
    family_name: 'Vall',
    full_name: 'Mariem Vall',
    gender: 'Female',
    birthdate: new Date('1998-09-05'),
    place_of_birth: 'Nouakchott',
    phone_number: '+22289012345'
  },
  {
    nni: '2001012345',
    given_name: 'Sidi',
    family_name: 'Ould',
    full_name: 'Sidi Ould',
    gender: 'Male',
    birthdate: new Date('1979-12-25'),
    place_of_birth: 'Nouadhibou',
    phone_number: '+22201234567'
  },
  {
    nni: '2001234567',
    given_name: 'Aichetou',
    family_name: 'Baba',
    full_name: 'Aichetou Baba',
    gender: 'Female',
    birthdate: new Date('1993-06-18'),
    place_of_birth: 'Nouakchott',
    phone_number: '+22223456789'
  }
  ];

  for (const citizen of citizens) {
    // Hash the NNI to create nni_index
    const crypto = require('crypto');
    const nniIndex = crypto.createHash('sha256').update(citizen.nni).digest('hex');
    
    await db.citizen.create({ 
      data: {
        nni_index: nniIndex,
        nni_masked: citizen.nni.slice(0, 4) + '****' + citizen.nni.slice(-2),
        given_name: citizen.given_name,
        family_name: citizen.family_name,
        full_name: citizen.full_name,
        gender: citizen.gender,
        birthdate: citizen.birthdate,
        place_of_birth: citizen.place_of_birth,
        phone_number: citizen.phone_number
      }
    });
  }
  
  console.log('✅ Citizens seeded');
};

const seedBank = async (bankId: string, db: any) => {
  // Clear existing data
  await db.admin.deleteMany();
  await db.pendingRequest.deleteMany();
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await db.admin.create({
    data: {
      username: 'admin',
      password_hash: hashedPassword,
      bank_id: bankId,
      face_enrolled: false
    }
  });
  
  console.log(`✅ ${bankId} admin seeded`);
  
  // Seed sample pending requests
  const requests = [
    {
      citizen_nni_hash: '2001123456',
      masked_nni: '2001****56',
      payload_summary: {
        occupation: 'Software Engineer',
        source_of_funds: 'Salary',
        estimated_monthly_income: '100,000-200,000 MRU',
        account_purpose: 'Personal Savings'
      },
      status: 'PENDING',
      voting_deadline: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  ];
  
  for (const request of requests) {
    await db.pendingRequest.create({ data: request });
  }
  
  console.log(`✅ ${bankId} sample data seeded`);
};

const seedAllBanks = async () => {
  const banks = [
    { id: 'baybank', db: getBayBankDb() as any },
    { id: 'oasisbank', db: getOasisBankDb() as any },
    { id: 'zenbank', db: getZenBankDb() as any },
    { id: 'arcbank', db: getArcBankDb() as any },
    { id: 'nexbank', db: getNexBankDb() as any }
  ];

  for (const bank of banks) {
    await seedBank(bank.id, bank.db);
  }
};

const main = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await seedCitizens();
    await seedAllBanks();
    
    console.log('🎉 All databases seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

main();
