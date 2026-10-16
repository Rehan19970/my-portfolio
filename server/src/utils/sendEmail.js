import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Transporter banao
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Connection verify karo (server start hone pe)
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter error:', error.message);
    console.error('   Check your EMAIL_USER and EMAIL_PASS in .env');
  } else {
    console.log('✅ Email transporter ready');
  }
});

export async function sendContactEmail({ name, email, subject, message }) {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `📬 New message from ${name}: ${subject || 'Portfolio enquiry'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #02050d; color: #e8f4ff; padding: 30px; border-radius: 12px;">
        <h2 style="color: #22e5ff; margin-bottom: 20px;">📬 New Contact Form Message</h2>

        <div style="background: #0a1a3a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px;"><strong style="color: #22e5ff;">Name:</strong> ${name}</p>
          <p style="margin: 0 0 10px;"><strong style="color: #22e5ff;">Email:</strong> <a href="mailto:${email}" style="color: #7fe9ff;">${email}</a></p>
          <p style="margin: 0;"><strong style="color: #22e5ff;">Subject:</strong> ${subject || 'N/A'}</p>
        </div>

        <div style="background: #0a1a3a; padding: 20px; border-radius: 8px;">
          <p style="color: #22e5ff; margin: 0 0 10px;"><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${message}</p>
        </div>

        <p style="color: #7f97b8; font-size: 12px; margin-top: 30px; text-align: center;">
          Sent from your portfolio contact form
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}