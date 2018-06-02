/* jshint esversion: 6 */
const express = require('express');
const system = require('fs');
const framework = express();
framework.listen(3000);

if(process.argv.indexOf('-conf') == -1)
{
    framework.get('/', (req, res) => {
        res.send(system.readFileSync(__dirname + '/default/index.html', 'utf-8'));
    });
} else {
    const config = JSON.parse(system.readFileSync(process.argv[process.argv.indexOf('-conf') + 1], 'utf-8'));
    framework.get('/', (req, res) => {
        // automatically parses a index.html file for /
        res.send(system.readFileSync(config.root + "/index.html", 'utf-8'));
    });
    Object.keys(config.routes).forEach(route => {
        framework.get('/' + route, (req, res) => {
            // loads each route in config
            res.send(system.readFileSync(config.root + '/' + config.routes[route], 'utf-8'));
        });
    });
}