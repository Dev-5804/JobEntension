import type { ApplicationRepository, JobApplication } from '../types/application'

const storageKey = 'job-tracker-applications'

interface ChromeStorage {
  storage?: { local: { get(keys: string[]): Promise<Record<string, unknown>>; set(items: Record<string, unknown>): Promise<void> } }
}

function chromeStorage() {
  return (globalThis as typeof globalThis & { chrome?: ChromeStorage }).chrome?.storage?.local
}

async function readApplications() {
  const extensionStorage = chromeStorage()
  if (extensionStorage) {
    const result = await extensionStorage.get([storageKey])
    return (result[storageKey] as JobApplication[] | undefined) ?? []
  }
  const saved = localStorage.getItem(storageKey)
  return saved ? (JSON.parse(saved) as JobApplication[]) : []
}

async function writeApplications(applications: JobApplication[]) {
  const extensionStorage = chromeStorage()
  if (extensionStorage) { await extensionStorage.set({ [storageKey]: applications }); return }
  localStorage.setItem(storageKey, JSON.stringify(applications))
}

export const applicationRepository: ApplicationRepository = {
  getAll: readApplications,
  async create(application) { await writeApplications([application, ...(await readApplications())]); return application },
}