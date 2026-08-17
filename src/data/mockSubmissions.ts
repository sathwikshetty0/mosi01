import type { PledgeSubmission } from '../types';

export const INITIAL_SUBMISSIONS: PledgeSubmission[] = [
  {
    id: 'sub-101',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    user: {
      fullName: 'Elena Rostova',
      email: 'elena.r@innovate.org',
      phone: '+1 (555) 234-5678',
    },
    answers: {
      q1: 'AI-driven Micro-Irrigation for urban farms and vertical gardens.',
      q2: 'Water wastage and unpredictable yield in controlled environmental agriculture.',
      q3: 'Commercial hydroponic growers and sustainable city farming initiatives.',
      q4: 'Build a working sensor prototype using Raspberry Pi and basic solenoids.',
    },
    status: 'Pledge Taken',
  },
  {
    id: 'sub-102',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    user: {
      fullName: 'Marcus Vance',
      email: 'mvance@nextgened.com',
      phone: '+1 (555) 876-5432',
    },
    answers: {
      q1: 'Peer-to-peer skill exchange platform for high school students.',
      q2: 'Lack of accessible tutoring for underprivileged students in specialized subjects.',
      q3: 'High school students & voluntary mentors in STEM fields.',
      q4: 'Conduct 20 user interviews with students and teachers this weekend.',
    },
    status: 'Pledge Taken',
  },
  {
    id: 'sub-103',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    user: {
      fullName: 'Aarav Patel',
      email: 'aarav.patel@cleanenergy.io',
      phone: '+91 98765 43210',
    },
    answers: {
      q1: 'Modular solar power banks for off-grid rural clinics.',
      q2: 'Frequent blackouts disrupting critical medical equipment in primary healthcare centers.',
      q3: 'Rural clinic administrators and humanitarian response teams.',
      q4: 'Finalize specs for 100Wh modular battery pack with thermal safety.',
    },
    status: 'Pledge Taken',
  },
];
