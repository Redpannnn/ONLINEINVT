'use client';

import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Palette,
  ImageIcon,
  Sparkles,
  ArrowLeft,
  Sun,
  Moon,
  Check,
  X,
  Minus,
  GitCompareArrows,
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
    id: 'basic-greenery',
    name: 'Greenery Botanical',
    slug: 'basic-greenery-botanical',
    category: 'basic',
    description: 'Nuansa hijau botanical dengan sentuhan daun asri dan kesan natural. Cocok untuk pernikahan bertema alam yang segar dan menenangkan.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlceun2mlbcczqk/file',
    price: 'Rp 40.000',
    features: ['Responsif', 'Musik Latar', 'Galery Foto'],
    url: 'https://greenery-botanical.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-soft-bloom',
    name: 'Soft Bloom',
    slug: 'basic-soft-bloom',
    category: 'basic',
    description: 'Desain lembut dengan nuansa floral pastel yang romantis. Pilihan tepat untuk kamu yang menginginkan kesan gentle dan penuh kelembutan.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlcexx803qx6fh5/file',
    price: 'Rp 60.000',
    features: ['Responsif', 'Hitung Mundur', 'Galery Foto'],
    url: 'https://soft-bloom.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-warm-leaf',
    name: 'Warm Leaf',
    slug: 'basic-warm-leaf',
    category: 'basic',
    description: 'Sentuhan daun dengan tone earthy yang hangat dan nyaman dipandang. Menghadirkan kesan akrab dan hangat untuk hari bahagiamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlceynk0cptid6s/file',
    price: 'Rp 60.000',
    features: ['Responsif', 'Musik Latar', 'Hitung Mundur'],
    url: 'https://warm-leaf.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-midnight',
    name: 'Midnight',
    slug: 'basic-midnight',
    category: 'basic',
    description: 'Tema malam yang elegan dengan aksen gelap dramatis dan sentuhan cahaya lembut. Cocok untuk pernikahan dengan kesan modern dan misterius.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlck34pu6hqklln/file',
    price: 'Rp 50.000',
    features: ['Responsif', 'Musik Latar', 'Galery Foto'],
    url: 'https://midnight.memoraa-invitation.my.id/',
  },
  {
    id: 'eksklusif-serene',
    name: 'Serene Love',
    slug: 'eksklusif-serene-love',
    category: 'eksklusif',
    description: 'Nuansa burgundy dan gold dengan ornamen bunga mewah. Menghadirkan kesan premium dan anggun untuk hari istimewamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlcewzalhijhslk/file',
    price: 'Rp 100.000',
    features: ['Animasi Halus', 'Video Cover', 'Maps Interaktif', 'RSVP'],
    url: 'https://serene-love.memoraa-invitation.my.id/',
  },
  {
    id: 'eksklusif-javanese',
    name: 'Javanese',
    slug: 'eksklusif-javanese',
    category: 'eksklusif',
    description: 'Sentuhan watercolor floral dengan nuansa dusty rose. Desain penuh cinta yang menceritakan kisah pernikahanmu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlcevrv3dvxk5gy/file',
    price: 'Rp 85.000',
    features: ['Animasi Halus', 'Love Story', 'Galery Grid', 'Wishes'],
    url: 'https://javanese.memoraa-invitation.my.id/',
  },
  {
    id: 'eksklusif-rose-crimson',
    name: 'Rose Crimson',
    slug: 'eksklusif-rose-crimson',
    category: 'eksklusif',
    description: 'Nuansa merah crimson yang berani dengan sentuhan floral mewah. Menghadirkan kesan dramatis dan penuh cinta untuk hari istimewamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlck1s9s0lcucx6/file',
    price: 'Rp 100.000',
    features: ['Animasi Halus', 'Video Cover', 'Love Story', 'Wishes'],
    url: 'https://rose-crimson.memoraa-invitation.my.id/',
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
      <div className="flex flex-1 flex-col gap-2 p-2.5 sm:p-3">
        <h3 className="font-serif text-sm font-bold leading-tight text-foreground sm:text-base">
          {template.name}
        </h3>
        <div className="mt-auto">
          <div
            className="flex h-7 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-border text-[9px] font-medium text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary sm:h-8 sm:gap-2 sm:text-xs"
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
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}

/* ─── comparison data ─── */
type CellValue = boolean | string | { check: boolean; note: string };

interface ComparisonFeature {
  name: string;
  basic: CellValue;
  eksklusif: CellValue;
}

