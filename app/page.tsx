'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Lock, RefreshCcw, Shield, Twitter, Instagram, Linkedin, CreditCard, KeyRound, Menu, X, UserPlus,Cpu, FileSignature, Vault,BadgeDollarSignIcon, HandshakeIcon, File, Package } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { motion, useAnimation, useScroll } from "framer-motion"
import Image from 'next/image'

export default function Component() {
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [email, setEmail] = useState("")
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [isNavOpen, setIsNavOpen] = useState(false)

  const featuresRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const waitlistRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useScroll({
    target: howItWorksRef,
    offset: ["start end", "end start"]
  })

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
    setIsNavOpen(false)
  }

  const handleContactUs = () => {
    setShowContactInfo(true)
    scrollToSection(contactRef)
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        setSubmitStatus({ success: true, message: "Thank you for joining our waitlist! We've sent a confirmation email to you shortly." })
        setEmail("")
      } else {
        throw new Error('Failed to join waitlist')
      }
    } catch {
      setSubmitStatus({ success: false, message: "We're sorry, but something went wrong. Please try again later." })
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    },
  }

  // How It Works section
  const howItWorksControls = useAnimation()
  const [, setActiveStep] = useState(0)

  const steps = [
    { number: 1, title: "Initiate Purchase", icon: UserPlus, description: "Choose Vaulcrypt as your payment option at checkout to secure your transaction in virtual vaults." },
    { number: 2, title: "Funds Secured in Vaults", icon: Vault, description: "Your payment is safely held by Vaulcrypt until you receive and confirm your order." },
    { number: 3, title: "Receive & Review Order", icon: FileSignature, description: "Product inspection and verification during the delivery and then finalizing payment" },
    { number: 4, title: "Release Funds to Seller", icon: BadgeDollarSignIcon, description: "When you're happy with the purchase, funds are instantly released to the seller, completing the transaction securely." },
  ]

  useEffect(() => {
    const animateStep = async (step: number) => {
      await howItWorksControls.start(i => ({
        scale: i === step ? 1.1 : 1,
        opacity: i === step ? 1 : 0.5,
        transition: { duration: 0.5 }
      }))
    }

    const animateTimeline = async () => {
      for (let i = 0; i < steps.length; i++) {
        setActiveStep(i)
        await animateStep(i)
        await new Promise(resolve => setTimeout(resolve, 2000)) // Wait for 2 seconds on each step
      }
    }

    const startAnimation = () => {
      animateTimeline().then(() => {
        // After completing one cycle, start over
        setTimeout(startAnimation, 1000)
      })
    }

    startAnimation()

    return () => {
      howItWorksControls.stop()
    }
  }, [howItWorksControls, steps.length])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      {/* Header */}
      <motion.header 
        className="px-6 lg:px-10 h-20 flex items-center bg-white shadow-sm sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <a className="flex items-center" href="#">
            <div className="relative w-10 h-10 mr-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/og-Nvo0lzEOz5lGh6RoNdXtiwxXAqgq26.png"
                alt="Vaulcrypt Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <span className="text-2xl font-bold leading-none flex items-center">
              <span className="text-blue-900">Vaul</span>
              <span className="text-blue-600">crypt</span>
            </span>
          </a>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <motion.button 
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" 
              onClick={() => scrollToSection(featuresRef)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Features
            </motion.button>
            <motion.button 
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" 
              onClick={() => scrollToSection(howItWorksRef)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              How It Works
            </motion.button>
            <motion.button 
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" 
              onClick={() => scrollToSection(aboutRef)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.button>
            <motion.button 
              className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors" 
              onClick={() => scrollToSection(waitlistRef)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Waitlist
            </motion.button>
          </nav>
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsNavOpen(!isNavOpen)} 
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isNavOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isNavOpen && (
          <motion.nav
            className="absolute top-20 left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors" 
              onClick={() => scrollToSection(featuresRef)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Features
            </motion.button>
            <motion.button 
              className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors" 
              onClick={() => scrollToSection(howItWorksRef)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              How It Works
            </motion.button>
            <motion.button 
              className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors" 
              onClick={() => scrollToSection(aboutRef)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.button>
            <motion.button 
              className="text-lg font-medium bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors" 
              onClick={() => scrollToSection(waitlistRef)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Waitlist
            </motion.button>
          </motion.nav>
        )}
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 relative overflow-hidden"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {/* Animated background shapes */}
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </motion.div>
          
          <div className="relative z-10 container px-4 md:px-6 mx-auto">
            <motion.div 
              className="flex flex-col items-center space-y-8 text-center"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-blue-900 drop-shadow-md"
              >
                The Future of Secure Transactions
              </motion.h1>
              <motion.p 
                className="mx-auto max-w-[700px] text-blue-800 text-lg md:text-xl font-medium"
              >
                Vaulcrypt is developing a revolutionary platform for secure transactions. Our innovative system aims to protect your funds with cutting-edge security and seamless integration with various payment systems.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => scrollToSection(waitlistRef)} className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full shadow-md transition-all hover:shadow-lg transform hover:-translate-y-1">
                  Join Waitlist
                </Button>
                <Button onClick={() => scrollToSection(featuresRef)} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-100 text-lg px-8 py-3 rounded-full transition-all hover:shadow-md">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          ref={featuresRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-50"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <div className="container px-4 md:px-6  mx-auto">
            <motion.h2 
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-center mb-12 text-blue-900"
              variants={itemVariants}
            >
              Our Features
            </motion.h2>
            <motion.div 
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              variants={{
                visible: {
                  
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                { icon: Lock, title: "Robust security", content: "Advanced technology safeguarding your funds with Virtual Vault possessions " },
                { icon: Cpu, title: "Blockchain Technology", content: "Layer 2 solutions and smart contracts for credibility and encrypted transactions data." },
                { icon: Shield, title: "AI-Driven Fraud Detection", content: "Real-time identification of suspicious activities to prevent fraud and enhance security." },
                { icon: KeyRound, title: "Multi-Factor Authentication", content: "Enhanced account security with biometric and seamless login option, also device-based authentication options." },
                { icon: HandshakeIcon, title: "Dispute Management", content: "Reliable dispute resolution through automated processes, enhancing trust and minimizing transaction delays." },
                { icon: CreditCard, title: "Multiple Payment Options", content: "Enabling UPI, credit cards, debit cards, net banking,and other popular payment methods." },
                { icon: RefreshCcw, title: "Real-time Updates", content: "Instant notifications and status updates on your transactions." },
                { icon: File, title: "Regulatory Compliance", content: "Adherence to relevant government financial regulations and compliance standards." },
                { icon: Package, title: "Delivery verification", content: "Freedom to inspect and verify product during the delivery." },
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                >
                  <Card className="bg-white border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader className="flex flex-col items-center">
                      <div className="p-3 rounded-full bg-blue-100 mb-4">
                        <feature.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-blue-800 text-xl font-semibold text-center">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-700 text-base text-center">{feature.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-900 to-blue-800 text-white overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-center mb-16">
              How it Works
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 right-0 h-0.5 top-10 bg-blue-600">
                <div className="absolute left-0 w-4 h-4 -ml-2 -mt-[7px] bg-blue-600 rounded-full"></div>
                <div className="absolute right-0 w-4 h-4 -mr-2 -mt-[7px] bg-blue-600 rounded-full"></div>
              </div>
              {/* Steps */}
              <div className="relative flex justify-between items-start">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    custom={index}
                    animate={howItWorksControls}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold mb-4 relative z-10 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      <step.icon size={32} />
                    </motion.div>
                    <div className="text-center max-w-[250px] mt-4">
                      <p className="font-semibold text-lg mb-2">{step.title}</p>
                      <p className="text-sm text-blue-200">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          ref={aboutRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <div className="container px-4 md:px-6">
            <motion.h2 
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-center mb-12 text-blue-900"
              variants={itemVariants}
            >
              About Vaulcrypt
            </motion.h2>
            <motion.p 
              className="mx-auto max-w-[700px] text-blue-700 text-lg md:text-xl text-center mb-12"
              variants={itemVariants}
            >
              Vaulcrypt is an innovative startup founded in 2024, aiming to revolutionize secure payment solutions. Our team consists of experts and professionals dedicated to creating a safer digital transaction environment for businesses and consumers.
            </motion.p>
            <motion.div  
              className="grid gap-8 sm:grid-cols-2"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {/* Our Vision */}
              <motion.div 
                variants={itemVariants}
              >
                <Card className="bg-blue-50 border-blue-200 h-full">
                  <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-blue-800 text-2xl">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-700 text-lg text-center">To become a leading secure transaction platform, providing peace of mind to businesses and consumers alike while supporting the digital payment revolution.</p>
                  </CardContent>
                </Card>
              </motion.div>
              {/* Our Values */}
              <motion.div 
                variants={itemVariants}
              >
                <Card className="bg-blue-50 border-blue-200 h-full">
                  <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-blue-800 text-2xl">Our Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 text-blue-700 text-lg space-y-2">
                      <li>Security First</li>
                      <li>Innovation in Fintech</li>
                      <li>Customer Trust</li>
                      <li>Regulatory Compliance</li>
                      <li>Transparency</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Waitlist Section */}
        <motion.section
          id="waitlist"
          ref={waitlistRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-blue-100"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center space-y-6 text-center"
              variants={itemVariants}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-900">
                  Be Part of the Secure Transaction Revolution
                </h2>
                <p className="mx-auto max-w-[700px] text-blue-700 text-lg md:text-xl">
                  Vaulcrypt is preparing to transform B2C transactions. Join our waitlist to be among the first to experience our innovative system.
                </p>
              </div>
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-4 w-full max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition-shadow">
                  Join Waitlist
                </Button>
              </form>
              {submitStatus && (
                <motion.p 
                  className={`mt-4 text-lg ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {submitStatus.message}
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          ref={contactRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center space-y-6 text-center"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-900">
                Contact Us
              </h2>
              <p className="mx-auto max-w-[700px] text-blue-700 text-lg md:text-xl">
                Have questions or want to learn more about Vaulcrypt? We would love to hear from you.
              </p>
              <Button onClick={handleContactUs} className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full flex items-center shadow-md transition-shadow">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {showContactInfo && (
                <motion.div 
                  className="mt-8 p-6 bg-blue-50 rounded-lg shadow-md w-full max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-blue-800">Contact Information</h3>
                  <p className="mb-4 text-lg">
                    <strong>Email:</strong>{" "}
                    <a 
                      href="mailto:vaulcrypt@gmail.com" 
                      className="text-blue-600 hover:text-blue-800 underline"
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.href = "mailto:vaulcrypt@gmail.com"
                      }}
                    >
                      info@vaulcrypt.com
                    </a>
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a href="https://twitter.com/vaulcrypt" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Twitter className="h-8 w-8" />
                    </a>
                    <a href="https://www.instagram.com/vaulcrypt" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Instagram className="h-8 w-8" />
                    </a>
                    <a href="https://www.linkedin.com/company/vaulcrypt" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Linkedin className="h-8 w-8" />
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-sm text-blue-600">© 2024 Vaulcrypt. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <motion.a 
            className="text-sm hover:underline underline-offset-4 text-blue-600 hover:text-blue-800 transition-colors" 
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Terms of Service
          </motion.a>
          <motion.a 
            className="text-sm hover:underline underline-offset-4 text-blue-600 hover:text-blue-800 transition-colors" 
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Privacy Policy
          </motion.a>
        </nav>
      </motion.footer>
    </div>
  )
}