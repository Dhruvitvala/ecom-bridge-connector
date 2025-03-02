
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { RequestConfigCard } from './demo/RequestConfigCard';
import { ResultDisplayCard } from './demo/ResultDisplayCard';
import { DemoResult } from './demo/types';
import { platforms, endpoints, requestSamples, transformedSamples, responseSamples } from './demo/demoData';

export function DemoSection() {
  const { toast } = useToast();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('shopify');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('discount');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<DemoResult | null>(null);
  
  const handleProcess = () => {
    setIsProcessing(true);
    setResult(null);
    
    // Simulate API request delay
    setTimeout(() => {
      setResult({
        originalRequest: requestSamples[selectedPlatform][selectedEndpoint],
        transformedRequest: transformedSamples[selectedPlatform][selectedEndpoint],
        magentoResponse: transformedSamples[selectedPlatform][selectedEndpoint],
        platformResponse: responseSamples[selectedPlatform][selectedEndpoint]
      });
      
      setIsProcessing(false);
      
      toast({
        title: "Request processed successfully",
        description: `${selectedPlatform} ${selectedEndpoint} request was transformed and processed`,
        duration: 3000
      });
    }, 1500);
  };
  
  return (
    <section id="demo" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
            <span className="mx-1">Interactive Demo</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">See It In Action</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-lg">
            Try our middleware by simulating requests from different e-commerce platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RequestConfigCard
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            selectedEndpoint={selectedEndpoint}
            setSelectedEndpoint={setSelectedEndpoint}
            isProcessing={isProcessing}
            platforms={platforms}
            endpoints={endpoints}
            requestSamples={requestSamples}
            onProcess={handleProcess}
          />
          
          <ResultDisplayCard
            result={result}
            selectedPlatform={selectedPlatform}
          />
        </div>
      </div>
    </section>
  );
}
