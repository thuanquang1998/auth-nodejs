import nodemailer from "nodemailer";

const adminEmail = process.env.ADMIN_MAIL_ADDRESS;
const adminPass = process.env.ADMIN_MAIL_PASS;
const mailHost = "smtp.gmail.com";
const mailPort = 587;

const sendMail = (toEmail, subject, content) => {
  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // nếu dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
      user: adminEmail,
      pass: adminPass,
    },
  });
  const options = {
    from: adminEmail,
    to: toEmail,
    subject: subject,
    html: content,
  };
  return transporter.sendMail(options);
};

export default { sendMail };
