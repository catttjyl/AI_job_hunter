import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useJobStore from "../store/useJobStore";
import useFilteredJobs from "../hooks/useFilteredJobs";
import FilterSortBar from "../components/results/FilterSortBar";
import JobList from "../components/results/JobList";
import ResumePanel from "../components/results/ResumePanel";

function ResultsPage() {
  const navigate = useNavigate();
  const { jobs, loading, selectedJobId, setSelectedJobId } = useJobStore();

  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("overall_score");
  const [sortDirection, setSortDirection] = useState("desc");

  // Route guard: redirect to upload if no jobs loaded
  useEffect(() => {
    if (!loading && Object.keys(jobs).length === 0) {
      navigate("/", { replace: true });
    }
  }, [jobs, loading, navigate]);

  const filteredJobs = useFilteredJobs(jobs, {
    searchText,
    sortField,
    sortDirection,
  });

  const selectedJob = selectedJobId !== null ? jobs[selectedJobId] : null;

  const handleSortDirectionToggle = () => {
    setSortDirection((d) => (d === "desc" ? "asc" : "desc"));
  };
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <FilterSortBar
        searchText={searchText}
        onSearchChange={setSearchText}
        sortField={sortField}
        onSortFieldChange={setSortField}
        sortDirection={sortDirection}
        onSortDirectionToggle={handleSortDirectionToggle}
        resultCount={filteredJobs.length}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-2 shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-50">
          <JobList
            jobs={filteredJobs}
            selectedJobId={selectedJobId}
            onSelectJob={setSelectedJobId}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <ResumePanel job={selectedJob} />
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
