import { Card, CardContent } from "./card"

const FeaturesSection = () => {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized performance with modern technologies and best practices for speed and efficiency."
    },
    {
      icon: "🛡️",
      title: "Secure & Reliable",
      description: "Enterprise-grade security with robust authentication and data protection measures."
    },
    {
      icon: "📱",
      title: "Mobile First",
      description: "Responsive design that works perfectly across all devices and screen sizes."
    },
    {
      icon: "🌍",
      title: "Global Scale",
      description: "Built to handle millions of users with scalable architecture and CDN integration."
    },
    {
      icon: "📊",
      title: "Analytics Ready",
      description: "Built-in analytics and monitoring tools to track performance and user behavior."
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Collaborative tools and workflows designed for modern development teams."
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge technology with user-centered design to deliver 
            exceptional digital experiences that drive results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
