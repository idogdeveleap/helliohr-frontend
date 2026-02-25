export interface Candidate {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  location?: string
  summary?: string
  status: 'active' | 'inactive' | 'hired' | 'rejected'
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  documents: Document[]
  positionIds: string[]
  notes?: string
}

export interface Skill {
  id: string
  name: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsOfExperience?: number
}

export interface Experience {
  id: string
  company: string
  title: string
  startDate: string
  endDate?: string
  description?: string
  technologies?: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
}

export interface Document {
  id: string
  name: string
  type: 'cv' | 'cover_letter' | 'other'
  url: string
  uploadedAt: string
}
