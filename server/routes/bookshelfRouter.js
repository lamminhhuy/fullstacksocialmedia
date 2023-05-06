const router = require('express').Router()
const BookshelfCtrl =  require('../controllers/BookshelfCtrl')
const {auth} = require('../middleware/auth')
const Bookshelf = require('../models/Bookshelf_Books')

router.post('/bookshelf/books',auth, BookshelfCtrl.addtobookshelf) 

router.get('/bookshelf/books/:userId', BookshelfCtrl.getbookshelf) 

router.post('/bookshelves/:userId/drawers', async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.params.userId;
  
      // Find the bookshelf by ID
      const bookshelf = await Bookshelf.findOne({user:userId});
  
      if (!bookshelf) {
        return res.status(404).json({ error: 'Bookshelf not found' });
      }
  
      // Add a new drawer to the bookshelf
      const newDrawer = { name, books: [] };
      bookshelf.drawers.push(newDrawer);
  
      // Save the updated bookshelf to the database
      const updatedBookshelf = await bookshelf.save();
  
      res.status(201).json(newDrawer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create drawer' });
    }
  });
module.exports = router