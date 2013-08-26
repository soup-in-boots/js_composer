if (window.JSComposer === undefined) { window.JSComposer = {}; }

JSComposer.TypeDescInstance = (function(){
    function TypeDescInstance(schema, value) {
        value = JSComposer.Utils.ldef(value, {'type':'null'});
        JSComposer.Instance.apply(this, arguments);
        // In constructor to ensure all types are loaded
        TypeDescInstance.Initialize();

        var self = this;
        this.elements.key = JSComposer.Utils.makeElement('div', {'className':'key field'});
        this.elements.value = JSComposer.Utils.makeElement('div', {'className':'value field'});
        this.elements.key_node = JSComposer.Utils.makeElement('div', {'className':'node'});
        this.elements.select = JSComposer.Utils.makeSelect(TypeDescInstance.Keys, false);
        JSComposer.Utils.applyClass(this.elements.ctr, 'entry');

        this.elements.ctr.appendChild(this.elements.key);
        this.elements.key_node.appendChild(this.elements.select);
        this.elements.key.appendChild(this.elements.key_node);
        this.elements.ctr.appendChild(this.elements.value);
        JSComposer.Utils.setSelectValue(this.elements.select, value.type);

        JSComposer.Utils.attachEvent(this.elements.select, 'change', function() { self.OnTypeChange.apply(self, []); });

        this.OnTypeChange(value);
    };

    TypeDescInstance.Initialize = function() {
        // Only do this once
        if (TypeDescInstance.Initialized) { return undefined; }
        TypeDescInstance.Initialized = true;

        var l = JSComposer.Instance.ObjectKeys.length;

        for (var i = 0; i < l; ++i) {
            var key     = JSComposer.Instance.ObjectKeys[i],
                object  = JSComposer.Instance.Objects[key],
                desc    = JSComposer.Utils.ldef(object.Descriptor, {'type':'object', 'fields':{}, 'order':[]});

            TypeDescInstance.Keys.push(key);
            TypeDescInstance.Options[key] = desc;
        }
    };
    TypeDescInstance.Initialized = false;
    TypeDescInstance.Options = {};
    TypeDescInstance.Keys = [];

    TypeDescInstance.prototype = new JSComposer.Instance();
    TypeDescInstance.prototype.constructor = TypeDescInstance;

    TypeDescInstance.prototype.GetValue = function() {
        var type = JSComposer.Utils.getSelectValue(this.elements.select),
            val  = this.value.GetValue();

        val.type = type;

        return val;
    }

    TypeDescInstance.prototype.OnTypeChange = function(value) {
        // Get current value and potential desc
        var type = JSComposer.Utils.getSelectValue(this.elements.select),
            desc = TypeDescInstance.Options[type];

        console.log("TypeDescInstance.OnTypeChange :: Setting Type: ", type, desc);

        // Don't change anything if the type hasn't changed
        if (this.currType === type) { return undefined;}

        // Destroy value if currently set
        if (this.value !== undefined) { this.value.Destroy(); }

        // Create value, render it, and update our state
        this.currType = type;
        this.value = JSComposer.Instance.CreateInstance(desc, value);
        this.value.Render(this.elements.value);
    }

    JSComposer.Instance.RegisterInstance('schema', TypeDescInstance);

    return TypeDescInstance;
}());
