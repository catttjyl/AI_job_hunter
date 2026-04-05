import { create } from 'zustand'

const useJobStore = create((set) => ({
  jobs: {},
  loading: false,
  error: null,
  selectedJobId: null,

  setJobs: (jobs) => set({ jobs }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSelectedJobId: (id) => set({ selectedJobId: id }),
  reset: () => set({ jobs: {}, loading: false, error: null, selectedJobId: null }),
}))

export default useJobStore