const comparisonFeatures: ComparisonFeature[] = [
  { name: 'Desain Responsif', basic: true, eksklusif: true },
  { name: 'Musik Latar', basic: true, eksklusif: true },
  { name: 'Galeri Foto', basic: 'Maks. 3', eksklusif: 'Unlimited' },
  { name: 'Hitung Mundur', basic: true, eksklusif: true },
  { name: 'Amplop Digital', basic: false, eksklusif: true },
  { name: 'RSVP Online', basic: false, eksklusif: true },
  { name: 'Peta Lokasi', basic: 'Link Statis', eksklusif: 'Interaktif' },
  { name: 'Animasi', basic: 'Dasar', eksklusif: 'Premium' },
  { name: 'Video Cover', basic: false, eksklusif: true },
  { name: 'Love Story', basic: false, eksklusif: true },
  { name: 'Ucapan & Wishes', basic: false, eksklusif: true },
  { name: 'Custom Domain', basic: { check: false, note: 'memoraa-invitation.my.id/namamempelai' }, eksklusif: { check: true, note: 'namamempelai.my.id' } },
];

function ComparisonCell({ value }: { value: CellValue }) {
  if (typeof value === 'boolean') {
    if (value === true) {
      return (
        <div className="flex items-center justify-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40">
          <X className="h-3.5 w-3.5 text-red-400 dark:text-red-500" strokeWidth={2.5} />
        </div>
      </div>
    );
  }
  if (typeof value === 'string') {
    return (
      <span className="text-center text-xs font-medium text-muted-foreground">
        {value}
      </span>
    );
  }
  // Object with check icon + note
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center justify-center">
        {value.check ? (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
          </div>
        ) : (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40">
            <X className="h-3.5 w-3.5 text-red-400 dark:text-red-500" strokeWidth={2.5} />
          </div>
        )}
      </div>
      <span className="max-w-[140px] text-center text-[10px] leading-tight text-muted-foreground">
        {value.note}
      </span>
    </div>
  );
}

function ComparisonTable({ expanded }: { expanded: boolean }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
      {/* Collapsible content */}
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-muted-foreground md:px-4 md:py-3">
                    Fitur
                  </th>
                  <th className="px-3 py-2.5 text-center text-[10px] font-semibold md:px-4 md:py-3">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-950/50">
                        <Palette className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-emerald-700 dark:text-emerald-300">Basic</span>
                      <span className="text-[9px] text-muted-foreground">Rp 40.000</span>
                    </div>
                  </th>
                  <th className="px-3 py-2.5 text-center text-[10px] font-semibold md:px-4 md:py-3">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-100 dark:bg-rose-950/50">
                        <Sparkles className="h-3 w-3 text-rose-600 dark:text-rose-400" />
                      </div>
                      <span className="text-rose-700 dark:text-rose-300">Eksklusif</span>
                      <span className="text-[9px] text-muted-foreground">Rp 100.000</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr
                    key={feature.name}
                    className={cn(
                      'border-b border-border/20 transition-colors hover:bg-muted/30',
                      idx === comparisonFeatures.length - 1 && 'border-b-0'
                    )}
                  >
                    <td className="px-3 py-2.5 text-[11px] font-medium md:px-4 md:py-3">
                      <span className="flex items-center gap-1.5">
                        <Minus className="h-1 w-3 text-muted-foreground/40" />
                        {feature.name}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 md:px-4 md:py-3">
                      <ComparisonCell value={feature.basic} />
                    </td>
                    <td className="px-3 py-2.5 md:px-4 md:py-3">
                      <ComparisonCell value={feature.eksklusif} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer CTA */}
          <div className="border-t border-border/40 p-3 md:p-4">
            <p className="text-center text-[10px] text-muted-foreground">
              Butuh fitur lebih lengkap? Pilih paket <span className="font-semibold text-rose-600 dark:text-rose-400">Eksklusif</span> untuk pengalaman terbaik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── main page ─── */
export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [comparisonExpanded, setComparisonExpanded] = useState(false);

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
  7 Template
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
              { label: 'Total Template', value: '7', icon: ImageIcon },
              { label: 'Template Basic', value: '4', icon: Palette },
              { label: 'Template Eksklusif', value: '3', icon: Sparkles },
              { label: 'Perbandingan Paket', value: 'VS', icon: GitCompareArrows },
            ].map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  'flex items-center gap-3 rounded-xl border border-border/40 bg-card p-4',
                  stat.label === 'Perbandingan Paket' && 'cursor-pointer transition-all hover:ring-2 hover:ring-primary/30 hover:ring-offset-2 hover:ring-offset-background'
                )}
                onClick={stat.label === 'Perbandingan Paket' ? () => setComparisonExpanded(!comparisonExpanded) : undefined}
              >
                <div className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                  stat.label === 'Perbandingan Paket' ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
                )}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className={cn('font-bold', stat.label === 'Perbandingan Paket' ? 'text-lg' : 'text-xl')}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Package Comparison - collapsible */}
          <ComparisonTable expanded={comparisonExpanded} />

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

            </TabsList>

            <TabsContent value="basic" className="mt-6">
              <TemplateGrid category="basic" />
            </TabsContent>
            <TabsContent value="eksklusif" className="mt-6">
              <TemplateGrid category="eksklusif" />
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
