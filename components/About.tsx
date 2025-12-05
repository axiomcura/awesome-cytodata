
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">About CytoData</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          A dynamic, open community of researchers, data scientists, and developers advancing the field of image-based profiling.
        </p>
      </div>

      <div className="space-y-16">
        {/* Mission Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  The CytoData community is dedicated to developing, sharing, and promoting methods for image-based profiling. 
                  We believe that by quantifying the rich information contained in microscopy images, we can unlock new insights 
                  into cell biology and accelerate drug discovery.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We organize annual symposia, hackathons, and workshops to foster collaboration and education across academia and industry.
                </p>
             </div>
             <div className="w-full md:w-1/3 flex justify-center">
                <img 
                    src="https://avatars.githubusercontent.com/u/54227226?v=4" 
                    alt="CytoData Logo" 
                    className="w-48 h-48 object-contain"
                />
             </div>
          </div>
        </section>

        {/* Awesome CytoData Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why "Awesome CytoData"?</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                The field of image-based profiling is growing rapidly. New tools, datasets, and papers are published every week.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-900">Awesome CytoData</strong> serves as a curated, living knowledge hub. 
                It helps newcomers find their footing with influential papers and assists experts in discovering the latest 
                state-of-the-art software and datasets. It is maintained by the community, for the community.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
                <ul className="space-y-4">
                    <li className="flex items-start">
                        <i className="fa-solid fa-check text-green-500 mt-1 mr-3"></i>
                        <span className="text-slate-700">Centralized repository for high-quality resources</span>
                    </li>
                    <li className="flex items-start">
                        <i className="fa-solid fa-check text-green-500 mt-1 mr-3"></i>
                        <span className="text-slate-700">Open-source and accessible to everyone</span>
                    </li>
                    <li className="flex items-start">
                        <i className="fa-solid fa-check text-green-500 mt-1 mr-3"></i>
                        <span className="text-slate-700">Continuously updated by contributors like you</span>
                    </li>
                </ul>
            </div>
        </section>

        {/* Join Section */}
        <section className="bg-academic-600 rounded-2xl p-10 text-center text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Join the Community</h2>
          <p className="text-academic-100 text-lg mb-8 max-w-2xl mx-auto">
            Whether you are a biologist, a computer scientist, or a data analyst, there is a place for you in CytoData. 
            Connect with us to stay updated on events, challenges, and new research.
          </p>
          <div className="mb-10">
            <a 
                href="https://cytodata.org" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-academic-600 rounded-lg font-bold hover:bg-academic-50 transition-colors shadow-md"
            >
                Visit CytoData.org
                <i className="fa-solid fa-arrow-right ml-2"></i>
            </a>
          </div>

          <div className="border-t border-academic-500 pt-8">
            <p className="text-academic-100 font-medium mb-6 uppercase tracking-wider text-sm">Follow us for updates</p>
            <div className="flex justify-center items-center gap-6">
                {/* LinkedIn */}
                <a 
                    href="https://www.linkedin.com/company/cytodata" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 group"
                    title="LinkedIn"
                >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-academic-600 group-hover:bg-academic-50 transition-colors shadow-sm">
                        <i className="fa-brands fa-linkedin text-2xl"></i>
                    </div>
                </a>

                {/* BlueSky */}
                <a 
                    href="https://bsky.app/profile/cytodata.org" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 group"
                    title="BlueSky"
                >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-academic-600 group-hover:bg-academic-50 transition-colors shadow-sm">
                        {/* BlueSky Butterfly Icon (SVG) */}
                        <svg viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
                             <path d="M111.8 62.2C170.2 105.9 233 194.7 256 242.4c23-47.6 85.8-136.4 144.2-180.2c42.1-31.6 110.3-56 110.3 21.8c0 15.5-8.9 130.5-14.1 149.2C478.2 298 412 314.6 353.1 304.5c102.9 17.5 129.1 75.5 72.5 133.5c-107.4 110.2-154.3-27.6-166.3-62.9l0 0c-1.9-5.8-11.7-6.7-13.7 0l0 0c-12 35.3-59 173.1-166.3 62.9c-56.5-58-30.4-116 72.5-133.5C99.9 314.6 33.8 298 15.7 233.1C10.4 214.4 1.5 99.4 1.5 83.9c0-77.8 68.2-53.4 110.3-21.8z"/>
                        </svg>
                    </div>
                </a>

                {/* X (Twitter) */}
                <a 
                    href="https://twitter.com/cytodata" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 group"
                    title="X (formerly Twitter)"
                >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-academic-600 group-hover:bg-academic-50 transition-colors shadow-sm">
                        <i className="fa-brands fa-x-twitter text-2xl"></i>
                    </div>
                </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
