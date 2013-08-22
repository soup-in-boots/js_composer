
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
if (window.JSComposer === undefined) { window.JSComposer = {}; }

JSComposer.Field = (function() {
    // Constructor
    function Field(type_desc, value) {
        this.elements = {
            ctr:        JSComposer.Utils.makeElement("div", {"className":"node"})
        };
        this.type_desc = JSComposer.Utils.ldef(type_desc, {'type':'null'});
    }

    // Static Properties
    Field.Objects = {
        'null':     Field
    };

    Field.ObjectKeys = ['null'];

    // Static Methods
    Field.RegisterField = function(type, constructor) {
        if (Field.Objects[type] !== undefined) throw "Object already defined: " + type;
        Field.Objects[type] = constructor;
        Field.ObjectKeys.push(type);
    };

    Field.CreateObject = function(type_desc, value) {
        console.log("Field.CreateObject: ", type_desc, value);
        if (type_desc === undefined ||
            type_desc.type === undefined) {
            return undefined;
        }
        var type = type_desc.type;
        if (Field.Objects[type] !== undefined) {
            console.log('Creating object:', type);
            return new (Field.Objects[type])(type_desc, value);
        }
        return undefined;
    };

    // Instance Methods
    Field.prototype.Render = function (target) {
        target.appendChild(this.elements.ctr);
    };

    Field.prototype.GetValue = function () {
        return null;
    };

    Field.prototype.Destroy = function() {
        var parent_node = this.elements.ctr.parentElement;
        parent_node.removeChild(this.elements.ctr);
    };

    Field.prototype.OnChange = function() {
    };

    return Field;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.Entry = (function() {
    function Entry(key_desc, val_desc, key, value) {
        var s = this;
        this.elements = {
            'key':      JSComposer.Utils.makeElement('div', {'className':'key field'}),
            'value':    JSComposer.Utils.makeElement('div', {'className':'value field'})
        };
        this.fields = {
            'key':      JSComposer.Field.CreateObject(key_desc, key),
            'value':    JSComposer.Field.CreateObject(val_desc, value)
        }

        this.fields.key.OnChange = JSComposer.Utils.appendFunction(this.fields.key.OnChange, function() { s.OnKeyChange(); });
        this.fields.value.OnChange = JSComposer.Utils.appendFunction(this.fields.value.OnChange, function() { s.OnValueChange(); });
    }

    Entry.prototype.GetKey = function() {
        return this.fields.key.GetValue();
    }

    Entry.prototype.GetKeyField = function() {
        return this.fields.key;
    }

    Entry.prototype.GetValue = function() {
        return this.fields.value.GetValue();
    }

    Entry.prototype.GetValueField = function() {
        return this.fields.value;
    }

    Entry.prototype.OnKeyChange = function() {
    }

    Entry.prototype.OnValueChange = function() {
    }

    Entry.prototype.Render = function(target) {
        this.fields.key.Render(this.elements.key);
        this.fields.value.Render(this.elements.value);
        target.appendChild(this.elements.key);
        target.appendChild(this.elements.value);
    }

    return Entry;
}());
//var Field   = require('Field'),
//    JSComposer.Utils   = require('JSComposer.Utils');
//
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.StaticField = (function() {
    function StaticField(type_desc, value) {
        JSComposer.Field.apply(this, arguments);

        var text_content = JSComposer.Utils.ldef(this.type_desc.text, value, '');
        this.elements.text = JSComposer.Utils.makeElement("div", {"className": "value field"});
        JSComposer.Utils.setText(this.elements.text, text_content);

        this.value = value;
    };

    StaticField.prototype = new JSComposer.Field();
    StaticField.prototype.constructor = StaticField;

    StaticField.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.text);
        target.appendChild(this.elements.ctr);
    };

    StaticField.prototype.GetValue = function() {
        return this.value;
    }

    JSComposer.Field.RegisterField('static', StaticField);

    return StaticField;
}());
if (window.JSComposer === undefined) window.JSComposer = {};

