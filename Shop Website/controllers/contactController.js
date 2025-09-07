const Message = require('../models/Message');

class ContactController {
  // Display contact form
  static async index(req, res) {
    try {
      res.render('contact', {
        title: 'Contact Us - ShoeMart',
        currentPage: 'contact',
        success: req.query.success === 'true',
        error: req.query.error
      });
    } catch (error) {
      console.error('Error in ContactController.index:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Unable to load contact page',
        error: error.message
      });
    }
  }

  // Handle contact form submission
  static async submit(req, res) {
    try {
      const { name, email, phone, topic, message } = req.body;

      // Validate required fields
      if (!name || !email || !topic || !message) {
        return res.redirect('/contact?error=Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.redirect('/contact?error=Please enter a valid email address');
      }

      // Create new message using Mongoose
      const newMessage = new Message({
        name,
        email,
        phone: phone || undefined,
        topic,
        message
      });

      await newMessage.save();

      console.log('New message received:', { name, email, phone, topic, message });

      // Redirect with success message
      res.redirect('/contact?success=true');
    } catch (error) {
      console.error('Error in ContactController.submit:', error);
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const errorMessages = Object.values(error.errors).map(err => err.message);
        return res.redirect(`/contact?error=${encodeURIComponent(errorMessages.join(', '))}`);
      }
      
      res.redirect('/contact?error=Unable to send message. Please try again.');
    }
  }

  // Get all messages (admin endpoint)
  static async getMessages(req, res) {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      
      res.json({
        messages,
        count: messages.length
      });
    } catch (error) {
      console.error('Error in ContactController.getMessages:', error);
      res.status(500).json({ error: 'Unable to fetch messages' });
    }
  }

  // Get recent messages (admin endpoint)
  static async getRecentMessages(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const messages = await Message.findRecent(limit);
      
      res.json({
        messages,
        count: messages.length,
        limit
      });
    } catch (error) {
      console.error('Error in ContactController.getRecentMessages:', error);
      res.status(500).json({ error: 'Unable to fetch recent messages' });
    }
  }

  // Delete message (admin endpoint)
  static async deleteMessage(req, res) {
    try {
      const messageId = req.params.id;
      const deletedMessage = await Message.findByIdAndDelete(messageId);

      if (deletedMessage) {
        res.json({ success: true, message: 'Message deleted successfully' });
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      console.error('Error in ContactController.deleteMessage:', error);
      res.status(500).json({ error: 'Unable to delete message' });
    }
  }
}

module.exports = ContactController;