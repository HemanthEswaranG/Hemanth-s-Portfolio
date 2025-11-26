import React from 'react';
import { X, FileText, Download, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const resumeFileName = "Resume.pdf";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
        
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700 z-10 shrink-0">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Resume Preview
          </h2>
          <div className="flex items-center gap-3">
             {/* Direct Download Link - Most Robust method to avoid empty/corrupted blobs */}
            <a
              href={resumeFileName}
              download="Hemanth_Eswaran_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
            
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Area - Native PDF Viewer */}
        <div className="flex-1 bg-slate-200 relative w-full h-full">
            <iframe 
                src={resumeFileName}
                className="w-full h-full border-0 block"
                title="Resume Preview"
            >
                {/* Fallback content if iframe fails to load or browser blocks it */}
                <div className="flex flex-col items-center justify-center h-full text-slate-600 bg-white gap-4 p-8 text-center">
                    <FileText className="w-16 h-16 text-slate-300" />
                    <p className="text-lg font-medium">Unable to display PDF directly.</p>
                    <a 
                        href={resumeFileName} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline flex items-center gap-2"
                    >
                        Open PDF in new tab <ExternalLink size={16}/>
                    </a>
                </div>
            </iframe>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;