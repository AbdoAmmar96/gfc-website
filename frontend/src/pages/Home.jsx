import { useEffect, useState } from 'react';
import Hero from '../components/sections/Hero';
import AboutPreview from '../components/sections/AboutPreview';
import Features from '../components/sections/Features';
import ProductsPreview from '../components/sections/ProductsPreview';
import Stats from '../components/sections/Stats';
import Suppliers from '../components/sections/Suppliers';
import FinalCTA from '../components/sections/FinalCTA';
import SEO from '../components/SEO';
import Loader from '../components/Loader';
import { fetchSettings, fetchServices, fetchPartners } from '../lib/api';

export default function Home() {
  const [data, setData] = useState({ loading: true });

  useEffect(() => {
    Promise.all([
      fetchSettings().catch(() => null),
      fetchServices().catch(() => []),
      fetchPartners().catch(() => []),
    ]).then(([settings, services, partners]) => {
      setData({ settings, services, partners, loading: false });
    });
  }, []);

  if (data.loading) return <Loader />;

  return (
    <>
      <SEO />
      <Hero settings={data.settings} />
      <AboutPreview settings={data.settings} />
      <Features />
      <ProductsPreview services={data.services} />
      <Stats />
      <Suppliers partners={data.partners} />
      <FinalCTA settings={data.settings} />
    </>
  );
}
