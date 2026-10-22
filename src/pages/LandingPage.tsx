import { Benefits } from "../features/landing/Benefits";
import { CtaSection } from "../features/landing/CtaSection";
import { Features } from "../features/landing/Features";
import { Hero } from "../features/landing/Hero";
import { Navbar } from "../features/landing/Navbar";
import {Footer} from '../features/landing/Footer'
import { About } from "../features/landing/About";

export function LandingPage() {
   return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
     <Features />
     <Benefits />
     <About />
     <CtaSection />
     <Footer />
    </div>
  )
}