import nodemailer from "nodemailer"
const config = useRuntimeConfig();

const transporter = nodemailer.createTransport({
  host: config.MAILHOST,
  port: 465,
  auth: {
    user: config.MAILUSER,
    pass: config.MAILPASSWORD,
  },
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const mail = await transporter.sendMail({
      from: `"${body.fullName}" <noreply@mail.fr>`,
      to: "contact@mail.fr",
      replyTo: body.email,
      subject: "Contact Form",
      text: body.message,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #4CAF50;">Informations</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Nom:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${body.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${body.email}</td>
              </tr>
            </table>
    
            <h3 style="color: #4CAF50; margin-top: 20px;">Message:</h3>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
              ${body.message}
            </p>
          </body>
        </html>
      `,
    });


    return 'OK!';
  } catch (error: any) {
    sendError(event, createError({ statusCode: 400, statusMessage: error.message }));
  }
});