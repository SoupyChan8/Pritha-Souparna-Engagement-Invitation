import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const appEnd = `        <audio ref={hookAudioRef} src="/assets/hook.mp3" loop />
      </div>
    </>
  );
}`;

const modalJSX = `        <audio ref={hookAudioRef} src="/assets/hook.mp3" loop />
      </div>

      {/* Gentle Reminders Modal */}
      {isInfoOpen && (
        <motion.div 
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="w-full max-w-md bg-[#fdfdfa] rounded-xl p-6 md:p-8 shadow-2xl border border-amber-900/20 relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <button 
              onClick={() => setIsInfoOpen(false)}
              className="absolute top-4 right-4 p-2 text-amber-900/50 hover:text-amber-950 transition-colors"
            >
              <X size={20} />
            </button>
            
            <h3 className="font-serif italic text-2xl text-amber-950 mb-6 text-center">Gentle Reminders</h3>
            
            <div className="space-y-6">
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
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </>
  );
}`;

content = content.replace(appEnd, modalJSX);
fs.writeFileSync('src/App.tsx', content);
