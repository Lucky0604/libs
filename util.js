/**
 * check out if there is any element
 * @param {HTMLElement} [element] [HTML element]
 * @param {string} [className] [className]
 * @param {boolean}
 */
function hasClass(element, className) {
    var classNames = element.className;
    if (!classNames) {
        return false;
    }
    classNames = classNames.split(/\s+/);
    for (var i = 0, len = classNames.length; i < len; i ++) {
        if (classNames[i] === className) {
            return true;
        }
    }
    return false;
}