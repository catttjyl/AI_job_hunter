import { useMemo } from 'react'

function useFilteredJobs(jobs, { searchText, sortField, sortDirection }) {
  return useMemo(() => {
    let filtered = Object.values(jobs)

    if (searchText.trim()) {
      const query = searchText.trim().toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.job_title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query),
      )
    }

    const sorted = [...filtered].sort((a, b) => {
      let aVal, bVal

      if (sortField === 'posted_time') {
        aVal = new Date(a.posted_time).getTime()
        bVal = new Date(b.posted_time).getTime()
      } else {
        aVal = a[sortField]
        bVal = b[sortField]
      }

      if (sortDirection === 'desc') return bVal - aVal
      return aVal - bVal
    })

    return sorted
  }, [jobs, searchText, sortField, sortDirection])
}

export default useFilteredJobs
