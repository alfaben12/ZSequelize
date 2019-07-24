### Requirement

- [MySql](https://www.mysql.com/)
- [NPM](https://www.npmjs.com/)
- [Express JS](https://expressjs.com/)
- [Sequelize JS](http://docs.sequelizejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)

### Features

- Simple query.
- Easy query for read.
- Compatible with Mysql DBMS.
- Auto builder query with SequelizeJS.
- Running Promise function.

### How to use on project?

1.  Clone https://github.com/alfaben12/ZSequelize.git
or download on repository https://github.com/alfaben12/ZSequelize.
2. Create *libraries* or etc on root, side by side with node_modules.
3. Open *libraries* folder on project has been downloaded or cloned.
4. Copy *ZSequelize.js* and paste to folder *libraries* or etc on your project.
5. NB : Setup ZSequelize on .env (dotenv) so please equalize.
6. Require ZSequelize on your controllers (if use MVC on your project) or require ZSequelize on files needed.
7. Do it according to predetermined rules.

### Postman Docs

- [Docs](https://documenter.getpostman.com/view/6671153/S1TN6MM2)

### Function Collection
##### - Insert
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
            data: result
        });
    }
    
##### - Update
    processUpdate: async function(req, res) {
        let id = req.params.id;
        let name = req.body.name;
        let password = req.body.password;
    
        let value = {
            name: name,
            password: password,
        };
    
        let where = {
            id: id
        };
    
        let result = await ZSequelize.updateValues(value, where, 'MemberModel');
        res.status(200).json({
            message: 'Success PUT.',
            data: result
        });
    }

##### - Delete
    processDelete: async function(req, res) {
		let id = req.params.id;
		
		let where = {'id': id};
		let result = await ZSequelize.destroyValues(where, 'MemberModel');
		res.status(200).json({
			message: 'Success DELETE.',
			data : result
		});
	}

##### - Fetch
    processGetMember: async function(req, res) {
        let field = ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count_same_name'], 'name'];
        let where = {
            id: 1,
        };
        let orderBy = [
            ['id', 'DESC']
        ];
        let groupBy = ['name'];
        let model = 'MemberModel';
        let result = await ZSequelize.fetch(field, where, orderBy, groupBy, model);
        res.status(200).json({
            message: 'Success GET.',
            data: result
        });
    }
    
##### - Fetch Joins
    processGetMemberArticlesRole: async function(req, res) {
        let field = ['id', 'name'];
        let where = {
            id: 1
        };
        let orderBy = false;
        let groupBy = false;
        let model = 'MemberModel'
        let joins = [
            [{
                'fromModel': 'MemberModel',
                'fromKey': 'member.id',
                'bridgeType': 'hasMany',
                'toModel': 'ArticleModel',
                'toKey': 'memberid',
                'attributes': ['title', 'body']
            }],
            [{
                'fromModel': 'MemberModel',
                'fromKey': 'roleid',
                'bridgeType': 'belongsTo',
                'toModel': 'RoleModel',
                'toKey': 'id',
                'attributes': ['id', 'name']
            }],
            [{
                'fromModel': 'MemberModel',
                'fromKey': 'member.id',
                'bridgeType': 'hasOne',
                'toModel': 'MemberDetailModel',
                'toKey': 'memberid',
                'attributes': ['id', 'first_name', 'last_name']
            }]
        ];
        let result = await ZSequelize.fetchJoins(field, where, orderBy, groupBy, model, joins);
        res.status(200).json({
            message: 'Success GET.',
            data: result
        });
    }
    
## Information Issues and Security Concerns
Contact me zrav420@gmail.com
