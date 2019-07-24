const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');

router.post(
	'/processAdd/',
	MemberController.processAdd
);

router.put(
	'/processEdit/:id',
	MemberController.processUpdate
);

router.delete(
	'/processDelete/:id',
	MemberController.processDelete
);

router.get(
	'/processGetMember/',
	MemberController.processGetMember
);

router.get(
	'/processGetMemberArticlesRole/',
	MemberController.processGetMemberArticlesRole
);

module.exports = router;