if (window.JSComposer === undefined) window.JSComposer = {};
JSComposer.ObjectInstance = (function(){
    function ObjectInstance(context, parent, schema, value) {
        JSComposer.Instance.apply(this, arguments);
        this.additionalAvailable = this.additionalProperties ? JSComposer.Utils.getKeys(this.additionalProperties) : [];
        this.additionalUsed = [];

        this.entries    = {
            properties: [],
            additionalProperties: [],
            patternProperties: []
        };
        this.elements.sections = {};
        this.section_count = 0;

        this.elements.body  = JSComposer.Utils.makeElement('div', {'className':'object body'});
        if (typeof this.title !== 'undefined') {
            this.elements.header = JSComposer.Utils.makeElement('h3', {'className':'object header'});
            JSComposer.Utils.setText(this.elements.header, this.title);
        }

        JSComposer.Utils.applyClass(this.elements.ctr, 'object');

        value = JSComposer.Utils.ldef(value, {});

        if (typeof this.properties !== 'undefined')
            this.AddSection('properties', this.properties, value);

        if (typeof this.additionalProperties != 'undefined')
            this.AddSection('additionalProperties', this.additionalProperties, value);

        if (typeof this.patternProperties != 'undefined')
            this.AddSection('patternProperties', this.patternProperties, value);

        this.CompilePatterns();
    }

    ObjectInstance.prototype = new JSComposer.Instance();
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
        'properties':               {'deletable':false,'more':false, 'header':'Required'},
        'additionalProperties':     {'deletable':true, 'more':true, 'header':'Optional'},
        'patternProperties':        {'deletable':true, 'more':true, 'header':'Extra'}
    };

    ObjectInstance.prototype.GetKeySchema = function(type) {
        switch (type) {
            case 'properties':
                return {'oneOf':[JSComposer.Schema.Ref('#/definitions/label')]};
            case 'additionalProperties':
                if (this.additionalTitles === undefined) {
                    this.additionalTitles = JSComposer.Utils.getTitles(this.additionalProperties);
                }
                var available = {};
                for (var i = 0, l = this.additionalAvailable.length; i < l; ++i) {
                    var key     = this.additionalAvailable[i],
                        title   = this.additionalTitles[key];

                    available[key] = title;
                }
                return {'enum':available};
            case 'patternProperties':
                return {'type':'string'};
            default:
                return {};
        }
    };

    ObjectInstance.prototype.AddSection = function(type, properties, value) {
        ++this.section_count;

        var options = ObjectInstance.PropertyOptions[type],
            ctr     = JSComposer.Utils.makeElement('div', {'className':'object section'});
            header  = JSComposer.Utils.makeElement('h4', {'className':'object section header'}),
            content = JSComposer.Utils.makeElement('div', {'className':'object section content'}),
            footer  = JSComposer.Utils.makeElement('div', {'className':'object section footer'}),
            more    = undefined;

        JSComposer.Utils.setText(header, options.header);
        JSComposer.Utils.applyClass(ctr, type);

        if (options.more) {
            var $self = this;
            more = JSComposer.Utils.makeElement('div', {'className':'create button'});
            JSComposer.Utils.attachEvent(more, 'click', function() {
                $self.OnAddEntry(type);
            });
            footer.appendChild(more);
        }

        ctr.appendChild(header);
        ctr.appendChild(content);
        ctr.appendChild(footer);
        this.elements.body.appendChild(ctr);

        this.elements.sections[type] = content;

        for (var k in properties) {
            if (type !== 'properties' && !value.hasOwnProperty(k)) continue;
            var s = this.GetKeySchema(type);
            s.title = typeof properties[k].title != undefined ? properties[k].title : s.title;
            this.AddEntry(type, s, properties[k], k, value[k], ObjectInstance.PropertyOptions[type]);
        }
    }

    ObjectInstance.prototype.AddEntry = function(type, key_desc, value_desc, key, value) {
        var self        = this,
            entry       = new JSComposer.Entry(this.context, this, key_desc, value_desc, key, value),
            val_field   = entry.GetValueInstance(),
            key_field   = entry.GetKeyInstance(),
            ctr         = JSComposer.Utils.makeElement('div', {'className':'entry'});

        val_field.OnChange = JSComposer.Utils.appendFunction(val_field.OnChange, function() { self.OnChange(type, 'value', entry); });
        key_field.OnChange = JSComposer.Utils.appendFunction(key_field.OnChange, function() { self.OnChange(type, 'key', entry); });

        if (type === 'additionalProperties') {
            this.useAdditionalKey(key);
        }

        this.entries[type].push(entry);
        entry.Render(ctr);
        this.elements.sections[type].appendChild(ctr);
    };

    ObjectInstance.prototype.OnAddEntry = function(type) {
        var properties  = this[type],
            options     = ObjectInstance.PropertyOptions[type],
            key_schema  = this.GetKeySchema(type),
            key         = undefined,
            val_schema  = undefined;

        if (type === 'additionalProperties' &&
            this.additionalAvailable.length > 0) {
            key = this.additionalAvailable[0];
            val_schema = this.additionalProperties[key];
        } else if (type === 'patternProperties') {
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
        }

        if (typeof key !== 'undefined' &&
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

    ObjectInstance.prototype.useAdditionalKey = function(key) {
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

    ObjectInstance.prototype.updateAdditionalOptions = function() {
        var entries     = this.entries.additionalProperties,
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
            console.log("Options for ", key, '::', tmp);
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
        if (typeof this.title !== 'undefined') { this.elements.ctr.appendChild(this.elements.header); }
        this.elements.ctr.appendChild(this.elements.body);
        target.appendChild(this.elements.ctr);
    };

    ObjectInstance.prototype.FindEntry = function(key) {
        for (var k in this.entries) {
            if (!this.entries.hasOwnProperty(k)) continue;
            var entries = this.entries[k],
                l = entries.length,
                i = 0;

            console.log("Checking ", k, " entries:", entries);
            for (i = 0; i < l; ++i) {
                if (entries[i].GetKey() === key) return entries[i];
            }
        }
        return undefined;
    };

    ObjectInstance.prototype.OnChange = function(type, source, entry) {
        if (type === 'additionalProperties' &&
            source === 'key') {
            var prev = entry.GetKeyInstance().prevValue,
                curr = entry.GetKeyInstance().currValue;
            this.freeAdditionalKey(prev);
            this.useAdditionalKey(curr);
            this.updateAdditionalOptions();
            entry.SetValueSchema(this.additionalPropertys[curr]);
        }
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

    JSComposer.Instance.RegisterInstance('object', ObjectInstance);

    return ObjectInstance;
}());
