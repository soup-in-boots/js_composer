define(
    'JSComposer',                               /* Module Name */
    [                                           /* Dependencies */
        'JSComposer/Utils',
        'JSComposer/Schema',
        'JSComposer/Form',
        'JSComposer/Instance',
        'JSComposer/Entry',
        'JSComposer/Instance/ArrayInstance',
        'JSComposer/Instance/BooleanInstance',
        'JSComposer/Instance/IntegerInstance',
        'JSComposer/Instance/NumberInstance',
        'JSComposer/Instance/ObjectInstance',
        'JSComposer/Instance/OfInstance',
        'JSComposer/Instance/OrderInstance',
        'JSComposer/Instance/PasswordInstance',
        'JSComposer/Instance/SelectInstance',
        'JSComposer/Instance/StaticInstance',
        'JSComposer/Instance/StringInstance',
        'JSComposer/Instance/TypeDescInstance'
    ],
    function(
                Utils,
                Schema,
                Form,
                Instance,
                Entry,
                ArrayInstance,
                BooleanInstance,
                NumberInstance,
                ObjectInstance,
                OfInstance,
                OrderInstance,
                PasswordInstance,
                SelectInstance,
                StaticInstance,
                StringInstance,
                TypeDescInstance
            ) {                                /* Definition */
        return {
            'Utils':                Utils,
            'Schema':               Schema,
            'Form':                 Form,
            'Instance':             Instance,
            'Entry':                Entry,
            'ArrayInstance':        ArrayInstance,
            'BooleanInstance':      BooleanInstance,
            'NumberInstance':       NumberInstance,
            'ObjectInstance':       ObjectInstance,
            'OfInstance':           OfInstance,
            'OrderInstance':        OrderInstance,
            'PasswordInstance':     PasswordInstance,
            'SelectInstance':       SelectInstance,
            'StaticInstance':       StaticInstance,
            'StringInstance':       StringInstance,
            'TypeDescInstance':     TypeDescInstance
        };
    }
);
