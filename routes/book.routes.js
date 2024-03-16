const express=require('express');
const {auth}=require('../middleware/auth.middleware');
const {access}=require('../middleware/access.middleware');
 const {BookModel}=require('../models/book.model');
const jwt=require('jsonwebtoken');

const bookRouter=express.Router();


//add the book
bookRouter.post('/add',auth,access(["admin","librarian"]),async(req,res)=>{
      const {title,genre,author,published_year}=req.body;

      const book=await BookModel.findOne({title:title});
      console.log(book);
      console.log(title);

      const book1=new BookModel({title,genre,author,published_year});
      await book1.save();
      console.log(book1);
      res.status(200).json({msg:"Book Added",book1});

})




//get the book
bookRouter.get('/',auth,access(['admin','librarian','reader']),async(req,res)=>{
      try {
        const book = await BookModel.find(req.query);
        res.status(200).json({ books_list: book });
      } catch (err) {
        res.json({ msg: "error" });
      }
})




//update
bookRouter.patch('/update/:id',auth,access(["admin"]),async(req,res)=>{
    const {id}=req.params;
    const payload=req.body;
    try{
         await BookModel.findByIdAndUpdate({_id:id,payload});
         res.status(200).json({msg:"The book has been Updated ",payload});
    }
    catch(err){
        res.status(400).json({msg:err});
        console.log(err);
    }
})


//delete

bookRouter.delete('/delete/:id',auth,access(["admin"]),async(req,res)=>{
    const {id}=req.params;
    try{
        await BookModel.findByIdAndDelete({_id:id});
        res.status(200).json({msg:"Book has been deleted"});
    }
    catch(err){
        res.status(400).json({error:err});
    }
})



//

// bookRouter.post('/borrow/:id', auth, access(['reader','admin']), async (req, res) => {
//     const { id } = req.params;
//     try {
//         const book = await BookModel.findById(id);
//         console.log(book);
//         if (!book) {
//             return res.status(404).json({ msg: "Book not found" });
//         }
//         if (book.owner) {
//             return res.status(400).json({ msg: "Book is not available for borrowing" });
//         }
//         // Update book ownership
//         book.owner = userID; // Assuming req.user.id contains the ID of the borrowing user
//         await book.save();
//         res.status(200).json({ msg: "Book borrowed successfully" });
//     } catch (err) {
//         res.status(500).json({ msg: "Server error" });
//     }
// });


//

const BorrowModel = require('../models/borrow.model');

// Borrow a book
bookRouter.post('/borrow/:id', auth, access(['reader','admin']), async (req, res) => {
    const { id } = req.params;
    try {
        // Find the book by ID
        const book = await BookModel.findById(id);
        
        // Check if the book exists
        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }

        // Check if the book is already borrowed
        if (book.owner) {
            return res.status(400).json({ msg: "Book is already borrowed" });
        }

        // Create a new borrow record
        const borrow = new BorrowModel({
            book: book._id,
            borrower:req.userID,
            borrowedAt: new Date(),
            status: 'pending'
        });

        // Save the borrow record
        await borrow.save();

        // Update the book's owner to the borrower's ID
        book.owner = req.userID;
        console.log(req.userID);
        await book.save();

        res.status(200).json({ msg: "Book borrowed successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

//buy 

// Buy a book
bookRouter.post('/buy/:id', auth, access(['reader', 'admin']), async (req, res) => {
    const { id } = req.params;
    try {
        // Find the book by ID
        const book = await BookModel.findById(id);
        
        // Check if the book exists
        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }

        // Check if the book is already owned by the user
        if (book.owner && book.owner.equals(req.userID)) {
            return res.status(400).json({ msg: "You already own this book" });
        }

        // Check if the book is available for sale
        if (!book.owner) {
            // Update book ownership
            book.owner = req.userID;
            await book.save();
            return res.status(200).json({ msg: "Book purchased successfully" });
        } else {
            return res.status(400).json({ msg: "Book is not available for purchase" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

//approve

// const BorrowModel = require('../models/borrow.model');

// Approve or reject a borrow request
// bookRouter.post('/approve-borrow/:id', auth, access(['reader', 'admin']), async (req, res) => {
//     const { id } = req.params; // ID of the borrow request to approve or reject
//     const { action } = req.body; // Action to take: 'approve' or 'reject'
    
//     try {
//         // Find the borrow request by ID
//         const borrowRequest = await BorrowModel.findById(id).populate('book');
        
//         // Check if the borrow request exi
//         if (!borrowRequest) {
//             return res.status(404).json({ msg: "Borrow request not found" });
//         }

//         // Check if the authenticated user is the owner of the book
//         if (!borrowRequest.book.owner.equals(req.userID)) {
//             return res.status(403).json({ msg: "You are not authorized to approve or reject this borrow request" });
//         }

//         // Check if the borrow request is pending
//         if (borrowRequest.status !== 'pending') {
//             return res.status(400).json({ msg: "Borrow request has already been processed" });
//         }

//         // Update the borrow request status based on the action
//         if (action === 'approved') {
//             // Update status to 'approved'
//             borrowRequest.status = 'approved';
//         } else if (action === 'rejected') {
//             // Update status to 'rejected'
//             borrowRequest.status = 'rejected';
//         } else {
//             return res.status(400).json({ msg: "Invalid action" });
//         }

//         // Save the updated borrow request
//         await borrowRequest.save();

//         res.status(200).json({ msg: "Borrow request has been processed successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error" });
//     }
// });



module.exports={
    bookRouter,
}