define('JSComposer/Entry', ['JSComposer/Utils', 'JSComposer/Instance', 'EventEmitter'], function(Utils, Instance) {
    function Entry(context, parent, key_desc, val_desc, key, value) {
        EventEmitter.call(this);
        var s = this;
        this.context = context;
        this.parent = parent;
        this.elements = {
            'key':      Utils.makeElement('label', {'className':'control-label col-sm-12 col-md-12 col-lg-3'}),
            'value':    Utils.makeElement('div', {'className':'controls col-sm-12 col-md-12 col-lg-9'})
        };
        this.schema = {
            'key':      key_desc,
            'value':    val_desc
        };
        this.fields = {
            'key':      Instance.CreateInstance(context, parent, key_desc, key),
            'value':    Instance.CreateInstance(context, parent, val_desc, value)
        }

        this.fields.key.on('change', this.emit.bind(this, 'key-change'));
        this.fields.value.on('change', this.emit.bind(this, 'value-change'));
    }

    Entry.prototype = new EventEmitter();
    Entry.prototype.constructor = Entry;

    Entry.prototype.GetKey = function() {
        return this.fields.key.GetValue();
    }

    Entry.prototype.GetKeyInstance = function() {
        return this.fields.key;
    }

    Entry.prototype.GetValue = function() {
        return this.fields.value.GetValue();
    }

    Entry.prototype.GetValueInstance = function() {
        return this.fields.value;
    }

    Entry.prototype.SetValueSchema = function(schema, value) {
        if (schema === this.schema.value) {
            return;
        }

        this.fields.value.Destroy()
        var instance = Instance.CreateInstance(this.context, this.parent, schema, value);
        instance.Render(this.elements.value);
        this.fields.value = instance;
        this.schema.value = schema;
    }

    Entry.prototype.Render = function(target) {
        this.fields.key.Render(this.elements.key);
        this.fields.value.Render(this.elements.value);
        target.appendChild(this.elements.key);
        target.appendChild(this.elements.value);
    }

    Entry.prototype.Destroy = function() {
        this.fields.key.Destroy();
        this.fields.value.Destroy();
        this.elements.key.parentNode.removeChild(this.elements.key)
        this.elements.value.parentNode.removeChild(this.elements.value)
    }

    return Entry;
});
