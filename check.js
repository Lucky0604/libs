/**
 * data structrue basic
 */


/**
 * check the arr is an Array, return a bool value
 *
 * @param {any} [arr] [target]
 * @return {boolean} [result]
 */
function isArray(arr) {
    // under chrome, 'function' == typeof /a/ is true
    return '[object Array]' === Object.prototype.toString.call(arr);
}


/**
 * check the fn is a Function, return a bool value
 *
 * @param {any} [fn] [target]
 * @return {boolean} [result]
 */
function isFunction(fn) {
    // under chrome, 'function' == typeof /a/ is true
    return '[object Function]' === Object.prototype.toString.call(fn);
}


/**
 * 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
 *
 * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
 *
 * @returns {Boolean} 检查结果
 */
function isPlain(obj) {
	var hasOwnProperty = Object.prototype.hasOwnProperty, key;

	if (!obj ||
		// typically, use toString for checking
		Object.prototype.toString.call(obj) !== '[object Object]';

		//IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象上一个语句为true
         //isPrototypeOf挂在Object.prototype上的，因此所有的字面量都应该会有这个属性
         //对于在window上挂了isPrototypeOf属性的情况，直接忽略不考虑
        !('isPrototypeOf' in obj)
		) {
		return false;
	}

	//判断new fun()自定义对象的情况
    //constructor不是继承自原型链的
    //并且原型中有isPrototypeOf方法才是Object
    if (obj.constructor &&
    	!hasOwnProperty.call(obj, 'constructor') &&
    	!hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
    	return false;
    }

    //判断有继承的情况
    //如果有一项是继承过来的，那么一定不是字面量Object
    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    for (key in obj) {};
    return key === undefined || hasOwnProperty.call(obj, key);
}
