import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
export function Hero() {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/15%),transparent_60%)]"></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground mb-4 animate-slide-down opacity-0" style={{
          animationDelay: '0.2s',
          animationFillMode: 'forwards'
        }}>
            <span className="mx-1">Introducing Ecom Bridge</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/tight animate-slide-down opacity-0" style={{
          animationDelay: '0.3s',
          animationFillMode: 'forwards'
        }}>
            Connect <span className="text-primary">Any E-commerce Platform</span> With Seamless Integration
          </h1>
          
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl animate-slide-down opacity-0" style={{
          animationDelay: '0.4s',
          animationFillMode: 'forwards'
        }}>
            A middleware solution that allows Magento extensions to work effortlessly with Shopify, WooCommerce, and OpenCart with precise data mapping and transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-down opacity-0" style={{
          animationDelay: '0.5s',
          animationFillMode: 'forwards'
        }}>
            <Button size="lg" className="w-full sm:w-auto group" onClick={scrollToDemo}>
              Try the Demo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
          </div>
        </div>
      </div>
    </section>;
}