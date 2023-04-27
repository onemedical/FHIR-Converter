// -------------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License (MIT). See LICENSE in the repo root for license information.
// -------------------------------------------------------------------------------------------------

var constants = require('./lib/constants/constants');
var fse = require('fs-extra');
var path = require('path');

fse.ensureDir(constants.TEMPLATE_FILES_LOCATION).then(function () {
    if (fse.readdir(constants.TEMPLATE_FILES_LOCATION, function (err, files) {
        if (files.length == 0) {
            fse.copy(constants.BASE_TEMPLATE_FILES_LOCATION, constants.TEMPLATE_FILES_LOCATION);
        }
        else {
            // delete any temp folders (ceeated by UpdateBaseTemplates)
            var existingFiles = fse.readdirSync(constants.TEMPLATE_FILES_LOCATION);
            existingFiles.forEach(function (fl) {
                try {
                    if (fl.startsWith('.temp')) {
                        let tempFolder = path.join(constants.TEMPLATE_FILES_LOCATION, fl);
                        console.log(`removing ${tempFolder}`);
                        fse.removeSync(tempFolder);
                    }
                }
                catch (err) {
                    console.log(`${fl} removal failed with error ${err}`);
                }
            });
        }
    }));
});
