import { existsSync } from 'node:fs';
import imagemin from 'imagemin';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';

const DIST_DIR = 'dist';

if (!existsSync(DIST_DIR)) {
  console.log('[optimize-images] dist folder not found, skipping.');
  process.exit(0);
}

const optimizedFiles = await imagemin(
  ['dist/**/*.{png,jpg,jpeg,gif,svg}'],
  {
    destination: DIST_DIR,
    plugins: [
      imageminGifsicle({ optimizationLevel: 3 }),
      imageminJpegtran({ progressive: true }),
      imageminOptipng({ optimizationLevel: 5 }),
      imageminSvgo({
        plugins: [
          { name: 'preset-default' },
          { name: 'removeViewBox', active: false }
        ]
      })
    ]
  }
);

console.log(`[optimize-images] optimized ${optimizedFiles.length} files in dist.`);
