//var Utils           = require('Utils');
//
if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.Form = (function() {
    function Form(object_desc, value) {
        var self = this;
        this.formNumber = ++Form.count;
        this.formID = 'js_composer_form_' + this.formNumber.toString();
        this.elements = {
            'form':         JSComposer.Utils.makeElement('form', {'name': this.formID, 'id': this.formID, 'method':'POST'}),
            'body':         JSComposer.Utils.makeElement('div', {'className':'form body'}),
            'footer':       JSComposer.Utils.makeElement('div', {'className':'form footer'}),
            'submit':       JSComposer.Utils.makeElement('div', {'className':'submit button'})
        };
        JSComposer.Utils.setText(this.elements.submit, "Submit");
        JSComposer.Utils.attachEvent(this.elements.submit, 'click', function (e) { return self.OnSubmit(e); });
        this.field = JSComposer.Field.CreateObject(object_desc, value);
        console.log(this.field);
    }

    Form.count = 0;
    Form.Objects = {};

    Form.RegisterField = function(type, constructor) {
        if (Form.Objects[type] !== undefined) throw "Object already defined: " + type;
        Form.Objects[type] = constructor;
    };

    Form.CreateObject = function(type_desc, value) {
        if (Form.Objects[type] !== undefined) {
            return new (Form.Objects[type])(type_desc, value);
        }
        return undefined;
    };

    Form.prototype.Render = function (target) {
        this.elements.footer.appendChild(this.elements.submit);
        this.elements.form.appendChild(this.elements.body);
        this.elements.form.appendChild(this.elements.footer);
        this.field.Render(this.elements.body);
        target.appendChild(this.elements.form);
    }

    Form.prototype.GetObject = function() {
        return JSON.stringify(this.field.GetValue());
    }

    Form.prototype.OnSubmit = function() {
        var value       = this.GetObject(),
            field       = JSComposer.Utils.makeElement('input', {'type':'hidden','name':'json','value':value});

        this.elements.form.appendChild(field);
        this.elements.form.submit();
    }

    return Form;
}());
