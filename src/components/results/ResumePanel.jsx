import { useMemo, useEffect, useState } from "react";
import { Download, ExternalLink, FileText } from "lucide-react";

function ResumePanel({ job }) {
  const pdfUrl = useMemo(() => {
    if (!job?.revised_resume) return null;
    try {
      const bytes = atob(job.revised_resume);
      const buffer = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        buffer[i] = bytes.charCodeAt(i);
      }
      const blob = new Blob([buffer], { type: "application/pdf" });
      return URL.createObjectURL(blob);
    } catch {
      return null;
    }
  }, [job?.revised_resume]);

  // Revoke blob URL on cleanup to avoid memory leaks
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 bg-gray-50">
        <FileText className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-gray-500 font-medium">
          Select a job to see your tailored resume
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Click any job card on the left to view a resume crafted for that role.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <h2 className="font-semibold text-gray-900 text-sm truncate">
            {job.job_title}
            <span className="text-gray-400 font-normal"> @ </span>
            <a
              href={job.company_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {job.company}
            </a>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Tailored resume for this role
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200
              px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Job
          </a>

          {pdfUrl && (
            <a
              href={pdfUrl}
              download={`resume_${job.company.replace(/\s+/g, "_")}_${job.job_title.replace(/\s+/g, "_")}.pdf`}
              className="flex items-center gap-1.5 text-xs bg-blue-600 text-white
                px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
          )}
        </div>
      </div>

      {/* PDF viewer */}
      <div className="flex-1 min-h-0">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title={`Revised resume for ${job.job_title} at ${job.company}`}
            className="w-full h-full border-0"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Unable to load PDF preview.
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumePanel;
