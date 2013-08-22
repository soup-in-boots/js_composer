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
