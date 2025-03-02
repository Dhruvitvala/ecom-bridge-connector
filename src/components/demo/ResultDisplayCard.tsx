
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2Icon } from 'lucide-react';
import { DemoResult } from './types';

interface ResultDisplayCardProps {
  result: DemoResult | null;
  selectedPlatform: string;
}

export function ResultDisplayCard({ result, selectedPlatform }: ResultDisplayCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Flow</CardTitle>
        <CardDescription>
          See how the middleware processes your request
        </CardDescription>
      </CardHeader>
      <CardContent>
        {result ? (
          <Tabs defaultValue="original">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="original">Original</TabsTrigger>
              <TabsTrigger value="transformed">Transformed</TabsTrigger>
              <TabsTrigger value="magento">Magento</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
            </TabsList>
            
            <TabsContent value="original" className="max-h-80 overflow-auto">
              <div className="p-3 bg-muted/50 rounded-md mb-2 flex items-center">
                <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Platform detected: <span className="font-medium capitalize">{selectedPlatform}</span></span>
              </div>
              <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                {JSON.stringify(result.originalRequest, null, 2)}
              </pre>
            </TabsContent>
            
            <TabsContent value="transformed" className="max-h-80 overflow-auto">
              <div className="p-3 bg-muted/50 rounded-md mb-2 flex items-center">
                <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Data transformed to Magento format</span>
              </div>
              <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                {JSON.stringify(result.transformedRequest, null, 2)}
              </pre>
            </TabsContent>
            
            <TabsContent value="magento" className="max-h-80 overflow-auto">
              <div className="p-3 bg-muted/50 rounded-md mb-2 flex items-center">
                <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Magento API response received</span>
              </div>
              <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                {JSON.stringify(result.magentoResponse, null, 2)}
              </pre>
            </TabsContent>
            
            <TabsContent value="response" className="max-h-80 overflow-auto">
              <div className="p-3 bg-muted/50 rounded-md mb-2 flex items-center">
                <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Response converted to {selectedPlatform} format</span>
              </div>
              <pre className="bg-muted p-4 rounded-md text-xs overflow-auto">
                {JSON.stringify(result.platformResponse, null, 2)}
              </pre>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="h-60 flex flex-col items-center justify-center text-center p-4">
            <div className="mb-4 text-muted-foreground">
              <svg
                className="h-12 w-12 mx-auto mb-2 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
              <p>Configure and process a request to see the transformation flow</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
