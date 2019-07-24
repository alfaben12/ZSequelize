const MemberModel = require('../models/MemberModel');
const ZSequelize = require('../libraries/ZSequelize');
const Sequelize = require('sequelize');

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
				
		let result = await ZSequelize.insertValues(value, 'MemberModel');
		res.status(200).json({
			message: 'Success POST.',
			data : result
		});
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
		let id = req.params.id;
		
		let where = {'id': id};
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
		let result = await ZSequelize.fetch(field, where, orderBy, groupBy, model);
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
		let result = await ZSequelize.fetchJoins(field, where, orderBy, groupBy, model, joins);
		res.status(200).json({
			message: 'Success GET.',
			data : result
		});
	},
}