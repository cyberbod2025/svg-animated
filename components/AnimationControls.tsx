
import React from 'react';
import type { AnimationConfig } from '../types';
import { SparklesIcon } from './Icons';

interface AnimationControlsProps {
  config: AnimationConfig;
  setConfig: React.Dispatch<React.SetStateAction<AnimationConfig>>;
  isLoading: boolean;
  onGenerate: () => void;
}

const ControlGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{title}</label>
    {children}
  </div>
);

const SelectInput: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }> = ({ value, onChange, children }) => (
    <select value={value} onChange={onChange} className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition">
        {children}
    </select>
);


export const AnimationControls: React.FC<AnimationControlsProps> = ({ config, setConfig, isLoading, onGenerate }) => {

  const handleConfigChange = <K extends keyof AnimationConfig,>(key: K, value: AnimationConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-sky-400">2. Define Animations</h2>
      <div className="space-y-6">
        <ControlGroup title="Logo Name / Text">
          <input 
            type="text" 
            value={config.logoName}
            onChange={(e) => handleConfigChange('logoName', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            placeholder="e.g., AtemiMx"
          />
        </ControlGroup>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ControlGroup title="Logo Animation">
                <SelectInput value={config.logoAnimation} onChange={(e) => handleConfigChange('logoAnimation', e.target.value as AnimationConfig['logoAnimation'])}>
                    <option value="electric-trace">Electric Trace</option>
                    <option value="fade-in">Fade In</option>
                    <option value="scale-up">Scale Up</option>
                    <option value="path-draw">Path Draw</option>
                </SelectInput>
            </ControlGroup>

            <ControlGroup title="Text Animation">
                <SelectInput value={config.textAnimation} onChange={(e) => handleConfigChange('textAnimation', e.target.value as AnimationConfig['textAnimation'])}>
                    <option value="vertical-entrance">Vertical Entrance</option>
                    <option value="fade-in">Fade In</option>
                    <option value="typewriter">Typewriter</option>
                    <option value="glow-in">Glow In</option>
                </SelectInput>
            </ControlGroup>
        </div>

        <ControlGroup title="Background Animation">
            <SelectInput value={config.backgroundAnimation} onChange={(e) => handleConfigChange('backgroundAnimation', e.target.value as AnimationConfig['backgroundAnimation'])}>
                <option value="progressive-glow">Progressive Glow</option>
                <option value="fade-in">Fade In</option>
                <option value="static">Static</option>
                <option value="subtle-pulse">Subtle Pulse</option>
            </SelectInput>
        </ControlGroup>

        <ControlGroup title={`Duration: ${config.duration}s`}>
            <input 
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={config.duration}
                onChange={(e) => handleConfigChange('duration', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
        </ControlGroup>

        <h3 className="text-lg font-semibold pt-4 border-t border-gray-700 text-sky-400">3. Configure Style</h3>
        
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Transparent Background</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={config.isTransparent} onChange={(e) => handleConfigChange('isTransparent', e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
        </div>
        
        {!config.isTransparent && (
            <ControlGroup title="Background Color">
                <input type="color" value={config.backgroundColor} onChange={(e) => handleConfigChange('backgroundColor', e.target.value)} className="w-full h-10 p-1 bg-gray-700 border border-gray-600 rounded-md cursor-pointer"/>
            </ControlGroup>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ControlGroup title="Primary Color">
                <input type="color" value={config.primaryColor} onChange={(e) => handleConfigChange('primaryColor', e.target.value)} className="w-full h-10 p-1 bg-gray-700 border border-gray-600 rounded-md cursor-pointer"/>
            </ControlGroup>
            <ControlGroup title="Secondary Color">
                <input type="color" value={config.secondaryColor} onChange={(e) => handleConfigChange('secondaryColor', e.target.value)} className="w-full h-10 p-1 bg-gray-700 border border-gray-600 rounded-md cursor-pointer"/>
            </ControlGroup>
        </div>

        <button 
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full bg-sky-600 hover:bg-sky-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Generate Animation
            </>
          )}
        </button>
      </div>
    </div>
  );
};
