define('JSComposer/Instance/ObjectInstance', ['JSComposer/Utils', 'JSComposer/Schema', 'JSComposer/Instance', 'JSComposer/Entry', 'JSComposer/Options'], function(Utils, Schema, Instance, Entry, Options) {
    // TODO: Update for schema changes, including changes to
    // additionalProperties and properties.
    //
    // Optional properties are now defined as any defined
    // under "properties" but not listed in "required",
    // additionalProperties is now defined as either a
    // boolean (in which case any valid type shall suffice)
    // or a single schema (to which any additionalProperties
    // must conform).
    function ObjectInstance(context, parent, schema, value) {
        Instance.apply(this, arguments);
        // We need all these schema properties
        this.properties             = Utils.ldef(this.properties, {});
        this.additionalProperties   = Utils.ldef(this.additionalProperties, true);
        this.patternProperties      = Utils.ldef(this.patternProperties, {});
        this.required               = Utils.ldef(this.required, []);

        // Some internal properties
        this.supported              = Utils.getKeys(this.properties);
        this.patterns               = Utils.map(function(rxs) { return new RegExp(rxs); }, Utils.getKeys(this.patternProperties));
        this.property_map           = {
            'required':                 [],
            'optional':                 [],
            'pattern':                  [],
            'additional':               []
        };
        this.property_pam           = {};
        this.entries                = {
            'required':                 [],
            'optional':                 [],
            'pattern':                  [],
            'additional':               [],
            'by_key':                   {}
        };
        this.elements.sections      = {};
        this.section_count          = 0;
        this.title                  = Utils.ldef(this.title, "An Object");

        // Figure out what our current value defines and what category they fall into
        value = Utils.ldef(value, {});

        this.property_map.required = this.required;
        for (var i = 0; i < this.property_map.required.length; ++i) {
            this.property_pam[this.property_map.required[i]] = 'required';
        }

        for (var k in this.properties) {
            if (this.property_pam.hasOwnProperty(k)) continue;
            this.property_map.optional.push(k);
            this.property_pam[k] = 'optional';
        }

        for (var k in value) {
            if (this.property_pam.hasOwnProperty(k)) continue;
            if (Utils.any(function(rx) { return e.exec(k) !== null; }, this.patterns)) {
                this.property_map.pattern.push(k);
                this.property_pam[k] = 'pattern';
            } else {
                if (Options.allowAdditionalProperties()) {
                    this.property_map.additional.push(k);
                    this.property_pam[k] = 'additional';
                }
            }
        }

        // UI Components
        this.elements.body      = Utils.makeElement('div', {'className':'panel-body'});
        this.elements.header    = Utils.makeElement('div', {'className':'panel-heading'});
        this.elements.title     = Utils.makeElement('h4', {'className':'panel-title'});
        Utils.setText(this.elements.title, this.title);
        Utils.applyClass(this.elements.ctr, 'object');
        Utils.applyClass(this.elements.ctr, 'panel');
        Utils.applyClass(this.elements.ctr, 'panel-default');
        this.elements.header.appendChild(this.elements.title);
        this.elements.ctr.appendChild(this.elements.header);
        this.elements.ctr.appendChild(this.elements.body);

        // Rendering
        value = Utils.ldef(value, {});

        if (this.property_map.required.length > 0) {
            this.AddSection('required', this.property_map.required, value);
        }

        if (this.property_map.optional.length > 0) {
            this.AddSection('optional', this.property_map.optional, value);
        }

        if (this.patterns.length > 0) {
            this.AddSection('pattern', this.property_map.pattern, value);
        }

        if (Options.allowAdditionalProperties() && this.additionalProperties !== false) {
            console.log("[JSComposer/ObjectInstance] Adding section for additional properties");
            this.AddSection('additional', this.property_map.additional, value);
        }

        this.CompilePatterns();
    }

    ObjectInstance.prototype = new Instance();
    ObjectInstance.prototype.constructor = ObjectInstance;

    ObjectInstance.Default      = {};
    ObjectInstance.Descriptor   = {
        'type':         'object_type', // Insert maniacal laughter here
        'properties':   {
            'label':        {'type':'text', 'label':'Label'},
            'header':       {'type':'boolean', 'label':'Display Header'},
            'properties':   {
                'type':                     'object',
                'additionalProperties':     {},
                'label':                    'Properties'
            },
            'order':        {'type':'order','options':[],'label':'Instance Order'}
        }
    };
    ObjectInstance.PropertyOptions      = {
        'required':                 {'deletable':false, 'more':false, 'header':'Required Properties'},
        'optional':                 {'deletable':true, 'more':true, 'header':'Optional Properties'},
        'pattern':                  {'deletable':true, 'more':true, 'header':'Patterned Properties'},
        'additional':               {'deletable':true, 'more':true, 'header':'Extra Properties'}
    };

    ObjectInstance.prototype.GetKeySchema = function(type) {
        switch (true) {
            case type == 'required':
            case type == 'optional' && Options.alwaysRenderOptional():
                return Schema.Ref('#/definitions/label');
                break;
            case type == 'optional':
                return {'enum':this.property_map.optional};
                break;
            case type == 'pattern':
            default:
                return {'type':'string'};
        }
    };

    ObjectInstance.prototype.AddSection = function(type, properties, value) {
        var options = ObjectInstance.PropertyOptions[type];
        ++this.section_count;

        if (type == 'required' || (type == 'optional' && Options.alwaysRenderOptional())) {
            var ctr     = this.elements.ctr,
                header  = this.elements.header,
                title   = this.elements.title,
                body    = this.elements.body,
                footer  = undefined,
                more    = undefined;

            if (options.more && !(type == 'optional' && Options.alwaysRenderOptional())) {
                footer  = Utils.makeElement('div', {'className':'object-section panel-footer text-right'});
                ctr.appendChild(footer);
            }

            Utils.applyClass(title, 'float-pair');
            header.style.overflow = 'auto';
        } else {
            var ctr     = Utils.makeElement('div', {'className':'object-section panel panel-default'}),
                header  = Utils.makeElement('div', {'className':'object-section panel-heading'}),
                title   = Utils.makeElement('h6', {'className':'object-section panel-title'}),
                body    = Utils.makeElement('div', {'className':'object-section panel-body'}),
                footer  = Utils.makeElement('div', {'className':'object-section panel-footer text-right'}),
                more    = undefined;

            Utils.applyClass(body, type);
            Utils.applyClass(header, type);
            Utils.setText(title, options.header);
            header.appendChild(title);
            ctr.appendChild(header);
            ctr.appendChild(body);
            ctr.appendChild(footer);
            this.elements.body.appendChild(ctr);
        }


        if (options.more && !(Options.alwaysRenderOptional() && type == 'optional')) {
            var $self = this;
            more = Utils.makeElement('button', {'type':'button', 'className':'create btn btn-success'});
            Utils.setText(more, 'Add');
            Utils.attachEvent(more, 'click', function() {
                $self.OnAddEntry(type);
            });
            footer.appendChild(more);
        }

        this.elements.sections[type] = body;

        for (var i = 0; i < properties.length; ++i) {
            var k = properties[i];
            if (!this.properties[k]) continue;
            if (type !== 'required' && !(value.hasOwnProperty(k) || Options.alwaysRenderOptional())) continue;
            var s = this.GetKeySchema(type);
            s.title = typeof this.properties[k].title != 'undefined' ? this.properties[k].title : s.title;
            this.AddEntry(type, s, this.properties[k], k, value[k], ObjectInstance.PropertyOptions[type]);
        }
    }

    ObjectInstance.prototype.AddEntry = function(type, key_desc, value_desc, key, value) {
        var $self       = this,
            entry       = new Entry(this.context, this, key_desc, value_desc, key, value),
            ctr         = Utils.makeElement('div', {'className':'control-group form-group'}),
            options     = ObjectInstance.PropertyOptions[type];

        entry.on('key-change', this.OnChange.bind(this, type, 'key', entry));
        entry.on('value-change', this.OnChange.bind(this, type, 'value', entry));

        if (type === 'optional') {
            this.useOptionalKey(key);
        }

        if (options.deletable && !(type == 'optional' && Options.alwaysRenderOptional())) {
            delete_btn = Utils.makeElement('button', {'type':'button', 'className':'delete btn btn-danger'});
            Utils.setText(delete_btn, 'Delete');
            Utils.attachEvent(delete_btn, 'click', function() {
                entry.Destroy();
                ctr.parentElement.removeChild(ctr);
                var index = $self.entries[type].indexOf(entry);
                if (index !== -1) {
                    $self.entries[type].splice(index, 1);
                }
            });
            btn_group.appendChild(delete_btn);
        }

        //ctr.appendChild(title);
        this.entries[type].push(entry);

        entry.Render(ctr);
        var section_node = this.elements.sections[type];
        section_node.appendChild(ctr);
    };

    ObjectInstance.prototype.OnAddEntry = function(type) {
        var properties  = this[type],
            options     = ObjectInstance.PropertyOptions[type],
            key_schema  = this.GetKeySchema(type),
            key         = undefined,
            val_schema  = undefined;

        if (type === 'additional') {
            if (typeof this.additionalProperties == 'boolean') {
                val_schema = {
                    'oneOf':        [
                        {'type':'string'},
                        {'type':'number'},
                        {'type':'object'}
                    ]
                };
                key = '';
            } else {
                val_schema = this.additionalProperties;
            }
        } else if (type === 'pattern') {
            var valid   = false,
                pattern = undefined;
            do {
                key = prompt("Enter a new property name.");

                if (key === null) {
                    key = undefined;
                    break;
                }

                pattern = this.patternScan(key);
                if (pattern) {
                    val_schema = this.patternProperties[pattern];
                    valid = true;
                }
            } while (valid = false);
        } else if (type === 'optional') {
            key = this.property_map.optional[0];
            val_schema = this.properties[key];
        }

        if (typeof key_schema !== 'undefined' &&
            typeof val_schema !== 'undefined') {
            this.AddEntry(type, key_schema, val_schema, key, undefined, options);
        }
    };

    ObjectInstance.prototype.patternScan = function(key) {
        if (typeof this.patternProperties === 'undefined') { return undefined; }

        for (var pattern in this.patternProperties) {
            if (key.match(this.compiledPatterns[k])) {
                return pattern;
            }
        }

        return false;
    }

    ObjectInstance.prototype.useOptionalKey = function(key) {
        return;
        var index = this.additionalAvailable.indexOf(key);

        if (index < 0) throw "key_used_twice";

        this.additionalAvailable.splice(index, 1);
        this.additionalUsed.push(key);
        this.updateAdditionalOptions();
    }

    ObjectInstance.prototype.freeAdditionalKey = function(key) {
        var index = this.additionalUsed.indexOf(key);

        if (index < 0) throw "freeing_unused_key";

        this.additionalUsed.splice(index, 1);
        this.additionalAvailable.push(key);
        this.updateAdditionalOptions();
    }

    ObjectInstance.prototype.updateOptionalKeys = function() {
        var entries     = this.entries.optional,
            available   = this.additionalAvailable,
            options     = undefined,
            instance    = this;

        function get_options() {
            var o = {};
            for (var i = 0, l = available.length; i < l; ++i) {
                var key     = available[i],
                    title   = instance.additionalTitles[key];
                o[key] = title;
            }
            return o;
        }

        for (var i = 0, l = entries.length; i < l; ++i) {
            var entry   = entries[i],
                select  = entry.GetKeyInstance(),
                key     = select.GetValue(),
                title   = this.additionalTitles[key],
                tmp     = get_options();

            tmp[key] = title;
            select.SetOptions(tmp);
        }
    }

    ObjectInstance.prototype.CompilePatterns = function() {
        if (typeof this.patternProperties === 'undefined') { return undefined; }
        this.compiledPatterns = {};

        for (var pattern in this.patternProperties) {
            var rx = new RegExp(pattern);
            this.compiledPatterns[pattern] = rx;
        }
    }

    ObjectInstance.prototype.GetValue = function() {
        var o = {};

        for (var type in this.entries) {
            if (!this.entries.hasOwnProperty(type)) continue;
            var entries = this.entries[type];
            for (var i = 0, l = entries.length; i < l; ++i) {
                var k = entries[i].GetKey(),
                    v = entries[i].GetValue();

                o[k] = v;
            }
        }

        return o;
    };

    ObjectInstance.prototype.Render = function(target) {
        target.appendChild(this.elements.ctr);
    };

    ObjectInstance.prototype.FindEntry = function(key) {
        for (var k in this.entries) {
            if (!this.entries.hasOwnProperty(k)) continue;
            var entries = this.entries[k],
                l = entries.length,
                i = 0;

            for (i = 0; i < l; ++i) {
                if (entries[i].GetKey() === key) return entries[i];
            }
        }
        return undefined;
    };

    ObjectInstance.prototype.OnChange = function(type, source, entry) {
        if (type === 'optional' &&
            source === 'key') {
            var prev = entry.GetKeyInstance().prevValue,
                curr = entry.GetKeyInstance().currValue;
            //this.freeAdditionalKey(prev);
            //this.useAdditionalKey(curr);
            //this.updateAdditionalOptions();
            entry.SetValueSchema(this.properties[curr]);
        }
        this.value = this.GetValue();
    }

    ObjectInstance.prototype.GetKeys = function() {
        var a = [],
            i = 0;
            l = this.entries.length;

        for (; i < l; ++i) {
            a.push(this.entries[i].GetKey());
        }

        return a;
    };

    Instance.RegisterInstance('object', ObjectInstance);

    return ObjectInstance;
});
