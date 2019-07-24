const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const Account = sequelize.define(
	'account',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
        },
		username: {
			type: Sequelize.STRING(255)
        },
        first_name: {
			type: Sequelize.STRING(255)
        },
        last_name: {
			type: Sequelize.STRING(255)
        },
        gender: {
			type: Sequelize.STRING(255)
        },
        password: {
			type: Sequelize.STRING(255)
        },
        status: {
			type: Sequelize.INTEGER
        },
        roleid: {
			type: Sequelize.INTEGER
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

module.exports = Account;
