import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldImports = `  VolumeX,
  Feather,
  Leaf,
} from "lucide-react";`;

const newImports = `  VolumeX,
  Feather,
  Leaf,
  Info,
  X,
  CameraOff,
  Clock,
  Shirt,
  Gift,
} from "lucide-react";`;

content = content.replace(oldImports, newImports);
fs.writeFileSync('src/App.tsx', content);
