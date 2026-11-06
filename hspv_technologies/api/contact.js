
const nodemailer = require("nodemailer");

const escapeHTML = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);

module.exports = async (req, res) => {
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

    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 200 ||
      message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid form details."
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Send enquiry to HSPV Technologies
    await transporter.sendMail({
      from: `"HSPV Website" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `Website Enquiry: ${subject}`,
      text: `
New enquiry received from HSPV Technologies website.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <h2>New Website Enquiry</h2>
        <p><b>Name:</b> ${escapeHTML(name)}</p>
        <p><b>Email:</b> ${escapeHTML(email)}</p>
        <p><b>Subject:</b> ${escapeHTML(subject)}</p>
        <p><b>Message:</b></p>
        <p>${escapeHTML(message).replace(/\n/g, "<br>")}</p>
      `
    });

    // Automatic confirmation to customer
    await transporter.sendMail({
      from: `"HSPV Technologies" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank You for Contacting HSPV Technologies",
      text: `
Dear ${name},

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
          <p>Dear ${escapeHTML(name)},</p>
          <p>Thank you for contacting HSPV Technologies Pvt. Ltd.</p>
          <p>We have successfully received your enquiry.
          Our team will review your message and get back to you soon.</p>
          <br>
          <p>Best Regards,<br>
          <b>Team HSPV Technologies Pvt. Ltd.</b><br>
          info@hspvtechnologies.com<br>
          www.hspvtechnologies.com</p>
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
};
