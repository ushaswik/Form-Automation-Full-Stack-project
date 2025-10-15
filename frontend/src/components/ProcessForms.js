import React, { useState } from 'react';
import { Download, FileText, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const ProcessForms = ({ data }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState([]);

  const processForms = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Send data to backend
      const response = await axios.post('/api/process-forms', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setIsCompleted(true);
        setDownloadLinks(response.data.downloadLinks || []);
      } else {
        setError(response.data.error || 'Failed to process forms');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while processing forms');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (filename) => {
    // Use the full backend URL for downloads
    window.open(`http://localhost:5000/api/download/${encodeURIComponent(filename)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <Download className="h-6 w-6 text-primary-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Process Forms</h2>
      </div>

      {!isCompleted && !isProcessing && (
        <div className="text-center py-8">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Process Forms</h3>
          <p className="text-gray-600 mb-6">
            Click the button below to generate all filled forms based on your information.
          </p>
          <button
            onClick={processForms}
            className="px-8 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Process Forms
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="text-center py-8">
          <Loader className="h-16 w-16 text-primary-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Forms...</h3>
          <p className="text-gray-600">
            Please wait while we fill out all the forms with your information.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-sm font-medium text-red-800">Error Processing Forms</h3>
          </div>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setIsCompleted(false);
            }}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-sm font-medium text-green-800">Forms Processed Successfully!</h3>
            </div>
            <p className="mt-2 text-sm text-green-700">
              All forms have been filled and are ready for download.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Download Filled Forms</h3>
            
            {/* DOCX Files */}
            {downloadLinks.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                  <FileText className="h-4 w-4 text-blue-600 mr-2" />
                  Word Documents (.docx)
                </h4>
                <p className="text-xs text-gray-500 mb-3">
                  📝 Download editable Word documents with all your information filled in.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {downloadLinks.map((link, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-blue-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate">{link.filename}</p>
                            <p className="text-xs text-gray-500">Editable document</p>
                          </div>
                        </div>
                        <button
                          onClick={() => downloadFile(link.filename)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">What's Next?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Download DOCX files for editing and printing</li>
                <li>• Review the information for accuracy</li>
                <li>• Print and sign the forms as required</li>
                <li>• Submit the forms to the respective authorities</li>
                <li>• Original DOCX files are saved in the output folder</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessForms;
