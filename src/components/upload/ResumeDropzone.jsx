import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, FileText, X } from 'lucide-react'

function ResumeDropzone({ onFileAccepted, disabled }) {
  const [selectedFile, setSelectedFile] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    disabled,
  })

  const clearFile = (e) => {
    e.stopPropagation()
    setSelectedFile(null)
  }

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileAccepted(selectedFile)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <div
        {...getRootProps()}
        className={`
          w-full border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />

        {selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <FileText className="w-10 h-10 text-blue-600" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">{selectedFile.name}</span>
              {!disabled && (
                <button
                  onClick={clearFile}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400">Click or drag to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <UploadCloud className="w-10 h-10 text-gray-400" />
            {isDragActive ? (
              <p className="text-blue-600 font-medium">Drop your resume here</p>
            ) : (
              <>
                <p className="text-gray-600 font-medium">Drag & drop your resume here</p>
                <p className="text-gray-400 text-sm">or click to browse</p>
              </>
            )}
            <p className="text-xs text-gray-400">Supports PDF, DOC, DOCX</p>
          </div>
        )}
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!selectedFile || disabled}
        className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl
          hover:bg-blue-700 active:bg-blue-800 transition-colors
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Analyze My Resume
      </button>
    </div>
  )
}

export default ResumeDropzone
