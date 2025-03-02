
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: "Platform Detection",
      description: "The middleware identifies which e-commerce platform is making the request by analyzing the request headers, payload structure, and authentication method.",
      code: `// Platform detection logic
function detectPlatform(request) {
  // Check request signature and structure
  if (request.headers['x-shopify-hmac-sha256']) {
    return 'shopify';
  } else if (request.headers['wc-signature']) {
    return 'woocommerce';
  } else if (request.headers['x-opencart-signature']) {
    return 'opencart';
  }
  
  // Additional checks based on payload structure
  return 'unknown';
}`
    },
    {
      title: "Data Transformation",
      description: "Once the platform is identified, the request data is transformed from the source platform's format to Magento's expected format using data mapping schemas.",
      code: `// Data transformation example
function transformToMagento(request, platform) {
  // Load the appropriate schema
  const schema = loadPlatformSchema(platform);
  
  // Map the fields according to schema
  const transformed = {
    entity_id: request.data.id,
    order_currency_code: request.data.currency,
    customer_email: request.data.email,
    items: mapOrderItems(request.data.line_items)
  };
  
  return transformed;
}`
    },
    {
      title: "Request Processing",
      description: "The transformed request is then forwarded to the appropriate Magento API endpoint with proper authentication and headers.",
      code: `// Request processing
async function processMagentoRequest(transformedData, endpoint) {
  try {
    const response = await fetch(\`\${MAGENTO_API_URL}/\${endpoint}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${MAGENTO_API_TOKEN}\`
      },
      body: JSON.stringify(transformedData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error calling Magento API:', error);
    throw error;
  }
}`
    },
    {
      title: "Response Conversion",
      description: "After receiving a response from Magento, the middleware converts it back to the format expected by the original e-commerce platform.",
      code: `// Response conversion
function convertMagentoResponse(response, targetPlatform) {
  // Load response mapping schema for target platform
  const schema = loadResponseSchema(targetPlatform);
  
  // Apply transformations
  const converted = {
    success: response.success,
    order_id: response.increment_id,
    status: mapOrderStatus(response.status, targetPlatform),
    details: extractOrderDetails(response, targetPlatform)
  };
  
  return converted;
}`
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
            <span className="mx-1">How It Works</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Seamless Integration Process</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-lg">
            Our middleware processes requests and responses in four key steps to ensure perfect compatibility across e-commerce platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
          <div className="col-span-1">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      activeStep === index
                        ? 'bg-white text-primary'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {index + 1}
                    </div>
                    <h3 className="font-medium">{step.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-span-1 lg:col-span-2">
            <Card className="overflow-hidden">
              <Tabs defaultValue="description" className="w-full">
                <div className="px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="code">Code Sample</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="description" className="p-6">
                  <h3 className="text-xl font-medium mb-3">{steps[activeStep].title}</h3>
                  <p className="text-muted-foreground">{steps[activeStep].description}</p>
                </TabsContent>
                
                <TabsContent value="code" className="border-t">
                  <pre className="p-4 text-sm overflow-x-auto bg-secondary/50 rounded-b-lg">
                    <code>{steps[activeStep].code}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
