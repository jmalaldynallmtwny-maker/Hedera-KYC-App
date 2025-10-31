import { Bank } from '@/types';

export const BANKS: Bank[] = [
  {
    id: 'baybank',
    name: 'BayBank',
    logo: '/logos/baybank-logo.svg',
    theme: {
      primary: '#0EA5A4',
      accent: '#0F172A',
      name: 'BayBank',
      logo: '/logos/baybank-logo.svg',
      gradient: 'linear-gradient(135deg, #0EA5A4 0%, #0F172A 100%)',
      textColor: 'text-teal-900',
      badgeColor: 'bg-teal-100 text-teal-800',
    },
    databaseUrl: 'postgresql://postgres:postgres@localhost:5433/baybank_db',
  },
  {
    id: 'oasisbank',
    name: 'OasisBank',
    logo: '/logos/oasisbank-logo.svg',
    theme: {
      primary: '#16A34A',
      accent: '#F3F4F6',
      name: 'OasisBank',
      logo: '/logos/oasisbank-logo.svg',
      gradient: 'linear-gradient(135deg, #16A34A 0%, #F3F4F6 100%)',
      textColor: 'text-green-900',
      badgeColor: 'bg-green-100 text-green-800',
    },
    databaseUrl: 'postgresql://postgres:postgres@localhost:5433/oasisbank_db',
  },
  {
    id: 'zenbank',
    name: 'ZenBank',
    logo: '/logos/zenbank-logo.svg',
    theme: {
      primary: '#F59E0B',
      accent: '#111827',
      name: 'ZenBank',
      logo: '/logos/zenbank-logo.svg',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #111827 100%)',
      textColor: 'text-amber-900',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    databaseUrl: 'postgresql://postgres:postgres@localhost:5433/zenbank_db',
  },
  {
    id: 'arcbank',
    name: 'ArcBank',
    logo: '/logos/arcbank-logo.svg',
    theme: {
      primary: '#2563EB',
      accent: '#E0F2FE',
      name: 'ArcBank',
      logo: '/logos/arcbank-logo.svg',
      gradient: 'linear-gradient(135deg, #2563EB 0%, #E0F2FE 100%)',
      textColor: 'text-blue-900',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    databaseUrl: 'postgresql://postgres:postgres@localhost:5433/arcbank_db',
  },
  {
    id: 'nexbank',
    name: 'NexBank',
    logo: '/logos/nexbank-logo.svg',
    theme: {
      primary: '#7C3AED',
      accent: '#FDE68A',
      name: 'NexBank',
      logo: '/logos/nexbank-logo.svg',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #FDE68A 100%)',
      textColor: 'text-purple-900',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    databaseUrl: 'postgresql://postgres:postgres@localhost:5433/nexbank_db',
  },
];

export const BANK_THEMES = {
  baybank: BANKS[0].theme,
  oasisbank: BANKS[1].theme,
  zenbank: BANKS[2].theme,
  arcbank: BANKS[3].theme,
  nexbank: BANKS[4].theme,
};

export const getBankById = (id: string): Bank | undefined => {
  return BANKS.find(bank => bank.id === id);
};

export const getBankTheme = (bankId: string) => {
  return BANK_THEMES[bankId as keyof typeof BANK_THEMES] || BANK_THEMES.baybank;
};

export const BANK_IDS = BANKS.map(bank => bank.id);
