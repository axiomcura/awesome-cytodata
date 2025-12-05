
import React, { useState } from 'react';
import { Resource, Category } from '../types';

interface ResourceCardProps {
  resource: Resource;
  viewMode?: 'grid' | 'list';
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, viewMode = 'grid' }) => {
  const [expanded, setExpanded] = useState(false);

  const isInfluential = resource.category === Category.INFLUENTIAL;
  const year = new Date(resource.date_published).getFullYear();

  // --- List View Layout ---
  if (viewMode === 'list') {
    return (
      <div 
        className={`
          bg-white rounded-lg transition-all duration-200 hover:shadow-md
          border ${isInfluential ? 'border-gold-400 bg-gold-50/10' : 'border-slate-200'}
          flex flex-col sm:flex-row gap-4 p-4
        `}
      >
        {/* Left: Meta (Year & Category) */}
        <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:w-24 flex-shrink-0">
          <span className="text-lg font-bold text-slate-700">{year}</span>
          <span className={`
              inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
              ${isInfluential ? 'bg-gold-100 text-gold-800' : 'bg-slate-100 text-slate-600'}
            `}>
              {resource.category}
          </span>
          {isInfluential && (
            <i className="fa-solid fa-star text-gold-500 mt-1" title="Influential Paper"></i>
          )}
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 leading-snug mb-1">
            <a href={resource.url} target="_blank" rel="noreferrer" className="hover:text-academic-600 transition-colors">
              {resource.title}
            </a>
          </h3>
          
          <div className="text-sm text-slate-600 mb-2 truncate">
             <span className="font-medium text-slate-800">{resource.journal}</span>
             <span className="mx-2 text-slate-300">|</span>
             {resource.authors.slice(0, 3).join(', ')}{resource.authors.length > 3 ? ' et al.' : ''}
          </div>

          <p className="text-sm text-slate-600 line-clamp-2 mb-2">
            {resource.summary}
          </p>

          {expanded && (
            <div className="mt-3 p-3 bg-slate-50 rounded text-sm text-slate-700 border border-slate-100">
               <strong className="block text-xs uppercase text-slate-400 mb-1">Abstract</strong>
               {resource.abstract}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex sm:flex-col gap-2 justify-center sm:border-l sm:border-slate-100 sm:pl-4">
           <a 
              href={resource.url} 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-academic-600 text-center p-2 rounded hover:bg-slate-50 transition-colors"
              title="Open DOI"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-lg"></i>
           </a>
           <button 
              onClick={() => setExpanded(!expanded)}
              className="text-slate-400 hover:text-academic-600 text-center p-2 rounded hover:bg-slate-50 transition-colors"
              title={expanded ? "Hide Abstract" : "View Abstract"}
            >
              <i className={`fa-solid ${expanded ? 'fa-compress' : 'fa-expand'} text-lg`}></i>
           </button>
        </div>
      </div>
    );
  }

  // --- Grid View Layout (Original) ---
  return (
    <div 
      className={`
        bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg
        border ${isInfluential ? 'border-gold-400 ring-1 ring-gold-400' : 'border-slate-200'}
        flex flex-col h-full
      `}
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex gap-2 mb-2">
             <span className={`
              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${isInfluential ? 'bg-gold-100 text-gold-800' : 'bg-slate-100 text-slate-800'}
            `}>
              {resource.category}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-academic-50 text-academic-800">
              {year}
            </span>
          </div>
          {isInfluential && (
            <i className="fa-solid fa-star text-gold-500" title="Influential Paper"></i>
          )}
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-tight">
          <a href={resource.url} target="_blank" rel="noreferrer" className="hover:text-academic-600 transition-colors">
            {resource.title}
          </a>
        </h3>

        <div className="text-sm text-slate-600 mb-4 italic">
          {resource.journal}
        </div>

        <div className="text-sm text-slate-500 mb-4 line-clamp-1">
          {resource.authors.slice(0, 3).join(', ')}{resource.authors.length > 3 ? ' et al.' : ''}
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
          <p className="text-sm text-slate-700 font-medium">
            <i className="fa-solid fa-quote-left text-slate-300 mr-2"></i>
            {resource.summary}
          </p>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Abstract</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {resource.abstract}
            </p>
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-academic-600 hover:text-academic-800 transition-colors"
        >
          {expanded ? 'Show Less' : 'Read Abstract'}
        </button>
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <span>DOI</span>
          <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
        </a>
      </div>
    </div>
  );
};
