import { ServicesHero } from "@/components/services-hero"
import { ServiceOfferings } from "@/components/service-offerings"
import { ProcessOverview } from "@/components/process-overview"

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceOfferings />
      <ProcessOverview />
    </>
  )
}
