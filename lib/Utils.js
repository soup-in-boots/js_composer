if (window.JSComposer === undefined) { window.JSComposer = {}; }
JSComposer.Utils = (function() {
    var exports = {};

    function ldef() {
        var l = arguments.length;
        for (var i = 0; i < l; ++i) {
            if (arguments[i] !== undefined) return arguments[i];
        }
        return undefined;
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
        console.log("Removing options...");
        while (s.length > 0) s.remove(0);
        console.log("Removed options...");
        if (allow_null) {
            var null_option = makeElement('option', {'text':'Select one...', 'value':null});
            s.add(null_option);
        }
        if (typeof options === "object" &&
            options.length !== undefined) {
            console.log("ARRAY OPTIONS");
            for (var i = 0; i < options.length; ++i) {
                var option = makeElement('option', {'text':options[i],'value':options[i]});
                s.add(option);
            }
        } else {
            console.log("OBJECT OPTIONS");
            console.log(options);
            for (var k in options) {
                var option = makeElement('option', {'text':options[k],'value':k});
                s.add(option);
            }
        }
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
        return s.options[i].value;
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

    exports = {
        makeElement:        makeElement,
        makeSelect:         makeSelect,
        setSelectOptions:   setSelectOptions,
        setSelectValue:     setSelectValue,
        getSelectValue:     getSelectValue,
        applyClass:         applyClass,
        removeClass:        removeClass,
        ldef:               ldef,
        setText:            setText,
        getText:            getText,
        attachEvent:        attachEvent,
        getKeys:            getKeys,
        appendFunction:     appendFunction
    };
    return exports;
}());
