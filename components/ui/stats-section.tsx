const StatsSection = () => {
  const stats = [
    { number: "1000+", label: "Projects Completed" },
    { number: "500+", label: "Happy Clients" },
    { number: "99%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                {stat.number}
              </div>
              <p className="text-lg md:text-xl opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection