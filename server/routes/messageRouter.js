const router = require('express').Router()
const messageCtrl = require('../controllers/messageCtrl')
const {auth} = require('../middleware/auth')
const conversationModel = require('../models/conversationModel')

router.post('/message', auth, messageCtrl.createMessage)

router.get('/conversations', auth, messageCtrl.getConversations)

router.get('/message/:id', auth, messageCtrl.getMessages)

router.delete('/message/:id', auth, messageCtrl.deleteMessages)

router.delete('/conversation/:id', auth, messageCtrl.deleteConversation)

router.post('/group/discussions',auth, async (req, res) => {
    try {
      const { groupId, title } = req.body;
  console.log(title)
      const discussion = new conversationModel({
        group: groupId,
        title,
   
      });
  
      const newDiscussion = await discussion.save();
      res.json(newDiscussion);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create discussion' });
    }
  });
  
module.exports = router