#!/bin/bash
# Download fonts for Angelo Grossi site
# Run this script from the site/ directory on your local machine

mkdir -p public/fonts

echo "Downloading Sora 600..."
curl -sL "https://gwfh.mranftl.com/api/fonts/sora?subsets=latin" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for v in data.get('variants', []):
    if v['id'] in ['600', '700']:
        print(v.get('woff2', ''), v['id'])
" | while read url weight; do
  curl -sL "$url" -o "public/fonts/sora-${weight}.woff2"
  echo "  -> sora-${weight}.woff2 ($(wc -c < public/fonts/sora-${weight}.woff2) bytes)"
done

echo "Downloading DM Sans 400, 500, 600..."
curl -sL "https://gwfh.mranftl.com/api/fonts/dm-sans?subsets=latin" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for v in data.get('variants', []):
    if v['id'] == 'regular':
        print(v.get('woff2', ''), '400')
    elif v['id'] in ['500', '600']:
        print(v.get('woff2', ''), v['id'])
" | while read url weight; do
  curl -sL "$url" -o "public/fonts/dm-sans-${weight}.woff2"
  echo "  -> dm-sans-${weight}.woff2 ($(wc -c < public/fonts/dm-sans-${weight}.woff2) bytes)"
done

echo ""
echo "Verification:"
ls -la public/fonts/*.woff2 2>/dev/null || echo "No fonts found!"
echo ""
echo "All font files should be > 10 KB. If any is smaller, the download failed."
