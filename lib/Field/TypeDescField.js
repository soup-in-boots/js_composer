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
