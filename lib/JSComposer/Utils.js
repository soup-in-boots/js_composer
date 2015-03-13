define('JSComposer/Utils', [], function() {
    var exports = {};

    function ldef() {
        var l = arguments.length;
        for (var i = 0; i < l; ++i) {
            if (arguments[i] !== undefined) return arguments[i];
        }
        return undefined;
    }

    // Do any of the elements in array return true from func?
    function any(func, array) {
        for (var i = 0; i < array.length; ++i) {
            if (func(array[i])) return true;
        }

        return false;
    }

    function map(func, array) {
        var r = 0;
        for (var i = 0; i < array.length; ++i) {
            r.push(func(array[i]));
        }
        return r;
    }

    function makeElement(type, properties) {
        var e = document.createElement(type);
        applyNestedProperties(e, properties);
        return e;
    }

    function makeSelect(options, allow_null, properties) {
        properties = ldef(properties, {});
        allow_null = ldef(allow_null, true);
        var s = makeElement('select', properties);
        setSelectOptions(s, allow_null, options);

        return s;
    }

    function setSelectOptions(s, allow_null, options) {
        var curr        = s.getElementsByTagName('option'),
            create      = undefined,
            has         = undefined,
            del         = undefined,
            i           = 0,
            l           = curr.length;

        if (l == 0 && allow_null) {
            s.add(makeElement('option', {'text':'Select one...','value':null}));
        }

        if (typeof options === "object" &&
            options.length !== undefined) {
            create = function() {
                for (var i = 0, l = options.length; i < l; ++i) {
                    var key = options[i],
                        o   = makeElement('option', {'text':key,'value':key});
                    s.add(o);
                }
            };
            has = function(key) { return options.indexOf(key) >= 0; };
            del = function(key) { var index = options.indexOf(key); options.splice(index, 1); };
        } else {
            create = function() {
                for (var key in options) {
                    if (!options.hasOwnProperty(key)) { continue; }
                    var o = makeElement('option', {'text':options[key],'value':key});
                    s.add(o);
                }
            };
            has = function(key) { return options.hasOwnProperty(key); };
            del = function(key) { delete options[key]; };
        }

        for (i = 0; i < curr.length; ++i) {
            var key = curr[i].value;
            if (allow_null && key === null) { continue; }
            if (has(key)) {
                del(key);
            } else {
                s.removeChild(curr[i]);
                i--;
            }
        }

        create();
    }

    function setSelectValue(s, value) {
        var i = 0,
            l = s.length;
        for (i = 0; i < l; ++i) {
            if (s.options[i].value === value) {
                s.selectedIndex = i;
                break;
            }
        }
    }

    function getSelectValue(s, value) {
        var i = s.selectedIndex;
        return i === -1 ? undefined : s.options[i].value;
    }

    function applyNestedProperties(o, properties) {
        properties = ldef(properties, {});
        for (var k in properties) {
            if (typeof properties[k] == 'object' &&
                properties[k] !== null &&
                properties[k].length === undefined) {
                applyNestedProperties(o[k], properties[k]);
            } else {
                o[k] = properties[k];
            }
        }

        return o;
    }

    function applyClass(o, c) {
        if (o.classes === undefined) { o.classes = o.className.split(/\s+/); }
        o.classes.push(c);
        o.className = o.classes.join(' ');
    }

    function removeClass(o, c) {
        var i;
        while (i = o.classes.indexOf(c) >= 0) {
            o.classes.splice(i, 1);
        }
        o.className = o.classes.join(' ');
    }

    function getKeys(o) {
        var a = [];
        for (var k in o) {
            a.push(k);
        }
        return a;
    }

    function getTitles(o) {
        var keys = getKeys(o),
            res = {};

        for (var i = 0, l = keys.length; i < l; ++i) {
            var key = keys[i],
                desc = o[key],
                title = desc.title;
            res[key] = (typeof title === 'undefined') ? key : title;
        }

        return res;
    }

    function setTextContent(o, text) { o.textContent = text; }
    function setInnerText(o, text) { o.innerText = text; }
    function getTextContent(o) { return o.textContent; }
    function getInnerText(o) { return o.innerText; }
    function addEventListener(o,e,f) { o.addEventListener(e,f,false); }
    function addEventAttach(o,e,f) { o.attachEvent('on' + e, f); }

    var setText = function(o, text) {
        if (o.textContent !== undefined) {
            exports.setText = setTextContent;
        } else if(o.innerText !== undefined) {
            exports.setText = setInnerText;
        } else {
            throw {'error':'badarg', 'offender': o};
        }
        exports.setText(o, text);
    };

    var getText = function(o) {
        if (o.textContent !== undefined) {
            exports.getText = getTextContent;
        } else if(o.innerText !== undefined) {
            exports.getText = getInnerText;
        } else {
            throw {'error':'badarg', 'offender': o};
        }
        exports.getText(o);
    };

    var attachEvent = function(o, e, f) {
        if (o.attachEvent !== undefined) {
            exports.attachEvent = addEventAttach;
        } else if (o.addEventListener !== undefined) {
            exports.attachEvent = addEventListener;
        } else {
            throw {'error':'badarg','offender':o};
        }
        exports.attachEvent(o, e, f);
    };

    function appendFunction(of, nf) {
        return function() {
            if (typeof of === 'function') {
                of.apply(this, arguments);
            }

            nf.apply(this, arguments);
        }
    }

    function clone(v) {
        var ret = undefined;
        switch(typeof v) {
            case 'object':
                if (v === null) return v;
                if (typeof v.length !== 'undefined') {
                    ret = [];
                    for (var i = 0, l = v.length; i < l; ++i) {
                        ret.push(clone(v[i]));
                    }
                } else {
                    ret = {};
                    for (var k in v) {
                        ret[k] = clone(v[k]);
                    }
                }
                break;
            default:
                ret = v;

        }
        return ret;
    }

    exports = {
        makeElement:        makeElement,
        makeSelect:         makeSelect,
        setSelectOptions:   setSelectOptions,
        setSelectValue:     setSelectValue,
        getSelectValue:     getSelectValue,
        applyClass:         applyClass,
        removeClass:        removeClass,
        any:                any,
        map:                map,
        ldef:               ldef,
        setText:            setText,
        getText:            getText,
        attachEvent:        attachEvent,
        getKeys:            getKeys,
        getTitles:          getTitles,
        appendFunction:     appendFunction,
        clone:              clone
    };
    return exports;
});
