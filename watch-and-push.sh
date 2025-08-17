#!/bin/bash

# Dosya İzleme ve Otomatik Push Script
echo "👀 Dosya değişiklikleri izleniyor... (Ctrl+C ile durdurun)"

# Belirli dosya türlerini izle (node_modules ve .git hariç)
fswatch -o . --exclude="node_modules" --exclude=".git" --exclude=".cursor" | while read f; do
    echo "📝 Değişiklik algılandı: $f"
    
    # 2 saniye bekle (birden fazla değişiklik için)
    sleep 2
    
    # Değişiklikleri kontrol et
    if [[ -n $(git status --porcelain) ]]; then
        echo "🔄 Otomatik commit ve push yapılıyor..."
        
        git add .
        commit_message="Auto-sync: $(date '+%Y-%m-%d %H:%M:%S')"
        git commit -m "$commit_message"
        git push origin main
        
        echo "✅ Otomatik push tamamlandı!"
    fi
done
