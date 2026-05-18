const nodemailer = require("nodemailer");
require("dotenv").config();

const sendInvitationEmail = async ({ to, password, from }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const loginUrl = `${process.env.FRONT_URL}/login`;
  console.log('loginUrl =>', loginUrl)

  await transporter.sendMail({
    from: `"AI-Sprint" <${process.env.EMAIL_USER}>`,
    to,
    subject: "You're invited to AI-Sprint 🎉",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You're Invited</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0"
               style="max-width:520px;background:#ffffff;border-radius:16px;
                      box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">

          <!-- ── top accent bar ── -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#7029FB,#c0392b);"></td>
          </tr>

          <!-- ── header ── -->
          <tr>
            <td align="center" style="padding:40px 40px 28px;">
              <!-- logo / brand -->
              <div style="width:56px;height:56px;background:#7029FB;border-radius:14px;
                          display:inline-flex;align-items:center;justify-content:center;
                          font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-1px;
                          margin-bottom:20px;">
                T
              </div>
              <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#1d1d1b;
                         letter-spacing:-0.3px;">
                You're invited! 🎉
              </h1>
              ${from.name ? `
                <p style="margin:12px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">
                  You were invited by 
                  <strong style="color:#7029FB;">${from.name} &lt;${from.email}&gt;</strong>
                </p>` : ''}
              <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.5;">
                Your account has been created. Here are your login details.
              </p>
            </td>
          </tr>

          <!-- ── divider ── -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:#f0f0f0;"></div>
            </td>
          </tr>

          <!-- ── credentials box ── -->
          <tr>
            <td style="padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f9fafb;border:1.5px solid #e5e7eb;
                            border-radius:12px;overflow:hidden;">
                <!-- email row -->
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0 0 3px;font-size:11px;font-weight:600;
                               color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;">
                      Email address
                    </p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#1d1d1b;">
                      ${to}
                    </p>
                  </td>
                </tr>
                ${password ?
        `<tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0 0 3px;font-size:11px;font-weight:600;
                               color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;">
                      Temporary password
                    </p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#1d1d1b;
                               letter-spacing:0.08em;font-family:monospace;">
                      ${password}
                    </p>
                  </td>
                </tr> `: ``}
            
              </table>
            </td>
          </tr>

          <!-- ── security note ── -->
         <!-- <tr>
            <td style="padding:0 40px 24px;">
              <table cellpadding="0" cellspacing="0"
                     style="background:#fff7ed;border:1px solid #fed7aa;
                            border-radius:10px;width:100%;">
                <tr>
                  <td style="padding:12px 16px;">
                    <p style="margin:0;font-size:12.5px;color:#92400e;line-height:1.5;">
                      🔒 <strong>Security tip:</strong> Please change your password
                      immediately after your first login.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr> -->

          <!-- ── CTA button ── -->
          <tr>
            <td align="center" style="padding:0 40px 36px;">
              <a href="${loginUrl}"
                 style="display:inline-block;background:#7029FB;color:#ffffff;
                        text-decoration:none;font-size:15px;font-weight:700;
                        padding:14px 40px;border-radius:10px;
                        box-shadow:0 4px 14px rgba(133,24,17,0.35);
                        letter-spacing:0.01em;">
                Login to your account →
              </a>
            </td>
          </tr>

          <!-- ── divider ── -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:#f0f0f0;"></div>
            </td>
          </tr>

          <!-- ── footer ── -->
          <tr>
            <td align="center" style="padding:24px 40px;">
              <p style="margin:0 0 6px;font-size:12px;color:#9ca3af;line-height:1.6;">
                If you didn't expect this email, you can safely ignore it.
              </p>
              <p style="margin:0;font-size:12px;color:#d1d5db;">
                © ${new Date().getFullYear()} Team App. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `
  });
};

module.exports = sendInvitationEmail;