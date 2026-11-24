'use client';

import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ImageIcon,
  ArrowLeft,
  Sun,
  Moon,
  Landmark,
  Feather,
  Brush,
  Gem,
  Camera,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

/* ─── data ─── */
type TemplateCategory = 'adat' | 'minimalis' | 'ilustrasi' | 'luxury' | 'photo-series';

interface TemplateItem {
  id: string;
  name: string;
  slug: string;
  category: TemplateCategory;
  description: string;
  image: string;
  price: string;
  features: string[];
  url: string;
}

const templates: TemplateItem[] = [
  {
    id: 'basic-autumn-minang',
    name: 'Autumn Minang',
    slug: 'basic-autumn-minang',
    category: 'adat',
    description: 'Nuansa autumn yang hangat dengan sentuhan budaya Minangkabau. Menghadirkan kesan alami, hangat, dan penuh cinta untuk hari bahagiamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmwr06obkkr0w0wzi/file',
    price: 'Rp 40.000',
    features: ['Responsif', 'Musik Latar', 'Galery Foto'],
    url: 'https://autumn-minang.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-soft-bloom',
    name: 'Soft Bloom',
    slug: 'basic-soft-bloom',
    category: 'minimalis',
    description: 'Desain lembut dengan nuansa floral pastel yang romantis. Pilihan tepat untuk kamu yang menginginkan kesan gentle dan penuh kelembutan.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlcexx803qx6fh5/file',
    price: 'Rp 45.000',
    features: ['Responsif', 'Hitung Mundur', 'Galery Foto'],
    url: 'https://soft-bloom.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-cheerful-love',
    name: 'Cheerful Love',
    slug: 'basic-cheerful-love',
    category: 'ilustrasi',
    description: 'Desain ceria dengan warna pink coral dan doodle hati yang playful. Pilihan pas untuk pasangan yang ingin suasana fun, cheerful, dan penuh warna.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmwphskemwndwth4m/file',
    price: 'Rp 35.000',
    features: ['Responsif', 'Hitung Mundur', 'Galery Foto'],
    url: 'https://cheerful-love.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-sketch-art',
    name: 'Sketch Art',
    slug: 'basic-sketch-art',
    category: 'ilustrasi',
    description: '.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmwv2qwwzi0ehiwi0/file',
    price: 'Rp 35.000',
    features: ['Animasi Halus', 'Video Cover', 'Maps Interaktif', 'RSVP'],
    url: 'https://sketch-art.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-midnight',
    name: 'Midnight',
    slug: 'basic-midnight',
    category: 'minimalis',
    description: 'Tema malam yang elegan dengan aksen gelap dramatis dan sentuhan cahaya lembut. Cocok untuk pernikahan dengan kesan modern dan misterius.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlck34pu6hqklln/file',
    price: 'Rp 45.000',
    features: ['Responsif', 'Musik Latar', 'Galery Foto'],
    url: 'https://midnight.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-doodle-love',
    name: 'Doodle Love',
    slug: 'basic-doodle-love',
    category: 'ilustrasi',
    description: 'Desain playful dengan ilustrasi doodle lucu dan penuh warna. Cocok untuk pasangan yang menginginkan kesan ceria dan menggemaskan.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmw0mwnzf6z2blxi2/file',
    price: 'Rp 35.000',
    features: ['Responsif', 'Musik Latar', 'Galery Foto'],
    url: 'https://doodle-love.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-sweet-chibi',
    name: 'Sweet Chibi',
    slug: 'basic-sweet-chibi',
    category: 'ilustrasi',
    description: 'Karakter chibi menggemaskan dengan nuansa pastel yang manis. Pilihan pas untuk kamu yang ingin kesan adorable dan penuh kejutan.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmw3nx9z4tyfe19ch/file',
    price: 'Rp 40.000',
    features: ['Responsif', 'Musik Latar', 'Hitung Mundur'],
    url: 'https://bayu-icha.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-secret-garden',
    name: 'Secret Garden',
    slug: 'basic-secret-garden',
    category: 'ilustrasi',
    description: 'Taman rahasia yang penuh bunga dan dedaunan dengan suasana romantis. Menghadirkan kesan memesona untuk hari bahagiamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmw55zkaxxqqs9tl8/file',
    price: 'Rp 50.000',
    features: ['Responsif', 'Musik Latar', 'Galery Foto'],
    url: 'https://secret-garden.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-blue-vintage',
    name: 'Blue Vintage',
    slug: 'basic-blue-vintage',
    category: 'photo-series',
    description: 'Nuansa vintage dengan tone biru klasik yang elegan dan tenang. Menghadirkan kesan romantis yang timeless untuk hari bahagiamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmwabnjn2kv068yw9/file',
    price: 'Rp 40.000',
    features: ['Responsif', 'Musik Latar', 'Galery Foto'],
    url: 'https://blue-vintage.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-lovely-maroon',
    name: 'Lovely Maroon',
    slug: 'basic-lovely-maroon',
    category: 'ilustrasi',
    description: 'Nuansa maroon yang manis dengan aksen hati dan tipografi script yang romantis. Menghadirkan kesan hangat dan penuh cinta untuk hari bahagiamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmwphsltfjnr4akvl/file',
    price: 'Rp 35.000',
    features: ['Responsif', 'Musik Latar', 'Galery Foto'],
    url: 'https://lovely-maroon.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-warm-leaf',
    name: 'Warm Leaf',
    slug: 'basic-warm-leaf',
    category: 'minimalis',
    description: 'Sentuhan daun dengan tone earthy yang hangat dan nyaman dipandang. Menghadirkan kesan akrab dan hangat untuk hari bahagiamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlceynk0cptid6s/file',
    price: 'Rp 45.000',
    features: ['Responsif', 'Musik Latar', 'Hitung Mundur'],
    url: 'https://warm-leaf.memoraa-invitation.my.id/',
  },
  {
    id: 'basic-crimson-velvet',
    name: 'Crimson Velvet',
    slug: 'basic-crimson-velvet',
    category: 'luxury',
    description: 'Latar beludru crimson yang mewah dengan amplop bersegel lilin yang elegan. Menghadirkan kesan klasik, dramatis, dan penuh kemewahan untuk hari istimewamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmwplae9d21wsi9pv/file',
    price: 'Rp 35.000',
    features: ['Responsif', 'Musik Latar', 'Galery Foto'],
    url: 'https://crimson-velvet.memoraa-invitation.my.id/',
  },
  {
    id: 'eksklusif-serene',
    name: 'Serene Love',
    slug: 'eksklusif-serene-love',
    category: 'adat',
    description: 'Nuansa burgundy dan gold dengan ornamen bunga mewah. Menghadirkan kesan premium dan anggun untuk hari istimewamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlcewzalhijhslk/file',
    price: 'Rp 50.000',
    features: ['Animasi Halus', 'Video Cover', 'Maps Interaktif', 'RSVP'],
    url: 'https://serene-love.memoraa-invitation.my.id/',
  },
  {
    id: 'eksklusif-javanese',
    name: 'Javanese',
    slug: 'eksklusif-javanese',
    category: 'adat',
    description: 'Sentuhan watercolor floral dengan nuansa dusty rose. Desain penuh cinta yang menceritakan kisah pernikahanmu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlcevrv3dvxk5gy/file',
    price: 'Rp 45.000',
    features: ['Animasi Halus', 'Love Story', 'Galery Grid', 'Wishes'],
    url: 'https://javanese-traditional.memoraa-invitation.my.id/',
  },
  {
    id: 'eksklusif-rose-crimson',
    name: 'Rose Crimson',
    slug: 'eksklusif-rose-crimson',
    category: 'luxury',
    description: 'Nuansa merah crimson yang berani dengan sentuhan floral mewah. Menghadirkan kesan dramatis dan penuh cinta untuk hari istimewamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmvlck1s9s0lcucx6/file',
    price: 'Rp 50.000',
    features: ['Animasi Halus', 'Video Cover', 'Love Story', 'Wishes'],
    url: 'https://rose-crimson.memoraa-invitation.my.id/',
  },
  {
    id: 'eksklusif-royal-heritage',
    name: 'Royal Heritage',
    slug: 'eksklusif-royal-heritage',
    category: 'adat',
    description: 'Sentuhan klasik bergaya kerajaan dengan ornamen emas mewah. Menghadirkan kemegahan penuh prestise untuk hari istimewamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmw0l63mj2171rtuh/file',
    price: 'Rp 45.000',
    features: ['Animasi Halus', 'Video Cover', 'RSVP', 'Wishes'],
    url: 'https://royal-heritage.memoraa-invitation.my.id/',
  },
  {
    id: 'eksklusif-paleja',
    name: 'Paleja',
    slug: 'eksklusif-paleja',
    category: 'adat',
    description: 'Nuansa maroon dan emas dengan ornamen bunga klasik tradisional. Menghadirkan kesan anggun dan sakral untuk hari istimewamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmwm9909qta3ks3em/file',
    price: 'Rp 50.000',
    features: ['Animasi Halus', 'Video Cover', 'Maps Interaktif', 'RSVP'],
    url: 'https://hendra-eci.memoraa-invitation.my.id/',
  },
  {
    id: 'eksklusif-terracota-minang',
    name: 'Terracota Minang',
    slug: 'eksklusif-terracota-minang',
    category: 'adat',
    description: 'Nuansa terracota dengan sentuhan ornamen khas Minangkabau. Menghadirkan kesan elegan, hangat, dan berbudaya untuk hari istimewamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmwr06pvcg0jvj7b8/file',
    price: 'Rp 50.000',
    features: ['Animasi Halus', 'Video Cover', 'Maps Interaktif', 'RSVP'],
    url: 'https://terracota-minang.memoraa-invitation.my.id/',
  },
  {
    id: 'eksklusif-javanese-terrace',
    name: 'Javanese Terrace',
    slug: 'eksklusif-javanese-terrace',
    category: 'adat',
    description: 'Nuansa teras Jawa yang asri dengan ornamen khas budaya Jawa. Menghadirkan kesan tenang, anggun, dan penuh kehangatan untuk hari istimewamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmws9t56xii52md5f/file',
    price: 'Rp 50.000',
    features: ['Animasi Halus', 'Video Cover', 'Maps Interaktif', 'RSVP'],
    url: 'https://javanese-terrace.memoraa-invitation.my.id/',
  },
  {
    id: 'eksklusif-vintage-peacock',
    name: 'Vintage Peacock',
    slug: 'eksklusif-vintage-peacock',
    category: 'adat',
    description: 'Nuansa teras Jawa yang asri dengan ornamen khas budaya Jawa. Menghadirkan kesan tenang, anggun, dan penuh kehangatan untuk hari istimewamu.',
    image: 'https://imglinkv-3.vercel.app/api/images/cmwtvnsy0nt6uxuow/file',
    price: 'Rp 45.000',
    features: ['Animasi Halus', 'Video Cover', 'Maps Interaktif', 'RSVP'],
    url: 'https://vintage-peacock.memoraa-invitation.my.id/',
  },
];

