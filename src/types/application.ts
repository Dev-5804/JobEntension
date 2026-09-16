export type ApplicationStatus = 'saved' | 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'withdrawn'

export interface JobApplication {
  id: string
  company: string
  jobTitle: string
  url: string
  platform?: string
  location?: string
  status: ApplicationStatus
  dateApplied?: string
  createdAt: string
  updatedAt: string
}

export interface ApplicationRepository {
  getAll(): Promise<JobApplication[]>
  create(application: JobApplication): Promise<JobApplication>
}