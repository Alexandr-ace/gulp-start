const { src, dest, watch, parallel } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;

function browsersynk() {
    browserSync.init({
        server: {
            baseDir: "./app/",
        },
    });
}

function scripts() {
    return src(["./app/js/app.js", "./app/js/main.js"])
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest("app/js"))
        .pipe(browserSync.stream());
}

function styles() {
    return src("./app/scss/style.scss")
        .pipe(scss({ outputStyle: "compressed" }))
        .pipe(concat("style.min.css"))
        .pipe(dest("app/css"))
        .pipe(browserSync.stream());
}

function watching() {
    watch(["app/scss/**/*.scss"], styles);
    watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
    watch(["app/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersynk = browsersynk;
exports.scripts = scripts;
exports.default = parallel(scripts, browsersynk, watching);