const categoryConfig: Record<
  TemplateCategory,
  { label: string; shortLabel: string; icon: LucideIcon; color: string; desc: string }
> = {
  adat: {
    label: 'Adat',
    shortLabel: 'Adat',
    icon: Landmark,
    color: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
    desc: 'Nuansa tradisional khas budaya Nusantara',
  },
  minimalis: {
    label: 'Minimalis',
    shortLabel: 'Minimalis',
    icon: Feather,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
    desc: 'Desain sederhana, bersih, dan elegan',
  },
  ilustrasi: {
    label: 'Ilustrasi',
    shortLabel: 'Ilustrasi',
    icon: Brush,
    color: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/50 dark:text-fuchsia-300 dark:border-fuchsia-800',
    desc: 'Ilustrasi ceria yang playful dan menggemaskan',
  },
  luxury: {
    label: 'Luxury',
    shortLabel: 'Luxury',
    icon: Gem,
    color: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
    desc: 'Desain mewah dengan sentuhan premium',
  },
  'photo-series': {
    label: 'Photo Series',
    shortLabel: 'Photo',
    icon: Camera,
    color: 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800',
    desc: 'Seri foto berkesan dengan nuansa sinematik',
  },
};

const categoryOrder: TemplateCategory[] = [
  'adat',
  'minimalis',
  'ilustrasi',
  'luxury',
  'photo-series',
];

