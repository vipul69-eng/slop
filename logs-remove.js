const fs = require('fs');
const path = require('path');

const REGEX = /console\.(log|debug|info|warn)\(.*?\);?\n?/g; // you can rewrite this for python or other languages
const SKIP_DIRS = ['node_modules', '.git', 'dist'] // dirs to skip
const EXTENSION_REGEX = /\.(js|ts|tsx|jsx)$/

function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.isDirectory()) {
      if (SKIP_DIRS.includes(f.name)) continue;
      walk(path.join(dir, f.name));
      continue;
    }

    const p = path.join(dir, f.name);
    if (!EXTENSION_REGEX.test(p)) continue;

    const data = fs.readFileSync(p, 'utf8');
    const cleaned = data.replace(REGEX, '');
    if (cleaned !== data) fs.writeFileSync(p, cleaned);
  }
}

walk(process.cwd());
