
import React from 'react';
import { Software } from '../types';

interface SoftwareProps {
  tools: Software[];
}

export const SoftwareTools: React.FC<SoftwareProps> = ({ tools }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Software & <span className="text-academic-600">Tools</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600">
          Essential open-source software, libraries, and pipelines for image-based profiling analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full"
          >
            <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                        <i className="fa-solid fa-code text-xl"></i>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-academic-50 text-academic-800">
                        Open Source
                    </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {tool.name}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags && tool.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {tool.description}
                </p>
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex gap-3">
                <a 
                    href={tool.url}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-academic-500"
                >
                    <i className="fa-brands fa-github mr-2"></i>
                    Code
                </a>
                {tool.doi && tool.doi !== 'N/A' && (
                    <a 
                        href={`https://doi.org/${tool.doi}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-academic-600 hover:bg-academic-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-academic-500"
                    >
                        <i className="fa-solid fa-book mr-2"></i>
                        Paper
                    </a>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};