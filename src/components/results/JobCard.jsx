import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Building2,
  ExternalLink,
} from "lucide-react";
import ScoreBadge from "../shared/ScoreBadge";

function JobCard({ job, isExpanded, isSelected, onSelect }) {
  const [showFullDesc, setShowFullDesc] = useState(false);

  const handleHeaderClick = () => {
    onSelect(job.job_id);
  };

  const descriptionTruncated = job.description.length > 250 && !showFullDesc;
  const displayedDescription = descriptionTruncated
    ? job.description.slice(0, 250) + "..."
    : job.description;

  const formattedDate = job.posted_time
    ? new Date(job.posted_time).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div
      className={`
        border rounded-xl overflow-hidden transition-all mb-2
        ${isSelected ? "border-blue-400 shadow-sm" : "border-gray-200"}
      `}
    >
      {/* Card header — always visible */}
      <button
        onClick={handleHeaderClick}
        aria-expanded={isExpanded}
        className={`
          w-full text-left px-4 py-3 flex items-start justify-between gap-3
          hover:bg-gray-50 transition-colors
          ${isSelected ? "border-l-4 border-l-blue-500" : "border-l-4 border-l-transparent"}
        `}
      >
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">
            {job.job_title}
          </p>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
            <Building2 className="w-3 h-3 shrink-0" />
            <span className="truncate">{job.company}</span>
            <span className="mx-1">·</span>
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ScoreBadge score={job.overall_score} label="Match" />
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-white">
          {/* Metadata row */}
          <div className="flex flex-wrap gap-2 mt-3">
            {job.work_type && (
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                {job.work_type}
              </span>
            )}
            {job.sector && (
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                {job.sector}
              </span>
            )}
            {formattedDate && (
              <span className="text-xs text-gray-400">
                Posted {formattedDate}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-3 text-xs text-gray-600 leading-relaxed">
            {displayedDescription}
            {job.description.length > 250 && (
              <button
                onClick={() => setShowFullDesc((v) => !v)}
                className="ml-1 text-blue-600 hover:underline font-medium"
              >
                {showFullDesc ? "Show less" : "Show more"}
              </button>
            )}
          </p>

          {/* Technical skills */}
          {job.technical_skills?.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Technical Skills
              </p>
              <div className="flex flex-wrap gap-1">
                {job.technical_skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Soft skills */}
          {job.soft_skills?.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Soft Skills
              </p>
              <div className="flex flex-wrap gap-1">
                {job.soft_skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Fit scores */}
          <div className="flex gap-3 mt-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">Experience</span>
              <ScoreBadge score={job.experience_fit} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">Domain</span>
              <ScoreBadge score={job.domain_fit} />
            </div>
          </div>

          {/* Apply button */}
          <a
            href={job.application_url}
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-1.5 max-w-xs py-2 text-sm font-semibold
              bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Apply Now
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}

export default JobCard;
