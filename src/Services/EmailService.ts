import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';
import { msalInstance } from '../authConfig';
import { ITicket } from '../Interfaces/ITickets';

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

export const generateUserEmailContent = (ticket:ITicket,account:any) => {
    return `
    Dear ${ticket.ReporingManger},
    Please review the IT support request from ${account.name} that requires your approval:
    Ticket Number: ${ticket.TicketId}
    Issue/Request: ${ticket.Description}
    Date Submitted: ${ticket.CreatedOn}
    Please review the request and provide your approval.
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

