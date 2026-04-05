import { Search, ArrowUp, ArrowDown } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'overall_score', label: 'Overall Score' },
  { value: 'posted_time', label: 'Posted Time' },
  { value: 'experience_fit', label: 'Experience Fit' },
  { value: 'domain_fit', label: 'Domain Fit' },
]

function FilterSortBar({
  searchText,
  onSearchChange,
  sortField,
  onSortFieldChange,
  sortDirection,
  onSortDirectionToggle,
  resultCount,
}) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-wrap">
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, company, or location..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 whitespace-nowrap">Sort by</span>
        <select
          value={sortField}
          onChange={(e) => onSortFieldChange(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          onClick={onSortDirectionToggle}
          className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label={sortDirection === 'desc' ? 'Sort ascending' : 'Sort descending'}
        >
          {sortDirection === 'desc' ? (
            <ArrowDown className="w-4 h-4 text-gray-600" />
          ) : (
            <ArrowUp className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      <span className="text-sm text-gray-400 whitespace-nowrap">
        {resultCount} {resultCount === 1 ? 'job' : 'jobs'} found
      </span>
    </div>
  )
}

export default FilterSortBar
