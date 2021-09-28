const { src, dest, watch } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");

function styles() {
    return src("./app/scss/style.scss")
        .pipe(scss({ outputStyle: "compressed" }))
        .pipe(concat("style.min.css"))
        .pipe(dest("app/css"));
}

function watching() {
    watch(["app/scss/**/*.scss"], styles);
}

exports.styles = styles;
exports.watching = watching;
