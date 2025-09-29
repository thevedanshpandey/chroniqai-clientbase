import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Construction, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export function Homepage() {
  return (
    <>
      <Helmet>
        <title>ChroniqAI - Coming Soon</title>
        <meta name="description" content="ChroniqAI is coming soon. Advanced analytics and insights platform under development." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center">
          <CardContent className="p-12">
            <div className="flex justify-center mb-6">
              <Construction className="h-20 w-20 text-primary animate-pulse" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              ChroniqAI
            </h1>
            
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Under Construction
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're building something amazing! Our advanced analytics and insights platform 
              is currently under development. Stay tuned for the launch.
            </p>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Already have access?
              </p>
              
              <Button asChild size="lg" className="group">
                <Link to="/login">
                  Access Platform
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}