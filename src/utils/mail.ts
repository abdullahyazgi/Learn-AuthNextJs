import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationToken = (email: string, token: string) => {
    const link = `${process.env.DOMAIN}/verify?token=${token}`;

    resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "verify your email",
      html: `
            <div>
                <a href="${link}">
                    Click here to verify your email address
                </a>
            </div>
        `,
    });
}