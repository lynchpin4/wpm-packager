var Packager = {};
var grrunt = null;

if (!global.atob)
{
	global.atob = function atob(str)
	{
		return new Buffer(str).toString("base64");
	}
}

Packager.greet = function()
{
	console.log(' -- wpm packager core v0.1 --');
}

Packager.log = function(msg)
{
	if (grrunt != null)
	{
		grrunt.log.writeln(msg);
	}
	else
	{
		console.log(msg);
	}
}

Packager.setGrunt = function(grunt)
{
	grrunt = grunt;
}

Packager.Package = function()
{
	this.name = "set-name";
    this.context = "page";
	this.js = [];
	this.css = [];
	this.files = [];
	this.inlineImages = [];
}

Packager.Package.prototype.setName = function(name)
{
	this.name = name;
}

Packager.Package.prototype.setContext = function(context)
{
    this.context = context;
}

Packager.PackageBuilder = function()
{
	this.package = new Packager.Package();
}

// takes a loaded js file as a string and adds it to the js object array
Packager.PackageBuilder.prototype.addJs = function(name, js)
{
	this.package.js.push({ name: name, src: atob(js) });
	Packager.log('added '+name+' to js package.');
}

Packager.PackageBuilder.prototype.addCss = function(name, css)
{
	this.package.css.push({ name: name, src: atob(css) });
	Packager.log('added '+name+' to css package.');
}

Packager.PackageBuilder.prototype.addFile = function(name, file)
{
	this.package.files.push({ name: name, src: atob(file) });
	Packager.log('added '+name+' to files package.');
}

Packager.PackageBuilder.prototype.toString = function()
{
	return JSON.stringify(this.package);
}

module.exports = Packager;