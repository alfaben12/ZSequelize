const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const MemberDetail = sequelize.define(
	'member_detail',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
        },
        member_id: {
			type: Sequelize.INTEGER,
        },
		first_name: {
			type: Sequelize.STRING(255)
        },
        middle_name: {
			type: Sequelize.STRING(255)
        },
        last_name: {
			type: Sequelize.STRING(255)
        },
        address: {
			type: Sequelize.STRING(255)
        },
        job: {
			type: Sequelize.STRING(255)
		},
		createdAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false
		  },
		  updatedAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false
		  }
	},
	{
		timestamps: process.env.TIMESTAMPS, // true = ketambahan 2 kolom create_at & update_at (AUTO) klo false tidak ketambahan
		freezeTableName: true // true = nama table asli , false = nama table ketambahan 's' diakhir
	}
);

module.exports = MemberDetail;
