
import nodemailer from "nodemailer";
import formidable from "formidable";
import path from "node:path";

export const config = {
  api: {
    bodyParser: false
  }
};

const escapeHTML = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);

const getValue = (value) =>
  Array.isArray(value) ? value[0] : value || "";

export default async function handler(req, res) {
  res.setHeader("Allow", "POST");

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed."
    });
  }

  try {
    const form = formidable({
      uploadDir: "/tmp",
      keepExtensions: true,
      maxFileSize: 4 * 1024 * 1024,
      maxTotalFileSize: 4 * 1024 * 1024,
      maxFiles: 1,
      allowEmptyFiles: false,
      multiples: false
    });

    const [fields, files] = await form.parse(req);

    const name = getValue(fields.fullName).trim();
    const email = getValue(fields.email).trim();
    const mobile = getValue(fields.mobileNumber).trim();
    const position = getValue(fields.applyingFor).trim();
    const qualification = getValue(fields.qualification).trim();
    const experience = getValue(fields.workExperience).trim();
    const location = getValue(fields.currentLocation).trim();
    const message = getValue(fields.coverLetter).trim();
    const consent = getValue(fields.consent);

    const resume = getValue(files.resume);

    // Validate required fields
    if (
      !name || !email || !mobile || !position ||
      !qualification || !experience || !location ||
      !resume || consent !== "true"
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields and upload your resume."
      });
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      mobile.length > 20 ||
      position.length > 150 ||
      qualification.length > 100 ||
      experience.length > 100 ||
      location.length > 150 ||
      message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid application details."
      });
    }

    // Validate resume file
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    const extension = path.extname(resume.originalFilename || "").toLowerCase();

    if (
      !allowedTypes.includes(resume.mimetype) ||
      ![".pdf", ".doc", ".docx"].includes(extension)
    ) {
      return res.status(400).json({
        success: false,
        message: "Only PDF, DOC and DOCX resumes are allowed."
      });
    }

    // Check Hostinger SMTP configuration
    const requiredEnv = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
      "RECEIVER_EMAIL"
    ];

    const missing = requiredEnv.filter(
      (key) => !process.env[key]
    );

    if (missing.length) {
      console.error("Missing environment variables:", missing);

      return res.status(500).json({
        success: false,
        message: "Email service is not configured."
      });
    }

    const port = Number(process.env.SMTP_PORT);

    if (![465, 587].includes(port)) {
      return res.status(500).json({
        success: false,
        message: "Invalid SMTP port."
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Escape applicant details for HTML email
    const safe = {
      name: escapeHTML(name),
      email: escapeHTML(email),
      mobile: escapeHTML(mobile),
      position: escapeHTML(position),
      qualification: escapeHTML(qualification),
      experience: escapeHTML(experience),
      location: escapeHTML(location),
      message: escapeHTML(message).replace(/\n/g, "<br>")
    };

    // Send application to HR
    await transporter.sendMail({
      from: `"HSPV Careers" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Job Application - ${position}`,
      text: `
NEW JOB APPLICATION
HSPV Technologies Pvt. Ltd.

Full Name: ${name}
Email: ${email}
Mobile Number: ${mobile}
Applying For: ${position}
Qualification: ${qualification}
Work Experience: ${experience}
Current Location: ${location}

Cover Letter / Message:
${message || "Not provided"}

Resume is attached to this email.
      `,
      html: `
        <div style="font-family:Arial,sans-serif;color:#333;line-height:1.7">
          <h2>New Job Application</h2>
          <p><b>Full Name:</b> ${safe.name}</p>
          <p><b>Email:</b> ${safe.email}</p>
          <p><b>Mobile Number:</b> ${safe.mobile}</p>
          <p><b>Applying For:</b> ${safe.position}</p>
          <p><b>Qualification:</b> ${safe.qualification}</p>
          <p><b>Work Experience:</b> ${safe.experience}</p>
          <p><b>Current Location:</b> ${safe.location}</p>
          <p><b>Cover Letter / Message:</b><br>${safe.message || "Not provided"}</p>
          <hr>
          <p>Applicant resume is attached.</p>
          <p>HSPV Technologies Pvt. Ltd.</p>
        </div>
      `,
      attachments: [{
        filename: path.basename(resume.originalFilename || "resume"),
        path: resume.filepath,
        contentType: resume.mimetype
      }]
    });

    // Send confirmation email to applicant
    try {
      await transporter.sendMail({
        from: `"HSPV Technologies" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Job Application Has Been Received",
        text: `
Dear ${name},

Thank you for applying to HSPV Technologies Pvt. Ltd.

We have successfully received your application for ${position}.

Our HR team will review your profile and contact you if shortlisted.

Best Regards,
HR Team
HSPV Technologies Pvt. Ltd.
        `,
        html: `
          <div style="font-family:Arial,sans-serif;color:#333;line-height:1.7">
            <h2>Application Received Successfully!</h2>
            <p>Dear ${safe.name},</p>
            <p>Thank you for applying to HSPV Technologies Pvt. Ltd.</p>
            <p>Your application for <b>${safe.position}</b> has been received.</p>
            <p>Our HR team will review your profile and contact you if shortlisted.</p>
            <p>Best Regards,<br><b>HR Team</b><br>HSPV Technologies Pvt. Ltd.</p>
          </div>
        `
      });
    } catch (confirmationError) {
      console.error("Applicant confirmation failed:", confirmationError);
    }

    return res.status(200).json({
      success: true,
      message: "Your job application has been submitted successfully!"
    });

  } catch (error) {
    console.error("Careers API error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your application. Please try again."
    });
  }
}
