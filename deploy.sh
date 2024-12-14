#!/bin/bash

# Перевіряємо, чи є зміни в main
git checkout main
git pull origin main

# Збираємо проект
gulp || { echo "Build failed"; exit 1; }

# Перемикаємося на gh-pages
git checkout gh-pages

# Очищаємо поточний вміст gh-pages (тільки якщо хочеш повністю очищати!)
git rm -rf .

# Копіюємо файли з dist до кореня
cp -R dist/* .

# Додаємо зміни, робимо коміт і пушимо
git add .
git commit -m "Update gh-pages"
git push origin gh-pages

# Повертаємося на main
git checkout main
