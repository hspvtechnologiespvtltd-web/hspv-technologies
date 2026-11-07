
import nodemailer from "nodemailer";

const escapeHTML = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);

export default async function handler(req, res) {
  res.setHeader("Allow", "POST");

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (
      !name || !email || !subject || !message ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields."
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (
      !cleanName || !cleanSubject || !cleanMessage ||
      cleanName.length > 100 ||
      cleanEmail.length > 254 ||
      cleanSubject.length > 200 ||
      cleanMessage.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid form details."
      });
    }

    // Check Vercel environment variables
    const requiredEnv = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
      "RECEIVER_EMAIL"
    ];

    const missingEnv = requiredEnv.filter(
      (key) => !process.env[key]
    );

    if (missingEnv.length > 0) {
      console.error("Missing environment variables:", missingEnv);

      return res.status(500).json({
        success: false,
        message: "Email service is not configured."
      });
    }

    const smtpPort = Number(process.env.SMTP_PORT);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Send enquiry to HSPV Technologies
    await transporter.sendMail({
      from: `"HSPV Website" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: cleanEmail,
      subject: `Website Enquiry: ${cleanSubject}`,
      text: `
New enquiry received from HSPV Technologies website.

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}

Message:
${cleanMessage}
      `,
      html: `
        <h2>New Website Enquiry</h2>
        <p><b>Name:</b> ${escapeHTML(cleanName)}</p>
        <p><b>Email:</b> ${escapeHTML(cleanEmail)}</p>
        <p><b>Subject:</b> ${escapeHTML(cleanSubject)}</p>
        <p><b>Message:</b></p>
        <p>${escapeHTML(cleanMessage).replace(/\n/g, "<br>")}</p>
      `
    });

    // Send confirmation to customer
    await transporter.sendMail({
      from: `"HSPV Technologies" <${process.env.SMTP_USER}>`,
      to: cleanEmail,
      subject: "Thank You for Contacting HSPV Technologies",
      text: `
Dear ${cleanName},

Thank you for contacting HSPV Technologies Pvt. Ltd.

We have successfully received your enquiry.
Our team will review your message and get back to you soon.

Best Regards,
Team HSPV Technologies Pvt. Ltd.
info@hspvtechnologies.com
www.hspvtechnologies.com

INNOVATE | DEVELOP | GROW
      `,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.7;color:#333">
          <h2>Thank You for Contacting HSPV Technologies!</h2>
          <p>Dear ${escapeHTML(cleanName)},</p>
          <p>Thank you for contacting HSPV Technologies Pvt. Ltd.</p>
          <p>We have successfully received your enquiry.
          Our team will review your message and get back to you soon.</p>
          <p>
            Best Regards,<br>
            <b>Team HSPV Technologies Pvt. Ltd.</b><br>
            info@hspvtechnologies.com<br>
            www.hspvtechnologies.com
          </p>
          <p><b>INNOVATE | DEVELOP | GROW</b></p>
        </div>
      `
    });

    return res.status(200).json({
      success: true,
      message: "Your enquiry has been sent successfully!"
    });

  } catch (error) {
    console.error("Email sending error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your enquiry. Please try again later."
    });
  }
}
