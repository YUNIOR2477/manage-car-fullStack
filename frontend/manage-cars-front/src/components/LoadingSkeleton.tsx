import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => (
  <Card className="p-4 shadow-md border border-muted bg-primary-foreground rounded-lg">
    <Skeleton className="w-full h-40 rounded-md mb-4" />
    <Skeleton className="h-6 w-2/3 mb-2" />
    <CardContent className="p-0 -mt-4 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <Skeleton className="h-4 w-3/6" />
    </CardContent>
  </Card>
);
