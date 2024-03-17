import { Resend } from "resend";
import { generateToken, getEnv, isAppOnline } from "./helper";

interface mailsProps {
    to: string,
    subject: string,
    html?: any
}

export const sendEmail = async (emailData: mailsProps) => {
    const { RESEND_API_KEY } = getEnv();
    const resend = new Resend(RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html
    })

    return {
        data,
        error
    }
}

// Confirmation Email
export const sendConfirmationEmail = async (user: any, payload: any) => {
    const token = generateToken(payload, "5m");
    const response = await isAppOnline();
    const html = (
        `<div>
            <h1>Welcome ${user.name}</h1>
            <hr />
            <p>Click <a href='${response.status ? response.url : 'http://localhost:5000'}/account/${token}'>here</a> to confirm your account. Link will expire in 5 minutes.</p>
        </div>`
    )
    return await sendEmail({ subject: "Confirm Email", to: user.email, html });
}