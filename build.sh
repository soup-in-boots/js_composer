#!/bin/bash

VERSION="0.0.1"
SRC_DIR="lib"
DEST="js_composer_${VERSION}.js"
FIELD_ORDER="StaticField TextField PasswordField NumberField IntegerField SelectField BooleanField OrderField StructField ObjectField ListField TypeDescField"
FIELDS=""
for field in $FIELD_ORDER
do
    FIELDS="${FIELDS} Field/${field}.js"
done
FILES="Utils.js Field.js Entry.js ${FIELDS} Form.js Form/*.js"

echo '' > ${DEST}

for file in $FILES
do
    cat `echo $SRC_DIR/${file}` >> ${DEST}
done
