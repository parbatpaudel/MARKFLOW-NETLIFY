'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    role: "Sales Director",
    company: "TechFlow Solutions",
    content: "marketflow's AI prospecting cut our research time by 70% and tripled our qualified pipeline. We're closing deals we would've never found manually.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80"
  },
  {
    id: 2,
    name: "Raj Patel",
    location: "Ahmedabad, India",
    role: "CEO",
    company: "Finovate",
    content: "Their AI qualification bot handles initial conversations 24/7. We wake up to hot leads every morning, and our reps focus only on closing.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    id: 3,
    name: "Sunita Reddy",
    location: "Hyderabad, India",
    role: "Marketing Head",
    company: "EduTech Plus",
    content: "Implemented AI-powered prospecting and saw a 200% increase in qualified leads within 45 days. The ROI was evident from day one.",
    avatar: "https://images.unsplash.com/photo-1573496358961-3c82838ef664?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    id: 4,
    name: "Amit Kumar",
    location: "Delhi, India",
    role: "Business Development",
    company: "CloudSecure",
    content: "Custom AI sales system. Clear ROI tracking. Revenue up 240% in 6 months. Best investment we've made.",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    id: 5,
    name: "Neha Gupta",
    location: "Bangalore, India",
    role: "Founder",
    company: "HealthTech Innovations",
    content: "The AI analysis of our sales process identified bottlenecks we didn't know existed. Our conversion rate improved by 85% in 3 months.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80"
  },
  {
    id: 6,
    name: "Vikram Singh",
    location: "Chennai, India",
    role: "Sales Manager",
    company: "AutoTech Systems",
    content: "Reduced our sales cycle by 40% and increased deal size by 60%. The AI insights helped us understand our customers better.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    id: 7,
    name: "Anjali Mehta",
    location: "Kolkata, India",
    role: "COO",
    company: "RetailBoost",
    content: "Our team productivity increased by 150% after implementing marketflow's AI tools. We closed more deals with the same team size.",
    avatar: "https://images.unsplash.com/photo-1573496358961-3c82838ef664?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    id: 8,
    name: "Sanjay Rao",
    location: "Pune, India",
    role: "Director",
    company: "LogiChain",
    content: "The predictive analytics helped us focus on high-value prospects. Our win rate improved from 25% to 65% in just 2 months.",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    id: 9,
    name: "Deepika Nair",
    location: "Kochi, India",
    role: "Head of Sales",
    company: "GreenEnergy Solutions",
    content: "AI-powered lead scoring saved our team countless hours. We now focus only on prospects with the highest conversion probability.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80"
  },
  {
    id: 10,
    name: "Arjun Malhotra",
    location: "Jaipur, India",
    role: "VP Sales",
    company: "DataInsights Corp",
    content: "The automated follow-up sequences increased our response rate by 300%. Our sales reps now spend 80% more time on actual selling.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    id: 11,
    name: "Sarah Johnson",
    location: "New York, USA",
    role: "Sales Director",
    company: "GlobalTech Inc",
    content: "The AI analysis of our sales process identified bottlenecks we didn't know existed. Our conversion rate improved by 85% in 3 months.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 12,
    name: "Michael Chen",
    location: "San Francisco, USA",
    role: "CEO",
    company: "InnovateAI",
    content: "Reduced our sales cycle by 40% and increased deal size by 60%. The AI insights helped us understand our customers better.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 13,
    name: "Emily Rodriguez",
    location: "Chicago, USA",
    role: "Business Development",
    company: "CloudScale",
    content: "Our team productivity increased by 150% after implementing marketflow's AI tools. We closed more deals with the same team size.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 14,
    name: "David Kim",
    location: "Los Angeles, USA",
    role: "Sales Manager",
    company: "DataDriven Solutions",
    content: "The predictive analytics helped us focus on high-value prospects. Our win rate improved from 25% to 65% in just 2 months.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 15,
    name: "Lisa Anderson",
    location: "Miami, USA",
    role: "Head of Sales",
    company: "FinTech Global",
    content: "AI-powered lead scoring saved our team countless hours. We now focus only on prospects with the highest conversion probability.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 16,
    name: "James Wilson",
    location: "Seattle, USA",
    role: "VP Sales",
    company: "TechNova",
    content: "The automated follow-up sequences increased our response rate by 300%. Our sales reps now spend 80% more time on actual selling.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 17,
    name: "Kavita Thapa",
    location: "Kathmandu, Nepal",
    role: "Sales Director",
    company: "Himalayan Tech",
    content: "marketflow's AI prospecting cut our research time by 70% and tripled our qualified pipeline. We're closing deals we would've never found manually.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80"
  },
  {
    id: 18,
    name: "Bikash Rai",
    location: "Pokhara, Nepal",
    role: "CEO",
    company: "Mountain Solutions",
    content: "Their AI qualification bot handles initial conversations 24/7. We wake up to hot leads every morning, and our reps focus only on closing.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    id: 19,
    name: "Sita Lama",
    location: "Lalitpur, Nepal",
    role: "Marketing Head",
    company: "Valley Innovations",
    content: "Implemented AI-powered prospecting and saw a 200% increase in qualified leads within 45 days. The ROI was evident from day one.",
    avatar: "https://images.unsplash.com/photo-1573496358961-3c82838ef664?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  },
  {
    id: 20,
    name: "Ramesh Gurung",
    location: "Biratnagar, Nepal",
    role: "Business Development",
    company: "Terai Tech",
    content: "Custom AI sales system. Clear ROI tracking. Revenue up 240% in 6 months. Best investment we've made.",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  }
]

export default function TestimonialPopup() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        setIsVisible(true)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const testimonial = testimonials[currentTestimonial]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              damping: 30,
              duration: 0.3
            }}
            className="relative max-w-sm bg-white rounded-2xl shadow-2xl border-2 border-[#6A00FF] overflow-hidden"
          >
            {/* Enhanced background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6A00FF]/5 to-[#7B1FFF]/5 z-0"></div>
            
            {/* Enhanced dot pattern overlay */}
            <div 
              className="absolute inset-0 opacity-10 z-0"
              style={{
                backgroundImage: 'radial-gradient(circle, #6A00FF 1.5px, transparent 1.5px)',
                backgroundSize: '15px 15px'
              }}
            ></div>
            
            {/* Verified badge */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-1.5 rounded-full shadow-lg z-10">
              <CheckCircle className="w-5 h-5" fill="currentColor" />
            </div>
            
            <div className="relative z-10 p-5">
              <div className="flex items-start gap-4">
                {/* Enhanced avatar with gradient border */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  {/* Quote icon */}
                  <Quote className="w-6 h-6 text-[#6A00FF] mb-2" />
                  
                  {/* Enhanced testimonial text */}
                  <p className="text-gray-900 font-bold text-base leading-relaxed mb-3 italic">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Enhanced client info */}
                  <div className="mb-2">
                    <p className="font-extrabold text-gray-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-700 font-semibold">{testimonial.role}, {testimonial.company}</p>
                    <p className="text-xs text-[#6A00FF] font-medium mt-1">{testimonial.location}</p>
                  </div>
                  
                  {/* Enhanced progress indicator */}
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-[#6A00FF]"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced bottom bar */}
            <div className="relative z-10 h-1 bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}