
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRightIcon, CheckCircle2Icon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function DemoSection() {
  const { toast } = useToast();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('shopify');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('discount');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  
  const platforms = [
    { value: 'shopify', label: 'Shopify' },
    { value: 'woocommerce', label: 'WooCommerce' },
    { value: 'opencart', label: 'OpenCart' }
  ];
  
  const endpoints = [
    { value: 'discount', label: 'Apply Discount' },
    { value: 'order', label: 'Create Order' },
    { value: 'customer', label: 'Customer Data' }
  ];
  
  const requestSamples: Record<string, Record<string, any>> = {
    shopify: {
      discount: {
        shop_id: "shop_123456",
        discount_code: "SUMMER2023",
        value: 15,
        value_type: "percentage",
        target_selection: "all",
        customer_selection: "all",
      },
      order: {
        order_number: "1001",
        financial_status: "paid",
        total_price: "99.95",
        customer: {
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com"
        },
        line_items: [
          {
            title: "Premium Widget",
            price: "19.99",
            quantity: 2
          }
        ]
      }
    },
    woocommerce: {
      discount: {
        code: "SALE20",
        discount_type: "percent",
        amount: "20",
        individual_use: true,
        exclude_sale_items: true,
      },
      order: {
        payment_method: "stripe",
        payment_method_title: "Credit Card",
        status: "processing",
        customer_id": 5,
        billing: {
          first_name: "Jane",
          last_name: "Smith",
          email: "jane.smith@example.com"
        },
        line_items: [
          {
            product_id: 93,
            quantity: 2
          }
        ]
      }
    },
    opencart: {
      discount: {
        coupon_id: "5623",
        name: "Holiday Special",
        code: "HOLIDAY15",
        type: "P",
        discount: "15.0000",
      },
      order: {
        store_id: 0,
        customer_id": 5,
        firstname: "Alex",
        lastname: "Johnson",
        email: "alex.johnson@example.com",
        payment_method: "cod",
        products: [
          {
            product_id: "2345",
            name: "Basic Widget",
            quantity: 1
          }
        ]
      }
    }
  };
  
  const transformedSamples: Record<string, Record<string, any>> = {
    shopify: {
      discount: {
        coupon: {
          primary_coupon_id: null,
          code: "SUMMER2023",
          discount_amount: 15,
          discount_type: "percent",
          is_active: true,
          apply_to_shipping: false
        }
      },
      order: {
        entity: {
          increment_id: "1001",
          customer_email: "john.doe@example.com",
          customer_firstname: "John",
          customer_lastname: "Doe",
          grand_total: 99.95,
          items: [
            {
              sku: "premium-widget",
              name: "Premium Widget",
              price: 19.99,
              qty_ordered: 2
            }
          ]
        }
      }
    },
    woocommerce: {
      discount: {
        coupon: {
          primary_coupon_id: null,
          code: "SALE20",
          discount_amount: 20,
          discount_type: "percent",
          is_active: true,
          applies_to_all: true
        }
      },
      order: {
        entity: {
          status: "processing",
          customer_id": 5,
          customer_email: "jane.smith@example.com",
          customer_firstname: "Jane",
          customer_lastname: "Smith",
          payment_method: "stripe",
          items: [
            {
              product_id: 93,
              qty_ordered: 2
            }
          ]
        }
      }
    },
    opencart: {
      discount: {
        coupon: {
          primary_coupon_id": 5623,
          code: "HOLIDAY15",
          discount_amount: 15,
          discount_type: "percent",
          is_active: true
        }
      },
      order: {
        entity: {
          store_id: 0,
          customer_id": 5,
          customer_email: "alex.johnson@example.com",
          customer_firstname: "Alex",
          customer_lastname: "Johnson",
          payment_method: "cod",
          items: [
            {
              product_id: "2345",
              name: "Basic Widget",
              qty_ordered: 1
            }
          ]
        }
      }
    }
  };
  
  const responseSamples: Record<string, Record<string, any>> = {
    shopify: {
      discount: {
        discount: {
          id": "disc_123456",
          code: "SUMMER2023",
          value: 15,
          value_type: "percentage",
          status: "active",
          created_at: new Date().toISOString()
        },
        status: "success"
      },
      order: {
        order: {
          id": "order_789012",
          order_number": 1001,
          financial_status: "paid",
          total_price: "99.95",
          customer: {
            id": "cust_345678",
            email: "john.doe@example.com"
          },
          line_items: [
            {
              id": "line_901234",
              title: "Premium Widget",
              price: "19.99",
              quantity: 2
            }
          ]
        },
        status: "success"
      }
    },
    woocommerce: {
      discount: {
        coupon: {
          id": 56,
          code: "SALE20",
          discount_type: "percent",
          amount: "20",
          individual_use: true,
          date_created: new Date().toISOString(),
          status: "publish"
        }
      },
      order: {
        id": 741,
        status: "processing",
        payment_method: "stripe",
        payment_method_title: "Credit Card",
        customer_id": 5,
        line_items: [
          {
            id": 315,
            product_id: 93,
            quantity: 2
          }
        ]
      }
    },
    opencart: {
      discount: {
        success: true,
        coupon_id": "5623",
        name: "Holiday Special",
        code: "HOLIDAY15",
        type: "P",
        discount: "15.0000",
      },
      order: {
        success: true,
        order_id": "12345",
        order_status_id": "1",
        customer_id": "5",
        email: "alex.johnson@example.com",
        products: [
          {
            product_id": "2345",
            name: "Basic Widget",
            quantity: 1
          }
        ]
      }
    }
  };
  
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
                onClick={handleProcess} 
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? 'Processing...' : 'Process Request'}
                {!isProcessing && <ArrowRightIcon className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
          
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
        </div>
      </div>
    </section>
  );
}
