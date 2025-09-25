import  footerData  from "@/public/data/footer.json"
export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
<footer className="bg-primary/10 border-t border-border/50 py-8">
<div className="container mx-auto px-4">
  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
  <div className="flex items-center gap-6 text-sm text-muted-foreground">
      {footerData.rights ? <span>© {currentYear} {footerData.rights.name}. {footerData.rights.description}</span>:<span>© {currentYear} Todos los derechos reservados.</span>}
{footerData.policies &&      <a href={footerData.policies.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
        Políticas de privacidad
      </a>}
    </div>
    <div className="flex items-center space-x-2">
    <a href="https://harvestech.dev" target="_blank" className="text-muted-foreground hover:text-foreground  pointer-events-auto">
{/*       <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">H</span>
        </div> */}
Desarrollado por Harvestech
      </a>
    </div>
  </div>
</div>
</footer>)}