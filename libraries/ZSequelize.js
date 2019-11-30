
const Sequelize = require('sequelize');

exports.insertValues = function(values, modelName) {
	const Model = require('../models/'+ modelName);
	return new Promise((resolve, reject) => {
		Model
		.create(values)
		.then((result) => resolve({result: result._options.isNewRecord, record: result.dataValues}))
		.catch((err) => reject(err));
	});
};

exports.updateValues = function(values, anyWhere, modelName) {
	const Model = require('../models/'+ modelName);
	return new Promise((resolve, reject) => {
		Model
		.update(values, { where: anyWhere })
		.then((result) => resolve({result: result[0] == 1 ? true : false}))
		.catch((err) => reject(err));
	});
};

exports.destroyValues = function(anyWhere, modelName) {
	const Model = require('../models/'+ modelName);
	return new Promise((resolve, reject) => {
		Model
		.destroy({where: anyWhere})
		.then((result) => resolve({result: result > 0 ? true : false}))
		.catch((err) => reject(err));
	});
};

exports.fetch = function(findAll, anyField, anyWhere, orderBy, groupBy, modelName) {
	if (anyField[0] == '*') {
		anyField = {};
	}else{
		if (!Array.isArray(anyField)) {
			console.error('Value must contain an array.');
			anyField = false;
		}else{
			anyField = anyField;
		}
	}
	
	if (anyWhere === false) {
		anyWhere = '';
	}else{
		anyWhere = anyWhere;
	}
	
	if (orderBy === false) {
		orderBy = '';
	}else{
		orderBy = orderBy;
	}
	
	if (groupBy === false) {
		groupBy = '';
	}else{
		groupBy = groupBy;
	}
	
	if (modelName == '' || modelName == null) {
		console.log('Model needed and not found.');
		process.exit();
	}else{
		modelName = modelName;
	}
	
	const Model = require('../models/'+ modelName);
	if (!findAll) {
		return new Promise((resolve, reject) => {
			Model
			.findOne({
				attributes: anyField,
				where: anyWhere,
				order: orderBy,
				group : groupBy
			})
			.then((result) => resolve({
				result: result !== null ? true : false,
				joinFind : 'Fetch One',
				dataValues: result,
			}))
			.catch((err) => reject(err));
		});
	}else{
		return new Promise((resolve, reject) => {
			Model
			.findAll({
				attributes: anyField,
				where: anyWhere,
				order: orderBy,
				group : groupBy
			})
			.then((result) => resolve({
				result: result.length > 0 ? true : false,
				joinFind : 'Fetch All',
				dataValues: result
			}))
			.catch((err) => reject(err));
		});
	}
};

exports.fetchJoins = function(findAll, anyField, anyWhere, orderBy, groupBy, modelName, modelJoins) {
	if (anyField[0] == '*') {
		anyField = {};
	}else{
		if (!Array.isArray(anyField)) {
			console.error('Value must contain an array.');
			anyField = false;
		}else{
			anyField = anyField;
		}
	}
	
	if (anyWhere === false) {
		anyWhere = '';
	}else{
		anyWhere = anyWhere;
	}
	
	if (orderBy === false) {
		orderBy = '';
	}else{
		orderBy = orderBy;
	}
	
	if (groupBy === false) {
		groupBy = '';
	}else{
		groupBy = groupBy;
	}
	
	if (modelName == '' || modelName == null) {
		console.log('Model needed and not found.');
		process.exit();
	}else{
		modelName = modelName;
	}
	
	if (!Array.isArray(modelJoins)) {
		console.log('model join selected harus array');
		process.exit();
	}else{
		modelJoins = modelJoins;
	}
	
	// let includes = [];
	// for (let join_number = 0; join_number < modelJoins.length; join_number++) {
	// 	let include_object = {};
		
	// 	const ModelOne = require('../models/'+ modelJoins[join_number][0].fromModel);
	// 	const ModelTwo = require('../models/'+ modelJoins[join_number][0].toModel);
	// 	if (modelJoins[join_number][0].bridgeType === 'hasMany') {
	// 		ModelOne.hasMany(ModelTwo, {foreignKey:modelJoins[join_number][0].toKey})
	// 	}else if (modelJoins[join_number][0].bridgeType === 'belongsTo') {
	// 		ModelOne.belongsTo(ModelTwo, {foreignKey:modelJoins[join_number][0].fromKey})
	// 	}else{
	// 		ModelOne.hasOne(ModelTwo, {foreignKey:modelJoins[join_number][0].toKey})
	// 	}
		
	// 	let where_object = {};
	// 	where_object[modelJoins[join_number][0].toKey] = Sequelize.col(modelJoins[join_number][0].fromKey);
		
	// 	let required = modelJoins[join_number][0].required;
	// 	include_object['attributes'] = modelJoins[join_number][0].attributes[0] == '*' ? {} : modelJoins[join_number][0].attributes;
	// 	include_object['model'] = ModelTwo;
	// 	include_object['where'] = where_object;
	// 	include_object['required'] = required;
	// 	// let nested_includes = [];
	// 	// if (includes !== false) {
	// 	// 	let includes = modelJoins[join_number][0].includes;
	// 	// 	for (let j = 0; j < includes.length; j++) {
	// 	// 		let nested_includes_object = {};
	// 	// 		const ModelOne = require('../models/'+ includes[j][0].fromModel);
	// 	// 		const ModelTwo = require('../models/'+ includes[j][0].toModel);
	// 	// 		if (includes[j][0].bridgeType === 'hasMany') {
	// 	// 			ModelOne.hasMany(ModelTwo, {foreignKey:includes[j][0].toKey})
	// 	// 		}else if (includes[j][0].bridgeType === 'belongsTo') {
	// 	// 			ModelOne.belongsTo(ModelTwo, {foreignKey:includes[j][0].fromKey})
	// 	// 		}else{
	// 	// 			ModelOne.hasOne(ModelTwo, {foreignKey:includes[j][0].toKey})
	// 	// 		}
				
	// 	// 		let where_object = {};
	// 	// 		where_object[includes[j][0].toKey] = Sequelize.col(includes[j][0].fromKey);
				
	// 	// 		let required = includes[j][0].required;
	// 	// 		nested_includes_object['attributes'] = includes[j][0].attributes[0] == '*' ? {} : includes[j][0].attributes;
	// 	// 		nested_includes_object['model'] = ModelTwo;
	// 	// 		nested_includes_object['where'] = where_object;
	// 	// 		nested_includes_object['required'] = required;

	// 	// 		nested_includes.push(nested_includes_object)
	// 	// 	}
	// 	// }

	// 	// include_object['include'] = nested_includes;
	// 	includes.push(include_object);
	// }

	const Model = require('../models/'+ modelName);
	// return modelJoins;
	
	if (!findAll) {
		return new Promise((resolve, reject) => {
			Model
			.findOne({
				attributes: anyField,
				include: modelJoins,
				where: anyWhere,
				order: orderBy,
				group : groupBy
			})
			.then((result) => resolve({
				result: result === null ? false : true,
				joinFind : 'Fetch One',
				dataValues: result === null ? [] : result
			}))
			.catch((err) => reject(err));
		});
	}else{
		return new Promise((resolve, reject) => {
			Model
			.findAll({
				attributes: anyField,
				where: anyWhere,
				include: modelJoins,
				order: orderBy,
				group : groupBy
			})
			.then((result) => resolve({
				result: result.length === 0 ? false : true,
				joinFind : 'Fetch All',
				dataValues: result.length === 0 ? [] : result
			}))
			.catch((err) => reject(err));
		});
	}
};