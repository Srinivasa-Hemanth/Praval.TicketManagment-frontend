import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';
import { msalInstance } from '../authConfig';

// Function to get an access token
const getToken = async () => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        const request = {
            scopes: ["User.Read", "Mail.Send"],
            account: accounts[0],
        };

        try {
            const response = await msalInstance.acquireTokenSilent(request);
            return response.accessToken;
        } catch (e) {
            console.error(e);
        }
    }
    return null;
};

export const generateUserEmailContent = (recipientName: string, ticketNumber: string, shortDescription: string, date: string) => {
    return `
    Dear ${recipientName},
    Thank you for reaching out to the [Company Name] IT Help Desk. We have received your issue/request and created a support ticket to track its progress. Here are the details:
    Ticket Number: ${ticketNumber}
    Issue/Request: ${shortDescription}
    Date Submitted: ${date}
    Our IT support team is currently reviewing your issue/request and will contact you shortly to provide assistance or gather additional information if needed.
    
    Best Regards,
    Admin Team
    `;
};

export const sendMail = async (recipients: {name: string, email: string}[], subject:string,emailContent:string) => {
    const token = await getToken();

    if (!token) {
        console.error("Failed to acquire token");
        return;
    }

    const client = Client.init({
        authProvider: (done) => {
            done(null, token);
        },
    });

    for (const recipient of recipients) {
        
        const email = {
            message: {
                subject: subject,
                body: {
                    contentType: "Text",
                    content: emailContent,
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: recipient.email,
                        },
                    },
                ],
            },
            saveToSentItems: "true",
        };

        try {
            await client.api('/me/sendMail').post(email);
            console.log(`Email sent successfully to ${recipient.email}`);
        } catch (error) {
            console.error(`Error sending email to ${recipient.email}:`, error);
        }
    }
};

