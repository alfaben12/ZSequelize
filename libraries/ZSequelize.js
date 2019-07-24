const Sequelize = require('sequelize');

/**
 * ZSqequelize
 *
 * An open source application development libraries for ExpressJS framework
 *
 * Copyright (c) 2019, Alfaben
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	ZSequelize
 * @author	Alfaben
 * @copyright	Copyright (c) 2019 Alfaben (https://github.com/alfaben12/)
 * @link	https://alfaben12.github.io/ZSequelize/
 * @since	Version 1.0.0
 * @filesource
 */

exports.insertValues = function(values, modelName) {
		const Model = require('../models/'+ modelName);
		return new Promise((resolve, reject) => {
		Model
			.create(values)
			.then((result) => resolve({result: result._options.isNewRecord == true ? 1 : 0, record: result.dataValues}))
			.catch((err) => reject(err));
	});
};

exports.updateValues = function(values, anyWhere, modelName) {
		const Model = require('../models/'+ modelName);
		return new Promise((resolve, reject) => {
		Model
			.update(values, { where: anyWhere })
			.then((result) => resolve({result: result[0]}))
			.catch((err) => reject(err));
	});
};

exports.destroyValues = function(anyWhere, modelName) {
		const Model = require('../models/'+ modelName);
		return new Promise((resolve, reject) => {
		Model
			.destroy({where: anyWhere})
			.then((result) => resolve({result: result}))
			.catch((err) => reject(err));
	});
};

exports.fetch = function(anyField, anyWhere, orderBy, groupBy, modelName) {
	if (!Array.isArray(anyField)) {
		console.error('Value must contain an array.');
		process.exit();
	}else{
		anyField = anyField;
	}

	if (anyWhere === false) {
		anyWhere = '';
		findAll = true;
	}else{
		anyWhere = anyWhere;
		findAll = false;
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
					result: result === null ? 0 : 1,
					joinFind : 'Fetch One',
					dataValues: result
				}))
				.catch((err) => reject(err));
			});
	}else{
		return new Promise((resolve, reject) => {
			Model
				.findAll({
				attributes: anyField,
				order: orderBy,
				group : groupBy
				})
			.then((result) => resolve({
				result: result.length > 0 ? 1 : 0,
				joinFind : 'Fetch All',
				dataValues: result
			}))
			.catch((err) => reject(err));
		});
	}
};

exports.fetchJoins = function(anyField, anyWhere, orderBy, groupBy, modelName, modelJoins) {
	if (!Array.isArray(anyField)) {
		console.error('The value must contain the specified array and object.');
		process.exit();
	}else{
		anyField = anyField;
	}

	if (anyWhere === false) {
		anyWhere = '';
		findAll = true;
	}else{
		anyWhere = anyWhere;
		findAll = false;
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
		console.log('Model join must contain an array.');
		process.exit();
	}else{
		modelJoins = modelJoins;
	}

	let includes = [];
	for (let join_number = 0; join_number < modelJoins.length; join_number++) {
		let include_object = {};

		const ModelOne = require('../models/'+ modelJoins[join_number][0].fromModel);
		const ModelTwo = require('../models/'+ modelJoins[join_number][0].toModel);
		if (modelJoins[join_number][0].bridgeType === 'hasMany') {
			ModelOne.hasMany(ModelTwo, {foreignKey:modelJoins[join_number][0].toKey})
		}else if (modelJoins[join_number][0].bridgeType === 'belongsTo') {
			ModelOne.belongsTo(ModelTwo, {foreignKey:modelJoins[join_number][0].fromKey})
		}else{
			ModelOne.hasOne(ModelTwo, {foreignKey:modelJoins[join_number][0].toKey})
		}

		let where_object = {};
		where_object[modelJoins[join_number][0].toKey] = Sequelize.col(modelJoins[join_number][0].fromKey);

		include_object['attributes'] = modelJoins[join_number][0].attributes;
		include_object['model'] = ModelTwo;
		include_object['where'] = where_object;
		
		includes.push(include_object);
	}

	const Model = require('../models/'+ modelName);
	
	if (!findAll) {
		return new Promise((resolve, reject) => {
			Model
				.findOne({
					attributes: anyField,
					include: includes,
					where: anyWhere,
					order: orderBy,
					group : groupBy
				})
				.then((result) => resolve({
					result: result !== null ? 1 : 0,
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
					include: includes,
					order: orderBy,
					group : groupBy
				})
				.then((result) => resolve({
					result: result !== null ? 1 : 0,
					joinFind : 'Fetch All',
					dataValues: result === null ? [] : result
				}))
				.catch((err) => reject(err));
		});
	}
};