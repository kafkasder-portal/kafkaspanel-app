#!/bin/bash

# Otomatik Git Push Script
echo "🔄 Otomatik Git Push başlatılıyor..."

# Değişiklikleri kontrol et
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Değişiklikler bulundu, commit ediliyor..."
    
    # Tüm değişiklikleri ekle
    git add .
    
    # Commit mesajı oluştur (tarih ve saat ile)
    commit_message="Auto-commit: $(date '+%Y-%m-%d %H:%M:%S')"
    
    # Commit yap
    git commit -m "$commit_message"
    
    # Push yap
    echo "🚀 GitHub'a gönderiliyor..."
    git push origin main
    
    echo "✅ Otomatik push tamamlandı!"
else
    echo "ℹ️  Değişiklik bulunamadı."
fi
