export interface Position {
  id: string
  title: string
  department?: string
  location?: string
  type: 'full-time' | 'part-time' | 'contract'
  status: 'open' | 'closed' | 'on-hold'
  description: string
  requirements: string[]
  niceToHave?: string[]
  candidateIds: string[]
  createdAt: string
}
