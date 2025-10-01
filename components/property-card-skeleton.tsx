import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PropertyCardSkeleton() {
  return (
    <Card className="group overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="relative">
        {/* Image skeleton */}
        <Skeleton className="w-full h-64" />
        
        {/* Badges skeleton */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        
        {/* Heart icon skeleton */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        
        {/* Published days skeleton */}
        <div className="absolute bottom-3 right-3">
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
      
      <CardContent className="p-4 space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        
        {/* Price skeleton */}
        <Skeleton className="h-8 w-32" />
        
        {/* Location skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-40" />
        </div>
        
        {/* Features skeleton */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-6" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-6" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-6" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        
        {/* Action buttons skeleton */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </CardContent>
    </Card>
  )
}
