define('JSComposer/Instance/StringInstance', ['JSComposer/Utils', 'JSComposer/Instance', 'JSComposer/Options'], function(Utils, Instance, Options) {
    function StringInstance(context, parent, schema, value) {
        var s = this;
        schema = Utils.ldef(schema, {});
        Instance.apply(this, arguments);
        this.is_big = Utils.ldef(schema.big, false);
        if (this.is_big) {
            this.elements.text  = Utils.makeElement('textarea', {});
            Utils.applyClass(this.elements.ctr, "big");
        } else {
            this.elements.text = Utils.makeElement('input', {'type':'text', 'className':'form-control'});
        }
        this.elements.text.value = Utils.ldef(value, '');
        Utils.attachEvent(this.elements.text, 'change', function() { s.OnChange(); });
    }

    StringInstance.prototype = new Instance();
    StringInstance.prototype.constructor = StringInstance;

    StringInstance.prototype.Render = function(target) {
        this.elements.ctr = this.elements.text;
        target.appendChild(this.elements.ctr);
    }

    StringInstance.prototype.GetValue = function() {
        var value = this.elements.text.value;
        if (Options.emptyStringsAsNull() && value === "") {
            value = null;
        } else {
            value = value;
        }
        return value;
    }

    StringInstance.prototype.OnChange = function() {
        this.value = this.GetValue();
    }

    Instance.RegisterInstance('string', StringInstance);

    return StringInstance;
});
