import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const rsvpEnd = `            </div>
          </motion.div>
        </motion.div>`;

const newRsvpEnd = `              {/* Gentle Reminders Info Button */}
              <motion.button 
                 onClick={() => setIsInfoOpen(true)}
                 className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-amber-950/10 border border-amber-900/30 flex items-center justify-center text-amber-950 hover:bg-amber-900 hover:text-amber-50 transition-colors shadow-sm"
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 title="Important Details"
              >
                  <Info size={16} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>`;

content = content.replace(rsvpEnd, newRsvpEnd);
fs.writeFileSync('src/App.tsx', content);
