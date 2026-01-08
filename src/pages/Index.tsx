import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { RoomsSection } from '@/components/home/RoomsSection';
import { AmenitiesSection } from '@/components/home/AmenitiesSection';
import { OffersSection } from '@/components/home/OffersSection';
import { CTASection } from '@/components/home/CTASection';
import { GallerySection } from '@/components/home/GallerySection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <RoomsSection />
      <AmenitiesSection />
      <OffersSection />
      <CTASection />
      <GallerySection />
    </Layout>
  );
};

export default Index;