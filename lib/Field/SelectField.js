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
