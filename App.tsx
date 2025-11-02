
import React, { useState, useCallback } from 'react';
import { LogoUploader } from './components/LogoUploader';
import { AnimationControls } from './components/AnimationControls';
import { PreviewWindow } from './components/PreviewWindow';
import { ExportOptions } from './components/ExportOptions';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { generateAnimation } from './services/geminiService';
import type { AnimationConfig } from './types';

export default function App() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [animationConfig, setAnimationConfig] = useState<AnimationConfig>({
    logoName: 'AtemiMx',
    logoAnimation: 'electric-trace',
    textAnimation: 'vertical-entrance',
    backgroundAnimation: 'progressive-glow',
    duration: 2.5,
    backgroundColor: '#111827',
    primaryColor: '#38bdf8', // sky-500
    secondaryColor: '#ffffff',
    isTransparent: true,
  });
  
  const [generatedSvg, setGeneratedSvg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogoUpload = (file: File) => {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    // Extract name from file if possible
    const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
    if (nameWithoutExtension) {
        setAnimationConfig(prev => ({ ...prev, logoName: nameWithoutExtension }));
    }
  };

  const handleGenerateClick = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setGeneratedSvg('');

    try {
      const svgCode = await generateAnimation(animationConfig);
      // Clean potential markdown fences
      const cleanedSvg = svgCode.replace(/^```svg\n|```$/g, '').trim();
      setGeneratedSvg(cleanedSvg);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [animationConfig]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Column */}
          <div className="flex flex-col gap-8">
            <LogoUploader onLogoUpload={handleLogoUpload} logoPreview={logoPreview} />
            <AnimationControls 
              config={animationConfig} 
              setConfig={setAnimationConfig} 
              isLoading={isLoading}
              onGenerate={handleGenerateClick}
            />
          </div>

          {/* Preview & Export Column */}
          <div className="flex flex-col gap-8">
            <PreviewWindow svgCode={generatedSvg} isLoading={isLoading} error={error} />
            {generatedSvg && !isLoading && <ExportOptions svgCode={generatedSvg} />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
