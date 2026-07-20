'use client';

import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Palette,
  ImageIcon,
  Crown,
  Sparkles,
  Bell,
  ArrowLeft,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

/* ─── data ─── */
interface TemplateItem {
  id: string;
  name: string;
  slug: string;
  category: 'basic' | 'eksklusif' | 'luxury';
  description: string;
  image: string;
  price: string;
  features: string[];
  url: string;
}

const templates: TemplateItem[] = [
  {
    id: 'basic-1',
    name: 'Sederhana',
    slug: 'basic-sederhana',
    category: 'basic',
    description: 'Desain clean dan minimalis dengan sentuhan floral lembut. Cocok untuk kamu yang suka kesederhanaan namun tetap elegan.',
    image: '/templates/basic-sederhana.png',
    price: 'Gratis',
    features: ['Responsif', 'Musik Latar', 'Galery Foto'],
    url: 'https://memoraa-invitation.vercel.app/template/basic-sederhana',
  },
  {
    id: 'basic-2',
    name: 'Minimalis',
    slug: 'basic-minimalis',
    category: 'basic',
    description: 'Tampilan modern dengan aksen botanical dan tipografi bersih. Pilihan sempurna untuk gaya pernikahan yang contemporary.',
    image: '/templates/basic-minimalis.png',
    price: 'Gratis',
    features: ['Responsif', 'Hitung Mundur', 'Amplop Digital'],
    url: 'https://memoraa-invitation.vercel.app/template/basic-minimalis',
  },
  {
    id: 'eksklusif-1',
    name: 'Elegan',
    slug: 'eksklusif-elegan',
    category: 'eksklusif',
    description: 'Nuansa burgundy dan gold dengan ornamen bunga mewah. Menghadirkan kesan premium dan anggun untuk hari istimewamu.',
    image: '/templates/eksklusif-elegan.png',
    price: 'Rp 99.000',
    features: ['Animasi Halus', 'Video Cover', 'Maps Interaktif', 'RSVP'],
    url: 'https://memoraa-invitation.vercel.app/template/eksklusif-elegan',
  },
  {
    id: 'eksklusif-2',
    name: 'Romantis',
    slug: 'eksklusif-romantis',
    category: 'eksklusif',
    description: 'Sentuhan watercolor floral dengan nuansa dusty rose. Desain penuh cinta yang menceritakan kisah pernikahanmu.',
    image: '/templates/eksklusif-romantis.png',
    price: 'Rp 149.000',
    features: ['Animasi Halus', 'Love Story', 'Galery Grid', 'Wishes'],
    url: 'https://memoraa-invitation.vercel.app/template/eksklusif-romantis',
  },
  {
    id: 'luxury-1',
    name: 'Premium',
    slug: 'luxury-premium',
    category: 'luxury',
    description: 'Keanggunan tak tertandingi dengan sentuhan gold foil dan baroque. Diperuntukkan bagi pernikahan paling eksklusif.',
    image: '/templates/luxury-premium.png',
    price: 'Rp 299.000',
    features: ['3D Animation', 'Video Cinematic', 'Custom Domain', 'Fitur Lengkap'],
    url: 'https://memoraa-invitation.vercel.app/template/luxury-premium',
  },
  {
    id: 'luxury-2',
    name: 'Royal',
    slug: 'luxury-royal',
    category: 'luxury',
    description: 'Desain megah terinspirasi kerajaan dengan detail pearl dan crystal. Pengalaman undangan digital paling mewah.',
    image: '/templates/luxury-royal.png',
    price: 'Rp 399.000',
    features: ['3D Animation', 'AR Undangan', 'Custom Domain', 'Priority Support'],
    url: 'https://memoraa-invitation.vercel.app/template/luxury-royal',
  },
];

const categoryConfig = {
  basic: {
    label: 'Template Basic',
    icon: Palette,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
    desc: 'Template gratis yang simpel dan elegan',
  },
  eksklusif: {
    label: 'Template Eksklusif',
    icon: Sparkles,
    color: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
    desc: 'Desain eksklusif dengan fitur lengkap',
  },
  luxury: {
    label: 'Template Luxury',
    icon: Crown,
    color: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
    desc: 'Koleksi termewah untuk hari teristimewa',
  },
};

/* ─── components ─── */

