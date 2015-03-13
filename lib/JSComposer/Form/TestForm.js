//var Form        = require('Form'),
//    Field       = require('Field'),
//    Utils       = require('Utils');
//
if (window.JSComposer === undefined) { window.JSComposer = {}; }
JSComposer.TestForm = (function(){
    function TestForm(value) {
        value = JSComposer.Utils.ldef(value, TestForm.Default);
        JSComposer.Form.call(this, TestForm.ObjectDesc, value);
    }

    TestForm.prototype = new JSComposer.Form();
    TestForm.prototype.constructor = TestForm;

    TestForm.Default        = {
        'id':           'test_form_id_1',

    };
    TestForm.KeyDesc        = {'type':'select'};
    TestForm.ValueDesc      = {'type':'number'};
    TestForm.ObjectDesc     = {
        'type':         'object',
        'fields':       {
            'id':           {'type':'text','label':'ID'},
            'formula':      {'type':'text','label':'Formula'},
            'bid':          {'type':'number','label':'CPM Bid'},
            'blah':         {'type':'select','label':'Blah!','options':{'a':'A!','b':'B!!'}}
        },
        'order':        ['id','formula','bid','blah']
    };

    return TestForm;
}());
