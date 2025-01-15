import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface SubscribeForm {
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow requests from your frontend
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow these HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow these headers
  if (req.method === "OPTIONS") {
    res.status(200).end(); // Respond with 200 for preflight
    return;
  }
  if (req.method === "POST") {
    try {
      const { email }: SubscribeForm = req.body;

      // Validate email
      if (!email || !email.includes("@")) {
        return res.status(400).json({ message: "Invalid email address." });
      }

      // Create the transporter for nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email to Bwosh Interiors
      const adminMailOptions = {
        from: `"Bwosh Interiors Subscription" <${process.env.EMAIL_USER}>`,
        to: `${process.env.EMAIL_USER}`,
        subject: "✨ New Subscriber Alert for Bwosh Interiors ✨",
        text: `You have a new subscriber: ${email}`,
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
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
    margin: 0;
    padding: 0;
    background-color: #f7f7f7;
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
    font-size: 18px;
    font-weight: bold;
    color: #1e3a8a;
    margin-bottom: 10px;
    text-align: center;
  }
  p {
    margin: 10px 0;
    color: #333333;
  }
  footer {
    background-color: #e5e5e5;
    padding: 10px 20px;
    text-align: center;
    color: #666666;
    font-size: 12px;
  }
  footer a {
    color: #1e40af;
    text-decoration: none;
  }
</style>
<title>New Subscriber Alert</title>
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
  <h1>🎉 New Subscriber Alert!</h1>
  <p>
    Hello, <strong>Bwosh Interiors</strong>! You have a new subscriber to
    your newsletter.
  </p>
  <p><strong>Email:</strong> ${email}</p>
  <p>
    Keep your subscribers engaged with the latest news, updates, and
    interior design inspirations!
  </p>
</main>

<!-- Footer -->
<footer>
  Need assistance? Contact us anytime at
  <a href="mailto:nxtflodev@gmail.com">nxtflodev@gmail.com</a>
  or (+234)-9130912078.
</footer>
</body>
</html>

  `,
      };
      // Send admin email
      await transporter.sendMail(adminMailOptions);
      console.log("Admin email sent successfully.");

      // Welcome email to subscriber
      const subscriberMailOptions = {
        from: `"Bwosh Interiors" <${process.env.EMAIL_USER}>`,
        to: email, // Subscriber's email
        subject: "🎉 Welcome to Bwosh Interiors!",
        text: `Welcome to Bwosh Interiors, ${email}!`,
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
<link
  href="https://fonts.googleapis.com/css2?family=Arizonia&display=swap"
  rel="stylesheet"
/>
<style>
  body {
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    margin: 0;
    padding: 0;
    background-color: #f9fafb;
  }

  section {
    position: relative;
    height: 350px;
    margin-bottom: 20px;
  }

  section img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  main {
    background-color: white;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  main h2 {
    font-size: 18px;
    font-weight: bold;
    color: #1e3a8a;
  }

  main p {
    margin: 10px 0;
  }

  main ul {
    list-style-type: disc;
    margin: 10px 0;
    padding-left: 20px;
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
<!-- Hero Section -->
<section>
  <img
    src="https://res.cloudinary.com/dikzx4eyh/image/upload/v1736330214/Bwosh/email/emailpic_v0fst5.png"
    alt="Hero Image"
  />
</section>

<!-- Main Content -->
<main>
  <h2>Hi there,</h2>
  <p>We're thrilled to welcome you to the Bwosh family!</p>
  <p>Get ready to be inspired by a curated selection of:</p>
  <ul>
    <li>
      Exclusive Interior Design Tips & Tricks: Unlock insider secrets from
      our expert designers, from color palette inspiration to space-saving
      hacks.
    </li>
    <li>
      Latest Project Showcases: Be the first to see our stunning new
      projects, featuring breathtaking transformations of homes, offices,
      and more.
    </li>
    <li>
      Special Promotions & Offers: Enjoy exclusive discounts, early access
      to sales, and special offers on our design services and products.
    </li>
  </ul>
  <p>
    We're committed to bringing you the latest trends, innovative ideas, and
    exclusive offers directly to your inbox.
  </p>
  <p>Welcome aboard!</p>
  <p>Warmly,</p>
  <p>The Bwosh Team</p>
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
      // Send subscriber email
      await transporter.sendMail(subscriberMailOptions);
      console.log("Subscriber email sent successfully.");

      return res.status(200).json({
        message:
          "Subscription successful! Welcome email sent to the subscriber.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email." });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