JSComposer.TextField = (function(){
    function TextField(type_desc, value) {
        var s = this;
        type_desc = JSComposer.Utils.ldef(type_desc, {});
        JSComposer.Field.apply(this, arguments);
        this.is_big = JSComposer.Utils.ldef(type_desc.big, false);
        if (this.is_big) {
            this.elements.text  = JSComposer.Utils.makeElement('textarea', {});
            JSComposer.Utils.applyClass(this.elements.ctr, "big");
        } else {
            this.elements.text = JSComposer.Utils.makeElement('input', {'type':'text'});
        }
        this.elements.text.value = JSComposer.Utils.ldef(value, '');
        JSComposer.Utils.attachEvent(this.elements.text, 'change', function() { s.OnChange(); });
    }

    TextField.prototype = new JSComposer.Field();
    TextField.prototype.constructor = TextField;

    TextField.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.text);
        target.appendChild(this.elements.ctr);
    }

    TextField.prototype.GetValue = function() {
        return this.elements.text.value;
    }

    JSComposer.Field.RegisterField('text', TextField);

    return TextField;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.PasswordField = (function() {
    function PasswordField(type_desc, value) {
        JSComposer.TextField.apply(this, arguments);

        this.elements.text.type = "password";
        this.elements.text.value = "";
    }

    PasswordField.prototype = new JSComposer.TextField();
    PasswordField.prototype.constructor = PasswordField;

    JSComposer.Field.RegisterField('password', PasswordField);
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.NumberField = (function() {
    function NumberField(type_desc, value) {
        var self = this;
        value = JSComposer.Utils.ldef(value, 0);
        JSComposer.TextField.apply(this, arguments);
        JSComposer.Utils.attachEvent(self.elements.text, 'keypress', function() { var r = self.OnKeyDown.apply(self, arguments); console.log("## Returning: ", r); return r; });
    }

    NumberField.prototype = new JSComposer.TextField();
    NumberField.prototype.constructor = NumberField;

    NumberField.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.number);
        target.appendChild(this.elements.ctr);
    };

    NumberField.prototype.GetValue = function() {
        return parseInt(this.elements.number.value);
    };

    NumberField.prototype.OnKeyDown = function(e) {
        return OnKeyDown(e, /[^0-9\.]/);
    }

    function OnKeyDown(e, rx) {
        var v = String.fromCharCode(e.keyCode);
        var r = true;

        if (v.match(rx)) {
            e.cancelBubble = true;
            r = false;
        }

        return r;
    };

    JSComposer.Field.RegisterField('number', NumberField);

    return NumberField;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.IntegerField = (function() {

    function IntegerField(type_desc, value) {
        JSComposer.NumberField.apply(this, arguments);
    }

    IntegerField.prototype = new JSComposer.NumberField();
    IntegerField.prototype.constructor = IntegerField;

    IntegerField.prototype.OnKeyDown = function(e) {
        return OnKeyDown(e, /[^0-9]/);
    }

    JSComposer.Field.RegisterField('integer', IntegerField);
    
    return IntegerField;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.SelectField = (function() {
    function SelectField(type_desc, value) {
        var self = this;
        JSComposer.Field.apply(this, arguments);
        console.log("Constructing select field:", type_desc);
        this.options = JSComposer.Utils.ldef(this.type_desc.options, {});
        this.allow_null = JSComposer.Utils.ldef(this.type_desc.allow_null, true);
        this.elements.select = JSComposer.Utils.makeSelect(this.options, this.allow_null);
        JSComposer.Utils.attachEvent(this.elements.select, 'change', function() { self.OnSelect(); });
        JSComposer.Utils.setSelectValue(this.elements.select, value);
    }

    SelectField.prototype = new JSComposer.Field();
    SelectField.prototype.constructor = SelectField;

    SelectField.prototype.GetValue = function() {
        return JSComposer.Utils.getSelectValue(this.elements.select);
    };

    SelectField.prototype.Render = function(target) {
        this.elements.ctr.appendChild(this.elements.select);
        target.appendChild(this.elements.ctr);
    }

    SelectField.prototype.SetOptions = function(options) {
        console.log("[SelectField] Setting Options: ", options);
        JSComposer.Utils.setSelectOptions(this.elements.select, this.allow_null, options);
    }

    SelectField.prototype.OnSelect = function() {
    }

    JSComposer.Field.RegisterField('select', SelectField);

    return SelectField;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.BooleanField = (function() {
    function BooleanField(type_desc, value) {
        type_desc.options = {"true":"True","false":"False"};
        type_desc.allow_null = false;
        value = value === true ? "true" : "false";
        JSComposer.SelectField.call(this, type_desc, value);
    }

    BooleanField.prototype = new JSComposer.SelectField();
    BooleanField.prototype.constructor = BooleanField;

    BooleanField.prototype.GetValue = function() {
        var v = JSComposer.SelectField.prototype.GetValue.call(this);
        return v === "true" ? true : false;
    }

    JSComposer.Field.RegisterField('boolean', BooleanField);
    return BooleanField;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.OrderField = (function(){
    function OrderField(type_desc, value) {
        type_desc.allow_null = false;
        console.log("ALLOW_NULL IS FALSE");
        JSComposer.SelectField.call(this, type_desc, value);

        var s = this;

        this.elements.select.multiple = true;
        this.elements.up_button = JSComposer.Utils.makeElement('div', {'className':'order button up'});
        JSComposer.Utils.attachEvent(this.elements.up_button, 'click', function() { s.OnUpClick(); });
        this.elements.down_button = JSComposer.Utils.makeElement('div', {'className':'order button down'});
        JSComposer.Utils.attachEvent(this.elements.down_button, 'click', function() { s.OnDownClick(); });
        JSComposer.Utils.applyClass(this.elements.ctr, 'big');
        JSComposer.Utils.applyClass(this.elements.select, 'multi');
        JSComposer.Utils.applyClass(this.elements.select, 'order');
        this.selected = this.elements.select.selectedIndex;
    }

    OrderField.prototype = new JSComposer.SelectField();
    OrderField.prototype.constructor = OrderField;

    OrderField.prototype.Render = function(target) {
        JSComposer.SelectField.prototype.Render.call(this, target);

        this.elements.ctr.appendChild(this.elements.up_button);
        this.elements.ctr.appendChild(this.elements.down_button);
    };

    OrderField.prototype.OnSelect = function() {
        var index = this.elements.select.selectedIndex;

        if (this.selected === -1) {
            this.selected = index;
        } else {
            this.elements.select.options[this.selected].selected = false;
        }
        this.selected = this.elements.select.selectedIndex;
    };

    OrderField.prototype.OnUpClick = function() {
        var s = this.elements.select,
            o = s.options.item(s.selectedIndex),
            t = s.options.item(s.selectedIndex - 1);

        if (t === null) return undefined;

        s.removeChild(o);
        s.insertBefore(o, t);
        o.selected = true;

        this.selected = s.selectedIndex;
        console.log("SELECTED: ", s.options);
    }

    OrderField.prototype.OnDownClick = function() {
        if (this.selected < 0) { return undefined; }
        var s = this.elements.select,
            o = s.options.item(s.selectedIndex),
            t = s.options.item(s.selectedIndex + 1);

        if (t === null) return undefined;

        s.removeChild(t);
        s.insertBefore(t, o);
        o.selected = true;

        this.selected = s.selectedIndex;
        console.log("SELECTED: ", s.options);
    }

    OrderField.prototype.GetValue = function() {
        var a = [],
            s = this.elements.select,
            i = 0,
            l = s.options.length;

        for (; i < l; ++i) {
            a.push(s.options[i].value);
        }

        return a;
    }

    JSComposer.Field.RegisterField('order', OrderField);
    return OrderField;
}());
//var JSComposer.Utils       = require('JSComposer.Utils'),
//    Field       = require('Field');
//
// Entry
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.StructField = (function(){
    // Field
    function StructField(type_desc, value) {
        var self = this;
        JSComposer.Field.apply(this, arguments);

        this.entries    = [];
        this.header     = JSComposer.Utils.ldef(this.type_desc.header, false);
        this.more       = JSComposer.Utils.ldef(this.type_desc.more, true);
        this.any        = JSComposer.Utils.ldef(this.type_desc.any, false);
        this.deletable  = JSComposer.Utils.ldef(this.type_desc.deletable, true);

        if (this.header) {
            this.elements.header = JSComposer.Utils.makeElement('struct', {"className":"struct header"});
            setText(this.elements.header, JSComposer.Utils.ldef(this.type_desc.label, ''));
        }


        this.elements.body = JSComposer.Utils.makeElement('div', {"className":"struct body"});
        if (this.more) {
            this.elements.footer = JSComposer.Utils.makeElement('div', {"className":"struct footer"});
            this.elements.button = JSComposer.Utils.makeElement('div', {"className":"create button"});
            JSComposer.Utils.attachEvent(this.elements.button, 'click', function() { self.AddEntry(); });
        }

        JSComposer.Utils.applyClass(this.elements.ctr, 'struct');

        value = JSComposer.Utils.ldef(value, {});
        for (var k in value) {
            if (value.hasOwnProperty(k)) {
                this.AddEntry(k, value[k]);
            }
        }
    }

    StructField.prototype = new JSComposer.Field();
    StructField.prototype.constructor = StructField;

    StructField.prototype.GetValue = function() {
        var o = {},
            l = this.entries.length;

        for (var i = 0; i < l; ++i) {
            var k = this.entries[i].GetKey(),
                v = this.entries[i].GetValue();

            o[k] = v;
        }

        return o;
    };

    StructField.prototype.Render = function(target) {
        console.log("Struct Rendering");
        if (this.elements.header !== undefined) this.elements.ctr.appendChild(header);
        this.elements.ctr.appendChild(this.elements.body);
        if (this.more) {
            console.log("Adding footer");
            this.elements.footer.appendChild(this.elements.button);
            this.elements.ctr.appendChild(this.elements.footer);
        }

        target.appendChild(this.elements.ctr);
    };

    StructField.prototype.AddEntry = function(key, value) {
        var self        = this,
            entry       = new JSComposer.Entry(this.type_desc.key, this.type_desc.value, key, value),
            ctr         = JSComposer.Utils.makeElement('div', {'className':'entry'}),
            button      = undefined;
        this.entries.push(entry);

        if (this.deletable) {
            button = JSComposer.Utils.makeElement('div', {'className':'button delete'});
            JSComposer.Utils.attachEvent(button, 'click', function() { self.DeleteEntry(entry); });

            ctr.appendChild(button);
            JSComposer.Utils.applyClass(ctr, 'deletable');
        }

        entry.OnKeyChange   = JSComposer.Utils.appendFunction(entry.OnKeyChange, function() { self.OnKeyChange(entry); });
        entry.OnValueChange = JSComposer.Utils.appendFunction(entry.OnKeyChange, function() { self.OnValueChange(entry); });

        entry.Render(ctr);
        this.elements.body.appendChild(ctr);
    };

    StructField.prototype.DeleteEntry = function(entry) {
        var i = this.entries.indexOf(entry);

        if (i >= 0) {
            this.entries.splice(i, 1);
            entry.Destroy();
        }
    };

    StructField.prototype.GetKeys = function() {
        var a = new Array(),
            i = 0,
            l = this.entries.length;

        for (; i < l; ++i) {
            a.push(this.entries[i].GetKey());
        }

        return a;
    };

    StructField.prototype.OnKeyChange = function() {
        this.OnChange();
    };

    StructField.prototype.OnValueChange = function() {
        this.OnChange();
    };

    JSComposer.Field.RegisterField('struct', StructField);

    return StructField;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.ObjectField = (function(){
    function ObjectField(type_desc, value) {
        console.log("Creating ObjectField");
        JSComposer.Field.apply(this, arguments);
        this.fields     = JSComposer.Utils.ldef(this.type_desc.fields, {});
        this.header     = JSComposer.Utils.ldef(this.type_desc.header, false);
        this.entries    = [];
        var keys        = JSComposer.Utils.getKeys(this.fields);

        if (this.type_desc.order === null ||
            this.type_desc.order === undefined) {
            this.order = keys;
        } else {
            this.order = this.type_desc.order;
        }

        this.elements.body  = JSComposer.Utils.makeElement('div', {'className':'object body'});
        if (this.header) {
            this.elements.header = JSComposer.Utils.makeElement('h3', {'className':'object header'});
            JSComposer.Utils.setText(this.elements.header, JSComposer.Utils.ldef(this.type_desc.label, ''));
        }

        JSComposer.Utils.applyClass(this.elements.ctr, 'object');

        value = JSComposer.Utils.ldef(value, {});
        console.log("ObjectField.constructor :: Fields: ", this.fields);
        console.log("ObjectField.constructor :: Order: ", this.order);
        for (var i = 0; i < this.order.length; ++i) {
            var k = this.order[i];
            if (!this.fields.hasOwnProperty(k)) continue;
            this.AddEntry(k, value[k]);
        }
    }

    ObjectField.prototype = new JSComposer.Field();
    ObjectField.prototype.constructor = ObjectField;

    ObjectField.Default     = {};
    ObjectField.Descriptor  = {
        'type':         'object_type', // Insert maniacal laughter here
        'fields':       {
            'label':        {'type':'text', 'label':'Label'},
            'header':       {'type':'boolean', 'label':'Display Header'},
            'fields':       {
                'type':         'struct',
                'key':          {'type':'text'},
                'value':        {'type':'type_desc'},
                'more':         true,
                'any':          false,
                'label':        'Properties'
            },
            'order':        {'type':'order','options':[],'label':'Field Order'}
        }
    };

    ObjectField.prototype.AddEntry = function(key, value) {
        var self        = this,
            val_desc    = JSComposer.Utils.ldef(this.fields[key], {'type':'null'}),
            label       = JSComposer.Utils.ldef(val_desc.label, key),
            entry       = new JSComposer.Entry({'type':'static','text':label}, val_desc, key, value),
            val_field   = entry.GetValueField(),
            ctr         = JSComposer.Utils.makeElement('div', {'className':'entry'});

        console.log('Object Entry: ', label, key, value);
        val_field.OnChange = JSComposer.Utils.appendFunction(val_field.OnChange, function() { self.OnChange(entry); });

        this.entries.push(entry);
        entry.Render(ctr);
        this.elements.body.appendChild(ctr);
    };

    ObjectField.prototype.GetValue = function() {
        var o = {},
            l = this.entries.length;

        for (var i = 0; i < l; ++i) {
            var k = this.entries[i].GetKey(),
                v = this.entries[i].GetValue();

            o[k] = v;
        }

        return o;
    };

    ObjectField.prototype.Render = function(target) {
        console.log('Rendering object.');
        if (this.header) { this.elements.ctr.appendChild(this.elements.header); }
        this.elements.ctr.appendChild(this.elements.body);
        target.appendChild(this.elements.ctr);
    };

    ObjectField.prototype.FindEntry = function(key) {
        var i = 0,
            l = this.entries.length;

        for (i = 0; i < l; ++i) {
            if (this.entries[i].GetKey() === key) return this.entries[i].GetValueField();
        }

        return undefined;
    };

    ObjectField.prototype.GetKeys = function() {
        var a = [],
            i = 0;
            l = this.entries.length;

        for (; i < l; ++i) {
            a.push(this.entries[i].GetKey());
        }

        return a;
    };

    ObjectField.prototype.OnChange = function() {
    };

    function ObjectTypeField(type_desc, value) {
        var s = this;
        ObjectField.call(this, type_desc, value);

        var order   = this.FindEntry('order'),
            fields  = this.FindEntry('fields');

        fields.OnChange = JSComposer.Utils.appendFunction(fields.OnChange, function() { s.OnChange(); });

        this.OnChange();
    }

    ObjectTypeField.prototype = new ObjectField();
    ObjectTypeField.prototype.constructor= ObjectTypeField;
    ObjectField.TypeField = ObjectTypeField;

    ObjectTypeField.prototype.OnChange = function() {
        console.log("!!!!!!!!!!!! CHANGE !!!!!!!!!!!!");
        var order   = this.FindEntry('order'),
            fields  = this.FindEntry('fields'),
            keys    = fields.GetKeys();

        console.log("Setting Options: ", keys);
        order.SetOptions(keys);
    };

    JSComposer.Field.RegisterField('object', ObjectField);
    JSComposer.Field.RegisterField('object_type', ObjectTypeField);

    return ObjectField;
}());
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.ListField = (function(){
    function ListField(type_desc, value) {
        JSComposer.Field.apply(this, arguments);
        value = value || [];

        this.fields = [];
        this.type_desc.allow_null = JSComposer.Utils.ldef(this.type_desc.allow_null, false);

        for (var i = 0; i < value.length; ++i) {
            this.AddEntry(value[i]);
        }
    }

    ListField.prototype = new JSComposer.Field();
    ListField.prototype.constructor = ListField;

    ListField.prototype.AddEntry = function(value) {
        var d       = JSComposer.Utils.makeElement("div", {"className":"list entry node"}),
            field   = JSComposer.Field.CreateObject(this.type_desc.field, value);

        this.fields.push(field);
        field.Render(d);
        this.elements.ctr.appendChild(d);
    };

    ListField.prototype.GetValue = function() {
        var a = [],
            l = this.fields.length;

        // Return null on empty if requested
        if (this.type_desc.allow_null && l == 0) return null;

        // Add all field values to array, in order
        for (var i = 0; i < l; ++i) {
            a.push(this.fields[i].GetValue());
        }

        return a;
    };

    JSComposer.Field.RegisterField('list', ListField);

    return ListField;
}());
if (window.JSComposer === undefined) { window.JSComposer = {}; }

JSComposer.TypeDescField = (function(){
    function TypeDescField(type_desc, value) {
        value = JSComposer.Utils.ldef(value, {'type':'null'});
        JSComposer.Field.apply(this, arguments);
        // In constructor to ensure all types are loaded
        TypeDescField.Initialize();

        var self = this;
        this.elements.key = JSComposer.Utils.makeElement('div', {'className':'key field'});
        this.elements.value = JSComposer.Utils.makeElement('div', {'className':'value field'});
        this.elements.key_node = JSComposer.Utils.makeElement('div', {'className':'node'});
        this.elements.select = JSComposer.Utils.makeSelect(TypeDescField.Keys, false);
        JSComposer.Utils.applyClass(this.elements.ctr, 'entry');

        this.elements.ctr.appendChild(this.elements.key);
        this.elements.key_node.appendChild(this.elements.select);
        this.elements.key.appendChild(this.elements.key_node);
        this.elements.ctr.appendChild(this.elements.value);
        JSComposer.Utils.setSelectValue(this.elements.select, value.type);

        JSComposer.Utils.attachEvent(this.elements.select, 'change', function() { self.OnTypeChange.apply(self, []); });

        this.OnTypeChange(value);
    };

    TypeDescField.Initialize = function() {
        // Only do this once
        if (TypeDescField.Initialized) { return undefined; }
        TypeDescField.Initialized = true;

        var l = JSComposer.Field.ObjectKeys.length;

        for (var i = 0; i < l; ++i) {
            var key     = JSComposer.Field.ObjectKeys[i],
                object  = JSComposer.Field.Objects[key],
                desc    = JSComposer.Utils.ldef(object.Descriptor, {'type':'object', 'fields':{}, 'order':[]});

            TypeDescField.Keys.push(key);
            TypeDescField.Options[key] = desc;
        }
    };
    TypeDescField.Initialized = false;
    TypeDescField.Options = {};
    TypeDescField.Keys = [];

    TypeDescField.prototype = new JSComposer.Field();
    TypeDescField.prototype.constructor = TypeDescField;

    TypeDescField.prototype.GetValue = function() {
        var type = JSComposer.Utils.getSelectValue(this.elements.select),
            val  = this.value.GetValue();

        val.type = type;

        return val;
    }

    TypeDescField.prototype.OnTypeChange = function(value) {
        // Get current value and potential desc
        var type = JSComposer.Utils.getSelectValue(this.elements.select),
            desc = TypeDescField.Options[type];

        console.log("TypeDescField.OnTypeChange :: Setting Type: ", type, desc);

        // Don't change anything if the type hasn't changed
        if (this.currType === type) { return undefined;}

        // Destroy value if currently set
        if (this.value !== undefined) { this.value.Destroy(); }

        // Create value, render it, and update our state
        this.currType = type;
        this.value = JSComposer.Field.CreateObject(desc, value);
        this.value.Render(this.elements.value);
    }

    JSComposer.Field.RegisterField('type_desc', TypeDescField);

    return TypeDescField;
}());
//var Utils           = require('Utils');
//
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.Form = (function() {
    function Form(object_desc, value) {
        var self = this;
        this.formNumber = ++Form.count;
        this.formID = 'js_composer_form_' + this.formNumber.toString();
        this.elements = {
            'form':         JSComposer.Utils.makeElement('form', {'name': this.formID, 'id': this.formID, 'method':'POST'}),
            'body':         JSComposer.Utils.makeElement('div', {'className':'form body'}),
            'footer':       JSComposer.Utils.makeElement('div', {'className':'form footer'}),
            'submit':       JSComposer.Utils.makeElement('div', {'className':'submit button'})
        };
        JSComposer.Utils.setText(this.elements.submit, "Submit");
        JSComposer.Utils.attachEvent(this.elements.submit, 'click', function (e) { return self.OnSubmit(e); });
        this.field = JSComposer.Field.CreateObject(object_desc, value);
        console.log(this.field);
    }

    Form.count = 0;
    Form.Objects = {};

    Form.RegisterField = function(type, constructor) {
        if (Form.Objects[type] !== undefined) throw "Object already defined: " + type;
        Form.Objects[type] = constructor;
    };

    Form.CreateObject = function(type_desc, value) {
        if (Form.Objects[type] !== undefined) {
            return new (Form.Objects[type])(type_desc, value);
        }
        return undefined;
    };

    Form.prototype.Render = function (target) {
        this.elements.footer.appendChild(this.elements.submit);
        this.elements.form.appendChild(this.elements.body);
        this.elements.form.appendChild(this.elements.footer);
        this.field.Render(this.elements.body);
        target.appendChild(this.elements.form);
    }

    Form.prototype.GetObject = function() {
        return JSON.stringify(this.field.GetValue());
    }

    Form.prototype.OnSubmit = function() {
        var value       = this.GetObject(),
            field       = JSComposer.Utils.makeElement('input', {'type':'hidden','name':'json','value':value});

        this.elements.form.appendChild(field);
        this.elements.form.submit();
    }

    return Form;
}());
//var Form        = require('Form'),
//    Field       = require('Field'),
//    Utils       = require('Utils');
//
if (window.JSComposer === undefined) { window.JSComposer = {}; }
JSComposer.TestForm = (function(){
    function TestForm(value) {
        value = JSComposer.Utils.ldef(value, TestForm.Default);
        JSComposer.Form.call(this, TestForm.ObjectDesc, value);
    }

    TestForm.prototype = new JSComposer.Form();
    TestForm.prototype.constructor = TestForm;

    TestForm.Default        = {
        'id':           'test_form_id_1',

    };
    TestForm.KeyDesc        = {'type':'select'};
    TestForm.ValueDesc      = {'type':'number'};
    TestForm.ObjectDesc     = {
        'type':         'object',
        'fields':       {
            'id':           {'type':'text','label':'ID'},
            'formula':      {'type':'text','label':'Formula'},
            'bid':          {'type':'number','label':'CPM Bid'},
            'blah':         {'type':'select','label':'Blah!','options':{'a':'A!','b':'B!!'}}
        },
        'order':        ['id','formula','bid','blah']
    };

    return TestForm;
}());
