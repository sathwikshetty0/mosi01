export interface Question {
  id: string;
  text: string;
  placeholder?: string;
  required?: boolean;
}

export interface UserDetails {
  fullName: string;
  email: string;
  phone: string;
}

export interface PledgeSubmission {
  id: string;
  createdAt: string; // ISO String
  user: UserDetails;
  answers: Record<string, string>; // questionId -> answer text
  videoUrl?: string; // Blob URL or base64 URL for playback
  status: 'Pledge Taken' | 'Incomplete';
}