function TemplateCard({ template }: { template: TemplateItem }) {
  const config = categoryConfig[template.category];

  return (
    <a
      href={template.url}
      target="_blank"
      rel="noopener noreferrer"
      className="template-card group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all sm:rounded-2xl hover:ring-2 hover:ring-primary/30 hover:ring-offset-2 hover:ring-offset-background"
    >
      {/* Image container */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-muted">
        <img
          src={template.image}
          alt={template.name}
          className="template-image h-full w-full object-cover transition-transform duration-500"
        />

        {/* Hover overlay */}
        <div className="template-overlay absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/90 text-primary-foreground sm:h-14 sm:w-14">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </div>
          <p className="mt-2 text-[10px] font-semibold text-white/90 sm:mt-3 sm:text-sm">
            Lihat Template
          </p>
        </div>

        {/* Category badge */}
        <div className="absolute left-1.5 top-1.5 z-10 sm:left-3 sm:top-3">
          <Badge
            variant="secondary"
            className={cn(
              'gap-0.5 border font-medium backdrop-blur-sm px-1 py-0 text-[8px] sm:gap-1 sm:px-2 sm:py-0.5 sm:text-xs',
              config.color
            )}
          >
            {template.category === 'luxury' && <Crown className="h-2 w-2 sm:h-3 sm:w-3" />}
            {template.category === 'eksklusif' && (
              <Sparkles className="h-2 w-2 sm:h-3 sm:w-3" />
            )}
            {template.category === 'basic' && <Palette className="h-2 w-2 sm:h-3 sm:w-3" />}
            {config.label.replace('Template ', '')}
          </Badge>
        </div>

        {/* Price tag */}
        <div className="absolute right-1.5 top-1.5 z-10 sm:right-3 sm:top-3">
          <Badge
            variant="secondary"
            className="border border-white/20 bg-black/40 px-1 py-0 text-[8px] font-semibold text-white backdrop-blur-sm sm:px-2 sm:py-0.5 sm:text-xs"
          >
            {template.price}
          </Badge>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-1.5 p-2.5 sm:gap-2 sm:p-4">
        <h3 className="font-serif text-sm font-bold leading-tight text-foreground sm:text-lg">
          {template.name}
        </h3>
        <p className="line-clamp-2 text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
          {template.description}
        </p>

        {/* Features */}
        <div className="mt-0.5 flex flex-wrap gap-1 sm:mt-1 sm:gap-1.5">
          {template.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-muted px-1.5 py-0.5 text-[8px] font-medium text-muted-foreground sm:px-2 sm:text-[10px]"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Action hint */}
        <div className="mt-auto pt-1.5 sm:pt-3">
          <div
            className="flex h-7 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-border text-[9px] font-medium text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary sm:h-9 sm:gap-2 sm:text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Buka Template
          </div>
        </div>
      </div>
    </a>
  );
}

function TemplateGrid({ category }: { category: 'basic' | 'eksklusif' | 'luxury' }) {
  const filtered = templates.filter((t) => t.category === category);
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <div className="flex flex-col gap-6">
      {/* Category header */}
      <div className="flex items-center gap-3">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', config.color)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold">{config.label}</h2>
          <p className="text-xs text-muted-foreground">{config.desc}</p>
        </div>
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-6">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}

/* ─── main page ─── */
export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center gap-4 px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/memoraa-logo.png"
              alt="Memoraa"
              className="h-8 w-8 rounded-lg object-contain"
            />
            <div className="hidden flex-col sm:flex">
              <span className="font-serif text-base font-bold leading-tight tracking-wide">
                Memoraa
              </span>
              <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
                Wedding Invitation
              </span>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-sm font-semibold text-foreground md:text-base">
              Template Undangan
            </h1>
            <Badge variant="outline" className="text-[10px] font-normal">
              6 Template
            </Badge>
          </div>

          {/* Dark mode toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle dark mode</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
              3
            </span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col">
        <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
          {/* Welcome banner */}
          <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-primary/5 via-champagne/30 to-rose-gold/5 p-6 md:p-8">
            <div className="relative z-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1.5">
                <h2 className="font-serif text-2xl font-bold md:text-3xl">
                  Selamat Datang di Memoraa ✨
                </h2>
                <p className="max-w-lg text-sm text-muted-foreground">
                  Pilih template undangan pernikahan digital terbaik untuk
                  hari spesialmu. Mulai dari yang sederhana hingga paling
                  mewah.
                </p>
              </div>
              <a
                href="https://memoraa-invitation.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="pt-2 md:pt-0"
              >
                <Button
                  variant="outline"
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali
                </Button>
              </a>
            </div>
            {/* Decorative elements */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-rose-gold/10 blur-3xl" />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: 'Total Template', value: '6', icon: ImageIcon },
              { label: 'Template Basic', value: '2', icon: Palette },
              { label: 'Template Eksklusif', value: '2', icon: Sparkles },
              { label: 'Template Luxury', value: '2', icon: Crown },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl border border-border/40 bg-card p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs for template categories */}
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full justify-start bg-muted/50 p-1">
              <TabsTrigger
                value="basic"
                className="gap-1.5 data-[state=active]:bg-card"
              >
                <Palette className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Template Basic</span>
                <span className="sm:hidden">Basic</span>
              </TabsTrigger>
              <TabsTrigger
                value="eksklusif"
                className="gap-1.5 data-[state=active]:bg-card"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Template Eksklusif</span>
                <span className="sm:hidden">Eksklusif</span>
              </TabsTrigger>
              <TabsTrigger
                value="luxury"
                className="gap-1.5 data-[state=active]:bg-card"
              >
                <Crown className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Template Luxury</span>
                <span className="sm:hidden">Luxury</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-6">
              <TemplateGrid category="basic" />
            </TabsContent>
            <TabsContent value="eksklusif" className="mt-6">
              <TemplateGrid category="eksklusif" />
            </TabsContent>
            <TabsContent value="luxury" className="mt-6">
              <TemplateGrid category="luxury" />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Sticky footer */}
      <footer className="mt-auto border-t border-border/60 bg-card/50 px-4 py-3 md:px-6">
        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; 2025 Memoraa. Semua hak dilindungi.</p>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-foreground transition-colors">
              Syarat & Ketentuan
            </span>
            <span className="cursor-pointer hover:text-foreground transition-colors">
              Kebijakan Privasi
            </span>
            <span className="cursor-pointer hover:text-foreground transition-colors">
              Hubungi Kami
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}