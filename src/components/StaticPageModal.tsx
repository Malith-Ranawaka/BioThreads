import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Truck, HelpCircle, FileText, Mail, Info } from 'lucide-react';

export type StaticPageType = 'shipping' | 'contact' | 'faq' | 'privacy' | 'material-passport' | 'eco-guide';

interface StaticPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: StaticPageType | null;
}

const PAGE_CONTENT: Record<StaticPageType, { title: string; icon: any; content: React.ReactNode }> = {
  shipping: {
    title: 'Shipping & Returns',
    icon: Truck,
    content: (
      <div className="space-y-6 text-stone-600">
        <section>
          <h4 className="font-black text-stone-900 uppercase tracking-widest text-xs mb-2">Carbon-Neutral Shipping</h4>
          <p className="text-sm leading-relaxed">All our deliveries are 100% carbon-neutral. We partner with eco-conscious carriers and offset every gram of CO2 through verified reforestation projects.</p>
        </section>
        <section>
          <h4 className="font-black text-stone-900 uppercase tracking-widest text-xs mb-2">The BioLoop Return Policy</h4>
          <p className="text-sm leading-relaxed">We don't just accept returns; we encourage them. If your item is worn out, return it via our BioLoop program to receive store credit. For standard returns of new items, you have 30 days from delivery.</p>
        </section>
        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
          <p className="text-xs font-bold text-emerald-800">Standard Shipping: 3-5 Business Days (Free on orders over $150)</p>
        </div>
      </div>
    )
  },
  contact: {
    title: 'Contact Us',
    icon: Mail,
    content: (
      <div className="space-y-6 text-stone-600">
        <p className="text-sm leading-relaxed">Have questions about our circular process or a specific order? Our team is here to help you transition to a more sustainable wardrobe.</p>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100">
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Email Support</p>
            <p className="text-lg font-black text-stone-900">hello@biothreads.eco</p>
          </div>
          <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100">
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Headquarters</p>
            <p className="text-sm font-bold text-stone-900">123 Murdoch western australia</p>
          </div>
        </div>
      </div>
    )
  },
  faq: {
    title: 'Frequently Asked Questions',
    icon: HelpCircle,
    content: (
      <div className="space-y-6">
        {[
          { q: 'What is the BioLoop program?', a: 'BioLoop is our circularity initiative. When your BioThreads items reach the end of their life, you return them to us. We then compost or upcycle them, and you get credit for your next purchase.' },
          { q: 'Are your clothes really compostable?', a: 'Yes! Items marked with a 100% Bio-Score are made from pure organic fibers and non-toxic dyes, meaning they can safely return to the soil in approximately 180 days.' },
          { q: 'How do I track my impact?', a: 'Every purchase is logged in your Impact Dashboard. You can see total water saved, CO2 avoided, and your current BioLoop credit balance.' }
        ].map((item, i) => (
          <div key={i} className="space-y-2">
            <h4 className="font-black text-stone-900 text-sm">{item.q}</h4>
            <p className="text-sm text-stone-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    )
  },
  privacy: {
    title: 'Privacy Policy',
    icon: ShieldCheck,
    content: (
      <div className="space-y-6 text-stone-600">
        <p className="text-sm leading-relaxed">Your privacy is as important to us as the planet. We only collect data necessary to provide you with a personalized, sustainable shopping experience.</p>
        <section>
          <h4 className="font-black text-stone-900 uppercase tracking-widest text-xs mb-2">Data Transparency</h4>
          <p className="text-sm leading-relaxed">We never sell your data. We use encrypted protocols to ensure your transaction and impact data remain secure and private.</p>
        </section>
      </div>
    )
  },
  'material-passport': {
    title: 'Material Passport Guide',
    icon: Info,
    content: (
      <div className="space-y-6 text-stone-600">
        <p className="text-sm leading-relaxed">Every BioThreads garment comes with a digital Material Passport. This is our commitment to radical transparency.</p>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-stone-50 rounded-2xl">
            <div className="font-black text-emerald-600">01</div>
            <div>
              <p className="font-bold text-stone-900 text-sm">Origin Tracking</p>
              <p className="text-xs">We trace every fiber back to the farm it was grown on.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-stone-50 rounded-2xl">
            <div className="font-black text-emerald-600">02</div>
            <div>
              <p className="font-bold text-stone-900 text-sm">Chemical Transparency</p>
              <p className="text-xs">Full disclosure of all dyes and finishes used in production.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-stone-50 rounded-2xl">
            <div className="font-black text-emerald-600">03</div>
            <div>
              <p className="font-bold text-stone-900 text-sm">End-of-Life Instructions</p>
              <p className="text-xs">Specific guidance on how to compost or recycle your item.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'eco-guide': {
    title: 'Eco-Saving Guide',
    icon: FileText,
    content: (
      <div className="space-y-6 text-stone-600">
        <p className="text-sm leading-relaxed">Learn how your choices at BioThreads contribute to a healthier planet.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
            <h5 className="font-black text-blue-900 text-xs uppercase tracking-widest mb-2">Water Conservation</h5>
            <p className="text-xs text-blue-700">Organic cotton uses 91% less water than conventional cotton.</p>
          </div>
          <div className="p-6 bg-stone-100 rounded-3xl border border-stone-200">
            <h5 className="font-black text-stone-900 text-xs uppercase tracking-widest mb-2">Soil Health</h5>
            <p className="text-xs text-stone-600">Regenerative farming restores biodiversity and sequesters carbon.</p>
          </div>
        </div>
      </div>
    )
  }
};

export default function StaticPageModal({ isOpen, onClose, type }: StaticPageModalProps) {
  if (!type) return null;
  const content = PAGE_CONTENT[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
          >
            <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
              <div className="flex items-center gap-4">
                <div className="bg-stone-900 p-3 rounded-2xl text-white">
                  <content.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-stone-900 tracking-tight">{content.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-stone-400" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-8 md:p-12">
              {content.content}
            </div>
            <div className="p-8 border-t border-stone-100 bg-stone-50/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-stone-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
