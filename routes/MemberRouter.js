const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');

router.post(
	'/',
	MemberController.processAdd
);

router.put(
	'/:id',
	MemberController.processUpdate
);

router.delete(
	'/:id',
	MemberController.processDelete
);

router.delete(
	'/processMultiDelete/:idone/:idtwo',
	MemberController.processMultiDelete
);

router.get(
	'/processGetMember/',
	MemberController.processGetMember
);

router.get(
	'/processGetMemberArticlesRole/',
	MemberController.processGetMemberArticlesRole
);
router.get(
	'/nestedjoins/',
	MemberController.nestedJoins
);

module.exports = router;