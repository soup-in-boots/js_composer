(function() {
    if (typeof window.JSComposer === 'undefined') window.JSComposer = {};

    function OfInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);
    }

    OfInstance.prototype = new JSComposer.Instance();
    OfInstance.prototype.constructor = OfInstance;

    OfInstance.Incorporate = function(instance, schema) {
    }

    function OneOfInstance(context, parent, schema, value) {
        OfInstance.apply(this, arguments);
    }

    OneOfInstance.prototype = new OfInstance();
    OneOfInstance.prototype.constructor = OneOfInstance;

    function AnyOfInstance(context, parent, schema, value) {
        OfInstance.apply(this, arguments);
    }

    AnyOfInstance.prototype = new OfInstance();
    AnyOfInstance.prototype.constructor = AnyOfInstance;

    function AllOfInstance(context, parent, schema, value) {
        OfInstance.apply(this, arguments);
    }

    AllOfInstance.prototype = new OfInstance();
    AllOfInstance.prototype.constructor = AllOfInstance;

    JSComposer.OneOfInstance = OneOfInstance;
    JSComposer.AnyOfInstance = AnyOfInstance;
    JSComposer.AllOfInstance = AllOfInstance;
}());
