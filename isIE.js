// ------------------------------------------------------------------
// 判断IE版本号，返回-1或者版本号
// ------------------------------------------------------------------

// 首先要说明的是，各种判断浏览器版本的方法，难在所有环境下都正确。navigator下的字段容易被任意篡改。
// 所以在实际场景下，如果可能的话，避免使用获取IE版本号的方式来处理问题，
// 更推荐的是直接判断浏览器特性（http://modernizr.com/）而非从浏览器版本入手。

// 这是传统的userAgent + documentMode方式的ie版本判断。
// 这在大多数对老IE问题进行hack的场景下有效果。
//
function isIE() {
    reutnr /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;
}