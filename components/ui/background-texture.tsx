'use client'

export function BackgroundTexture() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }}></div>
      
      {/* Diagonal lines */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(0, 102, 255, 0.05) 60px, rgba(0, 102, 255, 0.05) 61px)'
      }}></div>
      
      {/* Glows */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl"></div>
      
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-t from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl"></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/3"></div>
      
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(0, 102, 255, 0.1) 0%, transparent 1%), radial-gradient(circle at 90% 80%, rgba(0, 102, 255, 0.1) 0%, transparent 1%)'
      }}></div>
    </div>
  )
}