const fs = require('fs');
const path = require('path');

const TARGET_EXTENSIONS = new Set([
  // add all extensions to target (js, ts, etc)
]);

const SKIP_DIRS = ['node_modules'] // add more dirs to skip or remove this one to target all

const EMOJI_REGEX = /[\p{Extended_Pictographic}]/gu;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.includes(entry.name)) {
        continue;
      }
      walk(path.join(dir, entry.name));
      continue;
    }

    const filePath = path.join(dir, entry.name);
    const ext = path.extname(filePath);

    if (!TARGET_EXTENSIONS.has(ext)) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    const cleaned = content.replace(EMOJI_REGEX, '');

    if (cleaned !== content) {
      fs.writeFileSync(filePath, cleaned, 'utf8');
    }
  }
}

walk(process.cwd());
