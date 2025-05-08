// Імпортуємо необхідні пакети
const gulp = require('gulp'); // Основний Gulp
const fileInclude = require('gulp-file-include'); // Дозволяє вставляти частини HTML за допомогою @@include
const sass = require('gulp-sass')(require('sass')); // Компілятор SCSS у CSS
const cleanCSS = require('gulp-clean-css'); // Мініфікація CSS
const rename = require('gulp-rename'); // Перейменування файлів
const browserSync = require('browser-sync').create(); // Автоматичне оновлення браузера при змінах
const uglify = require('gulp-uglify'); // Мініфікація JavaScript
const plumber = require('gulp-plumber'); // Запобігає зупинці Gulp при помилках
const fs = require('fs'); // Робота з файловою системою (вбудований модуль Node.js)
const path = require('path'); // Робота з шляхами (вбудований модуль Node.js)
const through2 = require('through2'); // Обробка потоків (для sitemap)
const copy = require('gulp-copy'); // Для копіювання файлів

// Очищення директорії dist перед збіркою
// del — ES-модуль, тому імпортуємо динамічно
async function clean() {
  const del = (await import('del')).deleteAsync;
  return del('dist'); // Видаляємо папку dist
}

// Шляхи до вхідних/вихідних файлів
const paths = {
  html: {
    src: 'src/html/pages/*.html', // HTML-сторінки
    watch: 'src/html/**/*.html',  // Всі HTML-файли для відслідковування змін
    dest: 'dist/' // Куди зберігати HTML
  },
  styles: {
    src: 'src/scss/**/*.scss', // Всі SCSS-файли
    dest: 'dist/css/' // Куди зберігати зкомпільовані CSS
  },
  scripts: {
    app: 'src/js/app.js', // Основний JS-файл
    appDest: 'dist/js/', // Куди копіювати app.js
    functions: 'src/js/functions/**/*.js', // Усі дрібні JS-функції
    functionsDest: 'dist/js/functions/' // Куди копіювати мінімізовані функції
  },
  images: {
    src: 'src/images/**/*.*', // Всі зображення
    dest: 'dist/images/' // Куди копіювати зображення
  }
};

// Обробка кастомних директив @@img("...") та @@bgimg("...") в HTML-файлах
function replaceAliases() {
  return through2.obj(function (file, _, cb) {
    if (file.isBuffer()) {
      let content = file.contents.toString();

      // Заміна @img/filename.jpg → images/filename.jpg
      content = content.replace(/@img\//g, './images/');

      // Заміна @bgimg/filename.jpg → background-image: url('images/filename.jpg');
      content = content.replace(/@bgimg\/([^)'" ]+)/g, "background-image: url('./images/$1')");

      file.contents = Buffer.from(content);
    }
    cb(null, file);
  });
}

// Обробка HTML-файлів із підключенням include'ів
function html() {
  console.log('\x1b[36m%s\x1b[0m', '📄 HTML обробляється...');
  return gulp.src(paths.html.src)
    .pipe(fileInclude({ prefix: '@@', basepath: 'src/html/' })) // Пошук @@include
    .pipe(replaceAliases()) // Заміна @img/ та @bgimg/
    .pipe(gulp.dest(paths.html.dest)) // Запис у dist/
    .pipe(browserSync.stream()); // Оновлення сторінки
}

// Генерація sitemap.html на основі всіх HTML-сторінок
function sitemap(cb) {
  const links = [];

  // Знаходимо всі HTML-файли в dist
  gulp.src('dist/**/*.html', { read: false })
    .pipe(through2.obj(function (file, _, callback) {
      const relativePath = path.relative('dist', file.path).replace(/\\/g, '/');
      if (relativePath !== 'sitemap.html') {
        links.push(`<li><a href="${relativePath}">${relativePath}</a></li>`);
      }
      callback();
    }, function (callback) {
      // Формуємо HTML для sitemap
      const html = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Карта сайту</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f9f9f9; }
    ul { line-height: 1.8; }
    a { color: #007acc; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Карта сайту</h1>
  <ul>${links.join('\n')}</ul>
</body>
</html>`.trim();

      fs.writeFileSync('dist/sitemap.html', html); // Створюємо sitemap
      console.log('\x1b[36m%s\x1b[0m', '🗺️  sitemap.html оновлено!');
      callback();
      cb(); // Завершуємо таск
    }));
}

// Компіляція SCSS → CSS, мініфікація і перейменування
function styles() {
  console.log('\x1b[35m%s\x1b[0m', '🎨 SCSS компілюється...');
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError)) // Компіляція SCSS
    .pipe(cleanCSS()) // Мініфікація
    .pipe(rename({ suffix: '.min' })) // Додаємо .min до назви
    .pipe(gulp.dest(paths.styles.dest)) // Запис у dist/css
    .pipe(browserSync.stream()); // Оновлення сторінки
}

// Копіювання app.js без мінімізації
function jsApp() {
  console.log('\x1b[33m%s\x1b[0m', '🧩 jsApp копіюється без мінімізації...');
  return gulp.src(paths.scripts.app)
    .pipe(gulp.dest(paths.scripts.appDest))
    .pipe(browserSync.stream());
}

// Мініфікація функціональних JS-файлів
function jsFunctions() {
  console.log('\x1b[32m%s\x1b[0m', '⚙️ jsFunctions мінімізується...');
  return gulp.src(paths.scripts.functions)
    .pipe(plumber()) // Запобігання зупинці при помилках
    .pipe(uglify()) // Мініфікація
    .pipe(gulp.dest(paths.scripts.functionsDest))
    .pipe(browserSync.stream());
}

// Копіювання зображень у dist
function images() {
  console.log('\x1b[34m%s\x1b[0m', '🖼️ Зображення копіюються...');
  return gulp.src(paths.images.src)
    .pipe(copy(paths.images.dest, { prefix: 2 })) // Копіюємо зображення до dist/images
    .pipe(browserSync.stream())
    .on('end', () => console.log('Зображення успішно скопійовано!'));
}

// Відслідковування змін і live-reload у браузері
function watch() {
  browserSync.init({
    server: {
      baseDir: './dist' // Запускаємо локальний сервер з папки dist
    }
  });

  // Спостереження за всіма файлами
  gulp.watch(paths.html.watch, gulp.series(html, sitemap)); // HTML + sitemap
  gulp.watch(paths.styles.src, styles); // SCSS
  gulp.watch(paths.scripts.app, jsApp); // JS app
  gulp.watch(paths.scripts.functions, jsFunctions); // JS функції
  gulp.watch(paths.images.src, images); // Зображення

  console.log('\x1b[44m%s\x1b[0m', '👀 Gulp слідкує за файлами...');
}

// Основне завдання за замовчуванням: очищення → паралельна обробка → sitemap → спостереження
exports.default = gulp.series(
  clean,
  gulp.parallel(html, styles, jsApp, jsFunctions, images),
  sitemap,
  watch
);
