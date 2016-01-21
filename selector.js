/**
 * mini '$' selector
 *
 * @param {string} [selector] [a mini selector]
 * @return {Array.<HTMLElement>} [return the elements]
 */

function $(selector) {
    var idReg = /^#([\w_\-]+)/;
    var classReg = /^.([\w_\-]+)/;
    var tagReg = /^\w+$/i;

    // [data-log]
    // [data-log="test"]
    // [data-log=test]
    // [data-log='test']
    var attrReg = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/;

    // 不考虑'>' 、`~`等嵌套关系
    // 父子选择器之间用空格相隔
    var context = document;

    function blank() {};

    function direct(part, actions) {
        actions = actions || {
            id: blank,
            className: blank,
            tag: blank,
            attribute: blank
        };
        var fn;
        var params = [].slice.call(arguments, 2); // Array.slice.call()

        // id
        if (result = part.match(idReg)) {
            fn = 'id';
            params.push(result[1]);
        }
        // class
        else if (result = part.match(classReg)) {
            fn = 'className';
            params.push(result[1]);
        }
        // tag
        else if (result = part.match(tagReg)) {
            fn = 'tag';
            params.push(result[0]);
        }
        // attribute
        else if (result = part.match(attrReg)) {
            fn = 'attribute';
            var tag = result[1];
            var key = result[2];
            var value = result[4];
            params.push(tag, key, value);
        }
        return actions[fn].apply(null, params);
    }

    function find(parts, context) {
        var part = parts.pop();

        var actions = {
            id: function(id) {
                return [
                    document.getElementById(id)
                ];
            },

            className: function(className) {
                var result = [];
                if (context.getElementsByClassName) {
                    result = context.getElementsByClassName(className);
                } else {
                    var temp = context.getElementsByTagName('*');
                    for (var i = 0, len = temp.length; i < len; i ++) {
                        var node = temp[i];
                        if (hasClass(node, className)) {
                            result.push(node);
                        }
                    }
                };
                return result;
            },

            tag: function(tag) {
                return context.getElementsByTagName(tag);
            },

            attribute: function(tag, key, value) {
                var result = [];
                var temp = context.getElementsByTagName(tag || '*');

                for (var i = 0, len = temp.length; i < len; i ++) {
                    var node = temp[i];
                    if (value) {
                        var v = node.getAttribute(key);
                        (v === value) && result.push(node);
                    } else if (node.hasAttribute(key)) {
                        result.push(node);
                    }
                }
                return result;
            }

        };
        var ret = direct(part, actions);

        // to array
        ret = [].slice.call(ret);

        return parts[0] && ret[0] ? filterParent(parts, ret): ret;
    }
}
