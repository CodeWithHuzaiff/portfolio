const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactNotification = async ({ name, email, message }) => {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `📬 New Message from ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f2a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(99, 102, 241, 0.3);">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px 32px;">
          <h1 style="color: white; margin: 0; font-size: 20px;">📬 New Portfolio Message</h1>
        </div>
        <div style="padding: 32px;">
          <div style="margin-bottom: 20px;">
            <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px;">From</p>
            <p style="color: #e2e8f0; font-size: 16px; margin: 0; font-weight: 600;">${name}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px;">Email</p>
            <p style="color: #a78bfa; font-size: 16px; margin: 0;">
              <a href="mailto:${email}" style="color: #a78bfa; text-decoration: none;">${email}</a>
            </p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px;">Message</p>
            <div style="background: rgba(20, 20, 50, 0.6); border: 1px solid rgba(99, 102, 241, 0.15); border-radius: 12px; padding: 16px;">
              <p style="color: #e2e8f0; font-size: 15px; margin: 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid rgba(99, 102, 241, 0.15); margin: 24px 0;" />
          <p style="color: #64748b; font-size: 12px; margin: 0; text-align: center;">
            Sent from your portfolio contact form
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Notification email sent for message from ${name}`);
  } catch (error) {
    console.error('Email notification failed:', error.message);
    // Don't throw - email failure shouldn't break the contact form
  }
};

module.exports = sendContactNotification;
