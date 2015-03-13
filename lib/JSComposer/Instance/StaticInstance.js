define('JSComposer/Instance/StaticInstance', ['JSComposer/Utils', 'JSComposer/Schema', 'JSComposer/Instance'], function(Utils, Schema, Instance) {
    function StaticInstance(context, parent, schema, value) {
        Instance.apply(this, arguments);

        var text_content = Utils.ldef(this.title, value, '');
        Utils.setText(this.elements.ctr, text_content);

        this.value = value;
    };

    StaticInstance.prototype = new Instance();
    StaticInstance.prototype.constructor = StaticInstance;

    StaticInstance.prototype.GetValue = function() {
        return this.value;
    }

    Instance.RegisterInstance(Schema.URI('#/definitions/label'), StaticInstance);

    return StaticInstance;
});
