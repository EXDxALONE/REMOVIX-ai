import { useImageHistory } from "@/hooks/useImageHistory";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const HistoryTab = () => {
  const { history, clearHistory } = useImageHistory();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Image History</h2>
        {history.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearHistory} className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Clear History
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">No processed images yet. Upload an image to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((entry) => (
            <div key={entry.id} className="glass-card rounded-2xl p-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-secondary flex items-center justify-center mb-3">
                <img src={entry.processedImageUrl} alt="Processed" className="max-w-full max-h-full object-contain" />
              </div>
              <p className="text-xs text-muted-foreground font-body mb-1">
                Processed on {format(entry.timestamp, "PPP p")}
              </p>
              <a href={entry.processedImageUrl} download={`removix-result-${entry.id}.png`} className="w-full">
                <Button variant="gradient" size="sm" className="w-full">Download</Button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
