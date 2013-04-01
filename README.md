express-simple-cdn
==================

A Node.js module for Express.js that makes using a CDN for your static assets a breeze. Supports multiple CDN hosts to distribute your static assets amongst multiple hosts.

[View this project on npmjs.org](https://npmjs.org/package/express-simple-cdn)

Installation
------------

    $ npm install express-simple-cdn

Usage
-----

These examples assumes you're also using Jade. Simply add any of following to your Express app.configure. You may also set different CDN host options in your production vs. development environments using specific configurations for each environment.

Call the module like so:

    var CDN = require('express-simple-cdn');
    
And then add a template variable assignment with your CDN host options:

This configuration will always use the one specified CDN host:
    
    app.locals.CDN = function(path) { return CDN(path, '//mycdn.com') };
    // In Jade, script(src=CDN('/js/myscript.js')) will become script(src='//mycdn.com/js/myscript.js')

This configuration will CRC hash your URLs to one of several CDN hosts in an array:
    
    app.locals.CDN = function(path) { return CDN(path, ['//cdn1.mycdn.com', '//cdn2.mycdn.com', '//cdn3.mycdn.com']) };
    // In Jade, script(src=CDN('/js/myscript.js')) will become script(src='//cdnX.mycdn.com/js/myscript.js'), where X is a consistent bucket number.
    
This configuration will output a file version number in the URL for making sure that the CDN networks pull the newest versions of your files after pushing updates when the useFileVersion is passed as true.

	server.locals.CDN = function (path, useFileVersion) {

        if(useFileVersion === undefined || useFileVersion == false)
            return CDN(path, config.CDNURL);
        else
            return CDN(path, config.CDNURL, config.CDNVersion);
    };

To simplify using dynamic versioning it is suggested you add a route to reroute your versioned requests to your static resources folder.

	server.get('/' + config.CDNVersion + '/*', function(req, res) {

        var url = 'static' + req.url.replace('/' + config.CDNVersion,'');

        fs.exists(url,function(exists) {
            if(exists)
                res.sendfile(url);
            else
                res.redirect('/404');
        });

    });
    
This configuration will not rewrite your URLs (useful for development environments):
    
    app.locals.CDN = function(path) { return CDN(path) };
    // In Jade, script(src=CDN('/js/myscript.js')) will become script(src='/js/myscript.js')
    
For any of the examples above, here's how to use the CDN function in your Jade template:

    // JavaScript
    script(src=CDN('/js/myscript.js'))
    
    // CSS
    link(href=CDN('/css/mycss.css'), rel='stylesheet')
    
    // Images
    img(src=CDN('/img/myimage.png'))
    
To Do
-----

* Add support for HTTPS specific CDN hosts.
* Improve documentation in README.

License
-------

Copyright (c) 2012 Jamie Steven, jamiesteven on github.

Licensed under the MIT license

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.