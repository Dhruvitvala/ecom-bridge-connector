
import { 
  LayersIcon, 
  ShieldCheckIcon, 
  RefreshCwIcon, 
  ServerIcon, 
  GanttChartIcon,
  ArrowRightLeftIcon
} from 'lucide-react';

const features = [
  {
    icon: <LayersIcon className="h-10 w-10 text-primary" />,
    title: "Platform Detection",
    description: "Automatically identifies whether requests are coming from Shopify, WooCommerce, or OpenCart."
  },
  {
    icon: <ArrowRightLeftIcon className="h-10 w-10 text-primary" />,
    title: "Data Mapping & Transformation",
    description: "Converts API requests between different e-commerce platforms with precise data transformation."
  },
  {
    icon: <ShieldCheckIcon className="h-10 w-10 text-primary" />,
    title: "Authentication & Security",
    description: "Secure authentication using API keys with comprehensive security measures."
  },
  {
    icon: <RefreshCwIcon className="h-10 w-10 text-primary" />,
    title: "Request Routing",
    description: "Intelligently forwards requests to the correct Magento API endpoints based on context."
  },
  {
    icon: <ServerIcon className="h-10 w-10 text-primary" />,
    title: "Response Conversion",
    description: "Transforms Magento responses to match each platform's expected format for seamless integration."
  },
  {
    icon: <GanttChartIcon className="h-10 w-10 text-primary" />,
    title: "Monitoring & Logging",
    description: "Comprehensive logging system to monitor API traffic with detailed insights and error tracking."
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
            <span className="mx-1">Features</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Bridge Technology</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-lg">
            Our middleware provides a seamless connection between different e-commerce platforms, enabling Magento extensions to work across multiple systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-xl bg-background border border-border/50 hover:shadow-md transition-all duration-300 animate-fade-in opacity-0"
              style={{ animationDelay: `${0.1 * index}s`, animationFillMode: 'forwards' }}
            >
              <div className="mb-5 rounded-lg p-3 bg-primary/5">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
