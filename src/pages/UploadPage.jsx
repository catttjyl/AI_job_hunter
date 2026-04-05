import { useNavigate } from 'react-router-dom'
import ResumeDropzone from '../components/upload/ResumeDropzone'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import useJobStore from '../store/useJobStore'
import { uploadResume } from '../api/jobsApi'

function UploadPage() {
  const navigate = useNavigate()
  const { loading, error, setJobs, setLoading, setError, reset } = useJobStore()

  const handleFileAccepted = async (file) => {
    reset()
    setLoading(true)
    try {
      const jobs = await uploadResume(file)
      setJobs(jobs)
      navigate('/results')
    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Job Hunter</h1>
        <p className="text-gray-500 text-lg max-w-sm">
          Upload your resume and we'll match you with the best jobs — with a tailored resume for each.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner message="Analyzing your resume against available jobs..." />
      ) : (
        <>
          <ResumeDropzone onFileAccepted={handleFileAccepted} disabled={loading} />
          {error && (
            <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default UploadPage