/* ─── components ─── */

function TemplateCard({ template }: { template: TemplateItem }) {
  const config = categoryConfig[template.category];
  const CategoryIcon = config.icon;

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
            <CategoryIcon className="h-2 w-2 sm:h-3 sm:w-3" />
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

function TemplateGrid({ category }: { category: TemplateCategory }) {
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
              {templates.length} Template
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
          <div className="grid grid-cols-3 gap-2 sm:gap-3 xl:grid-cols-6">
            {[
              { id: 'stat-total', label: 'Total Template', value: `${templates.length}`, icon: ImageIcon },
              { id: 'stat-adat', label: 'Adat', value: `${templates.filter((t) => t.category === 'adat').length}`, icon: Landmark },
              { id: 'stat-minimalis', label: 'Minimalis', value: `${templates.filter((t) => t.category === 'minimalis').length}`, icon: Feather },
              { id: 'stat-ilustrasi', label: 'Ilustrasi', value: `${templates.filter((t) => t.category === 'ilustrasi').length}`, icon: Brush },
              { id: 'stat-luxury', label: 'Luxury', value: `${templates.filter((t) => t.category === 'luxury').length}`, icon: Gem },
              { id: 'stat-photo-series', label: 'Photo Series', value: `${templates.filter((t) => t.category === 'photo-series').length}`, icon: Camera },
            ].map((stat) => (
              <div
                key={stat.id}
                className="flex items-center gap-2 rounded-xl border border-border/40 bg-card p-2.5 sm:gap-3 sm:p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-10 sm:w-10">
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold sm:text-xl">{stat.value}</p>
                  <p className="text-[10px] leading-tight text-muted-foreground sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs for template categories */}
          <Tabs defaultValue="adat" className="w-full">
            <TabsList className="flex w-full bg-muted/50 p-1">
              {categoryOrder.map((cat) => {
                const cfg = categoryConfig[cat];
                const TabIcon = cfg.icon;
                return (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="min-w-0 flex-1 gap-1 whitespace-nowrap px-0.5 text-[10px] data-[state=active]:bg-card sm:gap-1.5 sm:px-3 sm:text-sm"
                  >
                    <TabIcon className="hidden h-3.5 w-3.5 sm:inline" />
                    <span className="sm:hidden">{cfg.shortLabel}</span>
                    <span className="hidden sm:inline">{cfg.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categoryOrder.map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-6">
                <TemplateGrid category={cat} />
              </TabsContent>
            ))}
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
