import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const importMotion = `  useSpring,
} from "motion/react";`;
const newImportMotion = `  useSpring,
  AnimatePresence,
} from "motion/react";`;
content = content.replace(importMotion, newImportMotion);

const oldModal = `{/* Gentle Reminders Modal */}
      {isInfoOpen && (
        <motion.div `;

const newModal = `{/* Gentle Reminders Modal */}
      <AnimatePresence>
      {isInfoOpen && (
        <motion.div `;

content = content.replace(oldModal, newModal);

const oldModalEnd = `          </motion.div>
        </motion.div>
      )}
    </>
  );
}`;

const newModalEnd = `          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}`;

content = content.replace(oldModalEnd, newModalEnd);

fs.writeFileSync('src/App.tsx', content);
