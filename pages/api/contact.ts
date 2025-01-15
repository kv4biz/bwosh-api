import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, email, message }: ContactForm = req.body;

      if (!name || !email || !message || !email.includes("@")) {
        return res.status(400).json({ message: "Invalid form submission." });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Admin email
    const adminMailOptions = {
        from: `"Contact Form Submission" <${process.env.EMAIL_USER}>`,
        to: `${process.env.EMAIL_USER}`,
        subject: `✨ New Contact Form Submission from ${name} ✨`,
        html: `
      <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />
      <style>
        body {
          font-family: "Poppins", Arial, sans-serif;
          font-weight: 400;
          font-size: 14px;
          margin: 0;
          padding: 0;
          background-color: #f7f7f7;
          color: #333;
          line-height: 1.6;
        }
        header {
          background-color: #20446e;
          padding: 10px;
          text-align: center;
        }
        header img {
          width: 120px;
          height: auto;
          display: inline-block;
        }
        main {
          background-color: #ffffff;
          margin: 20px auto;
          padding: 20px;
          max-width: 600px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        h1 {
          color: #20446e;
          font-size: 24px;
          margin-bottom: 10px;
        }
        p {
          margin: 10px 0;
          color: #555;
        }
        p strong {
          color: #333;
        }
        blockquote {
          margin: 20px 0;
          font-size: 14px;
          color: #777;
          padding-left: 10px;
          border-left: 4px solid #20446e;
        }
        hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 20px 0;
        }
        footer {
          font-size: 12px;
          color: #999;
          text-align: center;
        }
        footer a {
          color: #4caf50;
          text-decoration: none;
        }
      </style>
      <title>Contact Form Submission</title>
    </head>
    <body>
      <!-- Header -->
      <header>
        <img
          src="https://res.cloudinary.com/dikzx4eyh/image/upload/v1736328344/Bwosh/email/LOGO_xwkkmn.png"
          alt="Company Logo"
          style="width: 40px; height: auto"
        />
      </header>
  
      <!-- Main Content -->
      <main>
        <h1>New Contact Form Submission</h1>
        <p>
          Hello, <strong>Bwosh Interiors</strong>! You have received a new message
          via the contact form on your website.
        </p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
        <hr />
        <footer>
          <p>
            Need assistance? Contact us at
            <a href="mailto:${process.env.EMAIL_USER}"
              >${process.env.EMAIL_USER}</a
            >
          </p>
        </footer>
      </main>
    </body>
  </html>
      `,
      };
      // Send admin email
      await transporter.sendMail(adminMailOptions);
      console.log("Admin email sent successfully.");

       // User confirmation email
    const userMailOptions = {
        from: `"Bwosh Interiors" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "🌟 Thank You for Contacting Bwosh Interiors! 🌟",
        html: `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />
      <style>
        body {
          font-family: "Poppins", Arial, sans-serif;
          font-size: 14px;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
          color: #333;
          line-height: 1.6;
        }
        header {
          background-color: #20446e;
          padding: 10px;
          text-align: center;
        }
        header img {
          width: 40px;
          height: auto;
        }
        main {
          background-color: #ffffff;
          margin: 20px auto;
          padding: 20px;
          max-width: 600px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        h1 {
          color: #20446e;
          font-size: 18px;
          margin-bottom: 10px;
        }
        p {
          margin: 10px 0;
          color: #555;
        }
        p strong {
          color: #333;
        }
        blockquote {
          margin: 20px 0;
          font-size: 14px;
          color: #777;
          padding-left: 10px;
          border-left: 4px solid #20446e;
        }
        hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 20px 0;
        }
        footer {
          background-color: black;
          color: white;
          font-size: 12px;
          padding: 20px;
          text-align: center;
        }
        footer img {
          height: 24px;
          margin: 0 10px;
        }
        footer a {
          color: white;
          text-decoration: none;
        }
        footer address {
          font-style: normal;
          margin: 10px 0;
        }
      </style>
      <title>Welcome to Bwosh Interiors</title>
    </head>
    <body>
      <header>
        <img
          src="https://res.cloudinary.com/dikzx4eyh/image/upload/v1736328344/Bwosh/email/LOGO_xwkkmn.png"
          alt="Company Logo"
        />
      </header>
  
      <!-- Main Content -->
      <main>
        <h1>Thank You, ${name}!</h1>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Here is a copy of your message:</p>
        <blockquote>${message}</blockquote>
        <p>
          In the meantime, feel free to explore more about us on our website for
          inspiration and services.
        </p>
        <hr />
      </main>
  
      <!-- Footer -->
      <footer>
        <div>
          <a href="https://www.facebook.com/bwoshinteriors/">
            <img
              src="https://res.cloudinary.com/dikzx4eyh/image/upload/v1736329631/Bwosh/email/icons8-facebook-logo-90_du7rix.png"
              alt="Facebook"
            />
          </a>
          <a
            href="https://www.tiktok.com/@bwoshinteriors?is_from_webapp=1&sender_device=pc"
          >
            <img
              src="https://res.cloudinary.com/dikzx4eyh/image/upload/v1736329624/Bwosh/email/icons8-tiktok-100_kzv60s.png"
              alt="TikTok"
            />
          </a>
          <a href="https://www.instagram.com/bwoshinteriors/">
            <img
              src="https://res.cloudinary.com/dikzx4eyh/image/upload/v1736329678/Bwosh/email/icons8-instagram-logo-100_klwx80.png"
              alt="Instagram"
            />
          </a>
        </div>
        <address>
          11, Olaide Benson St, Maryland, Lagos.<br />
          Call Us: +234-7069114249, +234-8089107641
        </address>
        <p>
          Contact us anytime at
          <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>
        </p>
      </footer>
    </body>
  </html> 
      `,
      };
   // Send email to contact user
   await transporter.sendMail(userMailOptions);
   console.log("Subscriber email sent successfully.");

      return res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
