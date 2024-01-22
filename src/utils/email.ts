import nodemailer from "nodemailer";

type SendEmailProps = {
  email: string;
  subject: string;
  message: string;
};

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export const sendEmail = async (options: SendEmailProps) => {
  // Criar transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Definir as opções do e-mail

  const mailOptions: MailOptions = {
    from: "TrendCart <gusfonseca.trendcart@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Enviar o email
  await transporter.sendMail(mailOptions);
};
