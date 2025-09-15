import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Export() {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: 'csv' | 'pdf') => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Export Successful",
        description: `Dashboard data exported as ${format.toUpperCase()}`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Export Data</h1>
        <p className="text-muted-foreground">Download your outreach data in various formats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <Card className="bg-card border border-border/50 hover:shadow-glow-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center space-x-2">
              <FileSpreadsheet className="h-5 w-5 text-neon-green" />
              <span>CSV Export</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Export your dashboard data as a CSV file for analysis in Excel or Google Sheets.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All metrics and performance data</li>
              <li>• Daily, weekly, and lifetime totals</li>
              <li>• Conversion rates and trends</li>
            </ul>
            <Button 
              onClick={() => handleExport('csv')}
              disabled={isExporting}
              className="w-full bg-neon-green/10 text-neon-green border border-neon-green/20 hover:bg-neon-green/20"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export as CSV'}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border/50 hover:shadow-glow-danger/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center space-x-2">
              <FileText className="h-5 w-5 text-neon-red" />
              <span>PDF Report</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Generate a comprehensive PDF report with charts and visual analytics.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Professional formatted report</li>
              <li>• Charts and visualizations</li>
              <li>• Executive summary included</li>
            </ul>
            <Button 
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="w-full bg-neon-red/10 text-neon-red border border-neon-red/20 hover:bg-neon-red/20"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Generating...' : 'Generate PDF'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border border-border/50 mt-8">
        <CardHeader>
          <CardTitle className="text-foreground">Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Data Range</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Today's data</div>
                <div>• This week's performance</div>
                <div>• Monthly summaries</div>
                <div>• Lifetime statistics</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Included Metrics</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Connection requests and acceptance rates</div>
                <div>• Message engagement statistics</div>
                <div>• Reply rates and response times</div>
                <div>• Meeting booking conversions</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}