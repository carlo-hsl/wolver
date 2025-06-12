import nodemailer from 'nodemailer';

// Create a test account for development
const createTestAccount = async () => {
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export const sendVerificationEmail = async (email: string, code: string) => {
  const transport = await createTestAccount();

  const info = await transport.sendMail({
    from: '"Wolver" <verification@wolver.io>',
    to: email,
    subject: "Your Wolver Verification Code",
    text: `Your verification code is: ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FC7E10;">Welcome to Wolver!</h2>
        <p>Your verification code is:</p>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; letter-spacing: 4px; margin: 20px 0;">
          <strong>${code}</strong>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    `,
  });

  // Log the verification code for testing
  console.log('Verification code:', code);
  console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

  return info;
}; 