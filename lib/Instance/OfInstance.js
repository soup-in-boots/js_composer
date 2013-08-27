(function() {
    if (typeof window.JSComposer === 'undefined') window.JSComposer = {};

    function OneOfInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);

        this.options = this.GetOptions();
        var $self = this,
            type = undefined,
            option = undefined;

        if (typeof value !== 'undefined') {
            for (var i = 0, l = this.oneOf.length; i < l; ++i) {
                if (tv4.validate(value, this.oneOf[i])) {
                    type = this.oneOf[i];
                    option = i;
                    break;
                }
            }
        }

        if (typeof type === 'undefined') {
            type = this.oneOf[0];
            option = 0;
        }

        JSComposer.Utils.applyClass(this.elements.ctr, 'entry');
        this.entry = new JSComposer.Entry(this.context, this, {'enum':this.options}, type, option.toString(), value);
        this.entry.OnKeyChange = JSComposer.Utils.appendFunction(this.entry.OnKeyChange, function() { $self.OnKeyChange(); });
    }

    OneOfInstance.prototype = new JSComposer.Instance();
    OneOfInstance.prototype.constructor = OneOfInstance;
    Object.defineProperty(OneOfInstance.prototype, 'super', JSComposer.Instance);

    OneOfInstance.prototype.Render = function(target) {
        this.entry.Render(this.elements.ctr);
        JSComposer.Instance.prototype.Render.call(this, target);
    };

    OneOfInstance.prototype.OnKeyChange = function() {
        var key = this.entry.GetKey(),
            schema = this.oneOf[key];

        this.entry.SetValueSchema(schema, this.entry.GetValue());
    }

    OneOfInstance.prototype.GetOptions = function() {
        var options = {},
            l = this.oneOf.length,
            i = 0;

        for (; i < l; ++i) {
            var s = this.oneOf[i];
            console.log("Got Schema: ", this.oneOf[i]);
            options[i] = JSComposer.Utils.ldef(s.title, s.id, s.type, i);
        }

        console.log("Got Options: ", options);

        return options;
    }

    JSComposer.OneOfInstance = OneOfInstance;
    JSComposer.Instance.RegisterInstance('oneOf',  OneOfInstance);
}());
