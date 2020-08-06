const ini = require('ini');
function loader(source) {
	return `export default ${JSON.stringify(ini.parse(source, 'utf-8'))}`;
}

module.exports = loader;
