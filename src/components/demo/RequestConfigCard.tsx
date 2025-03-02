
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightIcon } from 'lucide-react';
import { PlatformData } from './types';

interface RequestConfigCardProps {
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  selectedEndpoint: string;
  setSelectedEndpoint: (endpoint: string) => void;
  isProcessing: boolean;
  platforms: { value: string; label: string }[];
  endpoints: { value: string; label: string }[];
  requestSamples: PlatformData;
  onProcess: () => void;
}

export function RequestConfigCard({
  selectedPlatform,
  setSelectedPlatform,
  selectedEndpoint,
  setSelectedEndpoint,
  isProcessing,
  platforms,
  endpoints,
  requestSamples,
  onProcess
}: RequestConfigCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Request</CardTitle>
        <CardDescription>
          Select a platform and endpoint to simulate a request
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Source Platform
          </label>
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {platforms.map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            API Endpoint
          </label>
          <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
            <SelectTrigger>
              <SelectValue placeholder="Select endpoint" />
            </SelectTrigger>
            <SelectContent>
              {endpoints.map((endpoint) => (
                <SelectItem key={endpoint.value} value={endpoint.value}>
                  {endpoint.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="bg-muted p-4 rounded-md">
          <p className="text-sm font-medium mb-2">Request Payload</p>
          <pre className="text-xs overflow-auto max-h-40">
            {JSON.stringify(requestSamples[selectedPlatform][selectedEndpoint], null, 2)}
          </pre>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onProcess} 
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? 'Processing...' : 'Process Request'}
          {!isProcessing && <ArrowRightIcon className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
