import Link from "next/link"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div>
<header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
<div className="container mx-auto px-4 py-4">
  <div className="flex items-center justify-between">
    {/* Logo */}
    <Link href="/">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg">I</span>
      </div>
      <span className="text-xl font-bold text-foreground">Inmobiliaria</span>
    </div>
    </Link>
  </div>
</div>
</header>
      {children}
    </div>
  )
}

export default layout
