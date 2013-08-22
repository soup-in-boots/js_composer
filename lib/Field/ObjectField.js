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
