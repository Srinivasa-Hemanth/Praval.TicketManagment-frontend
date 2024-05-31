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

export const sendMail = async (recipient:string, subject:string, content:string) => {
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

    const email = {
        message: {
            subject: subject,
            body: {
                contentType: "Text",
                content: content,
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: 'chandana.k@pravaltech.com',
                    },
                },
            ],
        },
        saveToSentItems: "true",
    };

    try {
        await client.api('/me/sendMail').post(email);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
