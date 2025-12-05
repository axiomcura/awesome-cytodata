
import React, { useState, useMemo } from 'react';
import { Dataset } from '../types';

interface DatasetsProps {
  datasets: Dataset[];
}

export const Datasets: React.FC<DatasetsProps> = ({ datasets }) => {
  const [query, setQuery] = useState('');

  const filteredDatasets = useMemo(() => {
    if (!query.trim()) return datasets;
    const lowerQuery = query.toLowerCase();
    return datasets.filter(d => 
      d.name.toLowerCase().includes(lowerQuery) || 
      d.description.toLowerCase().includes(lowerQuery) ||
      d.doi.toLowerCase().includes(lowerQuery)
    );
  }, [datasets, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Publicly Available <span className="text-academic-600">Datasets</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 mb-8">
          A curated list of high-content screening and image-based profiling datasets available for research and benchmarking.
        </p>

        {/* Search Input */}
        <div className="max-w-xl mx-auto relative">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-search text-slate-400"></i>
           </div>
           <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-academic-500 focus:border-academic-500 shadow-sm transition-all"
              placeholder="Search datasets (e.g., 'segmentation', 'COVID', 'cell painting')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
           />
        </div>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg bg-white">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-300">
            <thead className="bg-slate-50">
                <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6 w-1/4">
                    Dataset Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900 w-1/2">
                    Description
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                    Access
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                    Reference
                </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
                {filteredDatasets.length > 0 ? (
                  filteredDatasets.map((dataset, idx) => (
                  <tr key={idx} className={`hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                      <td className="whitespace-normal py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6 align-top">
                          {dataset.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-600 align-top">
                          {dataset.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm align-top">
                          <a 
                              href={dataset.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-academic-600 hover:bg-academic-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-academic-500 transition-colors"
                          >
                              <i className="fa-solid fa-database mr-2"></i>
                              View Data
                          </a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 align-top">
                          {dataset.doi && dataset.doi !== 'N/A' ? (
                              <a 
                                  href={`https://doi.org/${dataset.doi}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-academic-600 hover:text-academic-800 hover:underline inline-flex items-center"
                              >
                                  <i className="fa-solid fa-file-lines mr-1.5"></i>
                                  Paper
                              </a>
                          ) : (
                              <span className="text-slate-400">N/A</span>
                          )}
                      </td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-500">
                      No datasets found matching your search.
                    </td>
                  </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
