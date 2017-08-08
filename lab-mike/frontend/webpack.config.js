'use strict';

require('dotenv').config();
const production = process.env.NODE_ENV === 'production';

const {DefinePlugin, EnvironmentPllugin} = require('webpack');
