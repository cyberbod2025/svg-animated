import React, { useRef, useState, useEffect } from 'react';
import { EyeIcon, PlayIcon, PauseIcon, ResetIcon } from './Icons';

interface PreviewWindowProps {
  svgCode: string;
  isLoading: boolean;
  error: string;
}

// Extend the SVGSVGElement interface to include animation methods for TypeScript
interface SVGSVGElementWithAnimation extends SVGSVGElement {
    pauseAnimations(): void;
    unpauseAnimations(): void;
    setCurrentTime(seconds: number): void;
}

export const PreviewWindow: React.FC<PreviewWindowProps> = ({ svgCode, isLoading, error }) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // When a new SVG is loaded, reset the playing state to true.
  useEffect(() => {
    if (svgCode && !isLoading) {
      setIsPlaying(true);
    }
  }, [svgCode, isLoading]);

  const getSvgElement = (): SVGSVGElementWithAnimation | null => {
    return svgContainerRef.current?.querySelector('svg') as SVGSVGElementWithAnimation | null;
  };

  const handleTogglePlay = () => {
    const svg = getSvgElement();
    if (!svg) return;

    if (isPlaying) {
      svg.pauseAnimations();
    } else {
      svg.unpauseAnimations();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    const svg = getSvgElement();
    if (!svg) return;

    svg.setCurrentTime(0);
    svg.unpauseAnimations(); // Restart playback from the beginning
    setIsPlaying(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <svg className="animate-spin h-10 w-10 text-sky-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg">Generating your animation...</p>
          <p className="text-sm">The AI is working its magic!</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400 p-4">
          <p className="font-semibold mb-2">An Error Occurred</p>
          <p className="text-sm text-center">{error}</p>
        </div>
      );
    }
    if (svgCode) {
      return (
        <div 
          className="w-full h-full flex items-center justify-center p-4"
          dangerouslySetInnerHTML={{ __html: svgCode }}
        />
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <EyeIcon className="w-16 h-16 mb-4" />
        <p className="text-lg">Your animation will appear here</p>
        <p className="text-sm">Configure the options and click "Generate"</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg aspect-square flex flex-col">
       <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-sky-400">Preview</h2>
        {svgCode && !isLoading && !error && (
            <div className="flex items-center gap-2">
                <button 
                    onClick={handleTogglePlay}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                    aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
                    title={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                </button>
                <button 
                    onClick={handleReset}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                    aria-label="Reset animation"
                    title="Reset"
                >
                    <ResetIcon className="w-5 h-5" />
                </button>
            </div>
        )}
       </div>
       <div ref={svgContainerRef} className="flex-grow flex items-center justify-center min-h-0 bg-dots-pattern">
          {renderContent()}
       </div>
    </div>
  );
};