#!/bin/bash
# Optimise les photos pour le web (nécessite sips sur macOS)
# Usage: cd ~/Projets/angelo-grossi/site && bash optimize-photos.sh

echo "📸 Optimisation des photos pour le web..."

# Hero portrait — resize to max 800px width, quality 85%
if [ -f "public/images/hero-portrait.jpg" ]; then
  sips -Z 800 --setProperty formatOptions 80 "public/images/hero-portrait.jpg"
  echo "✅ hero-portrait.jpg optimisé"
else
  echo "⚠️  hero-portrait.jpg non trouvé — as-tu copié A13A0247.JPG ?"
fi

# About portrait — resize to max 600px width, quality 85%
if [ -f "public/images/portrait-about.jpg" ]; then
  sips -Z 600 --setProperty formatOptions 80 "public/images/portrait-about.jpg"
  echo "✅ portrait-about.jpg optimisé"
else
  echo "⚠️  portrait-about.jpg non trouvé — as-tu copié A13A0219.JPG ?"
fi

echo ""
echo "📊 Tailles finales :"
ls -lh public/images/hero-portrait.jpg public/images/portrait-about.jpg 2>/dev/null
echo ""
echo "🚀 Prêt ! Lance maintenant :"
echo "   git add -A && git commit -m 'Ajout photos Angelo' && git push"
