import { useState } from "react";
import JobCard from "./JobCard";

function JobList({ jobs, selectedJobId, onSelectJob }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleSelect = (jobId) => {
    setExpandedId((prev) => (prev === jobId ? null : jobId));
    onSelectJob(jobId);
  };

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6">
        <p className="text-sm">No jobs match your search.</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      {jobs.map((job) => (
        <JobCard
          key={job.job_id}
          job={job}
          isExpanded={expandedId === job.job_id}
          isSelected={selectedJobId === job.job_id}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default JobList;
