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

/**
 * add className
 *
 * @param {HTMLElement} [element] [HTML element]
 * @param {string} [className] [className]
 * 
 */
function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className = element.className ? [element.className, className].join(' '): className;
    }
}

/**
 * delete className
 *
 * @param {HTMLElement} [element] [HTML element]
 * @param {string} [className] [className]
 */
function removeClass(element, className) {
    if (className && hasClass(element, className)) {
        var classNames = element.className.split(/\s+/);
        for (var i = 0, len = classNames.length; i < len; i ++) {
            if (classNames[i] === className) {
                classNames.splice(i, 1);
                break;
            }
        }
    }
    element.className = classNames.join(' ');
}



/**
 * check out if it is siblingNode
 *
 * @param {HTMLElement} [element] [HTML element]
 * @param {HTMLElement} [siblingNode] [check out the element]
 * @param {boolean} 
 */
function isSiblingNode(element, siblingNode) {
    for (var node = element.parentNode.firstChild; node; node = node.nextSibling) {
        if (node === siblingNode) {
            return true;
        }
    }
    return false;
}



/**
 * 获取元素相对于浏览器窗口左上角的位置
 * 注意：不是文档左上角，如果是相对于文档左上角，还需要加上scrollTop、scrollLeft
 *
 * @param {HTMLElement} [element] [element]
 * @return { Object} [position]
 */
function getPosition(element) {
    var box = element.getBoundingClientRect();
    return box;
}