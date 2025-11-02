
import React, { useState } from 'react';
import { DownloadIcon, CopyIcon, CodeIcon } from './Icons';

interface ExportOptionsProps {
  svgCode: string;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ svgCode }) => {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'splash-animation.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(svgCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const reactCode = `
import React from 'react';

const AnimatedSplash = () => (
  <div dangerouslySetInnerHTML={{ __html: \`
    ${svgCode.replace(/`/g, '\\`')}
  \`}} />
);

export default AnimatedSplash;
  `.trim();

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-sky-400">4. Export & Integrate</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={handleDownload}
          className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          <DownloadIcon className="w-5 h-5 mr-2" />
          Download .svg
        </button>
        <button
          onClick={handleCopy}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          <CopyIcon className="w-5 h-5 mr-2" />
          {copied ? 'Copied!' : 'Copy SVG Code'}
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center"><CodeIcon className="w-5 h-5 mr-2 text-gray-400" /> React Integration</h3>
        <p className="text-sm text-gray-400 mb-2">Here's an example of how to use it in a React component:</p>
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto relative">
          <pre><code>{reactCode}</code></pre>
          <button
            onClick={() => navigator.clipboard.writeText(reactCode)}
            className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors"
            title="Copy code snippet"
          >
            <CopyIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
