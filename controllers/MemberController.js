const MemberModel = require('../models/MemberModel');
const ZSequelize = require('../libraries/ZSequelize');
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

module.exports = {
	index: function(req, res) {
		res.send(Myaccount.tes);
	},
	
	processAdd: async function(req, res) {
		let name = req.body.name;
		let password = req.body.password;
		
		let value = {
			name: name,
			password: password,
		};
		try {
			transaction = await sequelize.transaction();
			let result = await ZSequelize.insertValues(value, 'MemberModel');
			await transaction.commit();

			res.status(200).json({
				message: 'Success POST.',
				data : result
			});
		}catch (err) {
			await transaction.rollback();
			res.status(400).json({
				message: err
			});
		}
	},
	
	processUpdate: async function(req, res) {
		let id = req.params.id;
		let name = req.body.name;
		let password = req.body.password;
		
		let value = {
			name: name,
			password: password,
		};
		
		let where = {id: id};
		
		let result = await ZSequelize.updateValues(value, where, 'MemberModel');
		res.status(200).json({
			message: 'Success PUT.',
			data : result
		});
	},
	
	processDelete: async function(req, res) {
		let idone = req.params.idone;
		let idtwo = req.params.idtwo;
		
		let where = {'id': [idone, idtwo]};
		let result = await ZSequelize.destroyMultiValues(where, 'MemberModel');
		res.status(200).json({
			message: 'Success Multi DELETE.',
			data : result
		});
	},
	
	processMultiDelete: async function(req, res) {
		let idone = req.params.idone;
		let idtwo = req.params.idtwo;
		
		let where = {'id': [idone, idtwo]};
		let result = await ZSequelize.destroyValues(where, 'MemberModel');
		res.status(200).json({
			message: 'Success DELETE.',
			data : result
		});
	},
	
	processGetMember: async function(req, res) {
		let field = ['id', [ Sequelize.fn('count', Sequelize.col('id')), 'count_same_name' ], 'name'];
		let where = {
			id: 1,
		};
		let orderBy = [['id', 'DESC']];
		let groupBy = ['name'];
		let model = 'MemberModel';
		let result = await ZSequelize.fetch(false, field, where, orderBy, groupBy, model);
		res.status(200).json({
			message: 'Success GET.',
			data : result
		});
	},
	
	processGetAllMember: async function(req, res) {
		let field = ['id', [ Sequelize.fn('count', Sequelize.col('id')), 'count_same_name' ], 'name'];
		let where = false;
		let orderBy = [['id', 'DESC']];
		let groupBy = ['name'];
		let model = 'MemberModel';
		let result = await ZSequelize.fetch(true, field, where, orderBy, groupBy, model);
		res.status(200).json({
			message: 'Success GET.',
			data : result
		});
	},
	
	processGetMemberArticlesRole: async function(req, res) {
		let field = ['id', 'name'];
		let where = {
			id: 1
		};
		let orderBy = false;
		let groupBy = false;
		let model = 'MemberModel'
		let joins = [
			[
				{
					'fromModel' : 'MemberModel',
					'fromKey' : 'member.id',
					'bridgeType' : 'hasMany',
					'toModel' : 'ArticleModel',
					'toKey' : 'memberid',
					'attributes' : ['title', 'body']
				}
			],
			[
				{
					'fromModel' : 'MemberModel',
					'fromKey' : 'roleid',
					'bridgeType' : 'belongsTo',
					'toModel' : 'RoleModel',
					'toKey' : 'id',
					'attributes' : ['id', 'name']
				}
			],
			[
				{
					'fromModel' : 'MemberModel',
					'fromKey' : 'member.id',
					'bridgeType' : 'hasOne',
					'toModel' : 'MemberDetailModel',
					'toKey' : 'memberid',
					'attributes' : ['id', 'first_name', 'last_name']
				}
			]
		];
		let result = await ZSequelize.fetchJoins(true, field, where, orderBy, groupBy, model, joins);
		res.status(200).json({
			message: 'Success GET.',
			data : result
		});
	},

	nestedJoins: async function(req, res) {
		let field = ['id'];
		let where = {
			id: 1
		};
		let orderBy = false;
		let groupBy = false;
		let model = 'MemberModel'
		let joins = [
			[
				{
					'fromModel' : 'MemberModel',
					'fromKey' : 'member.id',
					'bridgeType' : 'hasOne',
					'toModel' : 'MemberDetailModel',
					'toKey' : 'memberid',
					'attributes' : ['id', 'first_name', 'last_name'],
					'required': true,
					'includes': [
						{
							'fromModel' : 'MemberDetailModel',
							'fromKey' : 'roleid',
							'bridgeType' : 'belongsTo',
							'toModel' : 'RoleModel',
							'toKey' : 'id',
							'attributes' : ['id', 'name'],
							'required': true,
							'includes' : false
						}
					],
				}
			]
		];
		let result = await ZSequelize.fetchJoins(true, field, where, orderBy, groupBy, model, joins);
		return res.json(result)
		res.status(200).json({
			message: 'Success GET.',
			data : result
		});
	},
}