import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Update imports
const oldImports = `  Info,
  X,
  CameraOff,
  Clock,
  Shirt,
  Gift,
} from "lucide-react";`;
const newImports = `  Info,
  X,
  CreditCard,
  Footprints,
  Wind,
  Waves,
} from "lucide-react";`;
content = content.replace(oldImports, newImports);

// Update button position
const oldBtn = `className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-amber-950/10 border border-amber-900/30 flex items-center justify-center text-amber-950 hover:bg-amber-900 hover:text-amber-50 transition-colors shadow-sm"`;
const newBtn = `className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-amber-950/10 border border-amber-900/30 flex items-center justify-center text-amber-950 hover:bg-amber-900 hover:text-amber-50 transition-colors shadow-sm"`;
content = content.replace(oldBtn, newBtn);

// Update modal content
const oldModal = `<div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-50 rounded-lg shrink-0 text-amber-700">
                  <CameraOff size={20} />
                </div>
                <div>
                  <h4 className="font-editorial uppercase tracking-wider text-sm font-bold text-amber-950 mb-1">Unplugged Ceremony</h4>
                  <p className="text-sm text-amber-900/80 leading-relaxed font-light">We invite you to be fully present with us. Please kindly turn off phones and cameras during the vows.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-50 rounded-lg shrink-0 text-amber-700">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-editorial uppercase tracking-wider text-sm font-bold text-amber-950 mb-1">Punctuality</h4>
                  <p className="text-sm text-amber-900/80 leading-relaxed font-light">To ensure a smooth flow of events, we request our guests to arrive 15 minutes prior to the scheduled times.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-50 rounded-lg shrink-0 text-amber-700">
                  <Shirt size={20} />
                </div>
                <div>
                  <h4 className="font-editorial uppercase tracking-wider text-sm font-bold text-amber-950 mb-1">Dress Code</h4>
                  <p className="text-sm text-amber-900/80 leading-relaxed font-light">Please refer to the attire guide for each event. We'd love to see you in the requested color palettes!</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-50 rounded-lg shrink-0 text-amber-700">
                  <Gift size={20} />
                </div>
                <div>
                  <h4 className="font-editorial uppercase tracking-wider text-sm font-bold text-amber-950 mb-1">No Boxed Gifts</h4>
                  <p className="text-sm text-amber-900/80 leading-relaxed font-light">Your presence is the greatest gift. If you wish to bless us, please no boxed gifts.</p>
                </div>
              </div>
            </div>`;

const newModal = `<div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-50 rounded-lg shrink-0 text-amber-700">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h4 className="font-editorial uppercase tracking-wider text-sm font-bold text-amber-950 mb-1">Valid ID</h4>
                  <p className="text-sm text-amber-900/80 leading-relaxed font-light">Please carry a valid ID (Aadhaar preferred) for a smooth resort check-in.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-50 rounded-lg shrink-0 text-amber-700">
                  <Footprints size={20} />
                </div>
                <div>
                  <h4 className="font-editorial uppercase tracking-wider text-sm font-bold text-amber-950 mb-1">Footwear</h4>
                  <p className="text-sm text-amber-900/80 leading-relaxed font-light">As our celebrations extend to the lawns, we suggest block heels or flats over stilettos.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-50 rounded-lg shrink-0 text-amber-700">
                  <Wind size={20} />
                </div>
                <div>
                  <h4 className="font-editorial uppercase tracking-wider text-sm font-bold text-amber-950 mb-1">Breezy Evenings</h4>
                  <p className="text-sm text-amber-900/80 leading-relaxed font-light">November evenings by the sea can be delightfully breezy; we recommend bringing a light layer.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-50 rounded-lg shrink-0 text-amber-700">
                  <Waves size={20} />
                </div>
                <div>
                  <h4 className="font-editorial uppercase tracking-wider text-sm font-bold text-amber-950 mb-1">Pool Access</h4>
                  <p className="text-sm text-amber-900/80 leading-relaxed font-light">Don't forget your swimwear if you plan to enjoy the resort's pool!</p>
                </div>
              </div>
            </div>`;

content = content.replace(oldModal, newModal);
fs.writeFileSync('src/App.tsx', content);
